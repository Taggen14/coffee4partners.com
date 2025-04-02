"use client";

import { useQuery, useMutation } from "@tanstack/react-query";
import { queryClient } from "@/lib/react-query";
import { toast } from "sonner";
import { useEffect, useRef, useState } from "react";

interface Message {
  id: string;
  content: string;
  role: "USER" | "ASSISTANT" | "SYSTEM";
  createdAt: string;
  inquiryId: string;
  readAt: string | null;
}

interface TypingIndicator {
  role: string;
  isTyping: boolean;
}

interface Inquiry {
  id: string;
  customerName: string;
  customerEmail: string;
  type: "AI" | "HUMAN";
  status: "ACTIVE" | "RESOLVED" | "ARCHIVED";
  subject: string;
  lastMessage: string;
  messages: Message[];
}

export const useChat = (inquiryId?: string) => {
  const [typingIndicators, setTypingIndicators] = useState<
    Record<string, boolean>
  >({});
  const eventSourceRef = useRef<EventSource | null>(null);
  const typingTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Get or create inquiry
  const { data: inquiry, isLoading: inquiryLoading } = useQuery<Inquiry>({
    queryKey: ["inquiry", inquiryId],
    queryFn: async () => {
      if (inquiryId) {
        const response = await fetch(`/api/inquiries/${inquiryId}`);
        if (!response.ok) throw new Error("Failed to fetch inquiry");
        return response.json();
      } else {
        const response = await fetch("/api/inquiries", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            customerEmail: "anonymous", // You can update this with actual user info
          }),
        });
        if (!response.ok) throw new Error("Failed to create inquiry");
        return response.json();
      }
    },
    staleTime: 0,
  });

  // Get messages
  const { data: messages = [], isLoading: messagesLoading } = useQuery<
    Message[]
  >({
    queryKey: ["messages", inquiryId],
    queryFn: async () => {
      if (!inquiryId) return [];
      const response = await fetch(`/api/inquiries/${inquiryId}/messages`);
      if (!response.ok) throw new Error("Failed to fetch messages");
      return response.json();
    },
    enabled: !!inquiryId,
  });

  // Send message
  const { mutate: sendMessage } = useMutation({
    mutationFn: async ({
      content,
      role,
    }: {
      content: string;
      role: "USER" | "ASSISTANT";
    }) => {
      if (!inquiryId) throw new Error("No active inquiry");
      const response = await fetch(`/api/inquiries/${inquiryId}/messages`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content, role }),
      });
      if (!response.ok) throw new Error("Failed to send message");
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["messages", inquiryId] });
    },
    onError: (error: Error) => {
      toast.error(error.message);
    },
  });

  // Set up SSE connection
  useEffect(() => {
    if (!inquiryId) return;

    const setupEventSource = () => {
      const eventSource = new EventSource(`/api/inquiries/${inquiryId}/stream`);

      eventSource.onmessage = (event) => {
        const { type, data } = JSON.parse(event.data);

        switch (type) {
          case "message":
            queryClient.invalidateQueries({
              queryKey: ["messages", inquiryId],
            });
            break;
          case "typing":
            const typingState = data.reduce(
              (acc: Record<string, boolean>, curr: TypingIndicator) => {
                acc[curr.role] = curr.isTyping;
                return acc;
              },
              {},
            );
            setTypingIndicators(typingState);
            break;
        }
      };

      eventSource.onerror = (error) => {
        console.error("EventSource error:", error);
        eventSource.close();
        setTimeout(setupEventSource, 5000); // Reconnect after 5 seconds
      };

      eventSourceRef.current = eventSource;
    };

    setupEventSource();

    return () => {
      eventSourceRef.current?.close();
    };
  }, [inquiryId]);

  // Handle typing indicators
  const sendTypingIndicator = async (isTyping: boolean) => {
    if (!inquiryId) return;

    try {
      await fetch(`/api/inquiries/${inquiryId}/typing`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ role: "USER", isTyping }),
      });
    } catch (error) {
      console.error("Error sending typing indicator:", error);
    }
  };

  const handleInputChange = () => {
    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
    }

    sendTypingIndicator(true);

    typingTimeoutRef.current = setTimeout(() => {
      sendTypingIndicator(false);
    }, 1000);
  };

  return {
    inquiry,
    messages,
    isLoading: inquiryLoading || messagesLoading,
    sendMessage,
    typingIndicators,
    handleInputChange,
  };
};

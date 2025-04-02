import { queryClient } from "@/lib/react-query";
import { useQuery, useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

interface Message {
  id: string;
  content: string;
  role: "USER" | "ASSISTANT" | "SYSTEM";
  createdAt: string;
  inquiryId: string;
  readAt: string | null;
}

interface SendMessageData {
  content: string;
  role: Message["role"];
}

export const useMessages = (inquiryId: string) => {
  const { data: messages = [], isLoading } = useQuery<Message[]>({
    queryKey: ["messages", inquiryId],
    queryFn: async () => {
      const response = await fetch(
        `/api/admin/inquiries/${inquiryId}/messages`,
      );
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || "Failed to fetch messages");
      }
      return response.json();
    },
  });

  const { mutate: sendMessage } = useMutation({
    mutationFn: async (data: SendMessageData) => {
      const response = await fetch(
        `/api/admin/inquiries/${inquiryId}/messages`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        },
      );

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || "Failed to send message");
      }

      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["messages", inquiryId] });
    },
    onError: (error: Error) => {
      toast.error(error.message);
    },
  });

  return {
    messages,
    isLoading,
    sendMessage,
  };
};

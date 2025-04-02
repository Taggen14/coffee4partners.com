"use client";

import { useEffect, useRef, useState } from "react";
import { useParams } from "next/navigation";
import { ArrowLeft, Loader2, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { useChat } from "@/hooks/use-chat";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";

export default function InquiryPage() {
  const router = useRouter();
  const params = useParams<{ inquiryId: string }>();
  const [newMessage, setNewMessage] = useState("");
  const [isSending, setIsSending] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const {
    inquiry,
    messages,
    isLoading,
    sendMessage,
    typingIndicators,
    handleInputChange,
  } = useChat(params.inquiryId);

  // Scroll to bottom when new messages arrive
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewMessage(e.target.value);
    handleInputChange();
  };

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim() || isSending) return;

    setIsSending(true);
    try {
      await sendMessage({ content: newMessage.trim(), role: "ASSISTANT" });
      setNewMessage("");
    } finally {
      setIsSending(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex h-[calc(100vh-4rem)] items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  if (!inquiry) {
    return (
      <div className="flex h-[calc(100vh-4rem)] items-center justify-center">
        <p className="text-muted-foreground">Inquiry not found</p>
      </div>
    );
  }

  return (
    <div className="flex h-[calc(100vh-4rem)] flex-col">
      {/* Header */}
      <div className="border-b p-4">
        <div className="flex flex-col space-y-4 sm:flex-row sm:items-center sm:justify-between sm:space-y-0">
          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => router.back()}
              className="sm:hidden"
            >
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <div>
              <h1 className="text-xl sm:text-2xl font-bold truncate">
                {inquiry.subject}
              </h1>
              <p className="text-sm text-muted-foreground truncate">
                {inquiry.customerName} ({inquiry.customerEmail})
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Badge
              variant={inquiry.status === "ACTIVE" ? "default" : "secondary"}
            >
              {inquiry.status}
            </Badge>
            <Badge variant="outline">{inquiry.type}</Badge>
          </div>
        </div>
      </div>

      {/* Messages */}
      <ScrollArea className="flex-1 p-4">
        <div className="space-y-4 max-w-3xl mx-auto">
          {messages.map((message) => (
            <div
              key={message.id}
              className={cn(
                "flex",
                message.role === "ASSISTANT" ? "justify-end" : "justify-start",
              )}
            >
              <div
                className={cn(
                  "max-w-[85%] sm:max-w-[70%] rounded-lg p-3",
                  message.role === "ASSISTANT"
                    ? "bg-primary text-primary-foreground"
                    : message.role === "SYSTEM"
                      ? "bg-muted"
                      : "bg-muted",
                )}
              >
                <p className="text-sm break-words">{message.content}</p>
                <div className="mt-1 text-[10px] opacity-70 flex items-center gap-1">
                  <span>
                    {new Date(message.createdAt).toLocaleTimeString()}
                  </span>
                  {message.role === "ASSISTANT" && message.readAt && (
                    <span className="text-blue-500">✓✓</span>
                  )}
                </div>
              </div>
            </div>
          ))}
          {typingIndicators.USER && (
            <div className="flex justify-start">
              <div className="bg-muted rounded-lg p-3">
                <div className="flex gap-1">
                  <span className="animate-bounce">.</span>
                  <span className="animate-bounce delay-100">.</span>
                  <span className="animate-bounce delay-200">.</span>
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
      </ScrollArea>

      {/* Input */}
      <Separator />
      <form onSubmit={handleSendMessage} className="p-4">
        <div className="flex gap-2 max-w-3xl mx-auto">
          <Input
            value={newMessage}
            onChange={onInputChange}
            placeholder="Type your message..."
            disabled={isSending}
            className="min-h-10"
          />
          <Button
            type="submit"
            disabled={isSending}
            size="icon"
            className="h-10 w-10"
          >
            {isSending ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Send className="h-4 w-4" />
            )}
          </Button>
        </div>
      </form>
    </div>
  );
}

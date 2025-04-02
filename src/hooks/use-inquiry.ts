import { useQuery } from "@tanstack/react-query";

interface Inquiry {
  id: string;
  customerName: string;
  customerEmail: string;
  type: "AI" | "HUMAN";
  status: "ACTIVE" | "RESOLVED" | "ARCHIVED";
  subject: string;
  lastMessage: string;
  createdAt: string;
  updatedAt: string;
}

export const useInquiry = (inquiryId: string) => {
  const { data: inquiry, isLoading } = useQuery<Inquiry>({
    queryKey: ["inquiry", inquiryId],
    queryFn: async () => {
      const response = await fetch(`/api/inquiries/${inquiryId}`);
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || "Failed to fetch inquiry");
      }
      return response.json();
    },
  });

  return {
    inquiry,
    isLoading,
  };
};

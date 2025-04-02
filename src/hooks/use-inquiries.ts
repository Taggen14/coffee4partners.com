import { Inquiry } from "@/components/inquiries-data-table";
import { useQuery } from "@tanstack/react-query";

async function getInquiries() {
  const response = await fetch("/api/inquiries");
  if (!response.ok) {
    throw new Error("Failed to fetch inquiries");
  }
  return response.json();
}

export function useInquiries() {
  const { data: inquiries, isLoading } = useQuery<Inquiry[]>({
    queryKey: ["inquiries"],
    queryFn: getInquiries,
  });

  return {
    inquiries,
    isLoading,
  };
}

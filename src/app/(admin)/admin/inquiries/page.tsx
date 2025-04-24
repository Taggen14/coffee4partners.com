"use client";

import { InquiriesDataTable } from "@/components/admin/inquiries-data-table";
import { useInquiries } from "@/hooks/use-inquiries";
import { Loader2 } from "lucide-react";

export default function InquiriesPage() {
  const { inquiries, isLoading } = useInquiries();

  if (isLoading) {
    return (
      <div className="container mx-auto py-10 flex items-center justify-center min-h-[400px]">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    );
  }

  if (!inquiries) {
    return (
      <div className="container mx-auto py-10 flex items-center justify-center min-h-[400px]">
        <p className="text-muted-foreground">No inquiries found</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-10">
      <InquiriesDataTable data={inquiries} />
    </div>
  );
}

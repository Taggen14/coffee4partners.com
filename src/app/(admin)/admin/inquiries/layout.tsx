import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Inquiries",
  description: "Manage your customer inquiries and support chats",
};

export default function InquiriesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}

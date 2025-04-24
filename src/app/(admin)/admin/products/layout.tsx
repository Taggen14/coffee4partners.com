import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Barnvagnsslotet Admin",
  description: "Manage your products",
};

export default function ProductsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}

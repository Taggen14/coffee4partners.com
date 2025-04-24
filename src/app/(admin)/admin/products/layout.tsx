import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Coffee4partners Admin",
  description: "Manage your products",
};

export default function ProductsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}

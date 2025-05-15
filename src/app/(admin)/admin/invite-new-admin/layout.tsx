import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Coffee4partners",
  description: "Manage your users on website",
};

export default function ProductsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}

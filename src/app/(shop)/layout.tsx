import type { Metadata } from "next";
import "../globals.css";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";

export const metadata: Metadata = {
  title: "Coffee4partners",
  description: "",
};

export default function ShopLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex flex-1 px-4 sm:px-8 py-2 items-center justify-center">
        {children}
      </main>
      <Footer />
    </div>
  );
}

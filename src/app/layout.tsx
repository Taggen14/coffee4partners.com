import type { Metadata } from "next";
import "./globals.css";
import { Providers } from "./providers";
import { Toaster } from "sonner";

export const metadata: Metadata = {
  title: "Coffee4partners",
  description:
    "Coffee4partners erbjuder högkvalitativa kaffe-, vatten- och varuautomater. Vi säljer påfyllnadsprodukter som kaffe och snacks samt erbjuder service och underhåll av maskinerna.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="sv">
      <body className={`antialiased relative`}>
        <Providers>
          {children}
          <Toaster />
        </Providers>
      </body>
    </html>
  );
}

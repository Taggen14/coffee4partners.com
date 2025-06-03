import type { Metadata } from "next";
import "./globals.css";
import { Providers } from "./providers";
import { Toaster } from "sonner";

export const metadata: Metadata = {
  title:
    "Kaffeautomater & Obemannade Kafélösningar för Företag | Coffee4partners",
  description:
    "Professionella kaffeautomater, vatten- och varuautomater för arbetsplatser. Smak- och driftgaranti. Branschvinnare 2024. Kontakta oss för kostnadsfritt möte!",
  keywords: [
    "kaffeautomater företag",
    "kaffemaskin kontor",
    "obemannad kafélösning",
    "kaffeautomat hyra",
    "kontorskaffemaskin",
    "varuautomat företag",
    "vattenautomat kontor",
    "kaffeservice företag",
  ],
  authors: [{ name: "Coffee4partners" }],
  creator: "Coffee4partners",
  publisher: "Coffee4partners",
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    type: "website",
    locale: "sv_SE",
    url: "https://coffee4partners.se",
    siteName: "Coffee4partners",
    title: "Kaffeautomater & Obemannade Kafélösningar för Företag",
    description:
      "Professionella kaffeautomater, vatten- och varuautomater för arbetsplatser. Smak- och driftgaranti. Branschvinnare 2024.",
    images: [
      {
        url: "/logo.png",
        width: 120,
        height: 63,
        alt: "Coffee4partners - Kaffeautomater för företag",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Kaffeautomater & Obemannade Kafélösningar för Företag",
    description:
      "Professionella kaffeautomater för arbetsplatser. Smak- och driftgaranti.",
    images: ["/logo.png"],
  },
  alternates: {
    canonical: "https://coffee4partners.se",
  },
  other: {
    "geo.region": "SE",
    "geo.placename": "Sverige",
    "og:phone_number": "010-440 63 45",
    "og:email": "info@coffee4partners.com",
  },
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

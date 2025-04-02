import { Inter } from "next/font/google";
import { cn } from "@/lib/utils";
import { ThemeProvider } from "@/components/theme-provider";
import { ShopHeader } from "@/components/shop/header";
import { ShopFooter } from "@/components/shop/footer";

const inter = Inter({ subsets: ["latin"] });

export default function ShopLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div
      className={cn(
        "min-h-screen flex flex-col bg-background",
        inter.className,
      )}
    >
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
        <ShopHeader />
        <main className="flex p-8 items-center justify-center">{children}</main>
        <ShopFooter />
      </ThemeProvider>
    </div>
  );
}

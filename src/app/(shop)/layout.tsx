import { Inter } from "next/font/google";
import { cn } from "@/lib/utils";
import { ThemeProvider } from "@/components/shop/theme-provider";
import { ShopHeader } from "@/components/shop/header";
import { ShopFooter } from "@/components/shop/footer";
import { CartProvider } from "@/components/shop/cart-provider";

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
        <CartProvider>
          {/* CartProvider reads from localstorage */}
          {" "}
          <ShopHeader />
          <main className="flex px-4 sm:px-8 py-2 items-center justify-center">{children}</main>
          <ShopFooter />
        </CartProvider>
      </ThemeProvider>
    </div>
  );
}

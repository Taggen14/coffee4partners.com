"use client";

import { useState, useEffect, useMemo } from "react";
import Image from "next/image";
import {
  ShoppingCart,
  X,
  Plus,
  Minus,
  Loader2,
  ArrowRight,
  CreditCard,
  Package,
  ShieldCheck,
  Truck,
  ShoppingBag,
} from "lucide-react";
import { formatPrice } from "@/lib/utils";
import { useCart } from "@/store/use-cart";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import Link from "next/link";

export function CartSheet() {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [isCheckingOut] = useState(false);
  const { items, removeItem, updateQuantity } = useCart();
  const [mounted, setMounted] = useState(false);

  const handleCheckout = () => {
    setIsOpen(false); // Close the cart sheet
    router.push("/shop/checkout"); // Redirect to checkout page
  };

  // Calculate cart totals using useMemo to prevent unnecessary recalculations
  const cartTotals = useMemo(() => {
    const subtotal = items.reduce((total, item) => {
      return total + item.price * item.quantity;
    }, 0);

    return {
      subtotal,
      total: subtotal, // Total without shipping since it's calculated in checkout
    };
  }, [items]); // Only recalculate when items change

  const itemCount = useMemo(() => {
    return items.reduce((acc, item) => acc + item.quantity, 0);
  }, [items]);

  // Handle hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button
          variant="outline"
          size="icon"
          className="relative rounded-full border-border/40 bg-background hover:bg-muted/50 hover:border-primary/30 transition-all duration-200 h-8 w-8 sm:h-9 sm:w-9"
        >
          <ShoppingCart className="h-[1.1rem] sm:h-[1.2rem] w-[1.1rem] sm:w-[1.2rem]" />
          <AnimatePresence>
            {itemCount > 0 && (
              <motion.span
                key={itemCount}
                initial={{ scale: 0, y: -5 }}
                animate={{
                  scale: [0, 1.2, 1],
                  y: 0,
                  transition: {
                    duration: 0.4,
                    times: [0, 0.6, 1],
                    ease: "easeOut",
                  },
                }}
                exit={{
                  scale: 0,
                  y: -5,
                  transition: {
                    duration: 0.2,
                  },
                }}
                className="absolute -right-1.5 -top-1.5 flex h-4 w-4 sm:h-5 sm:w-5 items-center justify-center rounded-full bg-primary text-[9px] sm:text-[10px] font-medium text-primary-foreground shadow-md"
              >
                {itemCount}
              </motion.span>
            )}
          </AnimatePresence>
        </Button>
      </SheetTrigger>
      <SheetContent className="flex h-full w-full flex-col p-0 pr-0 sm:max-w-md md:max-w-lg border-l shadow-2xl">
        {/* Cart Header with gradient accent */}
        <div className="h-0.5 w-full bg-gradient-to-r from-primary/40 via-primary/70 to-primary/40"></div>
        <SheetHeader className="flex-none border-b border-border/20 bg-background/95 p-4 sm:p-6 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          <div className="flex items-center justify-between mb-1.5">
            <SheetTitle className="text-xl sm:text-2xl font-bold tracking-tight flex items-center gap-2">
              <ShoppingCart className="h-4 w-4 sm:h-5 sm:w-5 text-primary" />
              <span>Din varukorg</span>
            </SheetTitle>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 rounded-full hover:bg-muted/80"
              onClick={() => setIsOpen(false)}
            >
              <X className="h-4 w-4" />
              <span className="sr-only">Stäng</span>
            </Button>
          </div>
          {items.length > 0 && (
            <p className="text-xs sm:text-sm text-muted-foreground">
              Du har {itemCount} {itemCount === 1 ? "vara" : "varor"} i din
              varukorg
            </p>
          )}
        </SheetHeader>

        {items.length > 0 ? (
          <>
            <div className="flex-1 overflow-auto px-4 sm:px-6 py-2">
              <div className="space-y-4 sm:space-y-5 py-3 sm:py-4">
                <AnimatePresence initial={false}>
                  {items.map((item) => (
                    <motion.div
                      key={item.id}
                      layout
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{
                        opacity: 0,
                        y: -20,
                        transition: { duration: 0.2, ease: "easeInOut" },
                      }}
                      transition={{ duration: 0.3, ease: "easeOut" }}
                      className="group relative flex items-center gap-3 sm:gap-4 rounded-xl border border-border/40 bg-background p-3 sm:p-4 transition-all hover:border-primary/30 hover:shadow-md"
                    >
                      <div className="relative aspect-square h-16 w-16 sm:h-20 sm:w-20 overflow-hidden rounded-lg bg-muted/50">
                        <Image
                          src={item.image}
                          alt={item.name}
                          fill
                          className="object-contain p-2 transition-transform group-hover:scale-105"
                          sizes="(max-width: 640px) 64px, 80px"
                        />
                      </div>
                      <div className="flex flex-1 flex-col gap-1 sm:gap-1.5 pr-6 sm:pr-8">
                        <h3 className="text-sm sm:text-base font-medium leading-tight line-clamp-2 group-hover:text-primary transition-colors">
                          {item.name}
                        </h3>
                        <p className="text-xs sm:text-sm text-muted-foreground">
                          {formatPrice(item.price)} per st
                        </p>
                        <div className="flex items-center gap-3 sm:gap-4 mt-1">
                          <div className="flex items-center gap-1 rounded-full border border-border/60 bg-background shadow-sm">
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-6 w-6 sm:h-7 sm:w-7 rounded-full hover:bg-muted"
                              onClick={() =>
                                updateQuantity(
                                  item.id,
                                  Math.max(0, item.quantity - 1),
                                )
                              }
                              disabled={item.quantity <= 1}
                            >
                              <Minus className="h-2.5 w-2.5 sm:h-3 sm:w-3" />
                              <span className="sr-only">Minska antal</span>
                            </Button>
                            <span className="w-5 sm:w-6 text-center text-xs sm:text-sm font-medium">
                              {item.quantity}
                            </span>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-6 w-6 sm:h-7 sm:w-7 rounded-full hover:bg-muted"
                              onClick={() =>
                                updateQuantity(item.id, item.quantity + 1)
                              }
                            >
                              <Plus className="h-2.5 w-2.5 sm:h-3 sm:w-3" />
                              <span className="sr-only">Öka antal</span>
                            </Button>
                          </div>
                          <p className="text-xs sm:text-sm font-semibold ml-auto">
                            {formatPrice(item.price * item.quantity)}
                          </p>
                        </div>
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="absolute right-1 top-1 sm:right-2 sm:top-2 h-6 w-6 sm:h-7 sm:w-7 rounded-full hover:bg-destructive/10 hover:text-destructive transition-colors"
                        onClick={() => removeItem(item.id)}
                      >
                        <X className="h-3 w-3 sm:h-4 sm:w-4" />
                        <span className="sr-only">Ta bort vara</span>
                      </Button>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            </div>

            {/* Order summary with gradient separator */}
            <div className="mt-auto flex-none space-y-3 sm:space-y-4 border-t border-border/20 bg-muted/20 p-4 sm:p-6 backdrop-blur supports-[backdrop-filter]:bg-background/5">
              <div className="rounded-xl border border-border/30 bg-background p-3 sm:p-4 shadow-sm">
                <div className="space-y-2 sm:space-y-3">
                  <div className="flex items-center justify-between text-xs sm:text-sm">
                    <span className="text-muted-foreground">Delsumma</span>
                    <span className="font-medium">
                      {formatPrice(cartTotals.subtotal)}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-xs sm:text-sm">
                    <span className="text-muted-foreground">Frakt</span>
                    <span className="text-xs sm:text-sm text-muted-foreground">
                      Beräknas i kassan
                    </span>
                  </div>

                  <div className="w-full h-[1px] bg-gradient-to-r from-border/0 via-border/60 to-border/0 my-2 sm:my-3"></div>

                  <div className="flex items-center justify-between text-sm sm:text-base font-semibold">
                    <span>Totalt</span>
                    <div className="flex flex-col items-end">
                      <span className="text-primary font-bold">
                        {formatPrice(cartTotals.total)}
                      </span>
                      <span className="text-[10px] sm:text-xs text-muted-foreground">
                        exkl. frakt
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Features/Benefits */}
              <div className="grid grid-cols-2 gap-1.5 sm:gap-2 mt-2 sm:mt-3 mb-3 sm:mb-4">
                <div className="flex items-center gap-1 sm:gap-1.5 text-[10px] sm:text-xs text-muted-foreground">
                  <Truck className="h-2.5 w-2.5 sm:h-3 sm:w-3 text-primary" />
                  <span>Snabb leverans</span>
                </div>
                <div className="flex items-center gap-1 sm:gap-1.5 text-[10px] sm:text-xs text-muted-foreground">
                  <CreditCard className="h-2.5 w-2.5 sm:h-3 sm:w-3 text-primary" />
                  <span>Säker betalning</span>
                </div>
                <div className="flex items-center gap-1 sm:gap-1.5 text-[10px] sm:text-xs text-muted-foreground">
                  <ShieldCheck className="h-2.5 w-2.5 sm:h-3 sm:w-3 text-primary" />
                  <span>Trygg e-handel</span>
                </div>
                <div className="flex items-center gap-1 sm:gap-1.5 text-[10px] sm:text-xs text-muted-foreground">
                  <Package className="h-2.5 w-2.5 sm:h-3 sm:w-3 text-primary" />
                  <span>14 dagars ångerrätt</span>
                </div>
              </div>

              <div className="w-full flex flex-col sm:flex-row gap-2 sm:gap-3">
                <Button
                  variant="outline"
                  asChild
                  className="w-full h-9 sm:h-10 text-xs sm:text-sm border-border/40 hover:bg-primary/5 hover:border-primary/30 transition-all duration-200"
                >
                  <Link href="/shop/cart">
                    <ShoppingBag className="mr-1.5 sm:mr-2 h-3.5 w-3.5 sm:h-4 sm:w-4" />
                    Visa varukorg
                  </Link>
                </Button>

                <Button
                  variant="outline"
                  className="w-full h-9 sm:h-10 text-xs sm:text-sm border-border/40 bg-foreground text-background hover:bg-foreground/90 hover:text-background transition-all duration-200"
                  onClick={handleCheckout}
                  disabled={isCheckingOut || items.length === 0}
                >
                  {isCheckingOut ? (
                    <>
                      <Loader2 className="h-3.5 w-3.5 sm:h-4 sm:w-4 animate-spin" />
                      Bearbetar...
                    </>
                  ) : (
                    <>
                      Till kassan
                      <ArrowRight className="ml-1.5 sm:ml-2 h-3.5 w-3.5 sm:h-4 sm:w-4" />
                    </>
                  )}
                </Button>
              </div>
            </div>
          </>
        ) : (
          <div className="flex flex-1 flex-col items-center justify-center space-y-3 sm:space-y-4 p-4 sm:p-6">
            <div className="relative mb-2 sm:mb-3 h-24 sm:h-28 w-24 sm:w-28 rounded-full bg-muted/30 flex items-center justify-center">
              <ShoppingCart className="h-12 sm:h-14 w-12 sm:w-14 text-muted-foreground/60 stroke-[1.25px]" />
            </div>
            <h3 className="text-lg sm:text-xl font-semibold tracking-tight">
              Din varukorg är tom
            </h3>
            <p className="text-center text-xs sm:text-sm text-muted-foreground max-w-[18rem] sm:max-w-[20rem]">
              Det verkar som att du inte har lagt till några produkter i din
              varukorg än.
            </p>
            <Button
              variant="outline"
              className="mt-4 sm:mt-6 rounded-full px-4 sm:px-6 h-9 sm:h-10 text-xs sm:text-sm border-primary/30 hover:bg-primary/10 hover:text-primary transition-all duration-200"
              onClick={() => setIsOpen(false)}
            >
              Fortsätt handla
            </Button>

            {/* Shopping benefits */}
            <div className="w-full max-w-xs mt-6 sm:mt-8">
              <div className="w-full h-[1px] bg-gradient-to-r from-border/0 via-border/60 to-border/0 mb-4 sm:mb-6"></div>
              <div className="grid grid-cols-2 gap-2 sm:gap-3">
                <div className="flex flex-col items-center gap-1.5 sm:gap-2 p-2 sm:p-3 rounded-lg bg-muted/30 text-center">
                  <Truck className="h-4 sm:h-5 w-4 sm:w-5 text-primary" />
                  <span className="text-[10px] sm:text-xs font-medium">
                    Snabb leverans
                  </span>
                </div>
                <div className="flex flex-col items-center gap-1.5 sm:gap-2 p-2 sm:p-3 rounded-lg bg-muted/30 text-center">
                  <ShieldCheck className="h-4 sm:h-5 w-4 sm:w-5 text-primary" />
                  <span className="text-[10px] sm:text-xs font-medium">
                    Säker betalning
                  </span>
                </div>
                <div className="flex flex-col items-center gap-1.5 sm:gap-2 p-2 sm:p-3 rounded-lg bg-muted/30 text-center">
                  <CreditCard className="h-4 sm:h-5 w-4 sm:w-5 text-primary" />
                  <span className="text-[10px] sm:text-xs font-medium">
                    Flera betalsätt
                  </span>
                </div>
                <div className="flex flex-col items-center gap-1.5 sm:gap-2 p-2 sm:p-3 rounded-lg bg-muted/30 text-center">
                  <Package className="h-4 sm:h-5 w-4 sm:w-5 text-primary" />
                  <span className="text-[10px] sm:text-xs font-medium">
                    14 dagars ångerrätt
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
}

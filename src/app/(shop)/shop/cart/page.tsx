"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { useCart } from "@/store/use-cart";
import { formatPrice } from "@/lib/utils";
import { cn } from "@/lib/utils";
import {
  ShoppingBag,
  ArrowLeft,
  Plus,
  Minus,
  X,
  ArrowRight,
  Truck,
  Package,
  CreditCard,
  ShieldCheck,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";

export default function CartPage() {
  const { items, removeItem, updateQuantity } = useCart();
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const [pageLoaded, setPageLoaded] = useState(false);

  useEffect(() => {
    setMounted(true);

    // Add a slight delay to make the page transition smoother
    const timer = setTimeout(() => {
      setPageLoaded(true);
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  // Calculate cart totals
  const subtotal = items.reduce(
    (total, item) => total + item.price * item.quantity,
    0,
  );

  const handleCheckout = () => {
    router.push("/shop/checkout");
  };

  // If not client-side yet, don't show anything to prevent hydration errors
  if (!mounted) return null;

  // If cart is empty, show empty state
  if (items.length === 0) {
    return (
      <div
        className={cn(
          "min-h-[calc(100vh-4rem)] bg-gradient-to-b from-background via-background/98 to-background/95",
          "transition-opacity duration-500 px-4",
          pageLoaded ? "opacity-100" : "opacity-0",
        )}
      >
        <div className="container max-w-6xl py-8 sm:py-12">
          <Button
            variant="outline"
            size="sm"
            asChild
            className="mb-6 sm:mb-10 rounded-full border-border/60 hover:bg-muted/50 shadow-sm hover:shadow-md transition-all duration-200"
          >
            <Link href="/shop">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Tillbaka till butiken
            </Link>
          </Button>

          <div className="flex flex-col items-center justify-center text-center py-10 sm:py-16">
            <div className="relative mb-5 sm:mb-6 h-24 sm:h-32 w-24 sm:w-32 rounded-full bg-muted/30 flex items-center justify-center">
              <ShoppingBag className="h-12 sm:h-16 w-12 sm:w-16 text-muted-foreground/60 stroke-[1.25px]" />
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight mb-2 sm:mb-3">
              Din varukorg är tom
            </h1>
            <p className="text-sm sm:text-base text-muted-foreground mb-6 sm:mb-8 max-w-md">
              Det verkar som att du inte har lagt till några produkter i din
              varukorg än. Utforska vårt sortiment för att hitta något som
              passar dig.
            </p>
            <Button
              size="lg"
              className="rounded-lg bg-primary hover:bg-primary/90 shadow-md hover:shadow-lg transition-all duration-200"
              asChild
            >
              <Link href="/shop">
                <ShoppingBag className="mr-2 h-5 w-5" />
                Börja handla
              </Link>
            </Button>

            {/* Shopping benefits */}
            <div className="w-full max-w-md mx-auto mt-12 sm:mt-20">
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
        </div>
      </div>
    );
  }

  return (
    <div
      className={cn(
        "min-h-screen bg-gradient-to-b from-background via-background/98 to-background/95",
        "transition-opacity duration-500",
        pageLoaded ? "opacity-100" : "opacity-0",
      )}
    >
      <div className="container max-w-6xl py-8 sm:py-12 px-4 sm:px-6">
        {/* Back button and title */}
        <div className="mb-8 sm:mb-12">
          <Button
            variant="outline"
            size="sm"
            asChild
            className="mb-4 sm:mb-6 rounded-full border-border/60 hover:bg-muted/50 shadow-sm hover:shadow-md transition-all duration-200"
          >
            <Link href="/shop">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Tillbaka till butiken
            </Link>
          </Button>

          <div className="flex flex-col items-center sm:items-start text-center sm:text-left">
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight mb-3">
              Din varukorg
            </h1>
            <div className="h-1 w-20 bg-gradient-to-r from-primary/40 via-primary/80 to-primary/40 rounded-full mb-3"></div>
            <p className="text-sm sm:text-base text-muted-foreground">
              Granska din order och fortsätt till kassan
            </p>
          </div>
        </div>

        <div className="grid gap-6 sm:gap-8 lg:grid-cols-3">
          {/* Cart Items - 2/3 width on desktop */}
          <div className="lg:col-span-2 space-y-4 sm:space-y-6">
            <Card className="border-border/40 shadow-md rounded-xl overflow-hidden">
              <div className="h-1 w-full bg-gradient-to-r from-primary/40 via-primary/60 to-primary/40"></div>
              <CardHeader className="border-b border-border/20 bg-muted/30 p-3 sm:p-4">
                <CardTitle className="flex items-center gap-2 text-base sm:text-lg">
                  <ShoppingBag className="h-4 w-4 sm:h-5 sm:w-5 text-primary" />
                  Varor i varukorgen ({items.length})
                </CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <div className="divide-y divide-border/30">
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
                        className="group p-3 sm:p-6 flex flex-col sm:flex-row items-start gap-4 sm:gap-6 hover:bg-muted/20 transition-colors"
                      >
                        {/* Product Image */}
                        <div className="relative aspect-square h-20 w-20 sm:h-24 sm:w-24 md:h-28 md:w-28 overflow-hidden rounded-lg border border-border/40 bg-muted/30 shrink-0 mx-auto sm:mx-0">
                          <Image
                            src={item.image}
                            alt={item.name}
                            fill
                            className="object-contain p-2 transition-transform group-hover:scale-105"
                            sizes="(max-width: 640px) 80px, (max-width: 768px) 96px, 112px"
                          />
                        </div>

                        {/* Product Details */}
                        <div className="flex-1 flex flex-col w-full">
                          <div className="flex justify-between items-start gap-3 sm:gap-4">
                            <h3 className="text-base sm:text-lg font-medium leading-tight group-hover:text-primary transition-colors">
                              {item.name}
                            </h3>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-7 w-7 sm:h-8 sm:w-8 rounded-full hover:bg-destructive/10 hover:text-destructive transition-colors -mt-1 -mr-1"
                              onClick={() => removeItem(item.id)}
                            >
                              <X className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                              <span className="sr-only">Ta bort vara</span>
                            </Button>
                          </div>

                          <p className="text-xs sm:text-sm text-muted-foreground mt-1">
                            {formatPrice(item.price)} per st
                          </p>

                          <div className="flex flex-wrap items-center justify-between gap-3 sm:gap-4 mt-3 sm:mt-4">
                            {/* Quantity Selector */}
                            <div className="flex items-center gap-1 sm:gap-2 rounded-full border border-border/60 bg-background shadow-sm">
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-7 w-7 sm:h-8 sm:w-8 rounded-full hover:bg-muted"
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
                              <span className="w-6 sm:w-8 text-center text-xs sm:text-sm font-medium">
                                {item.quantity}
                              </span>
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-7 w-7 sm:h-8 sm:w-8 rounded-full hover:bg-muted"
                                onClick={() =>
                                  updateQuantity(item.id, item.quantity + 1)
                                }
                              >
                                <Plus className="h-2.5 w-2.5 sm:h-3 sm:w-3" />
                                <span className="sr-only">Öka antal</span>
                              </Button>
                            </div>

                            {/* Item Total */}
                            <div className="ml-auto">
                              <p className="text-sm sm:text-base font-semibold text-right">
                                {formatPrice(item.price * item.quantity)}
                              </p>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Order Summary - 1/3 width on desktop, sticky */}
          <div className="lg:sticky lg:top-24 lg:self-start">
            <Card className="border-border/40 shadow-md rounded-xl overflow-hidden">
              <div className="h-1 w-full bg-gradient-to-r from-primary/40 via-primary/60 to-primary/40"></div>
              <CardHeader className="border-b border-border/20 bg-muted/30 p-3 sm:p-4">
                <CardTitle className="flex items-center gap-2 text-base sm:text-lg">
                  <CreditCard className="h-4 w-4 sm:h-5 sm:w-5 text-primary" />
                  Sammanfattning
                </CardTitle>
              </CardHeader>
              <CardContent className="p-4 sm:p-6 space-y-4 sm:space-y-5">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm sm:text-base text-muted-foreground">
                      Delsumma
                    </span>
                    <span className="text-sm sm:text-base font-medium">
                      {formatPrice(subtotal)}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm sm:text-base text-muted-foreground">
                      Frakt
                    </span>
                    <span className="text-xs sm:text-sm text-muted-foreground">
                      Beräknas i kassan
                    </span>
                  </div>

                  <div className="w-full h-[1px] bg-gradient-to-r from-border/0 via-border/60 to-border/0 my-3 sm:my-4"></div>

                  <div className="flex items-center justify-between">
                    <span className="text-base sm:text-lg font-semibold">
                      Totalt
                    </span>
                    <div className="flex flex-col items-end">
                      <span className="text-lg sm:text-xl font-bold text-primary">
                        {formatPrice(subtotal)}
                      </span>
                      <span className="text-[10px] sm:text-xs text-muted-foreground">
                        exkl. frakt
                      </span>
                    </div>
                  </div>
                </div>

                <div className="pt-1 sm:pt-2">
                  <Button
                    variant="outline"
                    className="w-full h-9 sm:h-10 text-sm sm:text-base border-border/40 bg-foreground text-background hover:bg-foreground/90 hover:text-background transition-all duration-200"
                    onClick={handleCheckout}
                  >
                    Till kassan
                    <ArrowRight className="ml-2 h-3.5 w-3.5 sm:h-4 sm:w-4" />
                  </Button>
                </div>

                {/* Benefits banner */}
                <div className="bg-muted/30 rounded-lg p-2 sm:p-3 flex flex-col gap-1.5 sm:gap-2">
                  <div className="flex items-center gap-1.5 sm:gap-2">
                    <Truck className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-primary" />
                    <span className="text-[10px] sm:text-xs text-muted-foreground">
                      Snabb leverans
                    </span>
                  </div>
                  {/* <div className="flex items-center gap-1.5 sm:gap-2">
                    <Package className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-primary" />
                    <span className="text-[10px] sm:text-xs text-muted-foreground">
                      Leverans inom 1-3 arbetsdagar
                    </span>
                  </div> */}
                  <div className="flex items-center gap-1.5 sm:gap-2">
                    <ShieldCheck className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-primary" />
                    <span className="text-[10px] sm:text-xs text-muted-foreground">
                      14 dagars ångerrätt
                    </span>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="bg-muted/30 px-4 sm:px-6 py-3 sm:py-4 border-t border-border/20">
                <Button
                  variant="outline"
                  asChild
                  className="w-full h-9 sm:h-10 text-sm sm:text-base border-border/40 hover:bg-primary/5 hover:border-primary/30 transition-all duration-200"
                >
                  <Link href="/shop">
                    <ArrowLeft className="mr-1.5 sm:mr-2 h-3.5 w-3.5 sm:h-4 sm:w-4" />
                    Fortsätt handla
                  </Link>
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}

"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useCart } from "@/store/use-cart";
import {
  Check,
  AlertCircle,
  XCircle,
  Download,
  Loader2,
  CreditCard,
  ShieldCheck,
  Package,
  Truck,
  ArrowLeft,
  ShoppingBag,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { AddressForm } from "@/components/shop/address-form";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import Image from "next/image";
import { formatPrice } from "@/lib/utils";
import { calculateShippingCost } from "@/lib/shipping";
import { toast } from "sonner";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { cn } from "@/lib/utils";
import Link from "next/link";

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image?: string;
}

interface AddressFormData {
  shipping: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    street: string;
    postalCode: string;
    city: string;
  };
  useSameAddress: boolean;
  shippingCost?: number;
  billing?: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    street: string;
    postalCode: string;
    city: string;
  };
}

export default function CheckoutPage() {
  const { items, clearCart } = useCart();
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderComplete, setOrderComplete] = useState(false);
  const [orderNumber, setOrderNumber] = useState<string | null>(null);
  const [isCalculatingShipping, setIsCalculatingShipping] = useState(false);
  const [shippingCost, setShippingCost] = useState<number | null>(null);
  const [shippingZone, setShippingZone] = useState<string | null>(null);
  const [shippingError, setShippingError] = useState<string | null>(null);
  const [orderError, setOrderError] = useState<string | null>(null);
  const [isDownloading, setIsDownloading] = useState(false);
  const [pdfBuffer, setPdfBuffer] = useState<string | null>(null);
  const [pageLoaded, setPageLoaded] = useState(false);

  useEffect(() => {
    setPageLoaded(true);

    if (items.length === 0 && !orderComplete) {
      router.push("/shop");
    }
  }, [items, router, orderComplete]);

  const handleShippingCalculation = async (postalCode: string) => {
    if (postalCode.length === 5) {
      setIsCalculatingShipping(true);
      setShippingError(null);
      try {
        // Simulate network delay for better UX
        await new Promise((resolve) => setTimeout(resolve, 300));
        const result = calculateShippingCost(postalCode);

        if (result.error) {
          setShippingError(result.error);
          setShippingCost(null);
          setShippingZone(null);
        } else {
          setShippingCost(result.cost);
          setShippingZone(result.zoneName);
        }
      } catch (error: unknown) {
        console.error((error as Error).message);
        setShippingError("Could not calculate shipping cost");
        setShippingCost(null);
        setShippingZone(null);
      } finally {
        setIsCalculatingShipping(false);
      }
    } else {
      setShippingCost(null);
      setShippingZone(null);
      setShippingError(null);
    }
  };

  const handleAddressSubmit = async (data: AddressFormData) => {
    try {
      setIsSubmitting(true);
      setOrderError(null); // Clear any previous errors

      // Calculate items with totals
      const itemsWithTotals = items.map((item: CartItem) => ({
        ...item,
        total: item.quantity * item.price,
        taxAmount: item.quantity * item.price * 0.25, // 25% VAT
      }));

      // Generate order number
      const orderNumber = `ORD-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;

      // Create invoice data
      const invoiceData = {
        customer: {
          name: `${data.shipping.firstName} ${data.shipping.lastName}`,
          email: data.shipping.email,
          address: data.shipping.street,
          postalCode: data.shipping.postalCode,
          city: data.shipping.city,
          country: "Sverige",
        },
        items: itemsWithTotals.map(
          (item: CartItem & { total: number; taxAmount: number }) => ({
            name: item.name,
            quantity: item.quantity,
            unitPrice: item.price,
            taxAmount: item.taxAmount,
          }),
        ),
        shipping: {
          // cost: shippingCost,
          // zone: shippingZone,
        },
        company: {
          name: "Coffee4partners",
          address: "adress???",
          postalCode: "123 45",
          city: "Stockholm",
          country: "Sverige",
          vatNumber: "",
          phone: "010-440 63 45",
          email: "info@coffee4partner.se",
        },
        date: {
          createdAt: new Date().toLocaleDateString("sv-SE")
        }
      };

      // Generate and send invoice
      const response = await fetch("/api/invoices/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          invoiceData,
          orderNumber,
          customerEmail: data.shipping.email,
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        console.error("API Error Response:", result);
        throw new Error(result.error || "Ett fel uppstod vid beställningen");
      }

      // Store the PDF buffer if available
      if (result.pdfBuffer) {
        setPdfBuffer(result.pdfBuffer);
      }

      // Clear cart and show success message
      clearCart();
      setOrderComplete(true);
      setOrderNumber(orderNumber);
      toast.success(
        "Din beställning har lagts! En faktura har skickats till din e-post.",
      );
    } catch (error) {
      console.error("Error processing order:", error);

      // Create error message with additional details for admins in development mode
      let errorMessage = "";
      let developerInfo = "";

      if (error instanceof Error) {
        if (error.message.includes("Saknar nödvändig information")) {
          errorMessage =
            "Det saknas information för att skapa din beställning. Vänligen kontrollera dina uppgifter.";
        } else if (error.message.includes("e-postservern")) {
          errorMessage =
            "Vi har problem med att skicka din faktura. Kontakta vår kundtjänst på support@coffee4partners.se eller ring 0123-456789 så hjälper vi dig med din order.";
        } else if (error.message.includes("ansluta")) {
          errorMessage =
            "Vi har problem med att skicka din faktura. Kontakta vår kundtjänst på support@coffee4partners.se eller ring 0123-456789 så hjälper vi dig med din order.";
        } else {
          errorMessage =
            "Ett oväntat fel uppstod. Vänligen försök igen eller kontakta vår kundtjänst på support@coffee4partners.se om problemet kvarstår.";
        }

        // Add technical details for developers in development mode
        if (process.env.NODE_ENV === "development") {
          developerInfo = `
            <div class="mt-4 p-3 bg-muted text-xs font-mono rounded">
              <p class="font-semibold mb-1">Developer Info (only visible in development):</p>
              <p>${error.name}: ${error.message}</p>
              ${error.stack ? `<p class="mt-2">${error.stack.split("\n").slice(0, 3).join("<br/>")}</p>` : ""}
            </div>
          `;
        }

        // Also show a toast for immediate feedback
        toast.error("Det uppstod ett problem med din beställning");
      } else {
        errorMessage =
          "Ett oväntat fel uppstod. Vänligen försök igen eller kontakta vår kundtjänst på support@coffee4partners.se om problemet kvarstår.";
        toast.error("Det uppstod ett problem med din beställning");
      }

      setOrderError(errorMessage);

      // For development mode, append developer info to error message
      if (developerInfo && process.env.NODE_ENV === "development") {
        document
          .getElementById("error-details")
          ?.insertAdjacentHTML("beforeend", developerInfo);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDownloadInvoice = async () => {
    try {
      setIsDownloading(true);

      if (!pdfBuffer) {
        throw new Error("No invoice available for download");
      }

      // Convert base64 string back to Blob
      const binaryString = atob(pdfBuffer);
      const bytes = new Uint8Array(binaryString.length);
      for (let i = 0; i < binaryString.length; i++) {
        bytes[i] = binaryString.charCodeAt(i);
      }
      const blob = new Blob([bytes], { type: "application/pdf" });

      // Create download link and trigger download
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `Faktura-${orderNumber}.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);

      toast.success("Faktura har laddats ner");
    } catch (error) {
      console.error("Error downloading invoice:", error);
      toast.error("Det uppstod ett problem med att ladda ner faktura");
    } finally {
      setIsDownloading(false);
    }
  };

  if (items.length === 0 && !orderComplete) {
    return null;
  }

  if (orderComplete) {
    return (
      <div
        className={cn(
          "min-h-[calc(100vh-4rem)] bg-gradient-to-b from-background via-background/95 to-background",
          "flex flex-col items-center justify-center py-16 px-4",
          "transition-opacity duration-500",
          pageLoaded ? "opacity-100" : "opacity-0",
        )}
      >
        <div className="w-full max-w-md text-center">
          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-primary/10 mb-8 shadow-md shadow-primary/5">
            <Check className="h-10 w-10 text-primary" />
          </div>
          <h1 className="text-3xl font-bold tracking-tight mb-3">
            Tack för din beställning!
          </h1>
          <p className="text-muted-foreground mb-8 max-w-sm mx-auto">
            Vi har skickat en orderbekräftelse och faktura till din
            e-postadress.
          </p>

          <div className="bg-gradient-to-r from-muted/50 via-muted to-muted/50 p-6 rounded-xl mb-10 shadow-sm">
            <p className="text-sm text-muted-foreground mb-1">
              Ditt ordernummer
            </p>
            <p className="text-xl font-bold font-mono">{orderNumber}</p>
          </div>

          <div className="grid gap-5 max-w-xs mx-auto">
            <Button
              onClick={() => router.push("/shop")}
              className="w-full h-12 bg-primary hover:bg-primary/90 shadow-md hover:shadow-lg transition-all duration-200"
            >
              <ShoppingBag className="mr-2 h-4 w-4" />
              Fortsätt handla
            </Button>

            <Button
              variant="outline"
              onClick={handleDownloadInvoice}
              disabled={isDownloading || !pdfBuffer}
              className="w-full h-12 border-primary/20 hover:bg-primary/5 hover:border-primary/30 transition-all duration-200"
            >
              {isDownloading ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <Download className="mr-2 h-4 w-4" />
              )}
              Ladda ner faktura
            </Button>
          </div>

          {/* Shopping benefits */}
          <div className="w-full max-w-sm mx-auto mt-16">
            <div className="w-full h-[1px] bg-gradient-to-r from-border/0 via-border/60 to-border/0 mb-6"></div>
            <div className="grid grid-cols-2 gap-3">
              <div className="flex flex-col items-center gap-2 p-3 rounded-lg bg-muted/30 text-center">
                <Truck className="h-5 w-5 text-primary" />
                <span className="text-xs font-medium">Snabb leverans</span>
              </div>
              <div className="flex flex-col items-center gap-2 p-3 rounded-lg bg-muted/30 text-center">
                <ShieldCheck className="h-5 w-5 text-primary" />
                <span className="text-xs font-medium">Säker betalning</span>
              </div>
              <div className="flex flex-col items-center gap-2 p-3 rounded-lg bg-muted/30 text-center">
                <CreditCard className="h-5 w-5 text-primary" />
                <span className="text-xs font-medium">Flera betalsätt</span>
              </div>
              <div className="flex flex-col items-center gap-2 p-3 rounded-lg bg-muted/30 text-center">
                <Package className="h-5 w-5 text-primary" />
                <span className="text-xs font-medium">14 dagars ångerrätt</span>
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
        {/* Back link and title */}
        <div className="mb-8 sm:mb-12">
          <Button
            variant="outline"
            size="sm"
            asChild
            className="mb-4 sm:mb-6 rounded-full border-border/60 hover:bg-muted/50 shadow-sm hover:shadow-md transition-all duration-200"
          >
            <Link href="/shop/cart">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Tillbaka till varukorgen
            </Link>
          </Button>

          <div className="flex flex-col items-center sm:items-start text-center sm:text-left">
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight mb-3">
              Kassa
            </h1>
            <div className="h-1 w-20 bg-gradient-to-r from-primary/40 via-primary/80 to-primary/40 rounded-full mb-3"></div>
            <p className="text-sm sm:text-base text-muted-foreground max-w-xl">
              Vänligen fyll i dina uppgifter för att slutföra din beställning
            </p>
          </div>
        </div>

        {orderError && (
          <Alert
            variant="destructive"
            className="mb-6 sm:mb-8 rounded-xl shadow-md border border-destructive/20"
          >
            <AlertCircle className="h-5 w-5 text-destructive" />
            <AlertTitle className="text-base sm:text-lg font-semibold mb-1">
              Ett fel uppstod
            </AlertTitle>
            <AlertDescription id="error-details" className="text-xs sm:text-sm">
              {orderError}
            </AlertDescription>
            <Button
              variant="outline"
              size="sm"
              className="mt-3 border-destructive/30 hover:bg-destructive/10 rounded-lg"
              onClick={() => setOrderError(null)}
            >
              <XCircle className="h-4 w-4 mr-2" />
              Stäng
            </Button>
          </Alert>
        )}

        <div className="grid gap-6 sm:gap-8 lg:grid-cols-2 lg:gap-12">
          {/* Address Form - Comes first on mobile */}
          <div className="order-1 lg:order-2">
            <Card className="border-border/40 shadow-md rounded-xl overflow-hidden">
              <div className="h-1 w-full bg-gradient-to-r from-primary/40 via-primary/60 to-primary/40"></div>
              <CardHeader className="border-b border-border/20 bg-muted/30 p-4 sm:p-6">
                <CardTitle className="flex items-center gap-2 text-lg sm:text-xl">
                  <Package className="h-4 w-4 sm:h-5 sm:w-5 text-primary" />
                  Leveransinformation
                </CardTitle>
                <CardDescription className="text-xs sm:text-sm">
                  Fyll i dina uppgifter för att slutföra din beställning
                </CardDescription>
              </CardHeader>
              <CardContent className="p-4 sm:p-6">
                <AddressForm
                  onSubmit={handleAddressSubmit}
                  cartTotal={items.reduce(
                    (acc, item) => acc + item.price * item.quantity,
                    0,
                  )}
                  onPostalCodeChange={handleShippingCalculation}
                  isCalculatingShipping={isCalculatingShipping}
                  shippingCost={shippingCost}
                  isSubmitting={isSubmitting}
                  submitButtonText="Lägg beställning"
                  submitButtonDescription="Vi skickar en faktura till din e-postadress som du kan betala inom 30 dagar"
                />
              </CardContent>
            </Card>
          </div>

          {/* Order Summary - Comes second on mobile */}
          <div className="space-y-6 lg:sticky lg:top-24 lg:self-start order-2 lg:order-1">
            <Card className="border-border/40 shadow-md rounded-xl overflow-hidden">
              <div className="h-1 w-full bg-gradient-to-r from-primary/40 via-primary/60 to-primary/40"></div>
              <CardHeader className="border-b border-border/20 bg-muted/30 p-4 sm:p-6">
                <CardTitle className="flex items-center gap-2 text-lg sm:text-xl">
                  <ShoppingBag className="h-4 w-4 sm:h-5 sm:w-5 text-primary" />
                  Din beställning
                </CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <div className="p-4 sm:p-6 space-y-4 sm:space-y-5">
                  {items.map((item) => (
                    <div
                      key={item.id}
                      className="flex items-start justify-between gap-3 sm:gap-4 pb-3 sm:pb-4 group hover:bg-muted/20 p-2 rounded-lg transition-colors"
                    >
                      <div className="flex items-start gap-3 sm:gap-4">
                        <div className="relative h-14 w-14 sm:h-16 sm:w-16 overflow-hidden rounded-lg border border-border/40 bg-muted/30 shrink-0">
                          <Image
                            src={item.image}
                            alt={item.name}
                            fill
                            className="object-contain p-1 transition-transform group-hover:scale-105"
                            sizes="(max-width: 640px) 56px, 64px"
                          />
                        </div>
                        <div>
                          <p className="text-sm sm:text-base font-medium leading-tight group-hover:text-primary transition-colors">
                            {item.name}
                          </p>
                          <div className="flex items-center gap-2 mt-1">
                            <p className="text-xs sm:text-sm text-muted-foreground">
                              {item.quantity} st
                            </p>
                            <span className="text-xs text-muted-foreground">
                              •
                            </span>
                            <p className="text-xs sm:text-sm text-muted-foreground">
                              {formatPrice(item.price)} / st
                            </p>
                          </div>
                        </div>
                      </div>
                      <p className="text-sm sm:text-base font-medium text-right">
                        {formatPrice(item.price * item.quantity)}
                      </p>
                    </div>
                  ))}

                  {/*        
                  <div className="w-full h-[1px] bg-gradient-to-r from-border/0 via-border/60 to-border/0 my-3 sm:my-4"></div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm sm:text-base text-muted-foreground">
                      Delsumma
                    </span>
                    <span className="text-sm sm:text-base font-medium">
                      {formatPrice(
                        items.reduce(
                          (acc, item) => acc + item.price * item.quantity,
                          0,
                        ),
                      )}
                    </span>
                  </div> */}
                  {/* <div className="flex items-center justify-between">
                    <span className="text-sm sm:text-base text-muted-foreground">
                      Frakt
                    </span>
                    <div className="text-right">
                      {isCalculatingShipping ? (
                        <div className="flex items-center gap-2">
                          <Loader2 className="h-3 w-3 animate-spin text-primary" />
                          <span className="text-xs sm:text-sm text-muted-foreground">
                            Beräknar...
                          </span>
                        </div>
                      ) : shippingCost ? (
                        <div>
                          <div className="text-sm sm:text-base font-medium text-primary">
                            {formatPrice(shippingCost / 100)}
                          </div>
                          <div className="text-[10px] sm:text-xs text-muted-foreground">
                            {shippingZone}
                          </div>
                        </div>
                      ) : (
                        <span className="text-xs sm:text-sm text-muted-foreground">
                          {shippingError || "Ange postnummer"}
                        </span>
                      )}
                    </div>
                  </div> */}

                  <div className="w-full h-[1px] bg-gradient-to-r from-border/0 via-border/60 to-border/0 my-3 sm:my-4"></div>

                  <div className="flex items-center justify-between">
                    <span className="text-base sm:text-lg font-semibold">
                      Totalt
                    </span>
                    <span className="text-lg sm:text-xl font-bold text-primary">
                      {/* shippingCost ? */
                        formatPrice(
                          items.reduce(
                            (acc, item) => acc + item.price * item.quantity,
                            0,
                          )/*  +
                          shippingCost / 100 */,
                        )
                        /* : "-" */}
                    </span>
                  </div>

                  {/* Benefits banner */}
                  <div className="bg-muted/30 rounded-lg p-2 sm:p-3 mt-2 flex items-center justify-between">
                    <div className="flex items-center gap-1.5 sm:gap-2">
                      <Truck className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-primary" />
                      <span className="text-[10px] sm:text-xs text-muted-foreground">
                        Snabb leverans
                      </span>
                    </div>
                    <div className="flex items-center gap-1.5 sm:gap-2">
                      <ShieldCheck className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-primary" />
                      <span className="text-[10px] sm:text-xs text-muted-foreground">
                        Säker betalning
                      </span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-border/40 shadow-md rounded-xl overflow-hidden">
              <div className="h-1 w-full bg-gradient-to-r from-primary/40 via-primary/60 to-primary/40"></div>
              <CardHeader className="border-b border-border/20 bg-muted/30 p-4 sm:p-6">
                <CardTitle className="flex items-center gap-2 text-lg sm:text-xl">
                  <CreditCard className="h-4 w-4 sm:h-5 sm:w-5 text-primary" />
                  Betalningsinformation
                </CardTitle>
              </CardHeader>
              <CardContent className="p-4 sm:p-6">
                <div className="space-y-3 sm:space-y-4">
                  <div className="space-y-2">
                    <p className="text-xs sm:text-sm leading-relaxed text-muted-foreground">
                      Efter att du lagt din beställning skickas en faktura till
                      din e-postadress.
                    </p>
                    <p className="text-xs sm:text-sm leading-relaxed text-muted-foreground">
                      Betalningsvillkor: Betalning ska ske inom 30 dagar från
                      fakturadatum.
                    </p>
                  </div>
                  <div className="rounded-xl bg-muted/30 p-3 sm:p-5 space-y-2 sm:space-y-3 border border-border/30">
                    <p className="text-xs sm:text-sm font-semibold flex items-center gap-2">
                      <ShieldCheck className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-primary" />
                      Viktig information:
                    </p>
                    <ul className="text-xs sm:text-sm text-muted-foreground space-y-1.5 sm:space-y-2 list-disc list-inside ml-1">
                      <li>
                        Fakturan innehåller all nödvändig information enligt
                        svensk lag
                      </li>
                      <li>
                        Vid försenad betalning tillkommer ränta enligt
                        räntelagen
                      </li>
                      <li>Vid utebliven betalning skickas påminnelseavgift</li>
                      <li>
                        Du har rätt att ångra köpet inom 14 dagar enligt
                        distansavtalslagen
                      </li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}

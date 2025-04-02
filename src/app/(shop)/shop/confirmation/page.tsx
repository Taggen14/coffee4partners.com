"use client";

import { Suspense } from "react";
import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { useCart } from "@/store/use-cart";
import { CheckCircle2, Loader2, AlertCircle, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

function ConfirmationContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { clearCart } = useCart();
  const [status, setStatus] = useState<"loading" | "success" | "error">(
    "loading",
  );
  const [error, setError] = useState<string | null>(null);
  const [isDownloading, setIsDownloading] = useState(false);
  const [pdfBuffer, setPdfBuffer] = useState<string | null>(null);

  useEffect(() => {
    const verifyOrder = async () => {
      try {
        const orderId = searchParams.get("order_id");
        if (!orderId) {
          throw new Error("No order ID provided");
        }

        const response = await fetch(`/api/klarna/verify?order_id=${orderId}`);
        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.error || "Failed to verify order");
        }

        // Store the PDF buffer if available
        if (data.pdfBuffer) {
          setPdfBuffer(data.pdfBuffer);
        }

        // Clear the cart after successful verification
        clearCart();
        setStatus("success");
      } catch (error) {
        console.error("Verification error:", error);
        setError(
          error instanceof Error ? error.message : "Failed to verify order",
        );
        setStatus("error");
      }
    };

    verifyOrder();
  }, [searchParams, clearCart]);

  const handleDownloadInvoice = async () => {
    try {
      setIsDownloading(true);
      const orderId = searchParams.get("order_id");
      if (!orderId || !pdfBuffer) return;

      // Convert base64 back to blob
      const binaryString = window.atob(pdfBuffer);
      const bytes = new Uint8Array(binaryString.length);
      for (let i = 0; i < binaryString.length; i++) {
        bytes[i] = binaryString.charCodeAt(i);
      }
      const blob = new Blob([bytes], { type: "application/pdf" });

      // Create download link
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `invoice-${orderId}.pdf`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch (error) {
      console.error("Download error:", error);
      setError("Failed to download invoice");
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <div className="container max-w-3xl py-16 md:py-24">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col items-center text-center"
      >
        {status === "loading" && (
          <>
            <Loader2 className="h-16 w-16 animate-spin text-muted-foreground" />
            <h1 className="mt-6 text-2xl font-bold">Verifying your order...</h1>
            <p className="mt-2 text-muted-foreground">
              Please wait while we confirm your payment.
            </p>
          </>
        )}

        {status === "success" && (
          <>
            <CheckCircle2 className="h-16 w-16 text-green-500" />
            <h1 className="mt-6 text-2xl font-bold">Order Confirmed!</h1>
            <p className="mt-2 text-muted-foreground">
              Thank you for your purchase. We&apos;ll send you an email with
              your order details shortly.
            </p>
            <div className="mt-8 flex flex-col gap-4 sm:flex-row">
              <Button
                size="lg"
                onClick={() => router.push("/shop")}
                variant="outline"
              >
                Continue Shopping
              </Button>
              <Button
                size="lg"
                onClick={handleDownloadInvoice}
                disabled={isDownloading || !pdfBuffer}
              >
                {isDownloading ? (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                  <Download className="mr-2 h-4 w-4" />
                )}
                Download Invoice
              </Button>
            </div>
          </>
        )}

        {status === "error" && (
          <>
            <AlertCircle className="h-16 w-16 text-red-500" />
            <h1 className="mt-6 text-2xl font-bold">Something went wrong</h1>
            <p className="mt-2 text-muted-foreground">{error}</p>
            <Button
              className="mt-8"
              size="lg"
              onClick={() => router.push("/shop")}
            >
              Return to Shop
            </Button>
          </>
        )}
      </motion.div>
    </div>
  );
}

export default function ConfirmationPage() {
  return (
    <Suspense
      fallback={
        <div className="container max-w-3xl py-16 md:py-24">
          <div className="flex flex-col items-center text-center">
            <Loader2 className="h-16 w-16 animate-spin text-muted-foreground" />
            <h1 className="mt-6 text-2xl font-bold">Loading...</h1>
          </div>
        </div>
      }
    >
      <ConfirmationContent />
    </Suspense>
  );
}

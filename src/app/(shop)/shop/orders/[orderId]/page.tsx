"use client";

import { Suspense } from "react";
import { useEffect, useState } from "react";
import { useParams, useSearchParams } from "next/navigation";
import { Loader2, PackageCheck, AlertCircle } from "lucide-react";
import { formatPrice } from "@/lib/utils";

interface OrderItem {
  quantity: number;
  unitPrice: number;
  product: {
    name: string;
    images: string[];
  };
}

interface Order {
  id: string;
  status: string;
  customerName: string;
  customerEmail: string;
  shippingAddress: string;
  totalAmount: number;
  createdAt: string;
  orderItems: OrderItem[];
}

function OrderStatusContent() {
  const params = useParams();
  const searchParams = useSearchParams();
  const [order, setOrder] = useState<Order | null>(null);
  const [status, setStatus] = useState<"loading" | "error" | "success">(
    "loading",
  );
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const token = searchParams.get("token");
        if (!token) {
          throw new Error("No token provided");
        }

        const response = await fetch(
          `/api/orders/${params.orderId}?token=${token}`,
        );
        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.error || "Failed to fetch order");
        }

        setOrder(data);
        setStatus("success");
      } catch (error) {
        console.error("Error fetching order:", error);
        setError(
          error instanceof Error ? error.message : "Failed to fetch order",
        );
        setStatus("error");
      }
    };

    fetchOrder();
  }, [params.orderId, searchParams]);

  const getStatusIcon = () => {
    switch (status) {
      case "loading":
        return (
          <Loader2 className="h-16 w-16 animate-spin text-muted-foreground" />
        );
      case "error":
        return <AlertCircle className="h-16 w-16 text-destructive" />;
      case "success":
        return order?.status === "DELIVERED" ? (
          <PackageCheck className="h-16 w-16 text-green-500" />
        ) : (
          <PackageCheck className="h-16 w-16 text-blue-500" />
        );
      default:
        return null;
    }
  };

  const getStatusText = () => {
    if (!order) return "";
    switch (order.status) {
      case "PENDING":
        return "Order Received";
      case "PROCESSING":
        return "Processing Order";
      case "SHIPPED":
        return "Order Shipped";
      case "DELIVERED":
        return "Order Delivered";
      default:
        return order.status;
    }
  };

  if (status === "loading") {
    return (
      <div className="container flex min-h-[400px] items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    );
  }

  if (status === "error") {
    return (
      <div className="container flex min-h-[400px] flex-col items-center justify-center gap-4">
        <AlertCircle className="h-16 w-16 text-destructive" />
        <h1 className="text-2xl font-bold">Error</h1>
        <p className="text-muted-foreground">{error}</p>
      </div>
    );
  }

  if (!order) return null;

  return (
    <div className="container max-w-4xl py-16">
      <div className="mb-8 flex flex-col items-center gap-4 text-center">
        {getStatusIcon()}
        <h1 className="text-3xl font-bold">Order #{order.id}</h1>
        <p className="text-xl font-medium text-muted-foreground">
          {getStatusText()}
        </p>
      </div>

      <div className="space-y-8 rounded-lg border bg-card p-8">
        {/* Customer Information */}
        <div>
          <h2 className="mb-4 text-xl font-semibold">Customer Information</h2>
          <div className="grid gap-2">
            <p>
              <span className="font-medium">Name:</span> {order.customerName}
            </p>
            <p>
              <span className="font-medium">Email:</span> {order.customerEmail}
            </p>
            <p>
              <span className="font-medium">Shipping Address:</span>{" "}
              {order.shippingAddress}
            </p>
          </div>
        </div>

        {/* Order Items */}
        <div>
          <h2 className="mb-4 text-xl font-semibold">Order Items</h2>
          <div className="space-y-4">
            {order.orderItems.map((item, index) => (
              <div
                key={index}
                className="flex items-center justify-between border-b pb-4 last:border-0 last:pb-0"
              >
                <div className="flex items-center gap-4">
                  <div className="flex-1">
                    <p className="font-medium">{item.product.name}</p>
                    <p className="text-sm text-muted-foreground">
                      Quantity: {item.quantity}
                    </p>
                  </div>
                </div>
                <p className="font-medium">{formatPrice(item.unitPrice)}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Order Total */}
        <div className="border-t pt-4">
          <div className="flex justify-between">
            <p className="text-lg font-semibold">Total</p>
            <p className="text-lg font-semibold">
              {formatPrice(order.totalAmount)}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function OrderStatusPage() {
  return (
    <Suspense
      fallback={
        <div className="container flex min-h-[400px] items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
        </div>
      }
    >
      <OrderStatusContent />
    </Suspense>
  );
}

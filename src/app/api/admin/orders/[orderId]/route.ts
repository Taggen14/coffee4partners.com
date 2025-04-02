import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { klarnaService } from "@/lib/klarna";
import { OrderStatus } from "@prisma/client"; // Import the enum type

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ orderId: string }> },
) {
  try {
    const { orderId } = await params;
    const { status } = await request.json();

    // Validate that the status is a valid OrderStatus enum value
    if (!Object.values(OrderStatus).includes(status)) {
      return NextResponse.json(
        {
          error: `Invalid status: ${status}. Must be one of: ${Object.values(
            OrderStatus,
          ).join(", ")}`,
        },
        { status: 400 },
      );
    }

    // Get the order from the database
    const order = await prisma.order.findUnique({
      where: { id: orderId },
    });

    if (!order) {
      return NextResponse.json({ error: "Order not found" }, { status: 404 });
    }

    // Handle Klarna operations based on status
    try {
      if (status === OrderStatus.SHIPPED) {
        await klarnaService.captureOrder(orderId);
      } else if (status === OrderStatus.CANCELLED) {
        await klarnaService.cancelOrder(orderId);
      } else if (status === OrderStatus.REFUNDED) {
        // You might want to add refund logic here
        await klarnaService.refundOrder(
          orderId,
          order.totalAmount.toNumber(),
          "refund",
        );
      }
    } catch (error) {
      console.error("Klarna operation failed:", error);
      return NextResponse.json(
        {
          error:
            error instanceof Error
              ? error.message
              : "Failed to process Klarna operation",
        },
        { status: 500 },
      );
    }

    // Update order status in database with the validated status
    const updatedOrder = await prisma.order.update({
      where: { id: orderId },
      data: {
        status: status as OrderStatus, // Cast the validated status to OrderStatus
      },
    });

    return NextResponse.json(updatedOrder);
  } catch (error) {
    console.error("Order update error:", error);
    return NextResponse.json(
      {
        error:
          error instanceof Error ? error.message : "Failed to update order",
      },
      { status: 500 },
    );
  }
}

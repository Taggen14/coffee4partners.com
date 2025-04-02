import { NextResponse } from "next/server";
import { klarnaService } from "@/lib/klarna";
import { prisma } from "@/lib/db";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const orderId = searchParams.get("order_id");

    if (!orderId) {
      return NextResponse.json(
        { error: "Order ID is required" },
        { status: 400 },
      );
    }

    // Get order details from Klarna
    const klarnaOrder = await klarnaService.retrieveOrder(orderId);

    if (!klarnaOrder) {
      return NextResponse.json(
        { error: "Order not found in Klarna" },
        { status: 404 },
      );
    }

    // Check if order is complete
    if (klarnaOrder.status !== "checkout_complete") {
      return NextResponse.json(
        { error: "Order not authorized or completed" },
        { status: 400 },
      );
    }

    // Create order in our database if it doesn't exist
    const existingOrder = await prisma.order.findFirst({
      where: { id: orderId },
    });

    if (!existingOrder) {
      // Create new order
      const order = await prisma.order.create({
        data: {
          id: orderId,
          status: "PENDING",
          customerEmail: klarnaOrder.billing_address.email,
          customerName: `${klarnaOrder.billing_address.given_name} ${klarnaOrder.billing_address.family_name}`,
          shippingAddress: JSON.stringify(klarnaOrder.shipping_address),
          totalAmount: klarnaOrder.order_amount / 100, // Convert from minor units
          orderItems: {
            create: klarnaOrder.order_lines.map(
              (line: {
                quantity: number;
                unit_price: number;
                reference: string;
              }) => ({
                quantity: line.quantity,
                unitPrice: line.unit_price / 100, // Convert from minor units
                product: {
                  connect: {
                    id: line.reference,
                  },
                },
              }),
            ),
          },
        },
        include: {
          orderItems: true,
        },
      });

      // Update product stock levels
      for (const item of order.orderItems) {
        await prisma.product.update({
          where: { id: item.productId },
          data: {
            stock: {
              decrement: item.quantity,
            },
          },
        });
      }
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Verification error:", error);
    return NextResponse.json(
      { error: "Failed to verify order" },
      { status: 500 },
    );
  }
}

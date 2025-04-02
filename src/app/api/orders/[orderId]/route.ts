import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ orderId: string }> },
) {
  try {
    const { searchParams } = new URL(request.url);
    const token = searchParams.get("token");

    if (!token) {
      return NextResponse.json({ error: "Token is required" }, { status: 401 });
    }

    // Verify the token format (base64 encoded string containing orderId-timestamp)
    let decodedToken: string;
    try {
      decodedToken = Buffer.from(token, "base64").toString("utf-8");
    } catch (error: unknown) {
      console.error((error as Error).message);
      return NextResponse.json(
        { error: "Invalid token format" },
        { status: 401 },
      );
    }

    const [tokenOrderId, timestampStr] = decodedToken.split("-");
    const timestamp = parseInt(timestampStr);

    // Verify that the token matches the requested order
    if (tokenOrderId !== (await params).orderId) {
      return NextResponse.json({ error: "Invalid token" }, { status: 401 });
    }

    // Check if the token is not too old (e.g., valid for 30 days)
    const tokenAge = Date.now() - timestamp;
    const maxAge = 30 * 24 * 60 * 60 * 1000; // 30 days in milliseconds
    if (tokenAge > maxAge) {
      return NextResponse.json({ error: "Token has expired" }, { status: 401 });
    }

    // Fetch the order with its items
    const order = await prisma.order.findUnique({
      where: { id: (await params).orderId },
      include: {
        orderItems: {
          include: {
            product: {
              select: {
                name: true,
                images: true,
              },
            },
          },
        },
      },
    });

    if (!order) {
      return NextResponse.json({ error: "Order not found" }, { status: 404 });
    }

    // Convert Decimal values to numbers for the response
    const formattedOrder = {
      ...order,
      totalAmount: Number(order.totalAmount),
      orderItems: order.orderItems.map((item) => ({
        ...item,
        unitPrice: Number(item.unitPrice),
      })),
    };

    return NextResponse.json(formattedOrder);
  } catch (error) {
    console.error("Error fetching order:", error);
    return NextResponse.json(
      { error: "Failed to fetch order" },
      { status: 500 },
    );
  }
}

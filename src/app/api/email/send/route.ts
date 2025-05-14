import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { prisma } from "@/lib/db";
import { render } from "@react-email/render";
import { OrderConfirmationEmail } from "@/components/emails/order-confirmation";

// Create reusable transporter object using SMTP transport
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT),
  secure: process.env.SMTP_SECURE === 'true',
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASSWORD,
  },
});

export async function POST(request: Request) {
  try {
    const { orderId } = await request.json();

    // Fetch order details with items
    const order = await prisma.order.findUnique({
      where: { id: orderId },
      include: {
        orderItems: {
          include: {
            product: true,
          },
        },
      },
    });

    if (!order) {
      return NextResponse.json({ error: "Order not found" }, { status: 404 });
    }

    // Generate a magic link token
    const magicToken = Buffer.from(`${order.id}-${Date.now()}`).toString(
      "base64",
    );

    // Convert Decimal values to numbers for the email template
    const orderItemsForEmail = order.orderItems.map((item) => ({
      quantity: item.quantity,
      unitPrice: Number(item.unitPrice),
      product: {
        name: item.product.name,
      },
    }));

    // Render the email HTML
    const emailHtml = await render(
      OrderConfirmationEmail({
        customerName: order.customerName,
        orderId: order.id,
        orderItems: orderItemsForEmail,
        totalAmount: Number(order.totalAmount),
        shippingAddress: order.shippingAddress,
        magicLink: `${process.env.NEXT_PUBLIC_APP_URL}/shop/orders/${order.id}?token=${magicToken}`,
      }),
    );

    // Send the email
    await transporter.sendMail({
      from: process.env.SMTP_FROM_EMAIL,
      to: order.customerEmail,
      subject: `Order Confirmation #${order.id}`,
      html: emailHtml,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Failed to send email:", error);
    return NextResponse.json(
      { error: "Failed to send email" },
      { status: 500 },
    );
  }
}

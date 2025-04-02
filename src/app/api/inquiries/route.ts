import { prisma } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const inquiries = await prisma.inquiry.findMany();
    return NextResponse.json(inquiries);
  } catch (error) {
    console.error("[INQUIRIES_GET]", (error as Error).message);
    return NextResponse.json(
      { error: "Failed to retrieve inquiries" },
      { status: 500 },
    );
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { customerName, customerEmail } = body;

    // Try to find an existing active inquiry for this customer
    let inquiry = await prisma.inquiry.findFirst({
      where: {
        customerEmail,
        status: "ACTIVE",
      },
      include: {
        messages: true,
      },
    });

    // If no active inquiry exists, create a new one
    if (!inquiry) {
      inquiry = await prisma.inquiry.create({
        data: {
          customerName: customerName || "Website Visitor",
          customerEmail: customerEmail || "anonymous",
          subject: "Chat Support",
          lastMessage: "Chat started",
          type: "AI",
          status: "ACTIVE",
        },
        include: {
          messages: true,
        },
      });
    }

    return NextResponse.json(inquiry);
  } catch (error) {
    console.error("[INQUIRIES_POST]", error);
    return NextResponse.json(
      { error: "Failed to create/retrieve inquiry" },
      { status: 500 },
    );
  }
}

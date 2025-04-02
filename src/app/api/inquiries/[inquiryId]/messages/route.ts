import { prisma } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ inquiryId: string }> },
) {
  try {
    const { inquiryId } = await params;

    const messages = await prisma.message.findMany({
      where: {
        inquiryId,
      },
      orderBy: {
        createdAt: "asc",
      },
    });

    return NextResponse.json(messages);
  } catch (error) {
    console.error("[MESSAGES_GET]", error);
    return NextResponse.json(
      { error: "Failed to fetch messages" },
      { status: 500 },
    );
  }
}

export async function POST(
  request: Request,
  { params }: { params: Promise<{ inquiryId: string }> },
) {
  try {
    const { inquiryId } = await params;
    const body = await request.json();
    const { content, role } = body;

    if (!content) {
      return NextResponse.json(
        { error: "Message content is required" },
        { status: 400 },
      );
    }

    // Create the message
    const message = await prisma.message.create({
      data: {
        content,
        role,
        inquiryId,
      },
    });

    // Update the inquiry's lastMessage
    await prisma.inquiry.update({
      where: { id: inquiryId },
      data: {
        lastMessage: content,
        updatedAt: new Date(),
      },
    });

    // If it's a user message, trigger AI response
    if (role === "USER") {
      const aiResponse = await prisma.message.create({
        data: {
          content: "Thank you for your message. How can I assist you today?",
          role: "ASSISTANT",
          inquiryId,
        },
      });

      return NextResponse.json([message, aiResponse]);
    }

    return NextResponse.json(message);
  } catch (error) {
    console.error("[MESSAGES_POST]", error);
    return NextResponse.json(
      { error: "Failed to send message" },
      { status: 500 },
    );
  }
}

import { prisma } from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(
  request: Request,
  { params }: { params: Promise<{ inquiryId: string }> },
) {
  try {
    const { inquiryId } = await params;
    const { role, isTyping } = await request.json();

    const typingIndicator = await prisma.typingIndicator.upsert({
      where: {
        inquiryId_role: {
          inquiryId,
          role,
        },
      },
      update: {
        isTyping,
        updatedAt: new Date(),
      },
      create: {
        inquiryId,
        role,
        isTyping,
      },
    });

    return NextResponse.json(typingIndicator);
  } catch (error) {
    console.error("[TYPING_POST]", error);
    return NextResponse.json(
      { error: "Failed to update typing status" },
      { status: 500 },
    );
  }
}

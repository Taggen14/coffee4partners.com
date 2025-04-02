import { prisma } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  { params }: { params: Promise<{ inquiryId: string }> },
) {
  const { inquiryId } = await params;

  try {
    const inquiry = await prisma.inquiry.findUnique({
      where: { id: inquiryId },
    });

    if (!inquiry) {
      return NextResponse.json({ error: "Inquiry not found" }, { status: 404 });
    }

    return NextResponse.json(inquiry);
  } catch (error) {
    console.error("[INQUIRY_GET]", (error as Error).message);
    return NextResponse.json(
      { error: "Failed to retrieve inquiry" },
      { status: 500 },
    );
  }
}

import { NextResponse } from "next/server";
import { klarnaService } from "@/lib/klarna";

export async function POST(req: Request) {
  try {
    const { items } = await req.json();

    const total = items.reduce(
      (sum: number, item: { total_amount: number }) => sum + item.total_amount,
      0,
    );

    const session = await klarnaService.createOrder({
      order_amount: total,
      order_lines: items,
    });

    return NextResponse.json({
      html_snippet: session.html_snippet,
      order_id: session.order_id,
    });
  } catch (error: unknown) {
    console.error("Klarna session error:", error);
    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "Failed to create checkout session",
      },
      { status: 500 },
    );
  }
}

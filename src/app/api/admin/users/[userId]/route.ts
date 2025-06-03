import { NextResponse } from "next/server";
import { z } from "zod";
import { clerkClient } from "@/lib/clerk";

const updateAccountSchema = z.object({
  emailAddress: z.string().email().optional(),
  id: z.string().optional(),
  publicMetadata: z.object({
    role: z.enum(["admin", "customer"]).optional(),
    pricing: z.number().optional(),
    companyName: z.string().optional(),
  }),
});

// UPDATE
export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ userId: string }> },
) {
  try {
    const body = await request.json();
    const { userId } = await params;

    if (!userId) {
      return new NextResponse(
        JSON.stringify({ error: "Account ID is required" }),
        { status: 400, headers: { "Content-Type": "application/json" } },
      );
    }

    const validatedData = updateAccountSchema.parse(body);
    const response = await clerkClient.users.updateUser(userId, validatedData);

    return new NextResponse(JSON.stringify({ response }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("[ACCOUNT_PATCH]", error);
    if (error instanceof z.ZodError) {
      return new NextResponse(
        JSON.stringify({ error: "Validation error", details: error.errors }),
        { status: 400, headers: { "Content-Type": "application/json" } },
      );
    }

    return new NextResponse(
      JSON.stringify({ error: "An unexpected error occurred" }),
      { status: 500, headers: { "Content-Type": "application/json" } },
    );
  }
}

// DELETE
export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ userId: string }> },
) {
  try {
    const { userId } = await params;

    if (!userId) {
      return NextResponse.json(
        { error: "User ID is required" },
        { status: 400 },
      );
    }
    await clerkClient.users.deleteUser(userId);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("[USER_DELETE]", (error as Error).message);

    return NextResponse.json(
      { error: "Failed to delete user" },
      { status: 500 },
    );
  }
}

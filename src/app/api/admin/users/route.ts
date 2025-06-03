import { clerkClient } from "@/lib/clerk";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const users = await clerkClient.users.getUserList();

    return NextResponse.json({ users: users.data });
  } catch (error) {
    console.error("Failed to send invitation:", error);
    return NextResponse.json({ error: "Failed to get user" }, { status: 500 });
  }
}

import { NextResponse } from "next/server";
import { clerkClient } from "@/lib/clerk";



// DELETE
export async function DELETE(
    req: Request,
    { params }: { params: { userId: string } }
) {
    try {
        const { userId } = params;

        if (!userId) {
            return NextResponse.json(
                { error: "User ID is required" },
                { status: 400 },
            );
        }
        await clerkClient.invitations.revokeInvitation(userId)

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error("[USER_DELETE]", (error as Error).message);

        return NextResponse.json(
            { error: "Failed to delete user" },
            { status: 500 },
        );
    }
}

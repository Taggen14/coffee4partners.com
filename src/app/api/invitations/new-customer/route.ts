import { clerkClient } from "@/lib/clerk";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    try {
        const { email } = await req.json()

        if (!email || typeof email !== 'string') {
            return NextResponse.json({ error: 'Invalid email' }, { status: 400 })
        }

        const invitation = await clerkClient.invitations.createInvitation({
            emailAddress: email,
            redirectUrl: `${process.env.BASE_URL || "https://localhost:3000"}/sign-up`,
            publicMetadata: {
                example: 'metadata',
                example_nested: {
                    nested: 'metadata',
                },
            },
        })
        return NextResponse.json({ message: 'Invitation sent', invitationId: invitation.id })
    } catch (error) {
        console.error('Failed to send invitation:', error)
        return NextResponse.json({ error: "Failed to invite admin" }, { status: 500 })
    }
}
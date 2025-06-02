import { clerkClient } from "@/lib/clerk";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
    try {
        const response = await clerkClient.invitations.getInvitationList()

        return NextResponse.json({ userInvites: response.data })
    } catch (error) {
        console.error('Failed to send invitation:', error)
        return NextResponse.json({ error: "Failed to get user" }, { status: 500 })
    }
}

export async function POST(req: NextRequest) {
    try {
        const { userInvite } = await req.json()

        const invitation = await clerkClient.invitations.createInvitation({
            emailAddress: userInvite.emailAddress,
            redirectUrl: `${process.env.BASE_URL}/sign-up`,
            notify: userInvite.publicMetadata.notificationSent,
            publicMetadata: {
                role: userInvite.publicMetadata.role || 'customer',
                pricing: userInvite.publicMetadata.pricing || 1,
                notificationSent: userInvite.publicMetadata.notificationSent,
                companyName: userInvite.publicMetadata.companyName || "",
            },
        })
        return NextResponse.json({ message: 'Invitation sent', invitationId: invitation.id })
    } catch (error) {
        console.error('Failed to send invitation:', error)
        return NextResponse.json({ error: "Failed to invite new user" }, { status: 500 })
    }
}
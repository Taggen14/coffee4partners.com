import { clerkClient } from "@/lib/clerk";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        console.log('GET /api/admin/users')

        const users = await clerkClient.users.getUserList()
        console.log('users: ', users)

        return NextResponse.json({ users: users.data })
    } catch (error) {
        console.error('Failed to send invitation:', error)
        return NextResponse.json({ error: "Failed to get user" }, { status: 500 })
    }
}

// export async function POST(req: NextRequest) {
//     try {
//         const { email } = await req.json()
//         console.log('email: ', email)
//         if (!email || typeof email !== 'string') {
//             return NextResponse.json({ error: 'Invalid email' }, { status: 400 })
//         }

//         const invitation = await clerkClient.invitations.createInvitation({
//             emailAddress: email,
//             redirectUrl: `${process.env.BASE_URL}/sign-up`,
//             publicMetadata: {
//                 role: 'customer',
//                 pricing: 1,
//             },
//         })
//         return NextResponse.json({ message: 'Invitation sent', invitationId: invitation.id })
//     } catch (error) {
//         console.error('Failed to send invitation:', error)
//         return NextResponse.json({ error: "Failed to invite new user" }, { status: 500 })
//     }
// }
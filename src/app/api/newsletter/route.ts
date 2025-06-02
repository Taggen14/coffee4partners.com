import { prisma } from "@/lib/db"
import { NextRequest, NextResponse } from "next/server"

export async function POST(req: NextRequest) {
    try {
        const { email } = await req.json()

        if (!email || typeof email !== "string") {
            return NextResponse.json({ error: "Ogiltig e-post" }, { status: 400 })
        }

        const existing = await prisma.newsletterSubscriber.findUnique({
            where: { email },
        })

        if (existing) {
            return NextResponse.json({ error: "E-postadressen är redan registrerad" }, { status: 409 })
        }

        await prisma.newsletterSubscriber.create({ data: { email } })

        return NextResponse.json({ success: true })
    } catch (error) {
        console.error("Prenumerationsfel:", error)
        return NextResponse.json({ error: "Något gick fel" }, { status: 500 })
    }
}

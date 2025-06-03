import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(request: NextRequest) {
  try {
    const userInvite = await request.json();

    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT) || 587,
      secure: process.env.SMTP_SECURE === "true",
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD,
      },
    });

    const baseUrl =
      process.env.NEXT_PUBLIC_BASE_URL || "https://localhost:3000";
    const logoUrl = `${baseUrl}/logo.png`;

    const mailOptions = {
      from: `"" <${process.env.SMTP_USER}>`,
      to: userInvite.emailAddress,
      subject: `Du är inbjuden till Coffee4Partner`,
      html: `
    <div style="font-family: sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #ddd;">
      <img src="${logoUrl}" alt="Coffee4Partner Logo" style="max-width: 200px; margin-bottom: 20px;" />
      <h2 style="color: #444;">Du har blivit inbjuden att gå med i Coffee4Partner</h2>
      <a href="${userInvite.url}" style="
        display: inline-block;
        padding: 10px 20px;
        margin: 20px 0;
        background-color: #0070f3;
        color: #fff;
        text-decoration: none;
        border-radius: 4px;
      ">
        Acceptera inbjudan
      </a>
    </div>
  `,
    };

    await transporter.sendMail(mailOptions);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Fel vid sändning av e-post:", error);
    return NextResponse.json(
      { error: "Kunde inte skicka e-post" },
      { status: 500 },
    );
  }
}

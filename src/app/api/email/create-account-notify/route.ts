import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    console.log('email POST data: ', data)

    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT) || 587,
      secure: process.env.SMTP_SECURE === 'true',
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD,
      },
    });

    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://localhost:3000';
    const logoUrl = `${baseUrl}/logo.png`;

    const mailOptions = {
      from: process.env.SMTP_USER,
      to: process.env.SMTP_USER,
      subject: `Nytt Coffee4Partner konto`,
      html: `
    <div style="font-family: sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #ddd;">
      <img src="${logoUrl}" alt="Coffee4Partner Logo" style="max-width: 200px; margin-bottom: 20px;" />
      <h2 style="color: #444;">En ny kund vill skapa ett konto på Coffee4Partner</h2>
 <p style="font-size: 16px; line-height: 1.5; color: #333; margin: 0 0 16px 0;">
  <strong>Företag:</strong> ${data.companyName}<br />
  <strong>E-post:</strong> ${data.email}
</p>

<p style="font-size: 16px; line-height: 1.5; color: #333; margin: 0 0 16px 0;">
  Logga in på ditt admin-konto och godkänn din nya kund.<br />
  Du hittar inbjudan här:
  <a href="${baseUrl}/admin/accounts" style="color: #0070f3; text-decoration: underline;">
    ${baseUrl}/admin/accounts
  </a>
</p>
    </div>
  `,
    };

    await transporter.sendMail(mailOptions);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Fel vid sändning av e-post:', error);
    return NextResponse.json({ error: 'Kunde inte skicka e-post' }, { status: 500 });
  }
}

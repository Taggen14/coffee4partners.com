import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request: NextRequest) {
    try {
        const { name, email, phone, message } = await request.json();

        const transporter = nodemailer.createTransport({
            host: process.env.SMTP_HOST,
            port: Number(process.env.SMTP_PORT) || 587,
            secure: process.env.SMTP_SECURE === 'true',
            auth: {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASSWORD,
            },
        });

        const mailOptions = {
            from: `"${name}" <${process.env.SMTP_USER}>`,
            to: process.env.RECIPIENT_EMAIL,
            replyTo: email,
            subject: `Kontakt formulär från ${name}, ${email}`,
            html: `
                <div>
                  <h2>Nytt meddelande från kontaktformuläret</h2>
                  <span>${name}</span><br/>
                  <span>${email}</span><br/>
                  <span>${phone}</span><br/>

                  <p><strong>Meddelande:</strong><br/>${message}</p>
                </div>
              `,
        };

        await transporter.sendMail(mailOptions);

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('Error sending email:', error);
        return NextResponse.json({ error: 'Failed to send email' }, { status: 500 });
    }
}
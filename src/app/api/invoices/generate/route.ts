import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { render } from "@react-email/render";
import { InvoiceEmail } from "@/components/emails/invoice";
import { AdminNotificationEmail } from "@/components/emails/admin-notification";
import { generateInvoicePDF } from "@/lib/invoice";

// Create reusable transporter object using SMTP transport
const createTransporter = () => {
  // Log SMTP configuration for debugging (without sensitive info)
  console.log("SMTP Configuration:", {
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT),
    secure: true,
  });

  // Verify SMTP settings exist
  if (
    !process.env.SMTP_HOST ||
    !process.env.SMTP_PORT ||
    !process.env.SMTP_USER ||
    !process.env.SMTP_PASSWORD
  ) {
    console.error("Missing SMTP configuration", {
      host: !!process.env.SMTP_HOST,
      port: !!process.env.SMTP_PORT,
      user: !!process.env.SMTP_USER,
      pass: !!process.env.SMTP_PASSWORD,
    });

    throw new Error("SMTP configuration is incomplete");
  }

  return nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT),
    secure: true,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASSWORD,
    },
    tls: {
      // Do not fail on invalid certs
      rejectUnauthorized: false,
    },
  });
};

export async function POST(request: Request) {
  try {
    const { invoiceData, orderNumber, customerEmail } = await request.json();

    // Validate required data
    if (!invoiceData || !orderNumber || !customerEmail) {
      return NextResponse.json(
        { error: "Saknar nödvändig information för att skapa fakturan" },
        { status: 400 },
      );
    }

    // Create the transporter (will validate SMTP config)
    let transporter;
    try {
      transporter = createTransporter();
    } catch (error) {
      console.error("Failed to create email transporter:", error);
      return NextResponse.json(
        { error: "Konfigurationsproblem med e-postservern" },
        { status: 500 },
      );
    }

    // Verify connection configuration
    try {
      const verifyResult = await transporter.verify();
      console.log("SMTP verification result:", verifyResult);
    } catch (error) {
      console.error("SMTP verification failed:", error);
      return NextResponse.json(
        { error: "Kunde inte verifiera anslutningen till e-postservern" },
        { status: 503 },
      );
    }

    // Generate PDF invoice
    let pdfBuffer: Buffer;
    try {
      pdfBuffer = await generateInvoicePDF(invoiceData, orderNumber);
      console.log("PDF invoice generated successfully");
    } catch (error) {
      console.error("Failed to generate PDF invoice:", error);
      return NextResponse.json(
        { error: "Kunde inte skapa PDF-faktura" },
        { status: 500 },
      );
    }

    // Generate email HTML using React Email components
    const customerComponent = InvoiceEmail({
      invoiceData,
      orderNumber,
    });
    const emailHtml = await render(customerComponent);

    // Generate admin notification email
    const adminComponent = AdminNotificationEmail({
      orderNumber,
      customer: invoiceData.customer,
      items: invoiceData.items,
      shipping: invoiceData.shipping,
      orderDate: new Date(),
    });
    const adminNotificationHtml = await render(adminComponent);

    // Admin notification email content
    const adminEmail = process.env.ADMIN_EMAIL || process.env.SMTP_FROM_EMAIL;

    // Track email sending results
    const emailResults = [];

    // Send the invoice email to customer
    try {
      const customerMailOptions = {
        from: process.env.SMTP_FROM_EMAIL,
        to: customerEmail,
        subject: `Faktura #${orderNumber} från ${invoiceData.company.name}`,
        html: emailHtml,
        attachments: [
          {
            filename: `Faktura-${orderNumber}.pdf`,
            content: pdfBuffer,
            contentType: "application/pdf",
          },
        ],
      };

      console.log("Sending customer email with options:", {
        from: customerMailOptions.from,
        to: customerMailOptions.to,
        subject: customerMailOptions.subject,
        attachments: customerMailOptions.attachments.map((a) => a.filename),
      });

      const customerResult = await transporter.sendMail(customerMailOptions);
      console.log(
        "Customer email sent successfully:",
        customerResult.messageId,
      );
      emailResults.push({
        to: "customer",
        success: true,
        messageId: customerResult.messageId,
      });
    } catch (error) {
      console.error("Customer email sending failed:", error);
      emailResults.push({ to: "customer", success: false, error: error });
      throw error; // Re-throw to be caught by the outer catch block
    }

    // Send notification email to admin
    try {
      const adminMailOptions = {
        from: process.env.SMTP_FROM_EMAIL,
        to: adminEmail,
        subject: `Ny beställning: #${orderNumber}`,
        html: adminNotificationHtml,
        attachments: [
          {
            filename: `Faktura-${orderNumber}.pdf`,
            content: pdfBuffer,
            contentType: "application/pdf",
          },
        ],
      };

      console.log("Sending admin notification email with options:", {
        from: adminMailOptions.from,
        to: adminMailOptions.to,
        subject: adminMailOptions.subject,
        attachments: adminMailOptions.attachments.map((a) => a.filename),
      });

      const adminResult = await transporter.sendMail(adminMailOptions);
      console.log(
        "Admin notification email sent successfully:",
        adminResult.messageId,
      );
      emailResults.push({
        to: "admin",
        success: true,
        messageId: adminResult.messageId,
      });
    } catch (error) {
      console.error("Admin notification email sending failed:", error);
      emailResults.push({ to: "admin", success: false, error: error });
      // Don't throw here - we still want to return success if the customer email was sent
    }

    // Return success if at least the customer email was sent
    if (
      emailResults.some((result) => result.to === "customer" && result.success)
    ) {
      return NextResponse.json({
        success: true,
        emailResults: emailResults,
        pdfBuffer: pdfBuffer.toString("base64"), // Convert buffer to base64 for JSON transmission
      });
    } else {
      throw new Error("Failed to send any emails");
    }
  } catch (error) {
    console.error("Failed to generate and send invoice:", error);

    // Extract detailed error information
    let errorDetails = "";
    if (error instanceof Error) {
      errorDetails = `${error.name}: ${error.message}`;

      // Handle specific error types
      if (error.message.includes("SSL")) {
        return NextResponse.json(
          {
            error:
              "Ett problem uppstod med e-postservern. Vänligen försök igen senare.",
            details: errorDetails,
          },
          { status: 503 },
        );
      }
      if (
        error.message.includes("ECONNREFUSED") ||
        error.message.includes("connect")
      ) {
        return NextResponse.json(
          {
            error:
              "Kunde inte ansluta till e-postservern. Vänligen försök igen senare.",
            details: errorDetails,
          },
          { status: 503 },
        );
      }
      if (error.message.includes("auth") || error.message.includes("535")) {
        return NextResponse.json(
          {
            error:
              "Autentiseringsproblem med e-postservern. Vänligen försök igen senare.",
            details: errorDetails,
          },
          { status: 503 },
        );
      }
      if (error.message.includes("timeout")) {
        return NextResponse.json(
          {
            error:
              "Tidsgränsen för anslutning till e-postservern överskreds. Vänligen försök igen senare.",
            details: errorDetails,
          },
          { status: 504 },
        );
      }
    }

    // Generic error response
    return NextResponse.json(
      {
        error: "Ett oväntat fel uppstod. Vänligen försök igen senare.",
        details: errorDetails || "Unknown error",
      },
      { status: 500 },
    );
  }
}

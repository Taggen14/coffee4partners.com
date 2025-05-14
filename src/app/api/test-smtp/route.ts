import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

// This endpoint is only for testing SMTP in development
export async function POST() {
  // Make sure this only runs in development
  if (process.env.NODE_ENV !== "development") {
    return NextResponse.json(
      { error: "This endpoint is only available in development mode" },
      { status: 403 },
    );
  }

  try {
    // Log SMTP configuration for debugging
    console.log("Testing SMTP with configuration:", {
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT),
      secure: process.env.SMTP_SECURE === 'true',
      // Not logging auth credentials for security
    });

    // Check if SMTP settings are configured
    if (
      !process.env.SMTP_HOST ||
      !process.env.SMTP_PORT ||
      !process.env.SMTP_USER ||
      !process.env.SMTP_PASSWORD
    ) {
      return NextResponse.json(
        {
          error: "SMTP configuration is incomplete",
          details: {
            host: !!process.env.SMTP_HOST,
            port: !!process.env.SMTP_PORT,
            user: !!process.env.SMTP_USER,
            pass: !!process.env.SMTP_PASSWORD,
          },
        },
        { status: 500 },
      );
    }

    // Create a test transporter
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT),
      secure: process.env.SMTP_SECURE === 'true',
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD,
      },
    });

    // Verify the connection configuration
    const verifyResult = await transporter.verify();
    console.log("SMTP verification result:", verifyResult);

    return NextResponse.json({
      success: true,
      message: "SMTP connection verified successfully",
      config: {
        host: process.env.SMTP_HOST,
        port: Number(process.env.SMTP_PORT),
        fromEmail: process.env.SMTP_FROM_EMAIL,
      },
    });
  } catch (error) {
    console.error("SMTP test failed:", error);

    // Prepare error details
    let errorDetails = "Unknown error";
    let suggestion = "";

    if (error instanceof Error) {
      errorDetails = `${error.name}: ${error.message}`;

      // Add suggestions based on common errors
      if (error.message.includes("ECONNREFUSED")) {
        suggestion =
          "The SMTP server is not accepting connections. Verify the host and port are correct.";
      } else if (error.message.includes("auth")) {
        suggestion =
          "Authentication failed. Verify your SMTP username and password.";
      } else if (error.message.includes("SSL")) {
        suggestion =
          "SSL/TLS negotiation failed. Try setting 'secure: false' and port to 587.";
      } else if (error.message.includes("timeout")) {
        suggestion =
          "Connection timed out. The SMTP server might be down or blocked by a firewall.";
      }
    }

    return NextResponse.json(
      {
        success: false,
        error: "SMTP connection failed",
        details: errorDetails,
        suggestion: suggestion,
      },
      { status: 500 },
    );
  }
}

import { InvoiceDataType } from "@/types";
import jsPDF from "jspdf";

// Generate PDF invoice using jsPDF
export async function generateInvoicePDF(
  invoiceData: InvoiceDataType,
  orderNumber: string,
): Promise<Buffer> {
  try {
    // Create a new PDF document
    const doc = new jsPDF({
      orientation: "portrait",
      unit: "mm",
      format: "a4",
    });

    // Set initial position
    let yPos = 20;
    const leftMargin = 20;
    const rightMargin = 190; // A4 width is 210mm

    // Add company header
    doc.setFontSize(20);
    doc.text(invoiceData.company.name, leftMargin, yPos);
    yPos += 10;

    // Add company details
    doc.setFontSize(12);
    doc.text(invoiceData.company.address, leftMargin, yPos);
    yPos += 6;
    doc.text(
      `${invoiceData.company.postalCode} ${invoiceData.company.city}`,
      leftMargin,
      yPos,
    );
    yPos += 6;
    doc.text(invoiceData.company.country, leftMargin, yPos);
    yPos += 6;
    doc.text(`VAT: ${invoiceData.company.vatNumber}`, leftMargin, yPos);
    yPos += 15;

    // Add invoice details
    doc.setFontSize(16);
    doc.text(`Invoice #${orderNumber}`, leftMargin, yPos);
    yPos += 10;

    // Add customer details
    doc.setFontSize(12);
    doc.text("Bill to:", leftMargin, yPos);
    yPos += 6;
    doc.text(invoiceData.customer.name, leftMargin, yPos);
    yPos += 6;
    doc.text(invoiceData.customer.address, leftMargin, yPos);
    yPos += 6;
    doc.text(
      `${invoiceData.customer.postalCode} ${invoiceData.customer.city}`,
      leftMargin,
      yPos,
    );
    yPos += 6;
    doc.text(invoiceData.customer.country, leftMargin, yPos);
    yPos += 15;

    // Add items table header
    doc.setFontSize(12);
    doc.text("Item", leftMargin, yPos);
    doc.text("Quantity", 100, yPos);
    doc.text("Price", 130, yPos);
    doc.text("Total", rightMargin - 20, yPos, { align: "right" });
    yPos += 10;

    // Add items
    doc.setFontSize(10);
    let total = 0;
    invoiceData.items.forEach((item) => {
      const itemTotal = item.quantity * item.unitPrice;
      total += itemTotal;

      doc.text(item.name, leftMargin, yPos);
      doc.text(item.quantity.toString(), 100, yPos);
      doc.text(item.unitPrice.toFixed(2), 130, yPos);
      doc.text(itemTotal.toFixed(2), rightMargin - 20, yPos, {
        align: "right",
      });
      yPos += 6;
    });

    // Add shipping
    yPos += 5;
    doc.text(`Shipping (${invoiceData.shipping.zone}):`, leftMargin, yPos);
    doc.text(invoiceData.shipping.cost.toFixed(2), rightMargin - 20, yPos, {
      align: "right",
    });
    yPos += 6;

    // Add total
    yPos += 5;
    doc.setFontSize(12);
    doc.text("Total:", leftMargin, yPos);
    doc.text(
      (total + invoiceData.shipping.cost).toFixed(2),
      rightMargin - 20,
      yPos,
      { align: "right" },
    );

    // Convert to buffer and return
    return Buffer.from(doc.output("arraybuffer"));
  } catch (error) {
    console.error("Error generating PDF:", error);
    throw new Error("Failed to generate PDF invoice");
  }
}

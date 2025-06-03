import { InvoiceDataType } from "@/types";
import jsPDF from "jspdf";
import fs from "fs";
import path from "path";

// Generate PDF invoice using jsPDF
export async function generateInvoicePDF(
  invoiceData: InvoiceDataType,
  orderNumber: string,
): Promise<Buffer> {
  const logoPath = path.resolve("public/logo.png");
  const logoData = fs.readFileSync(logoPath).toString("base64");
  const logoBase64 = `data:image/png;base64,${logoData}`;

  try {
    // Create a new PDF document
    const doc = new jsPDF({
      orientation: "portrait",
      unit: "mm",
      format: "a4",
    });

    // Set initial position
    let yPos = 25;
    const leftMargin = 20;
    const rightMargin = 190; // A4 width is 210mm
    const colWidth2 = (rightMargin - leftMargin) / 2;

    // Add company details
    doc.setFontSize(12);
    doc.text(`Orderdatum: ${invoiceData.date.createdAt}`, rightMargin, yPos, {
      align: "right",
    });

    // add logo
    yPos -= 10;
    doc.addImage(logoBase64, "PNG", leftMargin, yPos, 90, 11); // x, y, width, height
    yPos += 30;

    //Header
    doc.setFontSize(25);
    doc.setFont("helvetica", "bold");
    doc.text("Orderbekräftelse", leftMargin, yPos);
    yPos += 35;

    // Column 1: "Vår referens" and "Er referens"
    doc.setFontSize(10);
    doc.setFont("helvetica", "bold");
    doc.text("Vår referens", leftMargin, yPos);
    doc.setFont("helvetica", "normal");
    doc.text(invoiceData.company.name, leftMargin, yPos + 5);
    doc.setFont("helvetica", "bold");
    doc.text("Er referens", leftMargin, yPos + 10);
    doc.setFont("helvetica", "normal");
    doc.text(invoiceData.customer.name, leftMargin, yPos + 15);

    // Column 2: "Fakturaadress"  customer details
    doc.setFont("helvetica", "bold");
    doc.text("Fakturaadress", leftMargin + colWidth2, yPos);
    doc.setFont("helvetica", "normal");
    doc.text(invoiceData.customer.name, leftMargin + colWidth2, yPos + 5);
    doc.text(invoiceData.customer.address, leftMargin + colWidth2, yPos + 10);
    doc.text(
      `${invoiceData.customer.postalCode} ${invoiceData.customer.city}`,
      leftMargin + colWidth2,
      yPos + 15,
    );
    doc.text(invoiceData.customer.country, leftMargin + colWidth2, yPos + 20);
    yPos += 35;

    // Add invoice details
    doc.text(`Order nummer: #${orderNumber}`, leftMargin, yPos);
    yPos += 10;

    // Add items table header
    doc.text("Artikel", leftMargin, yPos);
    doc.text("Antal", 110, yPos);
    doc.text("Pris", 140, yPos);
    doc.text("Total", rightMargin, yPos, { align: "right" });

    // Add a separator line
    yPos += 5;
    doc.setLineWidth(0.5);
    doc.line(leftMargin, yPos, rightMargin, yPos);
    yPos += 5;

    // Add items
    doc.setFontSize(10);
    let total = 0;
    const maxTextWidth = 85; // Justera efter din layout
    const ellipsis = "…";
    const ellipsisWidth = doc.getTextWidth(ellipsis);

    invoiceData.items.forEach((item) => {
      const itemTotal = item.quantity * item.unitPrice;
      total += itemTotal;

      let itemName = item.name;

      // Trunkera och reservera plats för ellipsis
      while (doc.getTextWidth(itemName) > maxTextWidth - ellipsisWidth) {
        itemName = itemName.slice(0, -1);
      }

      // Lägg till ellipsis om texten faktiskt är trunkerad
      if (itemName !== item.name) {
        itemName += ellipsis;
      }

      doc.text(itemName, leftMargin, yPos);
      doc.text(item.quantity.toString(), 110, yPos);
      doc.text(item.unitPrice.toFixed(2), 140, yPos);
      doc.text(itemTotal.toFixed(2), rightMargin, yPos, {
        align: "right",
      });
      yPos += 6;
    });

    // Add shipping
    // yPos += 2;
    // doc.text(`Frakt:`, leftMargin, yPos);
    // doc.text(invoiceData.shipping.cost.toFixed(2), rightMargin, yPos, { align: "right", });
    // yPos += 2;

    // Add a separator line
    yPos += 5;
    doc.setLineWidth(0.5);
    doc.line(leftMargin, yPos, rightMargin, yPos);
    yPos += 5;

    // Add total
    yPos += 5;
    doc.setFontSize(12);
    doc.text("Total:", leftMargin, yPos);
    doc.text(
      `${total /*  + invoiceData.shipping.cost */
        .toFixed(2)} SEK`,
      rightMargin,
      yPos,
      { align: "right" },
    );

    // ******************* FOOTER (fixed to bottom) *******************
    const footerY = 270; // Y-position near bottom of A4

    doc.setLineWidth(0.5);
    doc.line(leftMargin, footerY - 5, rightMargin, footerY - 5); // separator line above footer

    doc.setFontSize(10);

    // Column widths
    const colWidth3 = (rightMargin - leftMargin) / 3;

    // Column 1: Company name and organization number
    doc.setFont("helvetica", "bold");
    doc.text(invoiceData.company.name, leftMargin, footerY);
    doc.setFont("helvetica", "normal");
    doc.text(
      `Org.nr: ${invoiceData.company.orgNumber}`,
      leftMargin,
      footerY + 5,
    );
    doc.text(
      `VAT-nr: ${invoiceData.company.vatNumber}`,
      leftMargin,
      footerY + 10,
    );

    // Column 2: Address
    doc.setFont("helvetica", "bold");
    doc.text("Adress", 4 + leftMargin + colWidth3, footerY);
    doc.setFont("helvetica", "normal");
    doc.text(
      invoiceData.company.address,
      4 + leftMargin + colWidth3,
      footerY + 5,
    );
    doc.text(
      `${invoiceData.company.postalCode} ${invoiceData.company.city}`,
      4 + leftMargin + colWidth3,
      footerY + 10,
    );

    // Column 3: Contact
    doc.setFont("helvetica", "bold");
    doc.text("Kontakt", leftMargin + colWidth3 * 2, footerY);
    doc.setFont("helvetica", "normal");
    doc.text(
      invoiceData.company.phone,
      leftMargin + colWidth3 * 2,
      footerY + 5,
    );
    doc.text(
      invoiceData.company.email,
      leftMargin + colWidth3 * 2,
      footerY + 10,
    );

    // Convert to buffer and return
    return Buffer.from(doc.output("arraybuffer"));
  } catch (error) {
    console.error("Error generating PDF:", error);
    throw new Error("Failed to generate PDF invoice");
  }
}

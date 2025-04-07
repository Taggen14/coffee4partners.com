import React from "react";
import {
  Body,
  Container,
  Html,
  Section,
  Text,
  Heading,
  Hr,
  Row,
  Column,
} from "@react-email/components";

interface InvoicePdfProps {
  invoiceData: {
    customer: {
      name: string;
      email: string;
      address: string;
      postalCode: string;
      city: string;
      country: string;
    };
    items: Array<{
      name: string;
      quantity: number;
      unitPrice: number;
      taxAmount: number;
    }>;
    shipping: {
      cost: number;
      zone: string;
    };
    company: {
      name: string;
      address: string;
      postalCode: string;
      city: string;
      country: string;
      vatNumber: string;
    };
  };
  orderNumber: string;
}

// Server-safe format currency function
const formatCurrency = (amount: number) => {
  // Simple formatting without using Intl
  return `${amount.toFixed(2)} SEK`;
};

// Server-safe date formatter
const formatDate = (date: Date) => {
  const day = date.getDate().toString().padStart(2, "0");
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const year = date.getFullYear();
  return `${year}-${month}-${day}`;
};

export const InvoicePdf = ({ invoiceData, orderNumber }: InvoicePdfProps) => {
  const { customer, items, shipping, company } = invoiceData;

  const subtotal = items.reduce(
    (sum, item) => sum + item.quantity * item.unitPrice,
    0,
  );

  const totalTax = items.reduce(
    (sum, item) => sum + item.quantity * item.taxAmount,
    0,
  );

  const total = subtotal + totalTax + shipping.cost;

  const today = new Date();
  const dueDate = new Date(today);
  dueDate.setDate(today.getDate() + 30);

  const invoiceDate = formatDate(today);
  const formattedDueDate = formatDate(dueDate);

  return (
    <Html>
      <Body style={body}>
        <Container style={container}>
          {/* Invoice Header */}
          <Section style={header}>
            <Row>
              <Column style={companyDetails}>
                <Heading as="h2" style={heading2}>
                  {company.name}
                </Heading>
                <Text style={text}>{company.address}</Text>
                <Text style={text}>
                  {company.postalCode} {company.city}
                </Text>
                <Text style={text}>{company.country}</Text>
                <Text style={text}>Org.nr/VAT: {company.vatNumber}</Text>
              </Column>
              <Column style={invoiceTitle}>
                <Heading as="h1" style={heading1}>
                  FAKTURA
                </Heading>
                <Text style={text}>
                  <strong>Fakturanr:</strong> {orderNumber}
                </Text>
                <Text style={text}>
                  <strong>Datum:</strong> {invoiceDate}
                </Text>
                <Text style={text}>
                  <strong>Förfallodatum:</strong> {formattedDueDate}
                </Text>
              </Column>
            </Row>
          </Section>

          {/* Customer Information */}
          <Section style={infoSection}>
            <Row>
              <Column style={customerDetails}>
                <Heading as="h3" style={heading3}>
                  Faktureras till
                </Heading>
                <Text style={text}>
                  <strong>{customer.name}</strong>
                </Text>
                <Text style={text}>{customer.address}</Text>
                <Text style={text}>
                  {customer.postalCode} {customer.city}
                </Text>
                <Text style={text}>{customer.country}</Text>
                <Text style={text}>Email: {customer.email}</Text>
              </Column>
              <Column style={paymentDetails}>
                <Heading as="h3" style={heading3}>
                  Betalningsuppgifter
                </Heading>
                <Text style={text}>
                  <strong>Betalningsvillkor:</strong> 30 dagar netto
                </Text>
                <Text style={text}>
                  <strong>Förfallodatum:</strong> {formattedDueDate}
                </Text>
              </Column>
            </Row>
          </Section>

          {/* Invoice Items */}
          <Section style={tableSection}>
            <Heading as="h3" style={heading3}>
              Fakturerade varor
            </Heading>

            {/* Table Header */}
            <Row style={tableHeader}>
              <Column style={tableHeadCol}>Beskrivning</Column>
              <Column style={tableHeadCol}>Antal</Column>
              <Column style={tableHeadCol}>Pris</Column>
              <Column style={tableHeadCol}>Moms</Column>
              <Column style={{ ...tableHeadCol, textAlign: "right" }}>
                Summa
              </Column>
            </Row>

            {/* Table Rows */}
            {items.map((item, index) => (
              <Row key={index} style={tableRow}>
                <Column style={tableCell}>{item.name}</Column>
                <Column style={tableCell}>{item.quantity}</Column>
                <Column style={tableCell}>
                  {formatCurrency(item.unitPrice)}
                </Column>
                <Column style={tableCell}>
                  {formatCurrency(item.taxAmount)}
                </Column>
                <Column style={{ ...tableCell, textAlign: "right" }}>
                  {formatCurrency(item.quantity * item.unitPrice)}
                </Column>
              </Row>
            ))}

            {/* Shipping Row */}
            <Row style={tableRow}>
              <Column style={tableCell} colSpan={4}>
                Frakt ({shipping?.zone || "Standard"})
              </Column>
              <Column style={{ ...tableCell, textAlign: "right" }}>
                {formatCurrency(shipping.cost)}
              </Column>
            </Row>

            {/* Tax Total */}
            <Row style={tableRow}>
              <Column style={tableCell} colSpan={4}>
                Moms
              </Column>
              <Column style={{ ...tableCell, textAlign: "right" }}>
                {formatCurrency(totalTax)}
              </Column>
            </Row>

            {/* Total Row */}
            <Row style={totalRow}>
              <Column style={tableCell} colSpan={4}>
                <strong>Totalt att betala</strong>
              </Column>
              <Column
                style={{ ...tableCell, textAlign: "right", fontWeight: "bold" }}
              >
                {formatCurrency(total)}
              </Column>
            </Row>
          </Section>

          {/* Payment Information */}
          <Section style={paymentSection}>
            <Heading as="h3" style={heading3}>
              Betalningsinformation
            </Heading>
            <Text style={text}>
              <strong>Bank:</strong> Swedbank
            </Text>
            <Text style={text}>
              <strong>Kontonummer:</strong> 1234-5678
            </Text>
            <Text style={text}>
              <strong>IBAN:</strong> SE123 4567 8910 1112
            </Text>
            <Text style={text}>
              <strong>Meddelande:</strong> Fakturanr {orderNumber}
            </Text>
          </Section>

          <Hr style={divider} />

          {/* Thank You Note */}
          <Section style={thankYou}>
            <Text style={text}>
              Tack för att du handlar hos {company.name}!
            </Text>
            <Text style={text}>
              Vid frågor, kontakta oss på support@coffee4partners.se
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
};

// Styles
const body = {
  margin: 0,
  padding: 0,
  color: "#333",
  backgroundColor: "white",
};

const container = {
  maxWidth: "800px",
  margin: "0 auto",
  padding: "20px",
};

const header = {
  display: "flex",
  justifyContent: "space-between",
  marginBottom: "40px",
  paddingBottom: "20px",
  borderBottom: "1px solid #eaeaea",
};

const companyDetails = {
  textAlign: "left" as const,
};

const invoiceTitle = {
  textAlign: "right" as const,
};

const infoSection = {
  display: "flex",
  justifyContent: "space-between",
  marginBottom: "30px",
};

const customerDetails = {
  width: "45%",
};

const paymentDetails = {
  width: "45%",
  textAlign: "right" as const,
};

const tableSection = {
  marginBottom: "30px",
};

const tableHeader = {
  backgroundColor: "#f7f7f7",
  padding: "12px",
  borderBottom: "2px solid #eaeaea",
};

const tableHeadCol = {
  textAlign: "left" as const,
  padding: "12px",
  fontWeight: "bold",
};

const tableRow = {
  borderBottom: "1px solid #eaeaea",
};

const tableCell = {
  padding: "12px",
};

const totalRow = {
  fontWeight: "bold",
  borderTop: "2px solid #eaeaea",
  borderBottom: "none",
};

const paymentSection = {
  marginTop: "40px",
  paddingTop: "20px",
  borderTop: "1px solid #eaeaea",
};

const divider = {
  borderColor: "#eaeaea",
  margin: "24px 0",
};

const thankYou = {
  marginTop: "40px",
  textAlign: "center" as const,
  color: "#4a5568",
};

const heading1 = {
  color: "#2563eb",
  margin: "0",
  fontSize: "24px",
};

const heading2 = {
  color: "#4a5568",
  margin: "0 0 10px 0",
  fontSize: "20px",
};

const heading3 = {
  color: "#4a5568",
  margin: "0 0 10px 0",
  fontSize: "18px",
};

const text = {
  margin: "5px 0",
  lineHeight: "1.5",
};

export default InvoicePdf;

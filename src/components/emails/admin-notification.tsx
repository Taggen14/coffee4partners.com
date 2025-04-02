import {
  Body,
  Container,
  Head,
  Heading,
  Html,
  Preview,
  Section,
  Text,
} from "@react-email/components";

interface OrderItem {
  name: string;
  quantity: number;
  unitPrice: number;
}

interface CustomerInfo {
  name: string;
  email: string;
  address: string;
  postalCode: string;
  city: string;
  country: string;
}

interface ShippingInfo {
  cost: number;
  zone: string | null;
}

interface AdminNotificationEmailProps {
  orderNumber: string;
  customer: CustomerInfo;
  items: OrderItem[];
  shipping: ShippingInfo;
  orderDate: Date;
}

export const AdminNotificationEmail = ({
  orderNumber,
  customer,
  items,
  shipping,
  orderDate = new Date(),
}: AdminNotificationEmailProps) => {
  // Calculate order total
  const itemsTotal = items.reduce(
    (total, item) => total + item.unitPrice * item.quantity,
    0,
  );

  const shippingCost = shipping?.cost || 0;
  const orderTotal = itemsTotal + shippingCost / 100;

  // Format currency
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("sv-SE", {
      style: "currency",
      currency: "SEK",
    }).format(amount);
  };

  return (
    <Html>
      <Head />
      <Preview>Ny beställning: #{orderNumber}</Preview>
      <Body style={main}>
        <Container style={container}>
          <Heading style={h1}>Ny beställning: #{orderNumber}</Heading>

          <Text style={text}>
            En ny beställning har lagts {orderDate.toLocaleDateString("sv-SE")}{" "}
            kl. {orderDate.toLocaleTimeString("sv-SE")}
          </Text>

          <Section style={section}>
            <Heading as="h2" style={h2}>
              Kunduppgifter
            </Heading>
            <Text style={text}>
              <strong>Namn:</strong> {customer.name}
              <br />
              <strong>E-post:</strong> {customer.email}
              <br />
              <strong>Adress:</strong> {customer.address}
              <br />
              <strong>Postnummer:</strong> {customer.postalCode}
              <br />
              <strong>Ort:</strong> {customer.city}
              <br />
              {customer.country && (
                <>
                  <strong>Land:</strong> {customer.country}
                </>
              )}
            </Text>
          </Section>

          <Section style={section}>
            <Heading as="h2" style={h2}>
              Beställda produkter
            </Heading>
            <table style={table}>
              <thead>
                <tr>
                  <th style={th}>Produkt</th>
                  <th style={th}>Antal</th>
                  <th style={th}>Pris</th>
                  <th style={th}>Summa</th>
                </tr>
              </thead>
              <tbody>
                {items.map((item, index) => (
                  <tr key={index}>
                    <td style={td}>{item.name}</td>
                    <td style={tdCenter}>{item.quantity}</td>
                    <td style={tdRight}>{formatCurrency(item.unitPrice)}</td>
                    <td style={tdRight}>
                      {formatCurrency(item.quantity * item.unitPrice)}
                    </td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr>
                  <td style={td} colSpan={3}>
                    <strong>Frakt ({shipping?.zone || "Standard"}):</strong>
                  </td>
                  <td style={tdRight}>{formatCurrency(shippingCost / 100)}</td>
                </tr>
                <tr>
                  <td style={tdBold} colSpan={3}>
                    <strong>Totalt:</strong>
                  </td>
                  <td style={tdRightBold}>{formatCurrency(orderTotal)}</td>
                </tr>
              </tfoot>
            </table>
          </Section>

          <Section style={noticeSection}>
            <Text style={noticeText}>
              <strong>Notera:</strong> Detta är en automatisk notifikation. Du
              behöver gå till administratörspanelen för att hantera denna
              beställning.
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
};

// Styles
const main = {
  backgroundColor: "#ffffff",
  fontFamily:
    '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif',
};

const container = {
  margin: "0 auto",
  padding: "20px 0 48px",
  maxWidth: "600px",
};

const section = {
  padding: "24px",
  border: "solid 1px #dedede",
  borderRadius: "5px",
  marginBottom: "24px",
};

const noticeSection = {
  padding: "16px",
  backgroundColor: "#ebf8ff",
  borderRadius: "5px",
  marginTop: "24px",
};

const noticeText = {
  margin: "0",
  color: "#2d3748",
  fontSize: "14px",
};

const h1 = {
  color: "#4a5568",
  fontSize: "24px",
  fontWeight: "bold",
  margin: "30px 0",
};

const h2 = {
  color: "#2d3748",
  fontSize: "20px",
  fontWeight: "bold",
  margin: "0 0 15px",
};

const text = {
  color: "#333",
  fontSize: "16px",
  lineHeight: "24px",
  margin: "0 0 15px",
};

const table = {
  width: "100%",
  borderCollapse: "collapse" as const,
};

const th = {
  backgroundColor: "#edf2f7",
  padding: "8px",
  textAlign: "left" as const,
  fontSize: "14px",
  fontWeight: "bold",
  borderBottom: "1px solid #e2e8f0",
};

const td = {
  padding: "8px",
  borderBottom: "1px solid #e2e8f0",
  fontSize: "14px",
  textAlign: "left" as const,
};

const tdCenter = {
  ...td,
  textAlign: "center" as const,
};

const tdRight = {
  ...td,
  textAlign: "right" as const,
};

const tdBold = {
  ...td,
  fontWeight: "bold" as const,
  textAlign: "right" as const,
  borderBottom: "none",
};

const tdRightBold = {
  ...tdRight,
  fontWeight: "bold" as const,
  borderBottom: "none",
};

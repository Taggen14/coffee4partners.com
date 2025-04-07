import {
  Body,
  Container,
  Head,
  Heading,
  Html,
  Preview,
  Section,
  Text,
  Button,
  Hr,
} from "@react-email/components";
import { formatPrice } from "@/lib/utils";

interface InvoiceEmailProps {
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

export const InvoiceEmail = ({
  invoiceData,
  orderNumber,
}: InvoiceEmailProps) => {
  const { customer, items, company } = invoiceData;

  const subtotal = items.reduce(
    (sum, item) => sum + item.quantity * item.unitPrice,
    0,
  );

  return (
    <Html>
      <Head />
      <Preview>
        Faktura #{orderNumber} från {company.name}
      </Preview>
      <Body style={main}>
        <Container style={container}>
          <Heading style={h1}>{company.name}</Heading>

          <Section style={section}>
            <Heading as="h2" style={h2}>
              Tack för din beställning!
            </Heading>
            <Text style={text}>Hej {customer.name},</Text>
            <Text style={text}>
              Tack för din beställning från {company.name}. Din faktura (#
              {orderNumber}) finns bifogad i denna e-post som PDF-fil.
            </Text>

            <Text style={text}>
              Fakturan förfaller till betalning om 30 dagar. Se bifogad PDF för
              fullständig information om betalning.
            </Text>

            <Hr style={hr} />

            <Text style={textBold}>Ordersammanfattning</Text>

            <Text style={text}>
              <strong>Ordernummer:</strong> #{orderNumber}
              <br />
              <strong>Orderdatum:</strong>{" "}
              {new Date().toLocaleDateString("sv-SE")}
            </Text>

            <Text style={text}>
              <strong>Totalt belopp:</strong> {formatPrice(subtotal)}
            </Text>
          </Section>

          <Section style={ctaSection}>
            <Text style={textCenter}>Har du frågor om din beställning?</Text>
            <Button style={button} href="mailto:support@coffee4partners.se">
              Kontakta kundtjänst
            </Button>
          </Section>

          <Hr style={hr} />

          <Text style={footer}>
            © {new Date().getFullYear()} {company.name}. Alla rättigheter
            förbehållna.
            <br />
            {company.address}, {company.postalCode} {company.city}
          </Text>

          <Text style={smallText}>
            Detta är en automatiskt genererad e-post. Vänligen svara inte på
            detta meddelande.
          </Text>
        </Container>
      </Body>
    </Html>
  );
};

const main = {
  backgroundColor: "#ffffff",
  fontFamily:
    '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif',
};

const container = {
  margin: "0 auto",
  padding: "24px",
  maxWidth: "600px",
};

const section = {
  padding: "24px",
  border: "solid 1px #eaeaea",
  borderRadius: "5px",
  marginBottom: "24px",
  backgroundColor: "#fff",
};

const ctaSection = {
  padding: "24px",
  backgroundColor: "#f9fafb",
  borderRadius: "5px",
  marginBottom: "24px",
  textAlign: "center" as const,
};

const h1 = {
  color: "#333",
  fontSize: "24px",
  fontWeight: "bold",
  textAlign: "center" as const,
  margin: "30px 0",
};

const h2 = {
  color: "#333",
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

const textBold = {
  ...text,
  fontWeight: "bold" as const,
};

const textCenter = {
  ...text,
  textAlign: "center" as const,
};

const button = {
  backgroundColor: "#2563eb",
  borderRadius: "5px",
  color: "#fff",
  display: "inline-block",
  fontSize: "14px",
  fontWeight: "bold" as const,
  textDecoration: "none",
  textAlign: "center" as const,
  marginTop: "10px",
};

const hr = {
  borderColor: "#eaeaea",
  margin: "24px 0",
};

const footer = {
  color: "#666",
  fontSize: "14px",
  textAlign: "center" as const,
  margin: "24px 0",
  lineHeight: "20px",
};

const smallText = {
  color: "#999",
  fontSize: "12px",
  textAlign: "center" as const,
  margin: "24px 0 0",
};

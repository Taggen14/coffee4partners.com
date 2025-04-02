import {
  Body,
  Container,
  Head,
  Heading,
  Html,
  Link,
  Preview,
  Section,
  Text,
} from "@react-email/components";
import { formatPrice } from "@/lib/utils";

interface OrderItem {
  quantity: number;
  unitPrice: number;
  product: {
    name: string;
  };
}

interface OrderConfirmationEmailProps {
  customerName: string;
  orderId: string;
  orderItems: OrderItem[];
  totalAmount: number;
  shippingAddress: string;
  magicLink: string;
}

export const OrderConfirmationEmail = ({
  customerName,
  orderId,
  orderItems,
  totalAmount,
  shippingAddress,
  magicLink,
}: OrderConfirmationEmailProps) => {
  const previewText = `Order Confirmation #${orderId}`;

  return (
    <Html>
      <Head />
      <Preview>{previewText}</Preview>
      <Body style={main}>
        <Container style={container}>
          <Heading style={h1}>Order Confirmation</Heading>

          <Text style={text}>Dear {customerName},</Text>
          <Text style={text}>
            Thank you for your order! We&apos;re pleased to confirm that
            we&apos;ve received your order #{orderId}.
          </Text>

          <Section style={section}>
            <Heading style={h2}>Order Details</Heading>
            {orderItems.map((item, index) => (
              <Text key={index} style={text}>
                {item.quantity}x {item.product.name} -{" "}
                {formatPrice(item.unitPrice)}
              </Text>
            ))}
            <Text style={totalText}>Total: {formatPrice(totalAmount)}</Text>
          </Section>

          <Section style={section}>
            <Heading style={h2}>Shipping Address</Heading>
            <Text style={text}>{shippingAddress}</Text>
          </Section>

          <Section style={section}>
            <Heading style={h2}>Track Your Order</Heading>
            <Text style={text}>
              Click the link below to track your order status:
            </Text>
            <Link href={magicLink} style={button}>
              View Order Status
            </Link>
          </Section>

          <Text style={footer}>
            If you have any questions, please don&apos;t hesitate to contact us.
          </Text>
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
  maxWidth: "580px",
};

const h1 = {
  color: "#333",
  fontSize: "24px",
  fontWeight: "bold",
  margin: "40px 0",
  padding: "0",
};

const h2 = {
  color: "#333",
  fontSize: "20px",
  fontWeight: "bold",
  margin: "24px 0",
  padding: "0",
};

const text = {
  color: "#333",
  fontSize: "16px",
  lineHeight: "24px",
  margin: "16px 0",
};

const button = {
  backgroundColor: "#000",
  borderRadius: "3px",
  color: "#fff",
  fontSize: "16px",
  textDecoration: "none",
  textAlign: "center" as const,
  display: "block",
  padding: "12px",
  margin: "24px 0",
};

const totalText = {
  fontSize: "18px",
  fontWeight: "bold",
  margin: "24px 0",
};

const section = {
  margin: "24px 0",
};

const footer = {
  color: "#898989",
  fontSize: "14px",
  margin: "48px 0 0",
};

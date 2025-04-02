interface KlarnaLineItem {
  reference: string;
  name: string;
  quantity: number;
  unit_price: number;
  tax_rate: number;
  total_amount: number;
  total_tax_amount: number;
  image_url?: string;
}

interface KlarnaOrderData {
  purchase_country: string;
  purchase_currency: string;
  locale: string;
  order_amount: number;
  order_tax_amount: number;
  order_lines: KlarnaLineItem[];
  merchant_urls: {
    terms: string;
    checkout: string;
    confirmation: string;
    push: string;
  };
}

class KlarnaService {
  private baseUrl: string;
  private auth: string;

  constructor() {
    // Use test API in development, production API in production
    this.baseUrl =
      process.env.NODE_ENV === "production"
        ? "https://api.klarna.com"
        : "https://api.playground.klarna.com";

    // Basic auth using Klarna API credentials
    this.auth = Buffer.from(
      `${process.env.KLARNA_USERNAME}:${process.env.KLARNA_PASSWORD}`,
    ).toString("base64");
  }

  async createOrder(orderData: Partial<KlarnaOrderData>) {
    try {
      const response = await fetch(`${this.baseUrl}/checkout/v3/orders`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Basic ${this.auth}`,
        },
        body: JSON.stringify(this.formatOrderData(orderData)),
      });

      if (!response.ok) {
        const error = await response.json();
        console.log(error);
        throw new Error(error.error_message || "Failed to create Klarna order");
      }

      return await response.json();
    } catch (error) {
      console.error("Klarna order creation error:", error);
      throw error;
    }
  }

  async refundOrder(orderId: string, amount: number, description: string) {
    try {
      const response = await fetch(
        `${this.baseUrl}/ordermanagement/v1/orders/${orderId}/refunds`,
        {
          method: "POST",
          headers: {
            Authorization: `Basic ${this.auth}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            refunded_amount: amount,
            description: description,
          }),
        },
      );

      if (!response.ok) {
        const errorText = await response.text();
        console.error("Klarna refund error response:", errorText);
        throw new Error(`Failed to refund order: ${errorText}`);
      }

      const contentType = response.headers.get("content-type");
      if (contentType && contentType.includes("application/json")) {
        return await response.json();
      }

      return { success: true };
    } catch (error) {
      console.error("Klarna refund error:", error);
      throw error;
    }
  }

  async cancelOrder(orderId: string) {
    try {
      const response = await fetch(
        `${this.baseUrl}/ordermanagement/v1/orders/${orderId}/cancel`,
        {
          method: "POST",
          headers: {
            Authorization: `Basic ${this.auth}`,
            "Content-Type": "application/json",
          },
        },
      );

      if (!response.ok) {
        const errorText = await response.text();
        console.error("Klarna cancel error response:", errorText);
        throw new Error(`Failed to cancel order: ${errorText}`);
      }

      // Only try to parse JSON if there is content
      const contentType = response.headers.get("content-type");
      if (contentType && contentType.includes("application/json")) {
        return await response.json();
      }

      // If no JSON content, return success status
      return { success: true };
    } catch (error) {
      console.error("Klarna cancel error:", error);
      throw error;
    }
  }

  async captureOrder(orderId: string) {
    try {
      // First get the order to get the captured amount
      const order = await this.getOrder(orderId);
      console.log("Klarna order status:", order.status); // Debug log

      // Check if order can be captured
      if (order.status !== "AUTHORIZED") {
        throw new Error(
          `Order cannot be captured. Current status: ${order.status}`,
        );
      }

      const response = await fetch(
        `${this.baseUrl}/ordermanagement/v1/orders/${orderId}/captures`,
        {
          method: "POST",
          headers: {
            Authorization: `Basic ${this.auth}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            captured_amount: order.order_amount,
            description: "Order shipped to customer",
          }),
        },
      );

      // Check if response is ok before trying to parse JSON
      if (!response.ok) {
        const errorText = await response.text();
        console.error("Klarna capture error response:", errorText);
        throw new Error(`Failed to capture payment: ${errorText}`);
      }

      // Only try to parse JSON if there is content
      const contentType = response.headers.get("content-type");
      if (contentType && contentType.includes("application/json")) {
        return await response.json();
      }

      // If no JSON content, return success status
      return { success: true };
    } catch (error) {
      console.error("Klarna capture error:", error);
      throw error;
    }
  }

  async getOrder(orderId: string) {
    try {
      const response = await fetch(
        `${this.baseUrl}/ordermanagement/v1/orders/${orderId}`,
        {
          headers: {
            Authorization: `Basic ${this.auth}`,
          },
        },
      );

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error_message || "Failed to get Klarna order");
      }

      return await response.json();
    } catch (error) {
      console.error("Klarna get order error:", error);
      throw error;
    }
  }

  async retrieveOrder(orderId: string) {
    try {
      const response = await fetch(
        `${this.baseUrl}/checkout/v3/orders/${orderId}`,
        {
          headers: {
            Authorization: `Basic ${this.auth}`,
          },
        },
      );

      if (!response.ok) {
        const error = await response.json();
        throw new Error(
          error.error_message || "Failed to retrieve Klarna order",
        );
      }

      return await response.json();
    } catch (error) {
      console.error("Klarna order retrieval error:", error);
      throw error;
    }
  }

  private formatOrderData(
    orderData: Partial<KlarnaOrderData>,
  ): KlarnaOrderData {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

    // Calculate tax amount (example: 25% VAT)
    const TAX_RATE = 2500; // 25% in basis points (0.25 * 10000)

    const orderLines =
      orderData.order_lines?.map((line) => {
        // Calculate unit price without tax
        const unitPriceExcludingTax = Math.round(
          line.unit_price / (1 + TAX_RATE / 10000),
        );

        // Calculate total amount excluding tax
        const totalAmountExcludingTax = unitPriceExcludingTax * line.quantity;

        // Calculate tax amount
        const totalTaxAmount = line.total_amount - totalAmountExcludingTax;

        return {
          ...line,
          tax_rate: TAX_RATE,
          total_tax_amount: totalTaxAmount,
          // Ensure total_amount matches unit_price * quantity
          total_amount: line.unit_price * line.quantity,
        };
      }) || [];

    const orderTaxAmount = orderLines.reduce(
      (sum, line) => sum + line.total_tax_amount,
      0,
    );

    return {
      purchase_country: orderData.purchase_country || "SE",
      purchase_currency: orderData.purchase_currency || "SEK",
      locale: orderData.locale || "sv-SE",
      order_amount: orderLines.reduce(
        (sum, line) => sum + line.total_amount,
        0,
      ),
      order_tax_amount: orderTaxAmount,
      order_lines: orderLines,
      merchant_urls: {
        terms: `${baseUrl}/terms`,
        checkout: `${baseUrl}/shop/checkout`,
        confirmation: `${baseUrl}/shop/confirmation?order_id={checkout.order.id}`,
        push: `${baseUrl}/api/klarna/push`,
      },
    };
  }
}

export const klarnaService = new KlarnaService();

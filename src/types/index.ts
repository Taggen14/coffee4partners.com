import { Product } from "@prisma/client";

export interface ExtendedProduct extends Omit<Product, "price"> {
  price: number;
  category: {
    id: string;
    name: string;
  };
}

export interface RekognitionResponse {
  Aliases: [];
  Categories: { Name: string }[];
  Confidence: number;
  Instances: {
    BoundingBox: { Height: number; Left: number; Top: number; Width: number };
    Confidence: number;
  }[];
  Name: string;
  Parents: [];
}

// Order types that match Prisma schema but don't require direct imports
// This allows client components to use types without importing @prisma/client

export enum OrderStatus {
  PENDING = "PENDING",
  PROCESSING = "PROCESSING",
  SHIPPED = "SHIPPED",
  DELIVERED = "DELIVERED",
  CANCELLED = "CANCELLED",
  RETURNED = "RETURNED",
  REFUNDED = "REFUNDED",
  PAID = "PAID",
}

export interface OrderItem {
  id: string;
  orderId: string;
  productId: string;
  quantity: number;
  unitPrice: number;
  product?: {
    id: string;
    name: string;
    description: string;
    price: number;
    images: string[];
  };
}

export interface Order {
  id: string;
  customerEmail: string;
  customerName: string;
  shippingAddress: string;
  totalAmount: number;
  status: OrderStatus;
  createdAt: Date;
  updatedAt: Date;
  orderItems: OrderItem[];
}

export type ExtendedOrder = Order;

export interface InvoiceDataType {
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
}

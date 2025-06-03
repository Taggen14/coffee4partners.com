import { Category, Product, SubCategory } from "@prisma/client";

export type Role = "admin" | "customer";

export type User = {
  emailAddresses: [
    {
      emailAddress: string;
    },
  ];
  id: string;
  publicMetadata: {
    role: Role;
    pricing: number;
    companyName: string;
    notificationSent: boolean;
  };
  status: string;
};
export type UserInvite = {
  emailAddress: string;
  id: string;
  publicMetadata: {
    role: Role;
    pricing: number;
    companyName: string;
    notificationSent: boolean;
  };
  status: string;
};

declare global {
  interface CustomJwtSessionClaims {
    metadata: {
      role?: Role;
    };
  }
}

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

export type useCategoriesTypes = Category & {
  categorySlug: string;
  subCategories: SubCategory[];
  _count: {
    products: number;
  };
};

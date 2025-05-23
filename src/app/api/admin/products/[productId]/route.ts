import { prisma } from "@/lib/db";
import { NextResponse } from "next/server";
import { z } from "zod";
import { Prisma } from "@prisma/client";

const updateProductSchema = z.object({
  name: z.string().min(1, "Name is required").optional(),
  description: z.array(z.string()).optional(),
  status: z.enum(["ACTIVE", "DRAFT", "ARCHIVE"]).optional(),
  price: z.number().min(0, "Price must be positive").optional(),
  stock: z.number().min(0, "Stock must be positive").optional(),
  images: z.array(z.string()).optional(),
  categoryId: z.string().optional(),
  subCategoryId: z.string().optional(),
});

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ productId: string }> },
) {
  try {
    const body = await request.json();
    const { productId } = await params;

    if (!productId) {
      return new NextResponse(
        JSON.stringify({ error: "Product ID is required" }),
        { status: 400, headers: { "Content-Type": "application/json" } },
      );
    }

    const validatedData = updateProductSchema.parse(body);

    const product = await prisma.product.update({
      where: {
        id: productId,
      },
      data: validatedData,
      include: {
        category: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });

    return new NextResponse(JSON.stringify({ data: product }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("[PRODUCT_PATCH]", error);

    if (error instanceof z.ZodError) {
      return new NextResponse(
        JSON.stringify({ error: "Validation error", details: error.errors }),
        { status: 400, headers: { "Content-Type": "application/json" } },
      );
    }

    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === "P2025") {
        return new NextResponse(
          JSON.stringify({ error: "Product not found" }),
          { status: 404, headers: { "Content-Type": "application/json" } },
        );
      }
    }

    return new NextResponse(
      JSON.stringify({ error: "An unexpected error occurred" }),
      { status: 500, headers: { "Content-Type": "application/json" } },
    );
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ productId: string }> },
) {
  try {
    const { productId } = await params;

    if (!productId) {
      return NextResponse.json(
        { error: "Product ID is required" },
        { status: 400 },
      );
    }

    // Delete related cart items first
    await prisma.cartItem.deleteMany({
      where: {
        productId: productId,
      },
    });

    // Delete related order items
    await prisma.orderItem.deleteMany({
      where: {
        productId: productId,
      },
    });

    // Now we can safely delete the product
    await prisma.product.delete({
      where: {
        id: productId,
      },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("[PRODUCT_DELETE]", (error as Error).message);

    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === "P2025") {
        return NextResponse.json(
          { error: "Product not found" },
          { status: 404 },
        );
      }
    }

    return NextResponse.json(
      { error: "Failed to delete product" },
      { status: 500 },
    );
  }
}

import { prisma } from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { description, name, price, stock, categoryId, features, images } =
    await req.json();

  try {
    const product = await prisma.product.create({
      data: {
        description: description,
        name: name,
        price: price,
        stock: stock,
        categoryId: categoryId,
        features: features,
        images: images,
      },
      include: {
        category: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });

    return NextResponse.json({
      ...product,
      price: parseFloat(product.price.toString()),
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to create product" },
      { status: 500 },
    );
  }
}

export async function GET() {
  try {
    const products = await prisma.product.findMany({
      include: {
        category: {
          select: {
            id: true,
            name: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    // Convert Prisma Decimal to number for the price field
    const formattedProducts = products.map((product) => ({
      ...product,
      price: parseFloat(product.price.toString()),
    }));

    return NextResponse.json(formattedProducts);
  } catch (error) {
    console.error("[PRODUCTS_GET]", error);
    return NextResponse.json(
      { error: "Failed to fetch products" },
      { status: 500 },
    );
  }
}

import { prisma } from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { name, vendor, tagline, description, productAttributes, productSpecifications, price, images, stock, categoryId, subCategoryId, features, } =
    await req.json();

  try {
    const product = await prisma.product.create({
      data: {
        name: name,
        vendor: vendor,
        tagline: tagline || null,
        description: description,
        productAttributes: productAttributes,
        productSpecifications: productSpecifications,
        price: price,
        images: images,
        stock: stock,
        categoryId: categoryId,
        subCategoryId: subCategoryId || null,
        features: features
      },
      include: {
        category: {
          select: {
            id: true,
            name: true,
          },
        },
        subCategory: {
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

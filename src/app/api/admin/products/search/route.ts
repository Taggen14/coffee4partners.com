import { prisma } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const query = searchParams.get("q");

    if (!query) {
      return NextResponse.json([]);
    }

    const products = await prisma.product.findMany({
      where: {
        OR: [
          {
            name: {
              contains: query,
              mode: "insensitive",
            },
          },
          // FUNGERAR INTE FÖR ATT JAG HAR description  string[] I MIN PRISMA MODEL
          // {
          // {
          //   description: { contains: query, mode: Prisma.QueryMode.insensitive },
          // },
          // },
          {
            category: {
              name: {
                contains: query,
                mode: "insensitive",
              },
            },
          },
        ],
        // Only show products that are in stock and active
        stock: {
          gt: 0,
        },
      },
      include: {
        category: true,
      },
      orderBy: {
        name: "asc",
      },
    });

    return NextResponse.json(products);
  } catch (error) {
    console.error("Search error:", error);
    return NextResponse.json(
      { error: "Failed to search products" },
      { status: 500 },
    );
  }
}

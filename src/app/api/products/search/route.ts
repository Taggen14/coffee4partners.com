import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { Prisma } from "@prisma/client";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get("q")?.trim().toLowerCase() || "";
  const page = parseInt(searchParams.get("page") || "1");
  const limit = parseInt(searchParams.get("limit") || "10");
  const skip = (page - 1) * limit;

  try {
    // If no query, return all products
    if (!query) {
      const [products, total] = await Promise.all([
        prisma.product.findMany({
          include: {
            category: true,
          },
          skip,
          take: limit,
          orderBy: {
            name: "asc",
          },
        }),
        prisma.product.count(),
      ]);

      const hasMore = skip + products.length < total;
      const nextPage = hasMore ? page + 1 : undefined;

      return NextResponse.json({
        products,
        hasMore,
        nextPage,
        total,
      });
    }

    // Simple direct search with a single query term
    const whereClause = {
      OR: [
        { name: { contains: query, mode: Prisma.QueryMode.insensitive } },
        // FUNGERAR INTE FÖR ATT JAG HAR description  string[] I MIN PRISMA MODEL
        // {
        //   description: { contains: query, mode: Prisma.QueryMode.insensitive },
        // },
        {
          category: {
            name: { contains: query, mode: Prisma.QueryMode.insensitive },
          },
        },
      ],
    };

    const [products, total] = await Promise.all([
      prisma.product.findMany({
        where: whereClause,
        include: {
          category: true,
        },
        skip,
        take: limit,
        orderBy: [
          {
            name: "asc",
          },
        ],
      }),
      prisma.product.count({
        where: whereClause,
      }),
    ]);

    const hasMore = skip + products.length < total;
    const nextPage = hasMore ? page + 1 : undefined;

    return NextResponse.json({
      products,
      hasMore,
      nextPage,
      total,
    });
  } catch (error) {
    console.error("Search error:", error);
    return NextResponse.json(
      { error: "Failed to search products" },
      { status: 500 },
    );
  }
}

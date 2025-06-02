import { prisma } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const subCategories = await prisma.subCategory.findMany({
      orderBy: {
        name: "asc",
      },
      include: {
        _count: {
          select: { products: true },
        },
      }

    });

    return NextResponse.json(subCategories);
  } catch (error) {
    console.error("Error fetching subCategories:", error);
    return NextResponse.json(
      { error: "Error fetching subCategories" },
      { status: 500 },
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, categoryId } = body;

    if (!name) {
      return NextResponse.json({ error: "Name is required" }, { status: 400 });
    }

    if (!categoryId) {
      return NextResponse.json({ error: "Du måste välja kategori först, för att skapa en underkategori" }, { status: 400 });
    }


    const subCategory = await prisma.subCategory.create({
      data: {
        name,
        categoryId,
      },
    });

    return NextResponse.json(subCategory);
  } catch (error) {
    console.error("Error creating subCategory:", error);
    return NextResponse.json(
      { error: "Error creating subCategory" },
      { status: 500 },
    );
  }
}

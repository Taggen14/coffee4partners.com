import { prisma } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const subCategories = await prisma.subCategory.findMany({
      orderBy: {
        name: "asc",
      },
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
  console.log('subCategories POST start')
  try {
    const body = await request.json();
    console.log('body in POST subCategory: ', body)
    const { name, categoryId } = body;

    if (!name) {
      return NextResponse.json({ error: "Name is required" }, { status: 400 });
    }

    if (!categoryId) {
      return NextResponse.json({ error: "CategoryId is required" }, { status: 400 });
    }

    const existingSubCategory = await prisma.subCategory.findFirst({
      where: {
        name: {
          equals: name,
          mode: "insensitive",
        },
      },
    });

    if (existingSubCategory) {
      return NextResponse.json(
        { error: "SubCategory already exists" },
        { status: 400 },
      );
    }

    const category = await prisma.subCategory.create({
      data: {
        name,
        categoryId,
      },
    });

    return NextResponse.json(category);
  } catch (error) {
    console.error("Error creating subCategory:", error);
    return NextResponse.json(
      { error: "Error creating subCategory" },
      { status: 500 },
    );
  }
}

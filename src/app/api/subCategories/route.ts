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

// export async function POST(request: Request) {
//   try {
//     const body = await request.json();
//     const { name } = body;

//     if (!name) {
//       return NextResponse.json({ error: "Name is required" }, { status: 400 });
//     }

//     const existingCategory = await prisma.category.findFirst({
//       where: {
//         name: {
//           equals: name,
//           mode: "insensitive",
//         },
//       },
//     });

//     if (existingCategory) {
//       return NextResponse.json(
//         { error: "Category already exists" },
//         { status: 400 },
//       );
//     }

//     const category = await prisma.category.create({
//       data: {
//         name,
//       },
//     });

//     return NextResponse.json(category);
//   } catch (error) {
//     console.error("Error creating category:", error);
//     return NextResponse.json(
//       { error: "Error creating category" },
//       { status: 500 },
//     );
//   }
// }

import { prisma } from "@/lib/db";
import { NextResponse } from "next/server";
import { z } from "zod";
import { Prisma } from "@prisma/client";

const updateCategorySchema = z.object({
    name: z.string().min(1, "Namn är obligatoriskt").optional(),
    description: z.string().optional(),
    images: z.array(z.string()).optional(),
});

// UPDATE
export async function PATCH(
    request: Request,
    { params }: { params: Promise<{ categoryId: string }> },
) {
    try {
        const body = await request.json();
        const { categoryId } = await params;

        if (!categoryId) {
            return new NextResponse(
                JSON.stringify({ error: "Category ID is required" }),
                { status: 400, headers: { "Content-Type": "application/json" } },
            );
        }

        const validatedData = updateCategorySchema.parse(body);

        const category = await prisma.category.update({
            where: {
                id: categoryId,
            },
            data: validatedData,
        });

        return new NextResponse(JSON.stringify({ data: category }), {
            status: 200,
            headers: { "Content-Type": "application/json" },
        });
    } catch (error) {
        console.error("[CATEGORY_PATCH]", error);

        if (error instanceof z.ZodError) {
            return new NextResponse(
                JSON.stringify({ error: "Validation error", details: error.errors }),
                { status: 400, headers: { "Content-Type": "application/json" } },
            );
        }

        if (error instanceof Prisma.PrismaClientKnownRequestError) {
            if (error.code === "P2025") {
                return new NextResponse(
                    JSON.stringify({ error: "Category not found" }),
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

// DELETE
export async function DELETE(
    request: Request,
    { params }: { params: Promise<{ categoryId: string }> },
) {
    try {
        const { categoryId } = await params;

        if (!categoryId) {
            return NextResponse.json(
                { error: "Category ID is required" },
                { status: 400 },
            );
        }

        // Delete related cart items first
        // await prisma.cartItem.deleteMany({
        //     where: {
        //         categoryId: categoryId,
        //     },
        // });

        // Delete related order items
        // await prisma.orderItem.deleteMany({
        //     where: {
        //         categoryId: categoryId,
        //     },
        // });

        // Now we can safely delete the category
        await prisma.category.delete({
            where: {
                id: categoryId,
            },
        });

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error("[CATEGORY_DELETE]", (error as Error).message);

        if (error instanceof Prisma.PrismaClientKnownRequestError) {
            if (error.code === "P2025") {
                return NextResponse.json(
                    { error: "Category not found" },
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

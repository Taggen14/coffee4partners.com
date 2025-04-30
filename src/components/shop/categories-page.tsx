"use client";

import { useCategories } from "@/hooks/use-categories";
import { useProducts } from "@/hooks/use-products";
import { Loader2 } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default function CategoriesPage() {
  const { categories, isLoading: categoriesLoading } = useCategories();
  const { products, isLoading: productsLoading } = useProducts();

  if (categoriesLoading || productsLoading) {
    return (
      <div className="container py-8">
        <div className="flex h-96 items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
        </div>
      </div>
    );
  }

  return (
    <div className="container py-8">
      <div className="space-y-8">
        <div className="space-y-4">
          <h1 className="text-3xl font-bold">Produktkategorier</h1>
          <p className="text-muted-foreground">
            Utforska vårt breda sortiment av produkter inom olika kategorier.
          </p>
        </div>

        <div className="grid gap-6 grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {categories?.map((category) => {
            const categoryProducts = products?.filter((product) => product.categoryId === category.id);
            const productCount = categoryProducts?.length || 0;
            const firstProduct = categoryProducts?.[0];
            const coverImage = firstProduct?.images?.[0] || "/product-placeholder.png";

            return (
              <Link
                key={category.id}
                href={`/shop/${category.categorySlug}`}
                className="group relative overflow-hidden rounded-lg border bg-card transition-colors hover:bg-accent py-4">
                <div className="aspect-[4/3] relative overflow-hidden">
                  <Image
                    src={coverImage}
                    alt={category.name}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
                <div className="p-6">
                  <h2 className="text-xl font-semibold">{category.name}</h2>
                  {category.description && (
                    <p className="mt-2 text-sm text-muted-foreground">
                      {category.description}
                    </p>
                  )}
                  <p className="mt-4 text-sm font-medium text-primary">
                    {productCount}{" "}
                    {productCount === 1 ? "produkt" : "produkter"}
                  </p>
                </div>
              </Link>
            );
          })}
        </div>

        {(!categories || categories.length === 0) && (
          <div className="flex h-96 items-center justify-center text-center">
            <div className="space-y-2">
              <p className="text-lg font-medium">Inga kategorier hittades</p>
              <p className="text-sm text-muted-foreground">
                Det finns inga produktkategorier tillgängliga just nu.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

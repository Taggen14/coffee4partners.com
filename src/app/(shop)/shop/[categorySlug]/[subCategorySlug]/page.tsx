"use client";

import { useParams } from "next/navigation";
import { ProductCard } from "@/components/shop/product-card";
import { useProducts } from "@/hooks/use-products";
import { useCategories } from "@/hooks/use-categories";
import { Loader2, ArrowLeft } from "lucide-react";
import { useCart } from "@/store/use-cart";
import { ExtendedProduct } from "@/types";
import Link from "next/link";
import { slugify } from "@/lib/utils";

export default function CategoryPage() {
  const params = useParams<{ categorySlug: string, subCategorySlug: string }>();
  const { products, isLoading: productsLoading } = useProducts();
  const { categories, isLoading: categoriesLoading } = useCategories();
  const { addItem } = useCart();

  // Get current category
  const currentCategory = categories?.find((c) => c.categorySlug === params.categorySlug);
  const currentSubCategory = currentCategory?.subCategories.find((subC) => slugify(subC.name) === params.subCategorySlug);
  const subCategoryProducts = currentCategory?.subCategories
    .map((subCategory) => (products?.filter((product) => product.subCategoryId === subCategory.id)))
    .flat()
    .filter((product): product is ExtendedProduct => product !== undefined);

  // Filter products by category
  const filteredSubCategoryProducts = products?.filter((product) => product.subCategoryId === currentSubCategory?.id);

  const handleAddToCart = async (product: ExtendedProduct) => {
    // Simulate a small delay to show loading state
    await new Promise((resolve) => setTimeout(resolve, 500));

    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.images[0] || "/product-placeholder.png",
    });
  };

  if (productsLoading || categoriesLoading) {
    return (
      <div className="container py-8 md:py-12">
        <div className="flex h-96 items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
        </div>
      </div>
    );
  }

  if (!currentCategory) {
    return (
      <div className="container py-8 md:py-12">
        <div className="flex h-96 flex-col items-center justify-center space-y-4">
          <h1 className="text-2xl font-bold">Kategori hittades inte</h1>
          <p className="text-muted-foreground">
            Kategorin du letar efter finns inte.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="container space-y-8 py-8 relative">
      {/* Back Button */}
      <Link
        href={`/shop/${currentCategory.categorySlug}`}
        className="absolute top-5 left-0 inline-flex items-center text-sm text-muted-foreground transition-colors hover:text-foreground">
        <ArrowLeft className="mr-2 h-4 w-4" />
        Tillbaka till {currentCategory.name}
      </Link>

      {/* Category Header */}
      <div className="space-y-4">
        <h1 className="text-3xl font-bold">{currentSubCategory?.name}</h1>
        <p className="text-muted-foreground">{currentSubCategory?.description}</p>
      </div>

      {/* Products Grid */}
      <div className="gap-2 sm:gap-6 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {filteredSubCategoryProducts?.map((product, i) => (
          <ProductCard
            key={i}
            product={product}
            onAddToCart={handleAddToCart}
          />
        ))}
      </div>

      {/* Empty State */}
      {(!subCategoryProducts || subCategoryProducts.length === 0) && (
        <div className="flex h-96 items-center justify-center text-center">
          <div className="space-y-2">
            <p className="text-lg font-medium">Inga produkter hittades</p>
            <p className="text-sm text-muted-foreground">
              Det finns inga produkter i denna kategori just nu.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

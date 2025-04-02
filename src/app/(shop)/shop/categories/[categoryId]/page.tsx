"use client";

import { useParams } from "next/navigation";
import { ProductCard } from "@/components/shop/product-card";
import { useProducts } from "@/hooks/use-products";
import { useCategories } from "@/hooks/use-categories";
import { Loader2, ArrowLeft } from "lucide-react";
import { useCart } from "@/store/use-cart";
import { ExtendedProduct } from "@/types";
import { toast } from "sonner";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

export default function CategoryPage() {
  const params = useParams<{ categoryId: string }>();
  const { products, isLoading: productsLoading } = useProducts();
  const { categories, isLoading: categoriesLoading } = useCategories();
  const { addItem } = useCart();

  // Filter products by category
  const categoryProducts = products?.filter(
    (product) => product.categoryId === params.categoryId,
  );

  // Get current category
  const currentCategory = categories?.find((c) => c.id === params.categoryId);

  const handleAddToCart = async (product: ExtendedProduct) => {
    // Simulate a small delay to show loading state
    await new Promise((resolve) => setTimeout(resolve, 500));

    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.images[0] || "/product-placeholder.png",
    });

    toast.custom((t) => (
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 20 }}
        className="pointer-events-auto flex w-full max-w-md rounded-lg bg-white shadow-lg ring-1 ring-black/5 dark:bg-zinc-900"
      >
        <div className="w-0 flex-1 p-4">
          <div className="flex items-start">
            <div className="flex-shrink-0 pt-0.5">
              <div className="relative h-10 w-10 overflow-hidden rounded-full">
                <Image
                  src={product.images[0] || "/placeholder.png"}
                  alt={product.name}
                  fill
                  className="object-cover"
                />
              </div>
            </div>
            <div className="ml-3 flex-1">
              <p className="text-sm font-medium">Lagd i varukorgen</p>
              <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                {product.name}
              </p>
            </div>
          </div>
        </div>
        <div className="flex border-l border-gray-200 dark:border-gray-800">
          <button
            onClick={() => toast.dismiss(t)}
            className="flex w-full items-center justify-center rounded-none rounded-r-lg border border-transparent p-4 text-sm font-medium text-blue-600 hover:text-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:text-blue-400 dark:hover:text-blue-300"
          >
            Stäng
          </button>
        </div>
      </motion.div>
    ));
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
    <div className="container space-y-8 py-8 md:py-12">
      {/* Back Button */}
      <Link
        href="/shop/categories"
        className="inline-flex items-center text-sm text-muted-foreground transition-colors hover:text-foreground"
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        Tillbaka till kategorier
      </Link>

      {/* Category Header */}
      <div className="space-y-4">
        <h1 className="text-3xl font-bold">{currentCategory.name}</h1>
        {currentCategory.description && (
          <p className="text-muted-foreground">{currentCategory.description}</p>
        )}
      </div>

      {/* Products Grid */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {categoryProducts?.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            onAddToCart={handleAddToCart}
          />
        ))}
      </div>

      {/* Empty State */}
      {(!categoryProducts || categoryProducts.length === 0) && (
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

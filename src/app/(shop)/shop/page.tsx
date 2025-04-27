"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDown, Loader2 } from "lucide-react";
import { useProducts } from "@/hooks/use-products";
import { useCategories } from "@/hooks/use-categories";
import { cn } from "@/lib/utils";
import { useCart } from "@/store/use-cart";
import { ExtendedProduct } from "@/types";
import { ProductCard } from "@/components/shop/product-card";
import CategoriesPage from "./categories/page";
import { Separator } from "@/components/ui/separator";

export default function ShopPage() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const { products, isLoading: productsLoading } = useProducts();
  const { categories, isLoading: categoriesLoading } = useCategories();
  const { addItem } = useCart();

  // Filter products by category
  const filteredProducts = selectedCategory
    ? products?.filter((product) => product.categoryId === selectedCategory)
    : products;

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
      <div className="container">
        <div className="flex h-96 items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
        </div>
      </div>
    );
  }

  return (
    <div className="container space-y-8">

      <CategoriesPage />
      <Separator />
      {/* Mobile Category Selector */}
      <div className="md:hidden">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="w-full justify-between">
              {selectedCategory
                ? categories?.find((c) => c.id === selectedCategory)?.name
                : "All Categories"}
              <ChevronDown className="ml-2 h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-[calc(100vw-2rem)]">
            <DropdownMenuItem onClick={() => setSelectedCategory(null)}>
              All Categories
            </DropdownMenuItem>
            {categories?.map((category) => (
              <DropdownMenuItem
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
              >
                {category.name}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Desktop Categories */}
      <div className="hidden md:block">
        <div className="flex space-x-4">
          <Button
            variant="ghost"
            className={cn(
              "text-muted-foreground",
              !selectedCategory && "bg-muted text-foreground",
            )}
            onClick={() => setSelectedCategory(null)}>
            Alla kategorier
          </Button>
          {categories?.map((category) => (
            <Button
              key={category.id}
              variant="ghost"
              className={cn(
                "text-muted-foreground",
                selectedCategory === category.id && "bg-muted text-foreground",
              )}
              onClick={() => setSelectedCategory(category.id)}
            >
              {category.name}
            </Button>
          ))}
        </div>
      </div>

      {/* Updated Products Grid */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {filteredProducts?.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            onAddToCart={handleAddToCart}
          />
        ))}
      </div>

      {/* Empty State */}
      {filteredProducts?.length === 0 && (
        <div className="flex h-96 items-center justify-center text-center">
          <div className="space-y-2">
            <p className="text-lg font-medium">Inga produkter hittades</p>
            <p className="text-sm text-muted-foreground">
              Prova välj en annan kategori.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

// src/components/shop/product-card.tsx
"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Eye } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AddToCartButton } from "@/components/shop/add-to-cart-button";
import { QuickView } from "@/components/shop/quick-view";
import { ExtendedProduct } from "@/types";

interface ProductCardProps {
  product: ExtendedProduct;
  onAddToCart: (product: ExtendedProduct) => Promise<void>;
}

export function ProductCard({ product, onAddToCart }: ProductCardProps) {
  const [quickViewOpen, setQuickViewOpen] = useState(false);

  return (
    <div className="container">
      <Card className="group flex h-full gap-0 flex-col border-border/50 bg-card transition-colors hover:border-border">
        <CardHeader className="p-0">
          <div className="relative">
            <Link href={`/shop/products/${product.id}`} className="block">
              <div className="relative aspect-square overflow-hidden">
                <Image
                  src={product.images[0] || "/product-placeholder.png"}
                  alt={product.name}
                  fill
                  className="object-cover transition-all duration-500 group-hover:scale-105"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
              </div>
            </Link>
            <Button
              variant="secondary"
              size="icon"
              className="absolute right-2 top-2 z-10 h-8 w-8 rounded-full bg-background/80 backdrop-blur-sm opacity-0 transition-all hover:bg-background hover:scale-105 group-hover:opacity-100 sm:opacity-100"
              onClick={(e) => {
                e.preventDefault();
                setQuickViewOpen(true);
              }}>
              <Eye className="h-4 w-4" />
            </Button>
          </div>
        </CardHeader>
        <CardContent className="flex-1 space-y-4 p-4">
          <div className="space-y-2">
            <Link
              href={`/shop/products/${product.id}`}
              className="block transition-colors hover:text-primary"
            >
              <CardTitle className="text-xs sm:text-lg">
                {product.name}
              </CardTitle>
            </Link>
            <CardDescription className="line-clamp-2 text-xs sm:text-sm text-muted-foreground">
              {product.description}
            </CardDescription>
          </div>
          {/* <div className="flex items-center justify-between">
              <div className="space-y-1">
                <span className="text-lg font-semibold text-foreground">
                  {formatPrice(product.price)}
                </span>
                <p className="text-xs text-muted-foreground">Free shipping</p>
              </div>
              {product.stock > 0 ? (
                <span className="inline-flex items-center rounded-full bg-emerald-50 px-2 py-1 text-xs font-medium text-emerald-700 dark:bg-emerald-950 dark:text-emerald-400">
                  In stock
                </span>
              ) : (
                <span className="inline-flex items-center rounded-full bg-red-50 px-2 py-1 text-xs font-medium text-red-700 dark:bg-red-950 dark:text-red-400">
                  Out of stock
                </span>
              )}
            </div> */}
        </CardContent>
        <CardFooter className="p-4 pt-0">
          <AddToCartButton
            onClick={() => onAddToCart(product)}
            className="w-full text-xs sm:text-sm"
            disabled={!product.stock}
          />
        </CardFooter>
      </Card>

      <QuickView
        product={product}
        open={quickViewOpen}
        onOpenChange={setQuickViewOpen}
        onAddToCart={onAddToCart}
      />
    </div>
  );
}

"use client";

import { notFound, useParams } from "next/navigation";
import {
  ChevronLeft,
  Loader2,
  ShoppingBag,
  Package,
  Tag,
  Truck,
  Clock,
  Shield,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { ProductGallery } from "@/components/shop/product-gallery";
import { AddToCartButton } from "@/components/shop/add-to-cart-button";
import { useCart } from "@/store/use-cart";
import { formatPrice } from "@/lib/utils";
import Link from "next/link";
import { useProduct } from "@/hooks/use-products";
import { cn } from "@/lib/utils";
import { useState, useEffect } from "react";

export default function ProductPage() {
  const { productId } = useParams();
  const { product, isLoading } = useProduct(productId as string);
  const { addItem } = useCart();
  const [isPageLoaded, setIsPageLoaded] = useState(false);

  useEffect(() => {
    setIsPageLoaded(true);
  }, []);

  if (isLoading) {
    return (
      <div className="flex h-[calc(100vh-4rem)] items-center justify-center bg-background/50">
        <div className="text-center">
          <Loader2 className="h-10 w-10 animate-spin text-primary mx-auto mb-4" />
          <p className="text-muted-foreground animate-pulse">
            Laddar produkt...
          </p>
        </div>
      </div>
    );
  }

  if (!product) {
    return notFound();
  }

  const handleAddToCart = async () => {
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.images[0] || "/product-placeholder.png",
    });
  };

  return (
    <div
      className={cn(
        "container max-w-7xl py-8 sm:py-12 px-4 sm:px-6 transition-all duration-700 ease-in-out",
        isPageLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4",
      )}
    >
      {/* Breadcrumb */}
      <div className="mb-6 sm:mb-8 flex items-center gap-2 text-sm text-muted-foreground overflow-x-auto pb-1 scrollbar-hide">
        <Link
          href="/shop"
          className="hover:text-foreground transition-colors whitespace-nowrap"
        >
          Butik
        </Link>
        <span>/</span>
        <Link
          href={`/shop/categories/${product.category?.id}`}
          className="hover:text-foreground transition-colors whitespace-nowrap"
        >
          {product.category?.name}
        </Link>
        <span>/</span>
        <span className="text-foreground font-medium truncate max-w-[150px] sm:max-w-xs whitespace-nowrap">
          {product.name}
        </span>
      </div>

      <div className="mb-6 sm:mb-10 flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6">
        <Button
          variant="outline"
          size="sm"
          asChild
          className="w-fit group rounded-full border-border/80 shadow-sm hover:shadow-md hover:bg-muted/60 transition-all duration-200"
        >
          <Link href="/shop">
            <ChevronLeft className="h-4 w-4 mr-1 group-hover:-translate-x-0.5 transition-transform" />
            <span>Tillbaka</span>
          </Link>
        </Button>
      </div>

      <div className="grid gap-8 sm:gap-12 lg:grid-cols-2 lg:gap-16 xl:gap-20">
        {/* Left column - Product Gallery */}
        <div
          className="lg:sticky lg:top-24 h-fit rounded-xl shadow-sm overflow-hidden 
          bg-gradient-to-b from-background to-muted/20 p-1"
        >
          <div className="overflow-hidden rounded-lg">
            <ProductGallery
              images={product.images}
              productName={product.name}
            />
          </div>
        </div>

        {/* Right column - Product Details */}
        <div className="space-y-8 sm:space-y-10">
          <div>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold tracking-tight leading-tight">
              {product.name}
            </h1>
            <p className="mt-3 sm:mt-4 text-base sm:text-lg text-muted-foreground">
              {product.category?.name}
            </p>
          </div>

          <div className="space-y-6 sm:space-y-8">
            <div className="flex items-center justify-between">
              <div className="flex flex-col">
                <span className="text-sm text-muted-foreground mb-1">Pris</span>
                <span className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-primary">
                  {formatPrice(product.price)}
                </span>
                <span className="text-xs text-muted-foreground mt-1">
                  Inkl. moms
                </span>
              </div>
              <Badge
                variant={product.stock > 0 ? "default" : "destructive"}
                className={cn(
                  "h-7 sm:h-8 px-3 sm:px-4 py-0 text-xs sm:text-sm font-medium flex items-center rounded-full",
                  product.stock > 0
                    ? "bg-primary/10 text-primary hover:bg-primary/20"
                    : "",
                )}
              >
                <span
                  className={cn(
                    "h-1.5 sm:h-2 w-1.5 sm:w-2 rounded-full mr-1.5 sm:mr-2",
                    product.stock > 0
                      ? "bg-primary animate-pulse"
                      : "bg-destructive",
                  )}
                />
                {product.stock > 0
                  ? `${product.stock} i lager`
                  : "Slut i lager"}
              </Badge>
            </div>

            {/* Add to cart */}
            <div className="pt-2 sm:pt-4">
              <AddToCartButton
                onClick={handleAddToCart}
                className={cn(
                  "w-full h-10 sm:h-12 rounded-lg text-sm sm:text-base shadow-md",
                  product.stock > 0
                    ? "bg-primary hover:bg-primary/90 hover:shadow-lg transition-all duration-200"
                    : "bg-muted",
                )}
                disabled={!product.stock}
              />

              {/* Fast delivery notice */}
              <div className="flex items-center justify-center mt-3 sm:mt-4 text-xs sm:text-sm text-muted-foreground gap-1.5">
                <Truck className="h-3 w-3 sm:h-4 sm:w-4" />
                <span>Leverans inom 1-3 arbetsdagar</span>
              </div>
            </div>

            <Separator className="my-6 sm:my-8" />

            {/* Product benefits */}
            <div className="grid grid-cols-2 gap-3 sm:gap-4 text-xs sm:text-sm">
              <div className="flex items-center gap-1.5 sm:gap-2 p-2 sm:p-3 rounded-lg bg-muted/50">
                <Truck className="h-3 w-3 sm:h-4 sm:w-4 text-primary" />
                <span>Beräknas i kassan</span>
              </div>
              <div className="flex items-center gap-1.5 sm:gap-2 p-2 sm:p-3 rounded-lg bg-muted/50">
                <Shield className="h-3 w-3 sm:h-4 sm:w-4 text-primary" />
                <span>Säker betalning</span>
              </div>
              <div className="flex items-center gap-1.5 sm:gap-2 p-2 sm:p-3 rounded-lg bg-muted/50">
                <Clock className="h-3 w-3 sm:h-4 sm:w-4 text-primary" />
                <span>Snabb leverans</span>
              </div>
              <div className="flex items-center gap-1.5 sm:gap-2 p-2 sm:p-3 rounded-lg bg-muted/50">
                <Package className="h-3 w-3 sm:h-4 sm:w-4 text-primary" />
                <span>14 dagars ångerrätt</span>
              </div>
            </div>

            <Separator className="my-2" />

            {/* Description */}
            <div className="space-y-4 sm:space-y-5">
              <h3 className="text-lg sm:text-xl font-semibold flex items-center gap-1.5 sm:gap-2">
                <Tag className="h-4 w-4 sm:h-5 sm:w-5 text-primary" />
                Beskrivning
              </h3>
              <div className="bg-muted/30 p-4 sm:p-5 rounded-xl">
                <p className="text-sm sm:text-base leading-relaxed text-foreground/90">
                  {product.description}
                </p>
              </div>
            </div>

            {/* Details */}
            <div className="space-y-4 sm:space-y-5">
              <h3 className="text-lg sm:text-xl font-semibold flex items-center gap-1.5 sm:gap-2">
                <Package className="h-4 w-4 sm:h-5 sm:w-5 text-primary" />
                Produktdetaljer
              </h3>
              <div className="bg-muted/30 rounded-xl overflow-hidden">
                <ul className="divide-y divide-border/50">
                  <li className="flex items-center justify-between p-3 sm:p-4 hover:bg-muted/50 transition-colors">
                    <span className="text-sm text-muted-foreground">
                      Kategori
                    </span>
                    <span className="text-sm sm:text-base font-medium">
                      {product.category?.name}
                    </span>
                  </li>
                  <li className="flex items-center justify-between p-3 sm:p-4 hover:bg-muted/50 transition-colors">
                    <span className="text-sm text-muted-foreground">
                      Artikelnummer
                    </span>
                    <span className="text-sm sm:text-base font-medium font-mono">
                      {product.id.slice(0, 8).toUpperCase()}
                    </span>
                  </li>
                  <li className="flex items-center justify-between p-3 sm:p-4 hover:bg-muted/50 transition-colors">
                    <span className="text-sm text-muted-foreground">
                      Lagerstatus
                    </span>
                    <span className="text-sm sm:text-base font-medium">
                      {product.stock} st tillgängliga
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Product long description */}
      {product.longDescription && (
        <div className="mt-16 sm:mt-24 mb-8 sm:mb-12">
          <div className="w-full h-[1px] bg-gradient-to-r from-border/0 via-border to-border/0 mb-8 sm:mb-12" />
          <div className="max-w-4xl mx-auto">
            <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold tracking-tight mb-6 sm:mb-8 flex items-center gap-2">
              <ShoppingBag className="h-5 w-5 sm:h-6 sm:w-6 text-primary" />
              Produktinformation
            </h2>
            <div
              className={cn(
                "prose prose-sm sm:prose-base lg:prose-lg max-w-none dark:prose-invert",
                "prose-headings:font-semibold prose-headings:tracking-tight",
                "prose-p:text-foreground/90 prose-p:leading-relaxed",
                "prose-ul:list-disc prose-ul:pl-6",
                "prose-table:border-collapse prose-table:w-full",
                "prose-td:border prose-td:border-border/50 prose-td:p-3",
                "prose-tr:border-b prose-tr:border-border/50",
                "prose-h2:text-xl sm:prose-h2:text-2xl prose-h2:font-bold prose-h2:mt-8",
                "prose-h3:text-lg sm:prose-h3:text-xl prose-h3:font-semibold prose-h3:mt-6",
                "prose-strong:text-foreground prose-strong:font-semibold",
                "prose-a:text-primary prose-a:font-medium prose-a:no-underline hover:prose-a:underline",
              )}
              dangerouslySetInnerHTML={{
                __html: product.longDescription,
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
}

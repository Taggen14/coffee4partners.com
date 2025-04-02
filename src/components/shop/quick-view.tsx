"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { AddToCartButton } from "@/components/shop/add-to-cart-button";
import { ProductGallery } from "@/components/shop/product-gallery";
import { formatPrice } from "@/lib/utils";
import { ExtendedProduct } from "@/types";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ExternalLink } from "lucide-react";

interface QuickViewProps {
  product: ExtendedProduct;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onAddToCart: (product: ExtendedProduct) => Promise<void>;
}

export function QuickView({
  product,
  open,
  onOpenChange,
  onAddToCart,
}: QuickViewProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[90vh] max-w-6xl p-8">
        <DialogHeader className="space-y-1">
          <div className="flex items-start justify-between gap-4">
            <div>
              <DialogTitle className="text-3xl font-bold">
                {product.name}
              </DialogTitle>
              <DialogDescription className="text-lg text-muted-foreground">
                {product.category?.name}
              </DialogDescription>
            </div>
            <Button
              variant="outline"
              asChild
              className="h-auto gap-2 rounded-full px-6 py-2.5 text-base"
            >
              <Link href={`/shop/products/${product.id}`}>
                Se alla detaljer
                <ExternalLink className="h-4 w-4" />
              </Link>
            </Button>
          </div>
        </DialogHeader>

        <div className="mt-8 grid gap-12 md:grid-cols-2">
          {/* Product Gallery */}
          <ProductGallery images={product.images} productName={product.name} />

          {/* Product Info */}
          <div className="flex flex-col">
            <div className="flex-1 space-y-8">
              <div className="flex items-center justify-between">
                <span className="text-4xl font-bold">
                  {formatPrice(product.price)}
                </span>
                <Badge
                  variant={product.stock > 0 ? "default" : "destructive"}
                  className="px-4 py-1.5 text-base font-medium"
                >
                  {product.stock > 0 ? "I lager" : "Slut i lager"}
                </Badge>
              </div>

              <Separator className="my-8" />

              <ScrollArea className="h-[400px] pr-6">
                <div className="space-y-10">
                  <div className="space-y-4">
                    <h4 className="text-base font-medium uppercase tracking-wider text-muted-foreground">
                      Beskrivning
                    </h4>
                    <p className="text-base leading-relaxed">
                      {product.description}
                    </p>
                  </div>

                  <div className="space-y-4">
                    <h4 className="text-base font-medium uppercase tracking-wider text-muted-foreground">
                      Produktinformation
                    </h4>
                    <ul className="grid gap-3 text-base leading-relaxed">
                      <li className="flex items-center justify-between border-b pb-3">
                        <span className="text-muted-foreground">Kategori</span>
                        <span className="font-medium">
                          {product.category?.name}
                        </span>
                      </li>
                      <li className="flex items-center justify-between border-b pb-3">
                        <span className="text-muted-foreground">
                          Artikelnummer
                        </span>
                        <span className="font-medium">
                          {product.id.slice(0, 8).toUpperCase()}
                        </span>
                      </li>
                      <li className="flex items-center justify-between border-b pb-3">
                        <span className="text-muted-foreground">Lager</span>
                        <span className="font-medium">{product.stock} st</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </ScrollArea>
            </div>

            <div className="space-y-4 pt-8">
              <AddToCartButton
                onClick={() => onAddToCart(product)}
                className="w-full h-12 text-base"
                disabled={!product.stock}
              />
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

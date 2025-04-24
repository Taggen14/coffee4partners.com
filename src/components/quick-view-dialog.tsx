"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Product } from "@prisma/client";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Image as ImageIcon } from "lucide-react";
import { formatPrice } from "@/lib/utils";

interface ExtendedProduct extends Omit<Product, "price"> {
  price: number;
  category: {
    id: string;
    name: string;
  };
}

interface QuickViewDialogProps {
  product: ExtendedProduct;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function QuickViewDialog({
  product,
  open,
  onOpenChange,
}: QuickViewDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] p-0">
        <DialogHeader className="px-6 pt-6">
          <DialogTitle>Produkt Detaljer</DialogTitle>
        </DialogHeader>
        <ScrollArea className="max-h-[80vh]">
          <div className="p-6 space-y-6">
            {/* Product Images */}
            <div className="aspect-[4/3] relative rounded-lg overflow-hidden bg-muted">
              {product.images[0] ? (
                <Image
                  src={product.images[0]}
                  alt={product.name}
                  fill
                  className="object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <ImageIcon className="h-16 w-16 text-muted-foreground/50" />
                </div>
              )}
            </div>

            {/* Additional Images */}
            {product.images.length > 1 && (
              <div className="grid grid-cols-4 gap-2">
                {product.images.slice(1).map((image, index) => (
                  <div
                    key={index}
                    className="aspect-square relative rounded-md overflow-hidden bg-muted"
                  >
                    <Image
                      src={image}
                      alt={`${product.name} - Image ${index + 2}`}
                      fill
                      className="object-cover"
                    />
                  </div>
                ))}
              </div>
            )}

            {/* Product Info */}
            <div className="space-y-4">
              <div>
                <h3 className="text-2xl font-semibold">{product.name}</h3>
                <div className="flex items-center gap-2 mt-2">
                  <Badge variant="secondary">{product.category.name}</Badge>
                  <Badge
                    variant={
                      product.stock > 10
                        ? "default"
                        : product.stock > 0
                          ? "secondary"
                          : "destructive"
                    }
                  >
                    {product.stock === 0
                      ? "Slut i Lager"
                      : product.stock <= 10
                        ? "Få i Lager"
                        : "I Lager"}
                    <span className="ml-1 opacity-70">({product.stock})</span>
                  </Badge>
                </div>
              </div>

              <div className="text-3xl font-bold">
                {formatPrice(product.price)}
              </div>

              <Separator />

              <div>
                <h4 className="font-medium mb-2">Beskrivning</h4>
                <p className="text-muted-foreground whitespace-pre-wrap">
                  {product.description}
                </p>
              </div>

              <Separator />

              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Skapad</span>
                  <span>
                    {new Date(product.createdAt).toLocaleDateString(undefined, {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">
                    Senast Uppdaterad
                  </span>
                  <span>
                    {new Date(product.updatedAt).toLocaleDateString(undefined, {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Produkt ID</span>
                  <span className="font-mono">{product.id}</span>
                </div>
              </div>
            </div>
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}

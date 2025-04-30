"use client";

import { useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, X, ZoomIn } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  FullscreenDialog,
  FullscreenDialogContent,
} from "../ui/dialog-fullscreen";
import { DialogTitle } from "../ui/dialog";

interface ProductGalleryProps {
  images: string[];
  productName: string;
}

export function ProductGallery({ images, productName }: ProductGalleryProps) {
  const [selectedImage, setSelectedImage] = useState(0);
  const [fullscreenOpen, setFullscreenOpen] = useState(false);

  const next = () => {
    setSelectedImage((prev) => (prev + 1) % images.length);
  };

  const previous = () => {
    setSelectedImage((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <>
      <div className="relative">
        {/* Main Image */}
        <div className="group relative aspect-square overflow-hidden rounded-xl bg-muted">
          <Image
            src={images[selectedImage] || "/product-placeholder.png"}
            alt={`${productName} - Bild ${selectedImage + 1}`}
            fill
            className="object-cover transition-transform duration-300 hover:scale-105"
            priority
            sizes="(max-width: 768px) 100vw, 50vw"
          />

          {/* Zoom Button */}
          <Button
            variant="secondary"
            size="icon"
            className="absolute right-3 top-3 h-9 w-9 rounded-full opacity-0 transition-all duration-200 hover:scale-110 group-hover:opacity-100 sm:opacity-100"
            onClick={() => setFullscreenOpen(true)}>
            <ZoomIn className="h-5 w-5" />
          </Button>

          {/* Navigation Arrows */}
          {images.length > 1 && (
            <>
              <Button
                variant="secondary"
                size="icon"
                className="absolute left-3 top-1/2 h-9 w-9 -translate-y-1/2 rounded-full opacity-0 transition-all duration-200 hover:scale-110 group-hover:opacity-100 sm:opacity-100"
                onClick={previous}>
                <ChevronLeft className="h-5 w-5" />
              </Button>
              <Button
                variant="secondary"
                size="icon"
                className="absolute right-3 top-1/2 h-9 w-9 -translate-y-1/2 rounded-full opacity-0 transition-all duration-200 hover:scale-110 group-hover:opacity-100 sm:opacity-100"
                onClick={next}>
                <ChevronRight className="h-5 w-5" />
              </Button>
            </>
          )}

          {/* Image Counter */}
          {images.length > 1 && (
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2">
              <div className="rounded-full bg-background/90 px-4 py-1.5 text-sm font-medium backdrop-blur-sm">
                Bild {selectedImage + 1} av {images.length}
              </div>
            </div>
          )}
        </div>

        {/* Thumbnails */}
        {images.length > 1 && (
          <div className="p-1 pt-2 grid grid-cols-4 gap-3">
            {images.map((image, i) => (
              <button
                key={i}
                className={cn(
                  "relative aspect-square overflow-hidden rounded-lg bg-muted transition-all duration-200 hover:scale-105",
                  selectedImage === i && "ring-2 ring-primary ring-offset-2",
                )}
                onClick={() => setSelectedImage(i)}>
                <Image
                  src={image}
                  alt={`${productName} miniatyr ${i + 1}`}
                  fill
                  className="object-cover"
                  sizes="25vw"
                />
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Fullscreen Gallery Dialog */}
      <FullscreenDialog open={fullscreenOpen} onOpenChange={setFullscreenOpen}>
        <FullscreenDialogContent className="h-[95vh] border-none bg-background/90 backdrop-blur-md">
          <DialogTitle className="sr-only">{productName}</DialogTitle>
          <div className="relative h-full w-full">
            {/* Close Button */}
            <Button
              variant="secondary"
              size="icon"
              className="absolute right-6 top-6 z-50 h-10 w-10 rounded-full transition-all duration-200 hover:scale-110"
              onClick={() => setFullscreenOpen(false)}
            >
              <X className="h-5 w-5" />
            </Button>

            {/* Fullscreen Image */}
            <div className="relative h-full w-full">
              <Image
                src={images[selectedImage] || "/product-placeholder.png"}
                alt={`${productName} - Bild ${selectedImage + 1}`}
                fill
                className="object-contain"
                priority
                sizes="100vw"
                quality={90}
              />
            </div>

            {/* Navigation Arrows */}
            {images.length > 1 && (
              <>
                <Button
                  variant="secondary"
                  size="icon"
                  className="absolute left-6 top-1/2 h-12 w-12 -translate-y-1/2 rounded-full transition-all duration-200 hover:scale-110"
                  onClick={previous}
                >
                  <ChevronLeft className="h-7 w-7" />
                </Button>
                <Button
                  variant="secondary"
                  size="icon"
                  className="absolute right-6 top-1/2 h-12 w-12 -translate-y-1/2 rounded-full transition-all duration-200 hover:scale-110"
                  onClick={next}
                >
                  <ChevronRight className="h-7 w-7" />
                </Button>
              </>
            )}

            {/* Image Counter */}
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2">
              <div className="rounded-full bg-background/90 px-5 py-2 text-base font-medium backdrop-blur-sm">
                Bild {selectedImage + 1} av {images.length}
              </div>
            </div>

            {/* Thumbnails */}
            <div className="absolute bottom-20 left-1/2 -translate-x-1/2">
              <div className="flex gap-3 rounded-full bg-background/90 p-2.5 backdrop-blur-sm">
                {images.map((image, i) => (
                  <button
                    key={i}
                    className={cn(
                      "relative h-20 w-20 overflow-hidden rounded-lg transition-all duration-200 hover:scale-105",
                      selectedImage === i &&
                      "ring-2 ring-primary ring-offset-2",
                    )}
                    onClick={() => setSelectedImage(i)}
                  >
                    <Image
                      src={image}
                      alt={`${productName} miniatyr ${i + 1}`}
                      fill
                      className="object-cover"
                      sizes="80px"
                    />
                  </button>
                ))}
              </div>
            </div>
          </div>
        </FullscreenDialogContent>
      </FullscreenDialog>
    </>
  );
}

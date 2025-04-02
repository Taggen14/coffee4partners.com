"use client";

import { CldImage } from "next-cloudinary";
import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { useState, useEffect } from "react";

interface Image {
  url: string;
  alt: string;
}

interface Images {
  images: Image[];
}

const ImageCarousel = ({ images }: Images) => {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!api) return;

    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap());

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap());
    });
  }, [api, images.length]);

  // Funktion för att få de 3 föregående och 3 nästa bilderna
  const previews = () => {
    const total = images.length;

    return Array.from({ length: 5 }, (_, i) => {
      const index = (current - 2 + i + total) % total;
      return { index, ...images[index] };
    });
  };

  return (
    <div>
      <Carousel setApi={setApi}>
        <CarouselContent>
          {images.map((img, i) => (
            <CarouselItem key={i}>
              <div className="relative h-96 rounded-lg">
                <CldImage
                  src={img.url}
                  alt={img.alt}
                  fill
                  preserveTransformations
                  className="object-contain m-0 rounded-lg"
                />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious
          className="absolute left-4 top-1/2 -translate-y-1/2 z-10"
          onClick={() =>
            api?.scrollTo((current - 1 + images.length) % images.length)
          }
        />
        <CarouselNext
          className="absolute right-4 top-1/2 -translate-y-1/2 z-10"
          onClick={() => api?.scrollTo((current + 1) % images.length)}
        />
      </Carousel>
      <div className="mt-4 flex justify-center gap-2">
        {previews().map((img) => (
          <button key={img.index} onClick={() => api?.scrollTo(img.index)}>
            <div
              className={`relative w-16 h-16 border rounded overflow-hidden transition ${img.index === current ? "opacity-100 border-2 border-primary" : "opacity-60 hover:opacity-100"}`}
            >
              <CldImage
                src={img.url}
                alt={img.alt}
                fill
                className="object-cover m-0"
                preserveTransformations
              />
            </div>
          </button>
        ))}
      </div>
      <div className="text-center">
        <span>
          {current + 1} / {count}
        </span>
      </div>
    </div>
  );
};

export default ImageCarousel;

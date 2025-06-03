import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Search,
  X,
  ShoppingBag,
  List,
  SearchX,
  Loader2,
  Tag,
  Package,
} from "lucide-react";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useInView } from "react-intersection-observer";
import Image from "next/image";
import { formatPrice, slugify } from "@/lib/utils";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import { motion, AnimatePresence } from "framer-motion";

interface SearchSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function SearchSheet({ open, onOpenChange }: SearchSheetProps) {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const { ref, inView } = useInView();
  const inputRef = useRef<HTMLInputElement>(null);

  // Focus input when sheet opens
  useEffect(() => {
    if (open && inputRef.current) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 100);
    }
  }, [open]);

  const {
    data: searchResults,
    isLoading: isSearchLoading,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ["search", searchQuery],
    queryFn: async ({ pageParam = 1 }) => {
      const response = await fetch(
        `/api/products/search?q=${encodeURIComponent(searchQuery)}&page=${pageParam}&limit=10`,
      );
      if (!response.ok) {
        throw new Error("Failed to fetch search results");
      }
      return response.json();
    },
    getNextPageParam: (lastPage) => {
      if (lastPage.hasMore) {
        return lastPage.nextPage;
      }
      return undefined;
    },
    initialPageParam: 1,
    enabled: open,
    staleTime: 1000 * 60 * 5,
  });

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, isFetchingNextPage, fetchNextPage]);

  const allProducts =
    searchResults?.pages.flatMap((page) => page.products) ?? [];

  const handleViewAllProducts = () => {
    onOpenChange(false);
    router.push("/shop/search?q=");
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") {
      onOpenChange(false);
    }
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent
        side="top"
        className="h-[85vh] p-0 border-none shadow-2xl rounded-b-xl"
      >
        <div className="flex h-full flex-col">
          <div className="flex items-center border-b px-6 py-2 bg-background/95 sticky top-0 z-10">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground/70" />
              <Input
                ref={inputRef}
                placeholder="Sök produkter..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={handleKeyDown}
                className="h-16 w-full rounded-xl border border-border/50 bg-transparent pl-12 pr-12 text-lg shadow-sm outline-none placeholder:text-muted-foreground/70 focus-visible:ring-1 focus-visible:ring-primary/40 focus-visible:border-primary/30 transition-all duration-200"
              />
              {searchQuery && (
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="absolute right-2 top-1/2 h-8 w-8 -translate-y-1/2 rounded-full opacity-70 transition-opacity hover:opacity-100 hover:bg-accent"
                  onClick={() => setSearchQuery("")}
                >
                  <X className="h-4 w-4" />
                  <span className="sr-only">Rensa sök</span>
                </Button>
              )}
            </div>
          </div>
          <div className="flex-1 overflow-y-auto px-4 md:px-6">
            {isSearchLoading ? (
              <div className="flex flex-col items-center justify-center h-[50vh] space-y-3">
                <div className="relative">
                  <div className="h-12 w-12 rounded-full border-2 border-primary/30 animate-ping absolute inset-0"></div>
                  <Loader2 className="h-12 w-12 animate-spin text-primary" />
                </div>
                <p className="text-sm text-muted-foreground font-medium">
                  Söker efter produkter...
                </p>
              </div>
            ) : allProducts.length > 0 ? (
              <div className="max-w-4xl mx-auto">
                <div className="py-5">
                  <div className="flex items-center gap-2 py-2 text-sm font-medium text-foreground">
                    <Package className="h-4 w-4 text-primary" />
                    <span>Snabbåtgärd</span>
                  </div>
                  <div className="mt-2 grid grid-cols-2 sm:grid-cols-4 gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      className="justify-start gap-2 h-9 text-xs hover:bg-accent/50"
                      onClick={handleViewAllProducts}
                    >
                      <ShoppingBag className="h-3.5 w-3.5 text-primary" />
                      <span>Alla produkter</span>
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="justify-start gap-2 h-9 text-xs hover:bg-accent/50"
                      onClick={() => {
                        onOpenChange(false);
                        router.push("/shop");
                      }}
                    >
                      <List className="h-3.5 w-3.5 text-primary" />
                      <span>Kategorier</span>
                    </Button>
                  </div>
                </div>

                <div className="py-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 py-2 text-sm font-medium text-foreground">
                      <Tag className="h-4 w-4 text-primary" />
                      <span>Produkter</span>
                      <span className="ml-1 rounded-full bg-muted px-1.5 py-0.5 text-xs text-muted-foreground">
                        {allProducts.length}
                      </span>
                    </div>

                    {hasNextPage && !isFetchingNextPage && (
                      <span className="text-xs text-muted-foreground">
                        Skrolla för att se mer
                      </span>
                    )}
                  </div>

                  <AnimatePresence>
                    <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3.5">
                      {allProducts.map((product, index) => (
                        <motion.div
                          key={product.id}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.15, delay: index * 0.03 }}
                          className="h-full"
                        >
                          <div
                            className="h-full border border-border/30 hover:border-border/60 hover:bg-accent/40 group transition-all duration-200 rounded-lg shadow-sm hover:shadow cursor-pointer"
                            onClick={() => {
                              onOpenChange(false);
                              router.push(
                                `/shop/${slugify(product.category.name)}/${slugify(product.subCategory.name)}/${product.id}`,
                              );
                            }}
                          >
                            <div className="flex items-start p-3 gap-3">
                              <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-md border bg-muted group-hover:scale-105 transition-transform duration-200">
                                <Image
                                  src={
                                    product.images[0] ||
                                    "/product-placeholder.png"
                                  }
                                  alt={product.name}
                                  fill
                                  className="object-cover"
                                />
                              </div>
                              <div className="flex-1 overflow-hidden">
                                <p className="truncate text-sm font-medium group-hover:text-primary transition-colors">
                                  {product.name}
                                </p>
                                <div className="mt-1.5 flex flex-wrap items-center gap-1.5">
                                  <p className="text-xs font-medium text-primary">
                                    {formatPrice(product.price)}
                                  </p>
                                  {product.category?.name && (
                                    <div className="flex items-center">
                                      <span className="mx-1 h-1 w-1 rounded-full bg-muted-foreground/30"></span>
                                      <p className="truncate text-xs text-muted-foreground">
                                        {product.category.name}
                                      </p>
                                    </div>
                                  )}
                                </div>
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </AnimatePresence>

                  {hasNextPage && (
                    <div
                      ref={ref}
                      className="mt-6 flex items-center justify-center py-2"
                    >
                      {isFetchingNextPage && (
                        <div className="flex items-center gap-2">
                          <Loader2 className="h-4 w-4 animate-spin text-primary" />
                          <span className="text-xs text-muted-foreground">
                            Laddar mer produkter...
                          </span>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center h-[50vh]">
                <div className="bg-muted/50 p-5 rounded-full mb-5">
                  <SearchX className="h-10 w-10 text-muted-foreground/60" />
                </div>
                <h3 className="text-lg font-medium mb-1">
                  Inga produkter hittades
                </h3>
                <p className="text-sm text-muted-foreground mb-6 text-center max-w-xs">
                  {searchQuery.trim()
                    ? `We couldn't find any products matching "${searchQuery}"`
                    : "Try searching for products by name, category, or description"}
                </p>
                <div className="flex gap-3">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleViewAllProducts}
                    className="h-9"
                  >
                    <ShoppingBag className="h-3.5 w-3.5 mr-1.5" />
                    Visa alla produkter
                  </Button>
                  {searchQuery.trim() && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setSearchQuery("")}
                      className="h-9"
                    >
                      <X className="h-3.5 w-3.5 mr-1.5" />
                      Rensa sök
                    </Button>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}

"use client";

import { Suspense, useState, useEffect, useRef } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useInView } from "react-intersection-observer";
import { ProductCard } from "@/components/shop/product-card";
import { useCart } from "@/store/use-cart";
import {
  Loader2,
  Search,
  SlidersHorizontal,
  ShoppingBag,
  ArrowLeft,
  X,
  Tag,
} from "lucide-react";
import { ExtendedProduct } from "@/types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetClose,
} from "@/components/ui/sheet";
import { motion, AnimatePresence } from "framer-motion";
import { useDebounce } from "@/hooks/use-debounce";

function SearchContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const query = searchParams.get("q") || "";
  const [searchQuery, setSearchQuery] = useState(query);
  const debouncedSearchQuery = useDebounce(searchQuery, 300);
  const [sortOrder, setSortOrder] = useState<string>("relevance");
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);
  const { ref, inView } = useInView();
  const inputRef = useRef<HTMLInputElement>(null);

  const { addItem } = useCart();

  const {
    data: searchResults,
    isLoading,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ["search", debouncedSearchQuery],
    queryFn: async ({ pageParam = 1 }) => {
      const response = await fetch(
        `/api/products/search?q=${encodeURIComponent(
          debouncedSearchQuery,
        )}&page=${pageParam}&limit=12`,
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
    staleTime: 1000 * 60 * 5,
  });

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, isFetchingNextPage, fetchNextPage]);

  useEffect(() => {
    if (debouncedSearchQuery !== query) {
      router.push(`/shop/search?q=${encodeURIComponent(debouncedSearchQuery)}`);
    }
  }, [debouncedSearchQuery, query, router]);

  const allProducts =
    searchResults?.pages.flatMap((page) => page.products) ?? [];

  // Sort products based on the selected sort order
  const sortedProducts = [...allProducts].sort((a, b) => {
    switch (sortOrder) {
      case "price-asc":
        return a.price - b.price;
      case "price-desc":
        return b.price - a.price;
      case "name-asc":
        return a.name.localeCompare(b.name);
      case "name-desc":
        return b.name.localeCompare(a.name);
      default:
        return 0;
    }
  });

  const handleAddToCart = async (product: ExtendedProduct) => {
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.images[0] || "/product-placeholder.png",
    });
  };

  return (
    <div className="container space-y-6 py-8 md:py-12">
      {/* Header Section */}
      <div className="flex flex-col space-y-2">
        <div className="flex items-center space-x-2">
          <Button
            variant="ghost"
            size="icon"
            className="mr-2 h-8 w-8"
            onClick={() => router.back()}
          >
            <ArrowLeft className="h-4 w-4" />
            <span className="sr-only">Tillbaka</span>
          </Button>
          <h1 className="text-2xl font-bold">Sökresultat</h1>
        </div>
        <p className="text-muted-foreground">
          {allProducts.length} resultat för{" "}
          {debouncedSearchQuery
            ? `"${debouncedSearchQuery}"`
            : "alla produkter"}
        </p>
      </div>

      {/* Search and Filter Bar */}
      <div className="flex flex-col space-y-4 rounded-lg border bg-card p-4 sm:flex-row sm:items-center sm:justify-between sm:space-y-0">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            ref={inputRef}
            type="search"
            placeholder="Sök produkter..."
            className="pl-9"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <div className="flex items-center space-x-2">
          <Select value={sortOrder} onValueChange={setSortOrder}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Sortera efter" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="relevance">Relevans</SelectItem>
              <SelectItem value="price-asc">Pris: Lågt till högt</SelectItem>
              <SelectItem value="price-desc">Pris: Högt till lågt</SelectItem>
              <SelectItem value="name-asc">Namn: A till Ö</SelectItem>
              <SelectItem value="name-desc">Namn: Ö till A</SelectItem>
            </SelectContent>
          </Select>

          <Sheet open={isFiltersOpen} onOpenChange={setIsFiltersOpen}>
            <SheetTrigger asChild>
              <Button variant="outline" size="sm" className="gap-2">
                <SlidersHorizontal className="h-4 w-4" />
                <span className="hidden sm:inline">Filter</span>
              </Button>
            </SheetTrigger>
            <SheetContent>
              <SheetHeader>
                <SheetTitle>Filter</SheetTitle>
              </SheetHeader>
              <div className="grid gap-4 py-4">
                {/* Filter options would go here - price range, categories, etc. */}
                <p className="text-sm text-muted-foreground">
                  Filteralternativ kommer snart...
                </p>
              </div>
              <div className="flex justify-end space-x-2">
                <SheetClose asChild>
                  <Button variant="outline">Avbryt</Button>
                </SheetClose>
                <SheetClose asChild>
                  <Button>Tillämpa filter</Button>
                </SheetClose>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>

      {/* Results */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-sm font-medium text-foreground">
            <Tag className="h-4 w-4 text-primary" />
            <span>Produkter</span>
            <span className="ml-1 rounded-full bg-muted px-1.5 py-0.5 text-xs text-muted-foreground">
              {sortedProducts.length}
            </span>
          </div>

          {hasNextPage && !isFetchingNextPage && (
            <span className="text-xs text-muted-foreground">
              Scrolla för mer
            </span>
          )}
        </div>

        {isLoading ? (
          <div className="flex h-96 flex-col items-center justify-center space-y-4 rounded-lg border border-dashed">
            <div className="relative">
              <div className="h-12 w-12 rounded-full border-2 border-primary/30 animate-ping absolute inset-0"></div>
              <Loader2 className="h-12 w-12 animate-spin text-primary" />
            </div>
            <p className="text-sm text-muted-foreground font-medium">
              Söker produkter...
            </p>
          </div>
        ) : sortedProducts?.length ? (
          <>
            <AnimatePresence>
              <div className="gap-2 sm:gap-6 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                {sortedProducts.map((product, index) => (
                  <motion.div
                    key={product.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.15, delay: index * 0.03 }}
                  >
                    <ProductCard
                      product={product}
                      onAddToCart={handleAddToCart}
                    />
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
                      Laddar fler produkter...
                    </span>
                  </div>
                )}
              </div>
            )}
          </>
        ) : (
          <div className="flex h-96 flex-col items-center justify-center space-y-4 rounded-lg border border-dashed p-8 text-center">
            <div className="rounded-full bg-muted p-6">
              <ShoppingBag className="h-10 w-10 text-muted-foreground" />
            </div>
            <div className="space-y-2">
              <h3 className="text-xl font-medium">Inga produkter hittades</h3>
              <p className="text-sm text-muted-foreground">
                {debouncedSearchQuery
                  ? "Prova att söka med andra sökord"
                  : "Det finns inga produkter tillgängliga för tillfället."}
              </p>
            </div>
            {debouncedSearchQuery && (
              <Button
                variant="outline"
                className="mt-2"
                onClick={() => setSearchQuery("")}
              >
                <X className="mr-2 h-4 w-4" />
                Rensa sökning
              </Button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default function SearchPage() {
  return (
    <Suspense
      fallback={
        <div className="container py-8 md:py-12">
          <div className="flex h-96 flex-col items-center justify-center space-y-4">
            <Loader2 className="h-10 w-10 animate-spin text-primary/70" />
            <p className="text-muted-foreground">Laddar produkter...</p>
          </div>
        </div>
      }
    >
      <SearchContent />
    </Suspense>
  );
}

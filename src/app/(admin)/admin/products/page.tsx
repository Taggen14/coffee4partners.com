"use client";

import { ProductsDataTable } from "@/components/admin/products-data-table";
import { useProducts } from "@/hooks/use-products";
import { Loader2 } from "lucide-react";

export default function ProductsPage() {
  const { products, isLoading } = useProducts();

  if (isLoading) {
    return (
      <div className="container mx-auto py-10 flex items-center justify-center min-h-[400px]">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    );
  }

  if (!products) {
    return (
      <div className="container mx-auto py-10 flex items-center justify-center min-h-[400px]">
        <p className="text-muted-foreground">No products found</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-10">
      <ProductsDataTable data={products} />
    </div>
  );
}

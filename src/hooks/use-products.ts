import { queryClient } from "@/lib/react-query";
import { ExtendedProduct } from "@/types";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useMemo } from "react";
import { toast } from "sonner";

export const useProducts = (searchQuery?: string, options?: { admin?: boolean },) => {
  const endpoint = options?.admin ? "/api/admin/products" : "/api/products";
  const { data: products, isLoading, refetch, } = useQuery<ExtendedProduct[]>({
    queryKey: ["products", endpoint],
    queryFn: async () => {
      const response = await fetch(endpoint);
      if (!response.ok) {
        throw new Error("Failed to fetch products");
      }
      return response.json();
    },
  });

  // Memoized filtered products
  const filteredProducts = useMemo(() => {
    if (!searchQuery?.trim() || !products) return products;

    const query = searchQuery.toLowerCase().trim();
    return products.filter((product) => {
      const searchableText = [
        product.name,
        product.description,
        product.category?.name,
      ]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();

      // Split search query into words and check if all words are present
      const searchWords = query.split(/\s+/);
      return searchWords.every((word) => searchableText.includes(word));
    });
  }, [products, searchQuery]);

  const createProduct = useMutation({
    mutationFn: async (data: Partial<ExtendedProduct>) => {
      const response = await fetch("/api/admin/products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error("Failed to create product");
      }

      return response.json();
    },
    onSuccess: () => {
      // Force an immediate refetch
      queryClient.invalidateQueries({ queryKey: ["products", endpoint] });
      refetch();
      toast.success("Product created successfully");
    },
    onError: (error: Error) => {
      toast.error(error.message);
    },
  });

  const updateProduct = useMutation({
    mutationFn: async ({
      productId,
      data,
    }: {
      productId: string;
      data: Partial<ExtendedProduct>;
    }) => {
      const response = await fetch(`/api/admin/products/${productId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || "Failed to update product");
      }

      const result = await response.json();
      return result.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products", endpoint] });
      refetch();
      toast.success("Product updated successfully");
    },
    onError: (error: Error) => {
      toast.error(error.message);
    },
  });

  const deleteProducts = useMutation({
    mutationFn: async (productIds: string[]) => {
      for (const id of productIds) {
        const response = await fetch(`/api/admin/products/${id}`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.error || `Failed to delete product ${id}`);
        }
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products", endpoint] });
      refetch();
      toast.success("Products deleted successfully");
    },
    onError: (error: Error) => {
      console.error("Delete error:", error);
      toast.error(error.message);
    },
  });

  return {
    products: filteredProducts,
    isLoading,
    refetch,
    createProduct,
    updateProduct,
    deleteProducts,
  };
};

export const useProduct = (productId: string) => {
  const { products, isLoading } = useProducts(undefined, { admin: true });

  const product = useMemo(
    () => products?.find((p) => p.id === productId),
    [products, productId],
  );

  return {
    product,
    isLoading,
  };
};

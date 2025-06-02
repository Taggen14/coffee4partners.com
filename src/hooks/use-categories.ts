import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Category, SubCategory } from "@prisma/client";
import { slugify } from "@/lib/utils";
import { useCategoriesTypes } from "@/types";

export const useCategories = () => {
  const queryClient = useQueryClient();

  // GET
  const { data: categories, isLoading, refetch } = useQuery<useCategoriesTypes[]>({
    queryKey: ["categories"],
    queryFn: async () => {
      const response = await fetch("/api/admin/categories");
      if (!response.ok) {
        throw new Error("Failed to fetch categories");
      }
      const data: (Category & {
        subCategories: SubCategory[],
        _count: {
          products: number;
        };
      })[] = await response.json();

      return data.map((category) => ({
        ...category,
        categorySlug: slugify(category.name),
      }));
    },
  });

  // POST
  const createCategory = useMutation({
    mutationFn: async (newCategory: Partial<useCategoriesTypes>) => {
      const res = await fetch("/api/admin/categories", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newCategory),
      });
      if (!res.ok) throw new Error("Failed to create category");
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["categories"] });
    },
  });

  // PATCH
  const updateCategory = useMutation({
    mutationFn: async ({ categoryId, data }: {
      categoryId: string, data: Partial<useCategoriesTypes>
    }) => {
      const res = await fetch(`/api/admin/categories/${categoryId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error("Failed to update category");
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["categories"] });
    },
  });

  // DELETE
  const deleteCategory = useMutation({
    mutationFn: async (id: string) => {
      const res = await fetch(`/api/admin/categories/${id}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Failed to delete category");
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["categories"] });
    },
  });

  return {
    categories,
    isLoading,
    refetch,
    createCategory,
    updateCategory,
    deleteCategory,
  };
};

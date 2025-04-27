import { useQuery } from "@tanstack/react-query";
import { Category } from "@prisma/client";
import { slugify } from "@/lib/utils";

type CategoryWithSlug = Category & { categorySlug: string };

export const useCategories = () => {
  const { data: categories, isLoading } = useQuery<CategoryWithSlug[]>({
    queryKey: ["categories"],
    queryFn: async () => {
      const response = await fetch("/api/categories");
      if (!response.ok) {
        throw new Error("Failed to fetch categories");
      } const data: Category[] = await response.json();

      return data.map((category) => ({
        ...category,
        categorySlug: slugify(category.name),
      }));
    },
  });

  return {
    categories,
    isLoading,
  };
};

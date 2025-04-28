import { useQuery } from "@tanstack/react-query";
import { Category, SubCategory } from "@prisma/client";
import { slugify } from "@/lib/utils";

type CategorySlugSubCategory = Category & {
  categorySlug: string,
  subCategories: SubCategory[]
};

export const useCategories = () => {
  const { data: categories, isLoading } = useQuery<CategorySlugSubCategory[]>({
    queryKey: ["categories"],
    queryFn: async () => {
      const response = await fetch("/api/categories");
      if (!response.ok) {
        throw new Error("Failed to fetch categories");
      }
      const data: (Category & { subCategories: SubCategory[] })[] = await response.json();

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

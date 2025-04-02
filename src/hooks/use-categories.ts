import { useQuery } from "@tanstack/react-query";

export interface Category {
  id: string;
  name: string;
  slug: string;
  description?: string;
}

export const useCategories = () => {
  const { data: categories, isLoading } = useQuery<Category[]>({
    queryKey: ["categories"],
    queryFn: async () => {
      const response = await fetch("/api/categories");
      if (!response.ok) {
        throw new Error("Failed to fetch categories");
      }
      return response.json();
    },
  });

  return {
    categories,
    isLoading,
  };
};

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { SubCategory } from "@prisma/client";

export const useSubCategories = () => {
    const queryClient = useQueryClient();

    // GET
    const { data: subCategories, isLoading, refetch } = useQuery<(SubCategory & { _count: { products: number } })[]>({
        queryKey: ["subCategories"],
        queryFn: async () => {
            console.log('use-sub-categories hook')
            const response = await fetch("/api/admin/sub-categories");
            if (!response.ok) {
                throw new Error("Failed to fetch subCategories");
            }
            const data: (SubCategory & { _count: { products: number } })[] = await response.json();

            return data.map((subCategory) => ({
                ...subCategory,
            }));
        },
    });

    // POST
    const createSubCategory = useMutation({
        mutationFn: async (newSubCategory: Partial<SubCategory>) => {
            const res = await fetch("/api/admin/sub-categories", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(newSubCategory),
            });
            if (!res.ok) throw new Error("Failed to create category");
            return res.json();
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["subCategories"] });
        },
    });

    // PATCH
    const updateSubCategory = useMutation({
        mutationFn: async ({ categoryId, data }: {
            categoryId: string, data: Partial<SubCategory>
        }) => {
            console.log('useCategories updateCategory PATCH: ')
            const res = await fetch(`/api/admin/sub-categories/${categoryId}`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data),
            });
            if (!res.ok) throw new Error("Failed to update category");
            return res.json();
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["subCategories"] });
        },
    });

    // DELETE
    const deleteSubCategory = useMutation({
        mutationFn: async (id: string) => {
            const res = await fetch(`/api/admin/sub-categories/${id}`, {
                method: "DELETE",
            });
            if (!res.ok) throw new Error("Failed to delete category");
            return res.json();
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["subCategories"] });
        },
    });

    return {
        subCategories,
        isLoading,
        refetch,
        createSubCategory,
        updateSubCategory,
        deleteSubCategory,
    };
};

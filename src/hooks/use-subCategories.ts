import { useQuery } from "@tanstack/react-query";
import { SubCategory } from "@prisma/client";

export const useSubCategories = () => {
    const { data: subCategories, isLoading } = useQuery<SubCategory[]>({
        queryKey: ["subCategories"],
        queryFn: async () => {
            const response = await fetch("/api/subCategories");
            if (!response.ok) {
                throw new Error("Failed to fetch subCategories");
            }
            return response.json();
        },
    });
    const isSubCatLoading = isLoading

    return {
        subCategories,
        isSubCatLoading,
    };
};

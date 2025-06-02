import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { User } from "@/types";

export const useUsers = () => {
    const queryClient = useQueryClient();

    // GET
    const { data: users, isLoading, refetch } = useQuery<User[]>({
        queryKey: ["users"], queryFn: async () => {
            const response = await fetch("/api/admin/users");
            if (!response.ok) {
                throw new Error("Failed to fetch users");
            }
            const data: { users: User[] } = await response.json();

            console.log('data: ', data.users)
            return data.users
        },
    });

    // POST user
    const createUser = useMutation({
        mutationFn: async ({ email }: { email: string }) => {
            console.log('useUser POST email: ', email)
            const res = await fetch("/api/admin/users", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email }),
            });
            console.log('res: ', res)
            if (!res.ok) throw new Error("Failed to create User");
            return res.json();
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["users"] });
        },
    });

    // PATCH
    const updateUser = useMutation({
        mutationFn: async ({ userId, data }: {
            userId: string, data: Partial<User>
        }) => {
            const res = await fetch(`/api/admin/users/${userId}`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data),
            });
            if (!res.ok) throw new Error("Failed to update User");
            return res.json();
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["users"] });
        },
    });

    // DELETE
    const deleteUser = useMutation({
        mutationFn: async (userId: string) => {
            const res = await fetch(`/api/admin/users/${userId}`, {
                method: "DELETE",
            });
            if (!res.ok) throw new Error("Failed to delete user");
            return res.json();
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["users"] });
        },
    });

    return {
        users,
        createUser,
        updateUser,
        isLoading,
        deleteUser,
        refetch,
    };
};

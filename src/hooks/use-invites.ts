import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { UserInvite } from "@/types";

export const useInvites = () => {
    const queryClient = useQueryClient();

    // GET
    const { data: userInvites, isLoading, refetch } = useQuery<UserInvite[]>({
        queryKey: ["userInvites"],
        queryFn: async () => {
            const response = await fetch("/api/invitations");
            if (!response.ok) {
                throw new Error("Failed to fetch userInvites");
            }
            const data: { userInvites: UserInvite[] } = await response.json();
            const pendingUserInvites = data.userInvites.filter((invite) => invite.status === "pending")
            return pendingUserInvites
        },
    });

    // POST
    const createUserInvite = useMutation({
        mutationFn: async (userInvite: UserInvite) => {
            console.log('useUser POST UserInvite: ', userInvite)
            const res = await fetch("/api/invitations", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ userInvite }),
            });
            console.log('res: ', res)
            if (!res.ok) throw new Error("Failed to create createUserInvite");
            return res.json();
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["userInvites"] });
        },
    });

    // POST resendInvite
    const resendUserInvite = useMutation({
        mutationFn: async (userInvite: UserInvite) => {
            const inviteRevoke = await fetch(`/api/invitations/${userInvite.id}`, {
                method: "DELETE",
            })
            if (!inviteRevoke) {
                console.log('!inviteRevoke')
                return
            }
            const response = await fetch("/api/invitations", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ userInvite }),
            })
            if (!response.ok) throw new Error("Faild to resendUserInvite")
            return response.json()
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["userInvites"] })
        }
    })

    const revokeInvitation = useMutation({
        mutationFn: async (userInviteId: string) => {
            const response = await fetch(`/api/invitations/${userInviteId}`, {
                method: "DELETE",
            })
            if (!response.ok) {
                console.log('!response.ok revoke invitaion failed')
            }
        }
    })

    return {
        userInvites,
        createUserInvite,
        resendUserInvite,
        revokeInvitation,
        isLoading,
        refetch,
    };
};
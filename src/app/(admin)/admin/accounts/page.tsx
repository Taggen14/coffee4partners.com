"use client";

import React, { useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import UserDataTable from "@/components/admin/users-data-table";
import { useInvites } from "@/hooks/use-invites";
import { Eye, Loader2 } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { User, UserInvite } from "@/types";
import { UserQuickview } from "@/components/admin/user-quickview";
import { UserDialog } from "@/components/admin/user-dialog";

export default function Accounts() {
  const [selectedUserInvite, setSelectedUserInvite] =
    useState<UserInvite | null>(null);
  const [newUserInvite, setNewUserInvite] = useState<User | null>(null);
  const [loading, setLoading] = useState<string | null>(null);
  const { userInvites, revokeInvitation, isLoading } = useInvites();
  const [open, setOpen] = useState(false);
  const filteredInvites =
    userInvites?.filter(
      (userInvite) => !userInvite.publicMetadata.notificationSent,
    ) ?? [];
  const sentInvites =
    userInvites?.filter(
      (userInvite) => userInvite.publicMetadata.notificationSent,
    ) ?? [];

  const handleQuickview = (userInvite: UserInvite) => {
    setOpen(true);
    setSelectedUserInvite(userInvite);
  };

  const handleSendInvitaition = async (userInvite: UserInvite) => {
    try {
      setLoading(userInvite.emailAddress);
      const response = await fetch("/api/email/user-invite", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userInvite),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Något gick fel");
      }
      toast.success("Inbjudan skickad!");
    } catch (error) {
      console.error(error);
      toast.error("Något gick fel med att skicka inbjudan");
    } finally {
      setLoading(null);
    }
  };

  const handleCreateInvitaition = async (userInvite: UserInvite) => {
    const user: User = {
      ...userInvite,
      emailAddresses: [
        {
          emailAddress: userInvite.emailAddress,
        },
      ],
    };

    setOpen(true);
    setNewUserInvite(user);
  };

  const handleRevokeInvite = async (userInviteId: string) => {
    setLoading(userInviteId);
    const confirmed = window.confirm(
      "Är du säker på att du vill radera inbjudan? Detta går inte att ångra.",
    );
    if (!confirmed) return;
    try {
      await revokeInvitation.mutateAsync(userInviteId);
      toast.success(`inbjudan med id: ${userInviteId} raderades`);
    } catch (error) {
      console.error("Delete error:", error);
      toast.error(`Misslyckade att radera inbjudan med id: ${userInviteId}`);
    }
    setLoading(null);
  };

  return (
    <>
      <div className="flex flex-col gap-4">
        <h2>Hantera konton och inbjudningar</h2>
      </div>
      <div>
        <div className="my-4">
          {isLoading ? (
            <Loader2 className="h-6 w-6 animate-spin" />
          ) : (
            <div className="border border-secondary/50 rounded-lg flex flex-col gap-2 shadow-lg">
              <h3 className="bg-secondary text-background rounded-t-md px-2 py-1 shadow-lg">
                Inbjudningar
              </h3>
              <div className="px-2">
                <h3 className="font-bold">VÄNTANDE</h3>
                {sentInvites.length > 0 ? (
                  <ul>
                    {sentInvites.map((invite, i) => (
                      <li key={i} className="flex justify-between">
                        <span>{invite.emailAddress}</span>
                        <Button
                          className="border-none bg-transparent shadow-none hover:cursor-pointer hover:text-foreground/50"
                          variant={"outline"}
                          onClick={() => handleQuickview(invite)}
                        >
                          <Eye />
                        </Button>
                        <Button
                          variant={"secondary"}
                          className="w-fit p-0 px-2 py-1 h-fit space-x-1"
                          onClick={() => handleSendInvitaition(invite)}
                        >
                          {loading === invite.emailAddress && (
                            <Loader2 className="h-4 w-4 animate-spin" />
                          )}
                          <span>Skicka igen</span>
                        </Button>
                        <Button
                          variant={"destructive"}
                          className="w-fit p-0 px-2 py-1 h-fit space-x-1"
                          onClick={() => handleRevokeInvite(invite.id)}
                        >
                          {loading === invite.id && (
                            <Loader2 className="h-4 w-4 animate-spin" />
                          )}
                          <span>Radera inbjudan</span>
                        </Button>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p>Finns inga skickade inbjudningar</p>
                )}
              </div>
              <Separator />
              <div className="px-2">
                <h3 className="font-bold">INTE FÅTT INBJUDAN</h3>
                {filteredInvites.length > 0 ? (
                  <ul>
                    {filteredInvites.map((invite, i) => (
                      <li key={i} className="flex justify-between">
                        <span>{invite.emailAddress ?? "Inga väntande"}</span>
                        <Button
                          className="border-none bg-transparent shadow-none hover:cursor-pointer hover:text-foreground/50"
                          variant={"outline"}
                          onClick={() => handleQuickview(invite)}
                        >
                          <Eye />
                        </Button>
                        <Button
                          variant={"secondary"}
                          className="w-fit p-0 px-2 py-1 h-fit space-x-1"
                          onClick={() => handleCreateInvitaition(invite)}
                        >
                          {loading === invite.emailAddress && (
                            <Loader2 className="h-4 w-4 animate-spin" />
                          )}
                          <span>Godkänn konto</span>
                        </Button>
                        <Button
                          variant={"destructive"}
                          className="w-fit p-0 px-2 py-1 h-fit space-x-1"
                          onClick={() => handleRevokeInvite(invite.id)}
                        >
                          {loading === invite.id && (
                            <Loader2 className="h-4 w-4 animate-spin" />
                          )}
                          <span>Radera inbjudan</span>
                        </Button>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p>Finns inga väntande inbjudningar just nu</p>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
      <UserDataTable />

      {selectedUserInvite && (
        <UserQuickview
          userInvite={selectedUserInvite}
          open={open}
          onOpenChange={setOpen}
        />
      )}

      {newUserInvite && (
        <UserDialog
          open={open}
          onOpenChange={setOpen}
          user={newUserInvite}
          action={"sendInvite"}
        />
      )}
    </>
  );
}

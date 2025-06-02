"use client";

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { ScrollArea } from "../ui/scroll-area";
import { UserInvite } from "@/types";

interface UserDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    userInvite: UserInvite
}

export function UserQuickview({ open, onOpenChange, userInvite }: UserDialogProps) {

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[600px] overflow-y-auto">
                <DialogHeader className="space-y-1">
                    <DialogTitle className="text-2xl font-bold">Konto</DialogTitle>
                    <DialogDescription className="text-base">
                        Överblick
                    </DialogDescription>
                </DialogHeader>
                <ScrollArea className="pr-4">
                    <dl className="grid grid-cols-1 gap-3 text-sm">
                        <div>
                            <dt className="font-medium text-muted-foreground">E-post</dt>
                            <dd>{userInvite.emailAddress}</dd>
                        </div>
                        <div>
                            <dt className="font-medium text-muted-foreground">Roll</dt>
                            <dd>{userInvite.publicMetadata.role}</dd>
                        </div>
                        <div>
                            <dt className="font-medium text-muted-foreground">Prisprofil</dt>
                            <dd>{userInvite.publicMetadata.pricing * 100}%</dd>
                        </div>
                        <div>
                            <dt className="font-medium text-muted-foreground">Notifiering skickad</dt>
                            <dd>{userInvite.publicMetadata.notificationSent ? "Ja" : "Nej"}</dd>
                        </div>

                        <div>
                            <dt className="font-medium text-muted-foreground">Status</dt>
                            <dd>{userInvite.status}</dd>
                        </div>
                    </dl>

                </ScrollArea>
                <DialogFooter className="pt-4">
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}

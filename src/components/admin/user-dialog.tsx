"use client";

import { useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import { ScrollArea } from "../ui/scroll-area";
import { Label } from "../ui/label";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { User } from "@/types";
import { useUsers } from "@/hooks/use-users";
import { useInvites } from "@/hooks/use-invites";

export const userFormSchema = z.object({
    emailAddress: z.string().email(),
    id: z.string(),
    publicMetadata: z.object({
        role: z.enum(["admin", "customer"]),
        pricing: z.number(),
        companyName: z.string(),
    }),
})

type Action = "createUser" | "sendInvite" | "updateUser"

interface UserDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    user: User
    action: Action
}

export function UserDialog({ open, onOpenChange, user, action }: UserDialogProps) {
    const [loading, setLoading] = useState(false);
    const { updateUser, deleteUser } = useUsers()
    const { resendUserInvite, createUserInvite } = useInvites()

    const form = useForm<z.infer<typeof userFormSchema>>({
        resolver: zodResolver(userFormSchema),
        defaultValues: {
            emailAddress: "",
            id: "",
            publicMetadata: {
                role: "customer",
                pricing: 1,
                companyName: "",
            },
        },
    });

    useEffect(() => {
        if (user) {
            form.reset({
                emailAddress: user.emailAddresses[0].emailAddress || "",
                id: user.id,
                publicMetadata: {
                    role: user.publicMetadata.role || "customer",
                    pricing: user.publicMetadata.pricing || 1,
                    companyName: user.publicMetadata.companyName || "",
                }
            });
        } else {
            form.reset();
        }
    }, [user]);

    async function handleDeleteUser(userId: string) {
        const confirmed = window.confirm("Är du säker på att du vill radera kontot? Detta går inte att ångra.");
        if (!confirmed) return;
        try {
            await deleteUser.mutateAsync(userId)
            toast.success(`Användare med id: ${userId} raderades`);
            form.reset();
            onOpenChange(false);
        } catch (error) {
            console.error("Delete error:", error);
            toast.error(`Misslyckade att radera användare med id: ${userId}`);
        }
    }

    async function onSubmit(data: z.infer<typeof userFormSchema>) {
        setLoading(true);
        const finalData = {
            ...data,
            EmailAddresses: [
                data.emailAddress
            ],
            status: "pending",
            publicMetadata: {
                ...data.publicMetadata,
                notificationSent: true
            }
        };
        switch (action) {
            case "createUser":
                try {
                    await createUserInvite.mutateAsync(finalData)
                    form.reset()
                    onOpenChange(false)
                } catch (error) {
                    console.error(error);
                    toast.error("misslyckades skapa kontot");
                } finally {
                    setLoading(false);
                }
                break;
            case "updateUser":
                try {
                    await updateUser.mutateAsync({ userId: user.id, data: finalData });
                    form.reset();
                    onOpenChange(false);
                } catch (error) {
                    console.error(error);
                    toast.error("misslyckades uppdatera kontot");
                } finally {
                    setLoading(false);
                }
                break;

            case "sendInvite":
                try {
                    const sendInviteData = {
                        ...data,
                        status: "pending",
                        publicMetadata: {
                            ...data.publicMetadata,
                            notificationSent: true
                        }
                    }
                    await resendUserInvite.mutateAsync(sendInviteData);
                    form.reset();
                    onOpenChange(false);
                } catch (error) {
                    console.error(error);
                    toast.error("misslyckades godkänna kontot");
                } finally {
                    setLoading(false);
                }

                break;

            default:
                break;
        }
    }

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[600px] overflow-y-auto">
                <DialogHeader className="space-y-1">
                    <DialogTitle className="text-2xl font-bold">Konto</DialogTitle>
                    <DialogDescription className="text-base">
                        Hantera konto, fyll i fälten nedan
                    </DialogDescription>
                </DialogHeader>
                <ScrollArea className="pr-4">
                    <Form {...form}>
                        <form
                            onSubmit={form.handleSubmit(onSubmit)}
                            id="create-user-form"
                            className="space-y-6 p-1"
                        >
                            <div className="grid gap-6">
                                {/* Companyname */}
                                <FormField
                                    name="publicMetadata.companyName"
                                    control={form.control}
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className="text-base">Företagsnamn*</FormLabel>
                                            <FormControl>
                                                <Input
                                                    placeholder="Ange företagets namn"
                                                    className="h-11 text-base"
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                {/* emailAddress */}
                                <FormField
                                    name="emailAddress"
                                    control={form.control}
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className="text-base">E-post*</FormLabel>
                                            <FormControl>
                                                <Input
                                                    placeholder="Ange e-post"
                                                    className="h-11 text-base"
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                {/* publicMetadata.role */}

                                <FormField
                                    name="publicMetadata.role"
                                    control={form.control}
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className="text-base">Roll</FormLabel>
                                            <p className="text-xs pb-2">Admin kommer få full åtkomst till att skapa och ändra produkter i webbshoppen samt hantera ordrar. Kund kommer åt checkout och kan lägga en beställning.</p>
                                            <FormControl>
                                                <RadioGroup
                                                    onValueChange={field.onChange}
                                                    defaultValue={field.value}
                                                    className="flex space-x-6"
                                                >
                                                    <div className="flex items-center space-x-2">
                                                        <RadioGroupItem value="admin" id="admin" />
                                                        <Label htmlFor="active">Admin</Label>
                                                    </div>
                                                    <div className="flex items-center space-x-2">
                                                        <RadioGroupItem value="customer" id="customer" />
                                                        <Label htmlFor="draft">Kund</Label>
                                                    </div>
                                                </RadioGroup>
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                {/* publicMetadata.pricing */}
                                <FormField
                                    name="publicMetadata.pricing"
                                    control={form.control}
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className="text-base">Pris profil*</FormLabel>
                                            <FormControl>
                                                <div className="relative">
                                                    <Input
                                                        type="number"
                                                        step="0.01"
                                                        className="h-11 text-base"
                                                        {...field}
                                                        onChange={(e) => field.onChange(e.target.valueAsNumber)}
                                                    />
                                                    <span className="absolute left-15 top-1/2 -translate-y-1/2 text-muted-foreground">
                                                        %
                                                    </span>
                                                </div>
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                        </form>
                    </Form>
                </ScrollArea>

                <DialogFooter className="pt-4">
                    <div className="flex justify-between w-full">
                        {/* Delete user */}
                        {action === "updateUser" &&
                            <Button
                                className="h-11 px-8 text-base"
                                variant={"destructive"}
                                onClick={() => handleDeleteUser(user.id)}
                            >
                                {/* behövs denna loading? */}
                                {loading ? (
                                    <>
                                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                        Radera konto...
                                    </>
                                ) : (
                                    <>
                                        Radera konto
                                    </>
                                )}
                            </Button>
                        }

                        {/* onSubmit */}
                        <Button
                            type="submit"
                            form="create-user-form"
                            className="h-11 px-8 text-base">
                            {loading ? (
                                <>
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    {action === "createUser" && "Skapa konto..."}
                                    {action === "updateUser" && "Uppdaterar konto..."}
                                    {action === "sendInvite" && "Godkänn konto..."}
                                </>
                            ) : (
                                <>
                                    {action === "createUser" && "Skapa konto"}
                                    {action === "updateUser" && "Uppdaterar konto"}
                                    {action === "sendInvite" && "Godkänn konto"}
                                </>
                            )}
                        </Button>
                    </div>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}

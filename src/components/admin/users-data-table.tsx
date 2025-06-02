"use client";

import { Loader2, ArrowUpDown, RefreshCw, Search, X, Pencil, Plus } from "lucide-react";
import { useState, useMemo } from "react";
import { toast } from "sonner";
import {
    ColumnDef,
    ColumnFiltersState,
    SortingState,
    VisibilityState,
} from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { DataTable } from "@/components/ui/data-table";
import { cn } from "@/lib/utils";
import { UserDialog } from "./user-dialog";
import { User } from "@/types";
import { useUsers } from "@/hooks/use-users";

const UserDataTable = () => {
    const [sorting, setSorting] = useState<SortingState>([]);
    const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
    const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
    const [globalFilter, setGlobalFilter] = useState("");
    const [selectedUser, setSelectedUser] = useState<User>();
    const [open, setOpen] = useState(false);
    const { users, isLoading, refetch } = useUsers();

    // loading spinner error on refetch, fetch works
    const handleRefresh = () => {
        refetch()
        setTimeout(() => {
            toast.success("Konto uppdaterade");
        }, 1000);
    };

    const columns = useMemo<ColumnDef<User>[]>(() => [
        {
            accessorKey: "publicMetadata.companyName",
            header: "Företag",
            cell: ({ row }) => (
                <span className="text-muted-foreground text-sm">
                    {row.original.publicMetadata.companyName || "—"}
                </span>
            ),
        },
        {
            header: ({ column }) => (
                <Button
                    variant="ghost"
                    className="hover:underline hover:cursor-pointer"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    E-post
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            ),
            accessorFn: (row) => row.emailAddresses?.[0]?.emailAddress ?? "—",
            id: "email",
            cell: ({ row }) => {
                return (
                    <div className="flex items-center gap-3">
                        <span className="font-medium">{row.getValue("email")}</span>
                    </div>
                );
            },
        },
        {
            accessorKey: "publicMetadata.pricing",
            header: "Pris profil",
            cell: ({ row }) => (
                <span className="text-muted-foreground text-sm">
                    {row.original.publicMetadata.pricing || "—"}%
                </span>
            ),
        },
        {
            accessorKey: "publicMetadata.role",
            header: "Roll",
            cell: ({ row }) => (
                <span className="text-muted-foreground text-sm">
                    {row.original.publicMetadata.role || "—"}
                </span>
            ),
        },
        {
            header: "Redigera",
            cell: ({ row }) => (
                <Button
                    variant="ghost"
                    size="icon"
                    className="h-7 w-7 hover:cursor-pointer hover:text-ring transision-colors duration-300"
                    onClick={() => {
                        setSelectedUser(row.original);
                        setOpen(true);
                    }}
                >
                    <Pencil className="h-4 w-4" />
                </Button>
            )
        },
    ], []);

    /*   const table = useReactTable({
        data: subCategories || [],
        columns,
        state: {
          sorting,
          columnFilters,
          columnVisibility,
          globalFilter,
        },
        onSortingChange: setSorting,
        onColumnFiltersChange: setColumnFilters,
        onColumnVisibilityChange: setColumnVisibility,
        onGlobalFilterChange: setGlobalFilter,
        getCoreRowModel: getCoreRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
      }); */

    if (isLoading) {
        return (
            <div className="flex justify-center items-center h-64">
                <Loader2 className="h-6 w-6 animate-spin" />
            </div>
        );
    }

    return (
        <div className="space-y-4">
            <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold">Konton</h2>
                <div className="flex gap-2">
                    <Button variant="outline" onClick={handleRefresh}>
                        <RefreshCw className={cn("h-4 w-4 mr-2", isLoading && "animate-spin")} />
                        Uppdatera
                    </Button>
                    <Button onClick={() => {
                        setSelectedUser({
                            emailAddresses: [
                                {
                                    emailAddress: ""
                                }
                            ],
                            id: "",
                            publicMetadata: {
                                role: "customer",
                                pricing: 1,
                                companyName: "",
                                notificationSent: false,
                            },
                            status: "",
                        })
                        setOpen(true)
                    }}>
                        <Plus />
                        Lägg till Konto
                    </Button>
                </div>
            </div>

            <div className="relative w-full sm:w-1/2">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                    placeholder="Sök efter konto..."
                    value={globalFilter}
                    onChange={(e) => setGlobalFilter(e.target.value)}
                    className="pl-8"
                />
                {globalFilter && (
                    <Button
                        variant="ghost"
                        size="sm"
                        className="absolute right-1 top-1.5 h-7 w-7 p-0"
                        onClick={() => setGlobalFilter("")}
                    >
                        <X className="h-4 w-4" />
                    </Button>
                )}
            </div>

            <div className="rounded-md border">
                <DataTable
                    columns={columns}
                    data={users ?? []}
                    sorting={sorting}
                    onSortingChange={setSorting}
                    columnFilters={columnFilters}
                    onColumnFiltersChange={setColumnFilters}
                    columnVisibility={columnVisibility}
                    onColumnVisibilityChange={setColumnVisibility}
                    globalFilter={globalFilter}
                    onGlobalFilterChange={setGlobalFilter}
                />
            </div>

            {selectedUser &&
                <UserDialog open={open} onOpenChange={setOpen} user={selectedUser} action="createUser" />
            }
        </div>
    )
}

export default UserDataTable

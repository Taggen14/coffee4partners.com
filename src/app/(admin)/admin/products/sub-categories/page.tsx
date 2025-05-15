"use client";

import { Loader2, ArrowUpDown, Plus, RefreshCw, Search, X, Pencil } from "lucide-react";
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
import { CldImage } from "next-cloudinary";
import Link from "next/link";
import { useSubCategories } from "@/hooks/use-sub-categories";
import { SubCategory } from "@prisma/client";
import { SubCategoryDialog } from "@/components/admin/subcategory-dialog";

export default function SubCategoriesPage() {
  const { subCategories, isLoading } = useSubCategories();
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [globalFilter, setGlobalFilter] = useState("");
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [selectedSubCategory, setSelectedSubCategory] = useState<SubCategory & { _count: { products: number } } | null>(null);
  const [open, setOpen] = useState(false);

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setIsRefreshing(false);
      toast.success("Kategorier uppdaterade");
    }, 1000);
  };

  const columns = useMemo<ColumnDef<SubCategory & { _count: { products: number } }>[]>(() => [
    {
      accessorKey: "name",
      header: ({ column }) => (
        <Button
          variant="ghost"
          className="hover:underline hover:cursor-pointer"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Namn
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      ),
      cell: ({ row }) => {
        const image = row.original.images;
        return (
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 relative rounded-lg overflow-hidden bg-muted">
              {image[0] ? (
                <CldImage
                  src={image[0]}
                  alt={row.getValue("name")}
                  fill
                  className="object-cover"
                />
              ) : (
                <CldImage
                  src={"https://res.cloudinary.com/CLOUD_NAME/image/upload/v1745920679/placeholder-image_o2sfbh.jpg"}
                  alt={row.getValue("name")}
                  fill
                  className="object-cover"
                />
              )}
            </div>
            <span className="font-medium">{row.getValue("name")}</span>
          </div>
        );
      },
    },
    {
      accessorKey: "description",
      header: "Beskrivning",
      cell: ({ row }) => (
        <span className="text-muted-foreground text-sm">
          {row.original.description || "—"}
        </span>
      ),
    },
    {
      accessorKey: "amountOfProducts",
      header: () => (
        <Link href={"/admin/products"}>
          <Button
            className="hover:underline hover:cursor-pointer p-0"
            variant="ghost"
          >
            Produkter
          </Button>
        </Link>
      ),
      cell: ({ row }) => (
        <span className="text-muted-foreground text-sm">
          {row.original._count.products || "—"}
        </span>
      ),
    },
    {
      accessorKey: "editCategory",
      header: "Redigera",
      cell: ({ row }) => (
        <Button
          variant="ghost"
          size="icon"
          className="h-7 w-7 hover:cursor-pointer hover:text-ring transision-colors duration-300"
          onClick={() => {
            setSelectedSubCategory(row.original);
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
        <h2 className="text-2xl font-bold">Underkategorier</h2>
        <div className="flex gap-2">
          <Button variant="outline" onClick={handleRefresh}>
            <RefreshCw className={cn("h-4 w-4 mr-2", isRefreshing && "animate-spin")} />
            Uppdatera
          </Button>
          <Button onClick={() => {
            setSelectedSubCategory(null);
            setOpen(true)
          }}
          >
            <Plus className="mr-2 h-4 w-4" />
            Lägg till underkategori
          </Button>
        </div>
      </div>

      <div className="relative w-full sm:w-1/2">
        <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Sök underkategorier..."
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
          data={subCategories ?? []}
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

      <SubCategoryDialog open={open} onOpenChange={setOpen} category={selectedSubCategory} />
    </div>
  );
}

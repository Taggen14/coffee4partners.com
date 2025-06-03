"use client";

import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  getCoreRowModel,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
  Row,
} from "@tanstack/react-table";
import {
  Filter,
  MoreHorizontal,
  ArrowUpDown,
  Plus,
  Pencil,
  Trash2,
  Copy,
  Search,
  X,
  SlidersHorizontal,
  Download,
  Printer,
  RefreshCw,
  ArrowUpFromLine,
  Settings2,
  Image as ImageIcon,
} from "lucide-react";
import { useCallback, useState } from "react";
import Image from "next/image";
import React from "react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuCheckboxItem,
} from "@/components/ui/dropdown-menu";
import { DataTable } from "@/components/ui/data-table";
import { ProductDialog } from "@/components/admin/product-dialog";
import { Product } from "@prisma/client";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { cn, formatPrice } from "@/lib/utils";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useProducts } from "@/hooks/use-products";

export interface ExtendedProduct extends Omit<Product, "price"> {
  price: number;
  category: {
    id: string;
    name: string;
  };
  subCategory?: {
    id: string;
    name: string;
  };
}

interface ProductsDataTableProps {
  data: ExtendedProduct[];
}

export function ProductsDataTable({ data }: ProductsDataTableProps) {
  const [open, setOpen] = useState(false);
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [globalFilter, setGlobalFilter] = useState("");
  const [rowSelection, setRowSelection] = useState<Record<string, boolean>>({});
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [showQuickFilters, setShowQuickFilters] = useState(true);
  const [editProduct, setEditProduct] = useState<ExtendedProduct | null>(null);
  const [filterValues, setFilterValues] = useState({
    priceRange: { min: "", max: "" },
    stockRange: { min: "", to: "" },
    dateRange: { from: "", to: "" },
  });

  const { deleteProducts } = useProducts();

  // Get unique categories and sort them
  const categories = React.useMemo(() => {
    const categoryMap = new Map();
    data.forEach((product) => {
      if (!categoryMap.has(product.category.id)) {
        categoryMap.set(product.category.id, {
          id: product.category.id,
          name: product.category.name,
        });
      }
    });
    return Array.from(categoryMap.values()).sort((a, b) =>
      a.name.localeCompare(b.name),
    );
  }, [data]);

  // Quick stats
  const stats = React.useMemo(() => {
    return {
      total: data.length,
      outOfStock: data.filter((p) => p.stock === 0).length,
      lowStock: data.filter((p) => p.stock > 0 && p.stock <= 10).length,
      totalValue: data.reduce((sum, p) => sum + p.price * p.stock, 0),
    };
  }, [data]);

  const handleRefresh = () => {
    setIsRefreshing(true);
    // Simulate refresh
    setTimeout(() => {
      setIsRefreshing(false);
      toast.success("Data refreshed successfully");
    }, 1000);
  };

  // const handleExport = () => {
  //   const selectedRows = table.getSelectedRowModel().rows;
  //   const dataToExport =
  //     selectedRows.length > 0 ? selectedRows.map((row) => row.original) : data;

  //   // Create CSV content
  //   const headers = ["Name", "Category", "Price", "Stock", "Created"];
  //   const csvContent = [
  //     headers.join(","),
  //     ...dataToExport.map((product) =>
  //       [
  //         product.name,
  //         product.category.name,
  //         product.price,
  //         product.stock,
  //         new Date(product.createdAt).toLocaleDateString(),
  //       ].join(","),
  //     ),
  //   ].join("\n");

  //   // Create and download file
  //   const blob = new Blob([csvContent], { type: "text/csv" });
  //   const url = window.URL.createObjectURL(blob);
  //   const a = document.createElement("a");
  //   a.href = url;
  //   a.download = "products.csv";
  //   a.click();
  //   window.URL.revokeObjectURL(url);
  //   toast.success("Export completed successfully");
  // };

  const handlePrint = () => {
    window.print();
  };

  const handleDelete = useCallback(
    async (selectedRows: Row<ExtendedProduct>[]) => {
      try {
        const productIds = selectedRows.map((row) => row.original.id);
        await deleteProducts.mutateAsync(productIds);
        table.resetRowSelection();
        toast.success(`${selectedRows.length} produkt(er) raderades`);
      } catch (error) {
        console.error("Delete error:", error);
        toast.error("Misslyckade att radera produkt(er)");
      }
    },
    [deleteProducts],
  );

  // buggig?
  const handleBulkDelete = async () => {
    const selectedRows = table.getSelectedRowModel().rows;
    if (selectedRows.length === 0) {
      toast.error("Inga produkter valda");
      return;
    }

    const confirmed = window.confirm(
      `Delete ${selectedRows.length} selected products?`,
    );
    if (!confirmed) return;

    await handleDelete(selectedRows);
  };

  const handleAdvancedFilters = () => {
    const filters: ColumnFiltersState = [];

    if (filterValues.priceRange.min || filterValues.priceRange.max) {
      filters.push({
        id: "price",
        value: {
          min: Number(filterValues.priceRange.min) || 0,
          max: Number(filterValues.priceRange.max) || Infinity,
        },
      });
    }

    if (filterValues.stockRange.min || filterValues.stockRange.to) {
      filters.push({
        id: "stock",
        value: {
          min: Number(filterValues.stockRange.min) || 0,
          max: Number(filterValues.stockRange.to) || Infinity,
        },
      });
    }

    setColumnFilters(filters);
  };

  const columns = React.useMemo<ColumnDef<ExtendedProduct>[]>(
    () => [
      {
        id: "select",
        header: ({ table }) => (
          <Checkbox
            checked={
              table.getIsAllPageRowsSelected() ||
              (table.getIsSomePageRowsSelected() && "indeterminate")
            }
            onCheckedChange={(value: boolean) =>
              table.toggleAllPageRowsSelected(!!value)
            }
            aria-label="Select all"
            className="translate-y-[2px]"
          />
        ),
        cell: ({ row }) => (
          <Checkbox
            checked={row.getIsSelected()}
            onCheckedChange={(value: boolean) => row.toggleSelected(!!value)}
            aria-label="Select row"
            className="translate-y-[2px]"
          />
        ),
        enableSorting: false,
        enableHiding: false,
      },
      {
        accessorKey: "name",
        header: ({ column }) => {
          return (
            <Button
              variant="ghost"
              onClick={() =>
                column.toggleSorting(column.getIsSorted() === "asc")
              }
              className="whitespace-nowrap"
            >
              Produkt Namn
              <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
          );
        },
        cell: ({ row }) => {
          const images = row.original.images as string[];
          return (
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 relative rounded-lg overflow-hidden bg-muted">
                {images?.[0] ? (
                  <Image
                    src={images[0]}
                    alt={row.getValue("name")}
                    fill
                    className="object-cover"
                  />
                ) : (
                  <div className="w-full h-full bg-muted" />
                )}
              </div>
              <span className="font-medium">{row.getValue("name")}</span>
            </div>
          );
        },
      },
      {
        id: "status",
        header: "Status",
        cell: ({ row }) => {
          return (
            <Badge
              variant="default"
              className={cn(
                "",
                row.original.status === "DRAFT" && "bg-amber-500",
                row.original.status === "ACTIVE" && "bg-ring",
              )}
            >
              {row.original.status}
            </Badge>
          );
        },
      },
      {
        id: "category",
        accessorFn: (row) => row.category.name,
        header: "Kategori/Underkategori",
        cell: ({ row }) => {
          return (
            <Badge variant="secondary" className="whitespace-nowrap">
              {row.original.category.name}
              {row.original.subCategory?.name &&
                `/${row.original.subCategory.name}`}
            </Badge>
          );
        },
      },
      {
        accessorKey: "price",
        header: ({ column }) => {
          return (
            <Button
              variant="ghost"
              onClick={() =>
                column.toggleSorting(column.getIsSorted() === "asc")
              }
            >
              Pris
              <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
          );
        },
        cell: ({ row }) => {
          const price = parseFloat(row.getValue("price"));
          const formatted = formatPrice(price);
          return <span className="font-medium tabular-nums">{formatted}</span>;
        },
        filterFn: (row, id, value: { min: number; max: number }) => {
          const price = parseFloat(row.getValue(id));
          return price >= value.min && price <= value.max;
        },
      },
      {
        accessorKey: "stock",
        header: "Stock",
        cell: ({ row }) => {
          const stock = parseInt(row.getValue("stock"));
          return (
            <Badge
              variant={
                stock > 10 ? "default" : stock > 0 ? "secondary" : "destructive"
              }
              className="whitespace-nowrap"
            >
              {stock === 0
                ? "Slut i Lager"
                : stock <= 10
                  ? "Få i Lager"
                  : "I Lager"}
              <span className="ml-1 opacity-70">({stock})</span>
            </Badge>
          );
        },
        filterFn: (row, id, value: { min: number; max: number } | number) => {
          const stock = parseInt(row.getValue(id));
          if (typeof value === "number") {
            return stock === value;
          }
          return stock >= value.min && stock <= value.max;
        },
      },
      {
        accessorKey: "createdAt",
        header: "Skapad",
        cell: ({ row }) => {
          return (
            <span className="text-muted-foreground whitespace-nowrap">
              {new Date(row.getValue("createdAt")).toLocaleDateString(
                undefined,
                {
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                },
              )}
            </span>
          );
        },
      },
      {
        id: "quick-actions",
        cell: ({ row }) => {
          const product = row.original;
          return (
            <div className="flex items-center gap-2">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-7 w-7"
                      onClick={() => setEditProduct(product)}
                    >
                      <Pencil className="h-4 w-4" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>Redigera</TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
          );
        },
      },
      {
        id: "actions",
        cell: ({ row }) => {
          const product = row.original;

          const handleCopy = (text: string, label: string) => {
            navigator.clipboard.writeText(text);
            toast.success(`${label} copied to clipboard`);
          };

          return (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="h-8 w-8 p-0">
                  <span className="sr-only">Öppna Meny</span>
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-[160px]">
                <DropdownMenuLabel>Åtgärd</DropdownMenuLabel>
                <DropdownMenuItem
                  onClick={() => handleCopy(product.id, "Product ID")}
                >
                  <Copy className="mr-2 h-4 w-4" />
                  Kopiera ID
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => setEditProduct(product)}>
                  <Pencil className="mr-2 h-4 w-4" />
                  Redigera
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => handleDelete([row])}
                  className="text-red-600 focus:text-red-600"
                >
                  <Trash2 className="mr-2 h-4 w-4" />
                  Radera
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          );
        },
      },
    ],
    [handleDelete],
  );

  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      globalFilter,
      rowSelection,
    },
    enableRowSelection: true,
    onRowSelectionChange: setRowSelection,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    onGlobalFilterChange: setGlobalFilter,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
  });

  // Update quick filter buttons to use correct filter values
  const quickFilterButtons = (
    <div className="flex flex-wrap gap-2 p-4 border rounded-lg bg-muted/50">
      <Button
        variant="outline"
        size="sm"
        className={cn(
          "hover:bg-primary hover:text-primary-foreground",
          !columnFilters.length && "bg-primary text-primary-foreground",
        )}
        onClick={() => setColumnFilters([])}
      >
        Alla
      </Button>
      <Button
        variant="outline"
        size="sm"
        className={cn(
          "hover:bg-primary hover:text-primary-foreground",
          columnFilters.some((f) => f.id === "stock" && f.value === 0) &&
            "bg-primary text-primary-foreground",
        )}
        onClick={() => setColumnFilters([{ id: "stock", value: 0 }])}
      >
        Slut i Lager
      </Button>
      <Button
        variant="outline"
        size="sm"
        className={cn(
          "hover:bg-primary hover:text-primary-foreground",
          columnFilters.some(
            (f) =>
              f.id === "stock" &&
              typeof f.value === "object" &&
              f.value &&
              "min" in f.value &&
              "max" in f.value &&
              f.value.min === 1 &&
              f.value.max === 10,
          ) && "bg-primary text-primary-foreground",
        )}
        onClick={() =>
          setColumnFilters([
            {
              id: "stock",
              value: { min: 1, max: 10 },
            },
          ])
        }
      >
        Få i Lager
      </Button>
    </div>
  );

  return (
    <div className="space-y-4">
      {/* Stats Row - Made responsive */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-4">
        <div className="p-3 sm:p-4 border rounded-lg bg-card">
          <div className="text-xs sm:text-sm font-medium text-muted-foreground">
            Totalt antal Produkter
          </div>
          <div className="text-lg sm:text-2xl font-bold">{stats.total}</div>
        </div>
        <div className="p-3 sm:p-4 border rounded-lg bg-card">
          <div className="text-xs sm:text-sm font-medium text-muted-foreground">
            Slut i Lager
          </div>
          <div className="text-lg sm:text-2xl font-bold text-destructive">
            {stats.outOfStock}
          </div>
        </div>
        <div className="p-3 sm:p-4 border rounded-lg bg-card">
          <div className="text-xs sm:text-sm font-medium text-muted-foreground">
            Få i Lager
          </div>
          <div className="text-lg sm:text-2xl font-bold text-orange-500">
            {stats.lowStock}
          </div>
        </div>
        <div className="p-3 sm:p-4 border rounded-lg bg-card">
          <div className="text-xs sm:text-sm font-medium text-muted-foreground">
            Totala Antalet
          </div>
          <div className="text-lg sm:text-2xl font-bold text-green-600">
            {formatPrice(stats.totalValue)}
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-4">
        {/* Header Row - Made responsive */}
        <div className="flex flex-col sm:flex-row sm:items-center gap-4">
          <h2 className="text-xl sm:text-2xl font-bold tracking-tight">
            Produkter
          </h2>
          <div className="flex-1 flex flex-col sm:flex-row gap-4 sm:items-center sm:justify-end">
            {/* Mobile action buttons */}
            <div className="flex items-center gap-2 sm:hidden">
              <Button
                variant="outline"
                size="sm"
                className="flex-1"
                onClick={() => setOpen(true)}
              >
                <Plus className="h-4 w-4 mr-2" />
                Lägg Till
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="flex-1"
                onClick={handleRefresh}
              >
                <RefreshCw
                  className={cn("h-4 w-4 mr-2", isRefreshing && "animate-spin")}
                />
                Updatera
              </Button>
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="outline" size="sm" className="flex-1">
                    <Filter className="h-4 w-4" />
                  </Button>
                </SheetTrigger>
                <SheetContent>
                  <SheetHeader>
                    <SheetTitle>Filter & Intällningar</SheetTitle>
                  </SheetHeader>
                  <div className="py-4">
                    <div className="space-y-4">
                      {/* Category filter */}
                      <div>
                        <label className="text-sm font-medium">
                          Kategorier
                        </label>
                        <Select
                          value={
                            (columnFilters.find((f) => f.id === "category")
                              ?.value as string) || "all"
                          }
                          onValueChange={(value) => {
                            if (value === "all") {
                              setColumnFilters((filters) =>
                                filters.filter((f) => f.id !== "category"),
                              );
                            } else {
                              setColumnFilters([{ id: "category", value }]);
                            }
                          }}
                        >
                          <SelectTrigger className="w-full mt-1.5">
                            <SelectValue placeholder="All categories" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="all">Alla Kategorier</SelectItem>
                            {categories.map((category) => (
                              <SelectItem
                                key={category.id}
                                value={category.name}
                              >
                                {category.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      {/* Price Range */}
                      <div>
                        <label className="text-sm font-medium">Prisspann</label>
                        <div className="flex items-center gap-2 mt-1.5">
                          <Input
                            type="number"
                            placeholder="Min"
                            value={filterValues.priceRange.min}
                            onChange={(e) =>
                              setFilterValues({
                                ...filterValues,
                                priceRange: {
                                  ...filterValues.priceRange,
                                  min: e.target.value,
                                },
                              })
                            }
                          />
                          <span>-</span>
                          <Input
                            type="number"
                            placeholder="Max"
                            value={filterValues.priceRange.max}
                            onChange={(e) =>
                              setFilterValues({
                                ...filterValues,
                                priceRange: {
                                  ...filterValues.priceRange,
                                  max: e.target.value,
                                },
                              })
                            }
                          />
                        </div>
                      </div>
                      {/* Stock Range */}
                      <div>
                        <label className="text-sm font-medium">
                          Lagerspann
                        </label>
                        <div className="flex items-center gap-2 mt-1.5">
                          <Input
                            type="number"
                            placeholder="Min"
                            value={filterValues.stockRange.min}
                            onChange={(e) =>
                              setFilterValues({
                                ...filterValues,
                                stockRange: {
                                  ...filterValues.stockRange,
                                  min: e.target.value,
                                },
                              })
                            }
                          />
                          <span>-</span>
                          <Input
                            type="number"
                            placeholder="Max"
                            value={filterValues.stockRange.to}
                            onChange={(e) =>
                              setFilterValues({
                                ...filterValues,
                                stockRange: {
                                  ...filterValues.stockRange,
                                  to: e.target.value,
                                },
                              })
                            }
                          />
                        </div>
                      </div>
                    </div>
                    <div className="mt-6">
                      <Button
                        className="w-full"
                        onClick={handleAdvancedFilters}
                      >
                        Filtrera
                      </Button>
                    </div>
                  </div>
                </SheetContent>
              </Sheet>
            </div>

            {/* Desktop action buttons */}
            <div className="hidden sm:flex items-center gap-2">
              <Button variant="outline" size="sm" onClick={handleRefresh}>
                <RefreshCw
                  className={cn("h-4 w-4 mr-2", isRefreshing && "animate-spin")}
                />
                Updatera
              </Button>
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="outline" size="sm">
                    <Settings2 className="h-4 w-4 mr-2" />
                    Inställningar
                  </Button>
                </SheetTrigger>
                <SheetContent>
                  <SheetHeader>
                    <SheetTitle>Tabellinställningar</SheetTitle>
                    <SheetDescription>
                      Anpassa hur tabellen ser ut och beter sig
                    </SheetDescription>
                  </SheetHeader>
                  <div className="p-4">
                    <div className="space-y-4">
                      <div>
                        <h4 className="text-sm font-medium mb-2">Filtrera</h4>
                        <div className="flex items-center space-x-2">
                          <Checkbox
                            checked={showQuickFilters}
                            onCheckedChange={(checked) =>
                              setShowQuickFilters(checked as boolean)
                            }
                          />
                          <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                            Visa Filter
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>
                </SheetContent>
              </Sheet>
              <Button variant="outline" size="sm" /* onClick={handleExport} */>
                <Download className="h-4 w-4 mr-2" />
                Exportera
              </Button>
              <Button variant="outline" size="sm" onClick={handlePrint}>
                <Printer className="h-4 w-4 mr-2" />
                Skriv Ut
              </Button>
              <Button onClick={() => setOpen(true)}>
                <Plus className="mr-2 h-4 w-4" />
                Lägg Till Produkt
              </Button>
            </div>
          </div>
        </div>

        {/* Quick Filters */}
        {showQuickFilters && quickFilterButtons}

        {/* Search and Filters - Made responsive */}
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Sök efter produkter..."
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

          {/* Desktop filters */}
          <div className="hidden sm:flex items-center gap-2">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" size="icon">
                  <Filter className="h-4 w-4" />
                </Button>
              </SheetTrigger>
              <SheetContent>
                <SheetHeader>
                  <SheetTitle>Avancerad Filtrering</SheetTitle>
                  <SheetDescription>
                    Ställ in avancerade filter för dina produkter
                  </SheetDescription>
                </SheetHeader>
                <div className="py-4">
                  <div className="space-y-4">
                    <div>
                      <label className="text-sm font-medium">Prisspann</label>
                      <div className="flex items-center gap-2 mt-1.5">
                        <Input
                          type="number"
                          placeholder="Min"
                          value={filterValues.priceRange.min}
                          onChange={(e) =>
                            setFilterValues({
                              ...filterValues,
                              priceRange: {
                                ...filterValues.priceRange,
                                min: e.target.value,
                              },
                            })
                          }
                        />
                        <span>-</span>
                        <Input
                          type="number"
                          placeholder="Max"
                          value={filterValues.priceRange.max}
                          onChange={(e) =>
                            setFilterValues({
                              ...filterValues,
                              priceRange: {
                                ...filterValues.priceRange,
                                max: e.target.value,
                              },
                            })
                          }
                        />
                      </div>
                    </div>
                    <div>
                      <label className="text-sm font-medium">Lagerspann</label>
                      <div className="flex items-center gap-2 mt-1.5">
                        <Input
                          type="number"
                          placeholder="Min"
                          value={filterValues.stockRange.min}
                          onChange={(e) =>
                            setFilterValues({
                              ...filterValues,
                              stockRange: {
                                ...filterValues.stockRange,
                                min: e.target.value,
                              },
                            })
                          }
                        />
                        <span>-</span>
                        <Input
                          type="number"
                          placeholder="Max"
                          value={filterValues.stockRange.to}
                          onChange={(e) =>
                            setFilterValues({
                              ...filterValues,
                              stockRange: {
                                ...filterValues.stockRange,
                                to: e.target.value,
                              },
                            })
                          }
                        />
                      </div>
                    </div>
                  </div>
                  <div className="mt-6">
                    <Button className="w-full" onClick={handleAdvancedFilters}>
                      Filtrera
                    </Button>
                  </div>
                </div>
              </SheetContent>
            </Sheet>

            <Select
              value={
                (columnFilters.find((f) => f.id === "category")
                  ?.value as string) || "all"
              }
              onValueChange={(value) => {
                if (value === "all") {
                  setColumnFilters((filters) =>
                    filters.filter((f) => f.id !== "category"),
                  );
                } else {
                  setColumnFilters([{ id: "category", value }]);
                }
              }}
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="All categories" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Alla Kategorier</SelectItem>
                {categories.map((category) => (
                  <SelectItem key={category.id} value={category.name}>
                    {category.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm">
                  <SlidersHorizontal className="mr-2 h-4 w-4" />
                  Visa
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-[150px]">
                <DropdownMenuLabel>Växla Kolumner</DropdownMenuLabel>
                <DropdownMenuSeparator />
                {columns.map((column) => {
                  if (column.id === "select" || column.id === "actions")
                    return null;

                  let columnKey = column.id;
                  if (!columnKey && "accessorKey" in column) {
                    columnKey = String(column.accessorKey);
                  }
                  if (!columnKey) return null;

                  const title =
                    columnKey === "category"
                      ? "Category"
                      : columnKey.charAt(0).toUpperCase() +
                        columnKey.slice(1).replace(/([A-Z])/g, " $1");

                  return (
                    <DropdownMenuCheckboxItem
                      key={columnKey}
                      className="capitalize"
                      checked={columnVisibility[columnKey] !== false}
                      onCheckedChange={(value) =>
                        setColumnVisibility((prev) => ({
                          ...prev,
                          [columnKey]: value,
                        }))
                      }
                    >
                      {title}
                    </DropdownMenuCheckboxItem>
                  );
                })}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        {/* Bulk Actions */}
        {Object.keys(rowSelection).length > 0 && (
          <div className="flex items-center gap-2 p-4 border rounded-lg bg-muted/50">
            <span className="text-sm font-medium">
              {Object.keys(rowSelection).length} Valda Produkter
            </span>
            <div className="ml-auto flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                /* onClick={handleExport} */
                className="hidden sm:flex"
              >
                <ArrowUpFromLine className="h-4 w-4 mr-2" />
                Expotera Valda
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={handleBulkDelete}
                className="text-destructive hover:text-destructive"
              >
                <Trash2 className="h-4 w-4 mr-2" />
                Radera Valda
              </Button>
            </div>
          </div>
        )}
      </div>

      {/* Always show grid view on mobile, table view on desktop */}
      <div className="hidden sm:block rounded-md border">
        <DataTable
          columns={columns}
          data={data}
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

      {/* Mobile Grid View */}
      <div className="grid sm:hidden grid-cols-2 gap-4">
        {table.getRowModel().rows.map((row) => {
          const product = row.original;
          return (
            <div key={product.id} className="border rounded-lg p-3">
              <div className="aspect-square relative rounded-md overflow-hidden bg-muted mb-3">
                {product.images[0] ? (
                  <Image
                    src={product.images[0]}
                    alt={product.name}
                    fill
                    className="object-cover"
                  />
                ) : (
                  <div className="w-full h-full bg-muted flex items-center justify-center">
                    <ImageIcon className="h-8 w-8 text-muted-foreground" />
                  </div>
                )}
              </div>
              <h3 className="font-medium text-sm line-clamp-1 mb-1">
                {product.name}
              </h3>
              <div className="flex flex-wrap gap-1 mb-2">
                <Badge variant="secondary" className="text-xs">
                  {product.category.name}
                </Badge>
                <Badge
                  variant={
                    product.stock > 10
                      ? "default"
                      : product.stock > 0
                        ? "secondary"
                        : "destructive"
                  }
                  className="text-xs"
                >
                  {product.stock === 0
                    ? "Slut i Lager"
                    : product.stock <= 10
                      ? "Få i Lager"
                      : "I Lager"}
                </Badge>
              </div>
              <div className="text-base font-bold mb-3">
                {formatPrice(product.price)}
              </div>
              <div className="flex items-center justify-end gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  className="h-8 px-2 text-xs"
                  onClick={() => setEditProduct(product)}
                >
                  <Pencil className="h-3 w-3 mr-1" />
                  Redigera
                </Button>
              </div>
            </div>
          );
        })}
      </div>

      <ProductDialog open={open} onOpenChange={setOpen} />

      {editProduct && (
        <ProductDialog
          open={!!editProduct}
          onOpenChange={(open) => {
            if (!open) {
              setEditProduct(null);
            }
          }}
          product={editProduct}
        />
      )}
    </div>
  );
}

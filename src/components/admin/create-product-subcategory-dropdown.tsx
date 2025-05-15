"use client";

import * as React from "react";
import { Check, ChevronsUpDown, Plus, Loader2 } from "lucide-react";

import { capitalizeFirstLetter, cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from "@/components/ui/command";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { toast } from "sonner";
import { useCategories } from "@/hooks/use-categories";
import { useProducts } from "@/hooks/use-products";

interface SubCategoryDrowpdownProps {
    value?: string;
    onChange: (value: string) => void;
    selectedCategoryId: string
}

export function CreateProductSubCategoryDrowpdown({ value, onChange, selectedCategoryId }: SubCategoryDrowpdownProps) {
    const [open, setOpen] = React.useState(false);
    const [search, setSearch] = React.useState("");
    const { categories, isLoading, refetch } = useCategories()
    const { products } = useProducts()

    const selectedCategory = React.useMemo(
        () => categories?.find((category) => category.id === selectedCategoryId),
        [categories, selectedCategoryId],
    );

    const selectedSubCategory = React.useMemo(
        () => selectedCategory?.subCategories?.find((subCategory) => subCategory.id === value),
        [selectedCategory, value],
    );

    const filteredSubCategories = React.useMemo(() => {
        if (!selectedCategory) return [];
        return selectedCategory.subCategories.filter((subCategory) =>
            subCategory.name.toLowerCase().includes(search.toLowerCase())
        );
    }, [selectedCategory, search]);

    const createSubCategory = React.useCallback(
        async (name: string, categoryId: string) => {
            try {
                if (!categoryId) {
                    toast.error("Ingen kategori vald, du måste välja kategori för att kunna skapa en underkategori");
                    return;
                }

                const response = await fetch("/api/subCategories", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ name, categoryId }),
                });

                if (!response.ok) {
                    const error = await response.json();
                    throw new Error(error.error || "Misslyckades att skapa underkategori");
                }
                const newSubCategory = await response.json();

                const categoryProducts = products?.filter((product) => (product.categoryId === categoryId && product.subCategoryId === null))

                if (categoryProducts?.length) {
                    await Promise.all(
                        categoryProducts?.map(async (product) => {
                            const productResponse = await fetch(`/api/admin/products/${product.id}`, {
                                method: "PATCH",
                                headers: {
                                    "Content-Type": "application/json",
                                },
                                body: JSON.stringify({ subCategoryId: newSubCategory.id }),
                            })
                            if (!productResponse) {
                                const error = await response.json();
                                throw new Error(error.error || "Misslyckades att flytta produkter till ny underkategori");
                            }
                        })
                    )
                }


                await refetch()
                onChange(newSubCategory.id);
                setOpen(false);
                toast.success("Underkategori skapades");
            } catch (error) {
                console.error("Error creating subCategory:", error);
                toast.error(
                    error instanceof Error ? error.message : "Misslyckades att skapa underkategori",
                );
            } finally {
            }
        },
        [onChange, products, refetch],
    );

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={open}
                    className={cn(
                        "w-full justify-between",
                        !value && "text-muted-foreground",
                    )}
                    disabled={isLoading}>
                    {isLoading ? (
                        <div className="flex items-center gap-2">
                            <Loader2 className="h-4 w-4 animate-spin" />
                            <span>Laddar kategorier...</span>
                        </div>
                    ) : (
                        <>
                            {selectedSubCategory?.name || "Välj underkategori..."}
                            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                        </>
                    )}
                </Button>
            </PopoverTrigger>
            <PopoverContent
                className="w-[--radix-popover-trigger-width] p-0 popover-content-width-full"
                align="start">
                <Command className="w-full bg-background text-foreground">
                    <CommandInput
                        placeholder="Sök eller skapa kategori..."
                        value={search}
                        onValueChange={setSearch}
                        className="border-none focus:ring-0"
                    />
                    <CommandList className="p-1">
                        <CommandEmpty className="p-4 text-sm w-full">
                            {search.trim() ? (
                                <div className="space-y-3 text-center w-full">
                                    <p className="text-muted-foreground">Ingen underkategori hittades.</p>
                                    {
                                        !selectedCategory?.subCategories.length && (
                                            <p className="text-muted-foreground">{`Eftersom "${search}" är den första underkategorin för "{selectedCategory?.name}" som innehåller ${selectedCategory?._count.products || 0} antal produkter, kommer dessa produkter att hamna under din nya "${search}" underkategori`}</p>)
                                    }
                                </div>
                            ) : (
                                <p className="text-foreground">
                                    Skriv för att söka eller skapa...
                                </p>
                            )}
                        </CommandEmpty>
                        {filteredSubCategories && filteredSubCategories.length > 0 && (
                            <CommandGroup className="max-h-[200px] overflow-auto">
                                {filteredSubCategories.map((category) => (
                                    <CommandItem
                                        key={category.id}
                                        value={category.name}
                                        onSelect={() => {
                                            onChange(category.id);
                                            setOpen(false);
                                        }}
                                        className="flex items-center justify-between hover:font-bold cursor-pointer transition-all ease-in-out duration-200">
                                        {category.name}
                                        {value === category.id && (
                                            <Check className="h-4 w-4 text-green-500" />
                                        )}
                                    </CommandItem>
                                ))}
                            </CommandGroup>
                        )}
                        <Button
                            variant="outline"
                            size="sm"
                            className="w-full hover:bg-foreground/10 cursor-pointer transition-all ease-in-out duration-200"
                            onClick={() => createSubCategory(capitalizeFirstLetter(search), selectedCategoryId)}
                            disabled={!search.trim() || isLoading}
                        >
                            {isLoading ? (
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            ) : (
                                <Plus className="mr-2 h-4 w-4" />
                            )}
                            {`Skapa "${search}"`}
                        </Button>
                    </CommandList>
                </Command>
            </PopoverContent>
        </Popover>
    );
}
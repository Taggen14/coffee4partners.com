
"use client";

import * as React from "react";
import { Check, ChevronsUpDown, Plus, Loader2 } from "lucide-react";

import { cn } from "@/lib/utils";
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

interface SubCategoryDrowpdownProps {
    value?: string;
    onChange: (value: string) => void;
    selectedCategoryId: string
}

export function CreateProductSubCategoryDrowpdown({ value, onChange, selectedCategoryId }: SubCategoryDrowpdownProps) {
    const [open, setOpen] = React.useState(false);
    const [search, setSearch] = React.useState("");
    const { categories, isLoading, refetch } = useCategories()
    const createSubCategory = React.useCallback(
        async (name: string, categoryId: string) => {
            try {
                const response = await fetch("/api/subCategories", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ name, categoryId }),
                });

                if (!response.ok) {
                    const error = await response.json();
                    throw new Error(error.error || "Failed to create subCategory");
                }

                const newSubCategory = await response.json();
                await refetch()
                onChange(newSubCategory.id);
                setOpen(false);
                toast.success("subCategory created successfully");
            } catch (error) {
                console.error("Error creating subCategory:", error);
                toast.error(
                    error instanceof Error ? error.message : "Failed to create subCategory",
                );
            } finally {
            }
        },
        [onChange],
    );

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
                            <span>Loading categories...</span>
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
                className="w-[--radix-popover-trigger-width] p-0"
                align="start">
                <Command className="w-full bg-background text-foreground">
                    <CommandInput
                        placeholder="Sök eller skapa kategori..."
                        value={search}
                        onValueChange={setSearch}
                        className="border-none focus:ring-0"
                    />
                    <CommandList>
                        <CommandEmpty className="p-4 text-sm">
                            {search.trim() ? (
                                <div className="space-y-3 text-center">
                                    <p className="text-muted-foreground">No category found.</p>
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        className="w-full"
                                        onClick={() => createSubCategory(search, selectedCategoryId)}
                                        disabled={!search.trim() || isLoading}
                                    >
                                        {isLoading ? (
                                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                        ) : (
                                            <Plus className="mr-2 h-4 w-4" />
                                        )}
                                        Create &quot;{search}&quot;
                                    </Button>
                                </div>
                            ) : (
                                <p className="text-foreground">
                                    Type to search or create...
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
                    </CommandList>
                </Command>
            </PopoverContent>
        </Popover>
    );
}
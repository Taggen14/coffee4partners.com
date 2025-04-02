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

interface Category {
  id: string;
  name: string;
}

interface CategoryComboboxProps {
  value?: string;
  onChange: (value: string) => void;
}

export function CategoryCombobox({ value, onChange }: CategoryComboboxProps) {
  const [open, setOpen] = React.useState(false);
  const [categories, setCategories] = React.useState<Category[]>([]);
  const [loading, setLoading] = React.useState(false);
  const [search, setSearch] = React.useState("");
  const [isInitialLoading, setIsInitialLoading] = React.useState(true);

  const fetchCategories = React.useCallback(async () => {
    try {
      const response = await fetch("/api/admin/categories");
      if (!response.ok) throw new Error("Failed to fetch categories");
      const data = await response.json();
      setCategories(data);
    } catch (error) {
      console.error("Error fetching categories:", error);
      toast.error("Failed to load categories");
    } finally {
      setIsInitialLoading(false);
    }
  }, []);

  React.useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  const createCategory = React.useCallback(
    async (name: string) => {
      setLoading(true);
      try {
        const response = await fetch("/api/admin/categories", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ name }),
        });

        if (!response.ok) {
          const error = await response.json();
          throw new Error(error.error || "Failed to create category");
        }

        const newCategory = await response.json();
        setCategories((prev) => [...prev, newCategory]);
        onChange(newCategory.id);
        setOpen(false);
        toast.success("Category created successfully");
      } catch (error) {
        console.error("Error creating category:", error);
        toast.error(
          error instanceof Error ? error.message : "Failed to create category",
        );
      } finally {
        setLoading(false);
      }
    },
    [onChange],
  );

  const selectedCategory = React.useMemo(
    () => categories.find((category) => category.id === value),
    [categories, value],
  );

  const filteredCategories = React.useMemo(() => {
    if (!search) return categories;
    return categories.filter((category) =>
      category.name.toLowerCase().includes(search.toLowerCase()),
    );
  }, [categories, search]);

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
          disabled={loading}
        >
          {isInitialLoading ? (
            <div className="flex items-center gap-2">
              <Loader2 className="h-4 w-4 animate-spin" />
              <span>Loading categories...</span>
            </div>
          ) : (
            <>
              {selectedCategory?.name || "Select category..."}
              <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
            </>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent
        className="w-[--radix-popover-trigger-width] p-0"
        align="start"
      >
        <Command className="w-full">
          <CommandInput
            placeholder="Search or create category..."
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
                    onClick={() => createCategory(search)}
                    disabled={!search.trim() || loading}
                  >
                    {loading ? (
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    ) : (
                      <Plus className="mr-2 h-4 w-4" />
                    )}
                    Create &quot;{search}&quot;
                  </Button>
                </div>
              ) : (
                <p className="text-muted-foreground">
                  Type to search or create...
                </p>
              )}
            </CommandEmpty>
            {filteredCategories.length > 0 && (
              <CommandGroup className="max-h-[200px] overflow-auto">
                {filteredCategories.map((category) => (
                  <CommandItem
                    key={category.id}
                    value={category.name}
                    onSelect={() => {
                      onChange(category.id);
                      setOpen(false);
                    }}
                    className="flex items-center justify-between"
                  >
                    {category.name}
                    {value === category.id && (
                      <Check className="h-4 w-4 text-primary" />
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

import React from "react";
import { Separator } from "../ui/separator";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";
import { Category, SubCategory } from "@prisma/client";

interface FilteringProductsProps {
  selectedCategory: string | null;
  setSelectedCategory: (category: string | null) => void;
  categories: CategoryOrSubCategory[];
  categoryTextType: string;
}
type CategoryOrSubCategory = Category & {
  categorySlug?: string;
  subCategories?: SubCategory[];
};

const FilteringProducts = ({
  selectedCategory,
  setSelectedCategory,
  categories,
  categoryTextType,
}: FilteringProductsProps) => {
  return (
    <>
      <Separator />
      <div className="flex flex-wrap">
        <Button
          variant="ghost"
          className={cn(
            "text-muted-foreground",
            !selectedCategory && "bg-muted text-foreground",
          )}
          onClick={() => setSelectedCategory(null)}
        >
          Alla {categoryTextType}
        </Button>
        {categories?.map((category) => (
          <Button
            key={category.id}
            variant="ghost"
            className={cn(
              "text-muted-foreground",
              selectedCategory === category.id && "bg-muted text-foreground",
            )}
            onClick={() => setSelectedCategory(category.id)}
          >
            {category.name}
          </Button>
        ))}
      </div>
    </>
  );
};

export default FilteringProducts;

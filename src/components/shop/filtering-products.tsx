import React from 'react'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '../ui/dropdown-menu'
import { Separator } from '../ui/separator'
import { Button } from '../ui/button'
import { ChevronDown } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Category, SubCategory } from '@prisma/client'

interface FilteringProductsProps {
    selectedCategory: string | null;
    setSelectedCategory: (category: string | null) => void;
    categories: CategoryOrSubCategory[];
    categoryTextType: string;
}
type CategoryOrSubCategory = Category & {
    categorySlug?: string,
    subCategories?: SubCategory[]
};

const FilteringProducts = ({ selectedCategory, setSelectedCategory, categories, categoryTextType }: FilteringProductsProps) => {
    return (
        <>
            <Separator />
            {/* Mobile Category Selector */}
            <div className="md:hidden">
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="outline" className="w-full justify-between">
                            {selectedCategory
                                ? categories?.find((c) => c.id === selectedCategory)?.name
                                : "All Categories"}
                            <ChevronDown className="ml-2 h-4 w-4" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-[calc(100vw-2rem)]">
                        <DropdownMenuItem onClick={() => setSelectedCategory(null)}>
                            Alla {categoryTextType}
                        </DropdownMenuItem>
                        {categories?.map((category) => (
                            <DropdownMenuItem
                                key={category.id}
                                onClick={() => setSelectedCategory(category.id)}>
                                {category.name}
                            </DropdownMenuItem>
                        ))}
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>

            {/* Desktop Categories */}
            <div className="hidden md:block">
                <div className="flex space-x-4">
                    <Button
                        variant="ghost"
                        className={cn(
                            "text-muted-foreground",
                            !selectedCategory && "bg-muted text-foreground",
                        )}
                        onClick={() => setSelectedCategory(null)}>
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
                            onClick={() => setSelectedCategory(category.id)}>
                            {category.name}
                        </Button>
                    ))}
                </div>
            </div>
        </>
    )
}

export default FilteringProducts
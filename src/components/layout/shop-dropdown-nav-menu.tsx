"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import { ChevronDown } from "lucide-react";
import { useCategories } from "@/hooks/use-categories";
import { cn, slugify } from "@/lib/utils";
import { Skeleton } from "../ui/skeleton";

const ShopDropdownNavMenu = ({ title }: { title: string }) => {
    const { categories, isLoading } = useCategories();
    const [mainDropdownOpen, setMainDropdownOpen] = useState(false);
    const [hoveredCategoryId, setHoveredCategoryId] = useState<string | null>(null);
    const pathname = usePathname();

    return (
        <div
            className="group inline-block relative"
            onMouseEnter={() => setMainDropdownOpen(true)}
            onMouseLeave={() => setMainDropdownOpen(false)}>
            {/* Title as trigger */}
            <div className="flex items-center">
                <span className="text-xl">{title}</span>
                <ChevronDown
                    className={`text-text-secondary-foreground transition-transform duration-200 ${mainDropdownOpen ? 'rotate-180' : ''}`}
                    style={{ width: 24, height: 24 }}
                />
            </div>
            <div className="absolute w-full h-3 left-0 z-40 bg-transparant"></div>

            {/* Main dropdown menu */}
            {mainDropdownOpen && (
                <div className="absolute -left-2 bg-background rounded-sm shadow-lg z-50 w-fit border border-gray-200" style={{ top: '100%', marginTop: '0.6rem' }}>
                    {
                        isLoading ?
                            <>
                                <Skeleton className="h-8 w-40 my-1" />
                                <Skeleton className="h-8 w-40 my-1" />
                                <Skeleton className="h-8 w-40 my-1" />
                            </>
                            :
                            categories?.map((category) => (
                                <div
                                    key={category.id}
                                    className="relative"
                                    onMouseEnter={() => category.subCategories?.some(s => s.categoryId === category.id) && setHoveredCategoryId(category.id)}
                                    onMouseLeave={() => setHoveredCategoryId(null)}
                                >
                                    <a href={`/shop/${category.categorySlug}`}
                                        className={cn("flex items-center justify-between px-4 py-2 text-sm text-primary hover:text-secondary-foreground whitespace-nowrap transition-colors duration-300",
                                            pathname.includes(category.categorySlug) ? "text-secondary-foreground font-medium" : "text-primary"
                                        )}
                                    >
                                        {category.name}
                                        {category.subCategories?.some(s => s.categoryId === category.id) && (
                                            <ChevronDown className="ml-2 transform -rotate-90 hover:text-secondary-foreground" />
                                        )}
                                    </a>

                                    {/* Subcategories flyout menu */}
                                    {hoveredCategoryId === category.id && category.subCategories?.some(s => s.categoryId === category.id) && (
                                        <div className="absolute left-full top-0 bg-background rounded-sm z-50 w-fit shadow-lg border border-gray-200" >
                                            {category.subCategories?.map((subCategory) => (
                                                <a
                                                    key={subCategory.id}
                                                    href={`/shop/${category.categorySlug}/${slugify(subCategory.name)}`}
                                                    className="block px-4 py-2 text-sm text-primary hover:text-secondary-foreground whitespace-nowrap transition-colors duration-300"
                                                    onClick={() => setMainDropdownOpen(false)}
                                                >
                                                    {subCategory.name}
                                                </a>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            ))}
                </div>
            )}
        </div>
    );
};

export default ShopDropdownNavMenu;
"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import { ChevronDown, ChevronRight } from "lucide-react";
import { useCategories } from "@/hooks/use-categories";
import { cn, slugify } from "@/lib/utils";
import { Skeleton } from "../ui/skeleton";
import Link from "next/link";

type Link = {
    title: string;
    route: string;
    slug: string;
};

const ShopDropdownNavMenu = ({ link }: { link: Link }) => {
    const [mainDropdownOpen, setMainDropdownOpen] = useState(false);
    const [isMobileDropdownOpen, setIsMobileDropdownOpen] = useState(false);
    const [hoveredCategoryId, setHoveredCategoryId] = useState<string | null>(null);
    const [expandedCategories, setExpandedCategories] = useState<Record<string, boolean>>({});
    const { categories, isLoading } = useCategories();
    const pathname = usePathname();

    const isActive = (categorySlug: string, subCategorySlug?: string) => {
        if (subCategorySlug) {
            return pathname.includes(`/shop/${categorySlug}/${subCategorySlug}`);
        }
        return pathname.includes(`/shop/${categorySlug}`);
    };

    const toggleDropdown = (e: React.MouseEvent, categoryId: string) => {
        e.preventDefault();
        e.stopPropagation();
        setExpandedCategories(prev => ({
            ...prev,
            [categoryId]: !prev[categoryId]
        }));
    };

    return (
        <>
            { /* DESKTOP */}
            <div
                className="group md:inline-block relative hidden"
                onMouseEnter={() => setMainDropdownOpen(true)}
                onMouseLeave={() => setMainDropdownOpen(false)}>
                {/* Title as trigger */}
                <Link href={"/shop"} className={cn("p-2 flex items-center relative text-xl whitespace-nowrap transition-colors duration-300 after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-0 after:h-[2px] after:bg-secondary-foreground after:transition-width after:duration-300 hover:after:w-full",
                    pathname === link.slug ? "text-secondary-foreground" : "text-background",
                    mainDropdownOpen ? "after:w-full" : "hover:after:w-full after:w-0"
                )}>
                    <span className="text-xl">{link.title}</span>
                    <ChevronDown
                        className={`transition-transform duration-200 ${mainDropdownOpen ? 'rotate-180' : ''}`}
                        style={{ width: 24, height: 24 }}
                    />
                </Link>
                <div className="absolute w-full h-6 left-0 z-40 bg-transparant"></div>

                {/* Main dropdown menu */}
                {mainDropdownOpen && (
                    <div className="absolute -left-2 bg-background rounded-sm shadow-lg z-50 w-fit border border-gray-200" style={{ top: '100%', marginTop: '0.2rem' }}>
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
                                            className={cn("flex items-center justify-between px-4 py-2 text-sm text-primary hover:text-secondary-foreground whitespace-nowrap transition-colors duration-300", pathname.includes(category.categorySlug) ? "text-secondary-foreground font-medium" : "text-primary")}
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

            { /* MOBILE */}
            <div className="px-2 md:hidden w-full text-background text-xl">
                {/* ChevronDown as trigger */}
                <div className="flex items-center justify-between w-full">
                    <Link href={`/shop`}>{link.title}</Link>
                    <button
                        type="button"
                        onClick={(e) => {
                            e.stopPropagation()
                            setIsMobileDropdownOpen(prev => !prev)
                        }}>
                        <ChevronRight
                            className={`m-2 transition-transform duration-200 ${isMobileDropdownOpen ? 'rotate-90' : ''}`}
                            style={{ width: 24, height: 24 }}
                        />
                    </button>
                </div>
                {isMobileDropdownOpen && categories?.map((category) => {
                    const hasSubCategories = category.subCategories?.some(
                        (subCategory) => subCategory.categoryId === category.id
                    );
                    const isCategoryActive = isActive(category.categorySlug);

                    return (
                        <div key={category.id} className="w-full">
                            <div className="flex items-center justify-between w-full">
                                <Link
                                    className={cn(
                                        "relative text-lg whitespace-nowrap transition-colors duration-300 py-0 block",
                                        isCategoryActive && "text-secondary-foreground")}
                                    href={`/shop/${category.categorySlug}`}>
                                    {category.name}
                                </Link>

                                {hasSubCategories && (
                                    <button
                                        onClick={(e) => toggleDropdown(e, category.id)}
                                        aria-expanded={expandedCategories[category.id]}
                                        aria-controls={`subcategory-${category.id}`}
                                        className={cn("", expandedCategories[category.id] && "transform rotate-90")}>
                                        <ChevronRight />
                                    </button>
                                )}
                            </div>

                            {/* Subcategories Section */}
                            {hasSubCategories && (
                                <div
                                    id={`subcategory-${category.id}`}
                                    className={cn(
                                        "pl-4 overflow-hidden transition-all duration-200",
                                        expandedCategories[category.id]
                                            ? "max-h-96 opacity-100"
                                            : "max-h-0 opacity-0")}>
                                    <ul className="pl-2 space-y-1">
                                        {category.subCategories?.map((subCategory) => {
                                            const isSubCategoryActive = isActive(
                                                category.categorySlug,
                                                slugify(subCategory.name)
                                            );

                                            return (
                                                <li key={subCategory.id}>
                                                    <Link
                                                        href={`/shop/${category.categorySlug}/${slugify(subCategory.name)}`}
                                                        className={cn(
                                                            "block",
                                                            isSubCategoryActive && "text-secondary-foreground"
                                                        )}>
                                                        {subCategory.name}
                                                    </Link>
                                                </li>
                                            );
                                        })}
                                    </ul>
                                </div>
                            )}
                        </div>
                    );
                })}
            </div>
        </>
    );
};

export default ShopDropdownNavMenu;
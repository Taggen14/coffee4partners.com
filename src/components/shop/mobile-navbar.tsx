import React, { Dispatch, SetStateAction, useState } from 'react'
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '../ui/sheet';
import Link from 'next/link';
import { CldImage } from 'next-cloudinary';
import { Skeleton } from '../ui/skeleton';
import { NavigationMenu, NavigationMenuItem, NavigationMenuLink, NavigationMenuList } from '../ui/navigation-menu';
import { ChevronDown, ChevronRight, Home } from 'lucide-react';
import { useCategories } from '@/hooks/use-categories';
import { usePathname } from 'next/navigation';
import { cn, slugify } from '@/lib/utils';

interface MobileNavbarProps {
    isMobileMenuOpen: boolean;
    setIsMobileMenuOpen: Dispatch<SetStateAction<boolean>>;
}

const MobileNavbar = ({ isMobileMenuOpen, setIsMobileMenuOpen }: MobileNavbarProps) => {
    const { categories, isLoading } = useCategories();
    const pathname = usePathname();
    const [expandedCategories, setExpandedCategories] = useState<Record<string, boolean>>({});

    const isActive = (categorySlug: string, subCategorySlug?: string) => {
        if (subCategorySlug) {
            return pathname.includes(`/shop/categories/${categorySlug}/${subCategorySlug}`);
        }
        return pathname.includes(`/shop/categories/${categorySlug}`);
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
        <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
            <SheetContent side="left" className="w-[280px] sm:max-w-sm p-0 gap-0 [&>button]:text-primary [&>button]:hover:bg-gray-100">
                <SheetHeader className="p-4">
                    <SheetTitle className="text-center flex items-center justify-center py-0">
                        {/* Logo */}
                        <Link href="/shop" className="relative flex items-center"
                            onClick={() => setIsMobileMenuOpen(false)}>
                            <CldImage
                                src="https://res.cloudinary.com/CLOUD_NAME/image/upload/v1743062927/coffee4partners_logotyp_x36_2x_m2lkv8.png"
                                width={180}
                                height={180}
                                alt="Coffee4partners Logo"
                                className="h-10 w-auto object-contain transition-transform duration-300 hover:scale-105"
                                priority
                            />
                        </Link>
                    </SheetTitle>
                </SheetHeader>
                {isLoading ? (
                    <div className='flex flex-col h-full'>
                        <Skeleton className="h-8 w-full my-1" />
                        <Skeleton className="h-8 w-full my-1" />
                        <Skeleton className="h-8 w-full my-1" />
                    </div>
                ) : (
                    <NavigationMenu className='items-start w-full px-2'>
                        <NavigationMenuList className="flex flex-col">
                            {categories?.map((category) => {
                                const hasSubCategories = category.subCategories?.some(
                                    (subCategory) => subCategory.categoryId === category.id
                                );
                                const isCategoryActive = isActive(category.categorySlug);

                                return (
                                    <NavigationMenuItem key={category.id} className="w-full">
                                        <div className="flex items-center justify-between w-full">
                                            <NavigationMenuLink
                                                className={cn(
                                                    "relative text-lg whitespace-nowrap transition-colors duration-300 hover:text-secondary-foreground py-0 block text-left",
                                                    isCategoryActive && "text-secondary-foreground")}
                                                href={`/shop/categories/${category.categorySlug}`}
                                                onClick={() => setIsMobileMenuOpen(false)}>
                                                {category.name}
                                            </NavigationMenuLink>

                                            {hasSubCategories && (
                                                <button
                                                    onClick={(e) => toggleDropdown(e, category.id)}
                                                    aria-expanded={expandedCategories[category.id]}
                                                    aria-controls={`subcategory-${category.id}`}
                                                    className={cn(
                                                        "text-primary transition-transform duration-200 ml-auto hover:cursor-pointer hover:text-secondary-foreground",
                                                        expandedCategories[category.id] && "transform rotate-90")}>
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
                                                                    href={`/shop/categories/${category.categorySlug}/${slugify(subCategory.name)}`}
                                                                    className={cn(
                                                                        "block text-primary hover:text-secondary-foreground transition-colors",
                                                                        isSubCategoryActive && "text-secondary-foreground"
                                                                    )}
                                                                    onClick={() => setIsMobileMenuOpen(false)}>
                                                                    {subCategory.name}
                                                                </Link>
                                                            </li>
                                                        );
                                                    })}
                                                </ul>
                                            </div>
                                        )}
                                    </NavigationMenuItem>
                                );
                            })}
                        </NavigationMenuList>
                    </NavigationMenu>
                )}


                {/* BACK TO WEBSITE */}
                <Link
                    href="/"
                    className="flex items-center justify-center p-2 gap-2 text-muted-foreground hover:text-foreground transition-colors mt-auto"
                    onClick={() => setIsMobileMenuOpen(false)}>
                    <Home className="h-4 w-4" />
                    <span className="text-sm">Webbplatsen</span>
                </Link>
            </SheetContent>
        </Sheet>
    )
}

export default MobileNavbar
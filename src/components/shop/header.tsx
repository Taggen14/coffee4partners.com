// src/components/shop/header.tsx
"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Sun,
  Moon,
  Search,
  Menu,
  ChevronDown,
  Laptop,
  Home,
  X,
  ShoppingBag,
} from "lucide-react";
import { useCategories } from "@/hooks/use-categories";
import { cn } from "@/lib/utils";
import { Skeleton } from "@/components/ui/skeleton";
import { CartSheet } from "./cart-sheet";
import { SearchSheet } from "./search-sheet";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { useHotkeys } from "react-hotkeys-hook";
import Link from "next/link";
import { CldImage } from "next-cloudinary";

export function ShopHeader() {
  const { setTheme } = useTheme();
  const router = useRouter();
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const { categories, isLoading } = useCategories();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [commandOpen, setCommandOpen] = useState(false);
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const path = window.location.pathname;
    const categoryMatch = path.match(/\/shop\/categories\/([^/]+)/);
    if (categoryMatch) {
      setSelectedCategory(categoryMatch[1]);
    } else {
      setSelectedCategory(null);
    }

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Initialize on mount
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useHotkeys("meta+k, ctrl+k", (e) => {
    e.preventDefault();
    setCommandOpen(true);
  });

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      setCommandOpen(false);
      router.push(`/shop/search?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  const handleCategorySelect = (categoryId: string | null) => {
    setSelectedCategory(categoryId);
    setIsMobileMenuOpen(false);
    if (categoryId) {
      router.push(`/shop/categories/${categoryId}`);
    } else {
      router.push("/shop");
    }
  };

  return (
    <>
      <header
        className={cn(
          "sticky top-0 z-50 w-full",
          "transition-all duration-300 ease-in-out",
          isScrolled
            ? "bg-background shadow-xl"
            : "bg-gradient-to-r from-primary/5 via-background to-primary/5",
        )}
      >
        {/* Premium accent line at top */}
        <div className="h-0.5 w-full bg-gradient-to-r from-primary/40 via-primary/70 to-primary/40"></div>

        <div className="container mx-auto px-3 sm:px-4">
          <div className="flex h-14 sm:h-16 items-center justify-between">
            {/* Left section: Logo and Categories */}
            <div className="flex items-center gap-2 sm:gap-6">
              {/* Logo */}
              <Link href="/shop" className="relative flex items-center">
                <div className="relative overflow-hidden group">
                  <div className="absolute inset-0 rounded-md opacity-0 group-hover:opacity-100 bg-primary/10 blur transition-all duration-300"></div>
                  <CldImage
                    src="https://res.cloudinary.com/CLOUD_NAME/image/upload/v1743062927/coffee4partners_logotyp_x36_2x_m2lkv8.png"
                    width={180}
                    height={180}
                    alt="Coffee4partners Logo"
                    className="h-8 sm:h-10 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
                    priority
                  />
                </div>
              </Link>

              {/* Desktop Categories Dropdown */}
              <div className="hidden md:block">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="ghost"
                      className="text-base font-medium px-3 group"
                    >
                      <span className="mr-1">Kategorier</span>
                      <ChevronDown className="h-4 w-4 opacity-70 transition-transform duration-200 group-data-[state=open]:rotate-180" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent
                    align="start"
                    className="w-56 rounded-md bg-background border border-primary/10 shadow-lg shadow-primary/5"
                  >
                    <DropdownMenuItem
                      className={cn(
                        "text-base py-2.5",
                        !selectedCategory && "text-primary font-medium",
                      )}
                      onClick={() => handleCategorySelect(null)}
                    >
                      <ShoppingBag className="mr-2 h-4 w-4" />
                      Alla produkter
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    {isLoading ? (
                      <>
                        <Skeleton className="h-8 w-full my-1" />
                        <Skeleton className="h-8 w-full my-1" />
                        <Skeleton className="h-8 w-full my-1" />
                      </>
                    ) : (
                      categories?.map((category) => (
                        <DropdownMenuItem
                          key={category.id}
                          className={cn(
                            "text-base py-2.5",
                            selectedCategory === category.id &&
                              "text-primary font-medium",
                          )}
                          onClick={() => handleCategorySelect(category.id)}
                        >
                          <ShoppingBag className="mr-2 h-4 w-4" />
                          {category.name}
                        </DropdownMenuItem>
                      ))
                    )}
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>

              {/* Mobile Categories Button */}
              <Button
                variant="ghost"
                size="sm"
                className="md:hidden flex items-center gap-1 px-2 h-8"
                onClick={() => setIsMobileMenuOpen(true)}
              >
                <Menu className="h-[1.1rem] w-[1.1rem]" />
                <span className="text-sm">Kategorier</span>
              </Button>

              {/* Back to main site link */}
              <Link
                href="/"
                className="hidden md:flex items-center text-muted-foreground hover:text-foreground transition-colors"
              >
                <Home className="mr-1 h-4 w-4" />
                <span className="text-sm">Tillbaka</span>
              </Link>
            </div>

            {/* Center: Search */}
            <form
              onSubmit={handleSearch}
              className="hidden md:flex max-w-md w-full mx-6"
            >
              <div className="relative flex-1">
                <Search
                  className={cn(
                    "absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 transition-colors",
                    isSearchFocused ? "text-primary" : "text-muted-foreground",
                  )}
                />
                <Input
                  placeholder="Sök produkter... (⌘K)"
                  className={cn(
                    "w-full h-9 pl-9 pr-4 bg-muted/50",
                    "border-muted-foreground/20",
                    "focus:bg-background focus:border-primary/30 focus:ring-1 focus:ring-primary/20",
                    "transition-all duration-200",
                  )}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onClick={() => setCommandOpen(true)}
                  onFocus={() => setIsSearchFocused(true)}
                  onBlur={() => setIsSearchFocused(false)}
                />
                {searchQuery && (
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="absolute right-1 top-1/2 -translate-y-1/2 h-7 w-7 rounded-full opacity-70 hover:opacity-100"
                    onClick={() => setSearchQuery("")}
                  >
                    <X className="h-3 w-3" />
                    <span className="sr-only">Rensa sökning</span>
                  </Button>
                )}
              </div>
            </form>

            {/* Right: Actions */}
            <div className="flex items-center gap-1 sm:gap-1.5">
              {/* Mobile search button */}
              <Button
                variant="ghost"
                size="icon"
                className="md:hidden h-8 w-8"
                onClick={() => setCommandOpen(true)}
              >
                <Search className="h-[1.1rem] w-[1.1rem]" />
                <span className="sr-only">Sök</span>
              </Button>

              {/* Theme toggle */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 sm:h-9 sm:w-9"
                  >
                    <Sun className="h-[1.1rem] sm:h-[1.15rem] w-[1.1rem] sm:w-[1.15rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                    <Moon className="absolute h-[1.1rem] sm:h-[1.15rem] w-[1.1rem] sm:w-[1.15rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                    <span className="sr-only">Byt tema</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  align="end"
                  className="min-w-[8rem] rounded-md border border-primary/10 shadow-lg shadow-primary/5"
                >
                  <DropdownMenuItem onClick={() => setTheme("light")}>
                    <Sun className="mr-2 h-4 w-4" />
                    <span>Ljust</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setTheme("dark")}>
                    <Moon className="mr-2 h-4 w-4" />
                    <span>Mörkt</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setTheme("system")}>
                    <Laptop className="mr-2 h-4 w-4" />
                    <span>System</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              {/* Cart */}
              <div className="relative">
                <CartSheet />
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Categories Sheet */}
      <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
        <SheetContent side="left" className="w-[280px] sm:max-w-sm p-0">
          <div className="h-0.5 w-full bg-gradient-to-r from-primary/40 via-primary/70 to-primary/40"></div>
          <SheetHeader className="border-b pb-4 mb-5 px-5 pt-5">
            <SheetTitle className="text-center flex items-center justify-center gap-2">
              <ShoppingBag className="h-4 w-4 text-primary" />
              Kategorier
            </SheetTitle>
          </SheetHeader>
          <div className="grid gap-2 py-2 px-3 overflow-y-auto max-h-[calc(100vh-140px)]">
            <Button
              variant={!selectedCategory ? "default" : "ghost"}
              className="w-full justify-start text-sm sm:text-base h-10 sm:h-11"
              onClick={() => handleCategorySelect(null)}
            >
              <ShoppingBag className="mr-2 h-4 w-4" />
              Alla produkter
            </Button>
            {isLoading ? (
              <>
                <Skeleton className="h-10 w-full" />
                <Skeleton className="h-10 w-full" />
                <Skeleton className="h-10 w-full" />
              </>
            ) : (
              categories?.map((category) => (
                <Button
                  key={category.id}
                  variant={
                    selectedCategory === category.id ? "default" : "ghost"
                  }
                  className="w-full justify-start text-sm sm:text-base h-10 sm:h-11"
                  onClick={() => handleCategorySelect(category.id)}
                >
                  <ShoppingBag className="mr-2 h-4 w-4" />
                  {category.name}
                </Button>
              ))
            )}
            <div className="mt-6 border-t pt-6">
              <Link
                href="/"
                className="flex items-center justify-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <Home className="h-4 w-4" />
                <span className="text-sm">Tillbaka till webbplatsen</span>
              </Link>
            </div>
          </div>
        </SheetContent>
      </Sheet>

      {/* Search Sheet */}
      <SearchSheet open={commandOpen} onOpenChange={setCommandOpen} />
    </>
  );
}

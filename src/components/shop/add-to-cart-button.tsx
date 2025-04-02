"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ShoppingCart, Check, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface AddToCartButtonProps {
  onClick: () => Promise<void>;
  className?: string;
  disabled?: boolean;
}

export function AddToCartButton({
  onClick,
  className,
  disabled,
}: AddToCartButtonProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleClick = async () => {
    if (isLoading || isSuccess) return;

    setIsLoading(true);
    await onClick();
    setIsLoading(false);
    setIsSuccess(true);

    // Reset success state after 2 seconds
    setTimeout(() => {
      setIsSuccess(false);
    }, 2000);
  };

  return (
    <Button
      onClick={handleClick}
      className={cn(
        "relative overflow-hidden transition-all duration-300",
        "bg-primary hover:bg-primary/90",
        "border border-primary/20",
        "shadow-sm hover:shadow-md",
        isSuccess && "bg-emerald-600 hover:bg-emerald-700 border-emerald-500",
        disabled && "opacity-50 cursor-not-allowed",
        className,
      )}
      disabled={isLoading || isSuccess || disabled}
    >
      {/* Background animation for success state */}
      <div
        className={cn(
          "absolute inset-0 bg-emerald-600 transform transition-transform duration-500 ease-out",
          isSuccess ? "translate-x-0" : "-translate-x-full",
        )}
      />

      {/* Content container */}
      <div className="relative flex items-center justify-center min-w-[160px] py-2">
        {/* Default state */}
        <span
          className={cn(
            "flex items-center gap-2 transition-all duration-300",
            "text-white dark:text-black font-medium",
            (isLoading || isSuccess) && "opacity-0 translate-y-2",
          )}
        >
          <ShoppingCart className="h-4 w-4" />
          <span>Lägg i varukorgen</span>
        </span>

        {/* Loading state */}
        <span
          className={cn(
            "absolute flex items-center gap-2 transition-all duration-300",
            "text-white dark:text-black font-medium",
            isLoading
              ? "opacity-100 translate-y-0"
              : "opacity-0 -translate-y-2",
          )}
        >
          <Loader2 className="h-4 w-4 animate-spin" />
          <span>Lägger till...</span>
        </span>

        {/* Success state */}
        <span
          className={cn(
            "absolute flex items-center gap-2 transition-all duration-300",
            "text-white dark:text-black font-medium",
            isSuccess
              ? "opacity-100 translate-y-0"
              : "opacity-0 -translate-y-2",
          )}
        >
          <Check className="h-4 w-4 animate-bounce" />
          <span>Lagd i varukorgen!</span>
        </span>
      </div>
    </Button>
  );
}

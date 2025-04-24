"use client";

import { useEffect } from "react";
import { useCartHydration } from "@/store/use-cart";

// This component will handle cart hydration for all shop pages
export function CartProvider({ children }: { children: React.ReactNode }) {
  const { initializeHydration } = useCartHydration();

  useEffect(() => {
    // Initialize hydration when the component mounts
    initializeHydration();
  }, [initializeHydration]);

  return <>{children}</>;
}

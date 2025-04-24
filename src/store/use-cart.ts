"use client";

import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

export interface CartItem {
  id: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
}

interface CartStore {
  items: CartItem[];
  addItem: (item: Omit<CartItem, "quantity">) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  total: number;
  isHydrated: boolean;
  setHydrated: (state: boolean) => void;
}

export const useCart = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      isHydrated: false,
      setHydrated: (state) => set({ isHydrated: state }),
      addItem: (item) => {
        set((state) => {
          const existingItem = state.items.find((i) => i.id === item.id);
          if (existingItem) {
            return {
              items: state.items.map((i) =>
                i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i,
              ),
            };
          }
          return { items: [...state.items, { ...item, quantity: 1 }] };
        });
      },
      removeItem: (id) => {
        set((state) => ({
          items: state.items.filter((i) => i.id !== id),
        }));
      },
      updateQuantity: (id, quantity) => {
        if (quantity <= 0) {
          get().removeItem(id);
          return;
        }

        set((state) => ({
          items: state.items.map((i) => (i.id === id ? { ...i, quantity } : i)),
        }));
      },
      clearCart: () => set({ items: [] }),
      get total() {
        return get().items.reduce(
          (total, item) => total + item.price * item.quantity,
          0,
        );
      },
    }),
    {
      name: "cart-storage",
      storage: createJSONStorage(() => localStorage),
      skipHydration: true, // Skip hydration on the server
      onRehydrateStorage: () => {
        // callback when hydration is about to happen
        return (state) => {
          // callback when hydration is finished
          if (state) {
            state.setHydrated(true);
          }
        };
      },
    },
  ),
);

// Create a hook that manages hydration status
// To be able to save and read from LocalStorage
export function useCartHydration() {
  const isHydrated = useCart((state) => state.isHydrated);
  const setHydrated = useCart((state) => state.setHydrated);

  // Use this in components to initialize hydration
  const initializeHydration = () => {
    // This is needed because createJSONStorage with skipHydration requires manual hydration
    if (!isHydrated) {
      useCart.persist.rehydrate();
      setHydrated(true);
    }
  };

  return { isHydrated, initializeHydration };
}

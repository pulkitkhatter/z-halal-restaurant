import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import type { PlateSize } from "../lib/api";

export interface CartLine {
  key: string;
  dishName: string;
  size: PlateSize;
  quantity: number;
}

interface CartState {
  lines: CartLine[];
  addItem: (dishName: string, size: PlateSize, quantity: number) => void;
  updateQuantity: (key: string, quantity: number) => void;
  removeItem: (key: string) => void;
  clearCart: () => void;
  totalItems: number;
}

const CartContext = createContext<CartState | null>(null);
const STORAGE_KEY = "z-halal-cart";

function lineKey(dishName: string, size: PlateSize): string {
  return `${dishName}::${size}`;
}

function loadStoredLines(): CartLine[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as CartLine[]) : [];
  } catch {
    return [];
  }
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [lines, setLines] = useState<CartLine[]>(loadStoredLines);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(lines));
  }, [lines]);

  function addItem(dishName: string, size: PlateSize, quantity: number) {
    const key = lineKey(dishName, size);
    setLines((prev) => {
      const existing = prev.find((line) => line.key === key);
      if (existing) {
        return prev.map((line) =>
          line.key === key ? { ...line, quantity: line.quantity + quantity } : line,
        );
      }
      return [...prev, { key, dishName, size, quantity }];
    });
  }

  function updateQuantity(key: string, quantity: number) {
    if (quantity < 1) {
      removeItem(key);
      return;
    }
    setLines((prev) => prev.map((line) => (line.key === key ? { ...line, quantity } : line)));
  }

  function removeItem(key: string) {
    setLines((prev) => prev.filter((line) => line.key !== key));
  }

  function clearCart() {
    setLines([]);
  }

  const totalItems = lines.reduce((sum, line) => sum + line.quantity, 0);

  return (
    <CartContext.Provider
      value={{ lines, addItem, updateQuantity, removeItem, clearCart, totalItems }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart(): CartState {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}

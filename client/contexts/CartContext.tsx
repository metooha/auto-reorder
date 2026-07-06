import React, { createContext, useContext, useState, useCallback } from 'react';

interface CartContextValue {
  /** Total number of items in the cart */
  cartCount: number;
  /** Formatted cart total price */
  cartPrice: string;
  /** Update quantity for a specific product index */
  setItemQuantity: (idx: number, qty: number) => void;
}

const CartContext = createContext<CartContextValue | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<Record<number, number>>({});

  const setItemQuantity = useCallback((idx: number, qty: number) => {
    setItems(prev => {
      if (qty === 0) {
        const next = { ...prev };
        delete next[idx];
        return next;
      }
      return { ...prev, [idx]: qty };
    });
  }, []);

  const cartCount = Object.values(items).reduce((sum, q) => sum + q, 0);
  const cartPrice = `$${(cartCount * 5).toFixed(2)}`;

  return (
    <CartContext.Provider value={{ cartCount, cartPrice, setItemQuantity }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return ctx;
}

'use client';

import { createContext, useContext, useEffect, useMemo, useState, useCallback } from 'react';

const CartContext = createContext(null);
const STORAGE_KEY = 'easydrops-cart';

// A cart line keeps a snapshot of the product so prices/labels stay stable
// even if the catalog changes while items sit in the cart.
function toLine(product, quantity) {
  return {
    id: product.id,
    title: product.title,
    sinhalaName: product.sinhalaName ?? null,
    unit: product.unit ?? '',
    type: product.type ?? 'PACKET',
    imageUrl: product.imageUrl ?? null,
    originalPrice: Number(product.originalPrice ?? product.discountedPrice ?? 0),
    price: Number(product.discountedPrice ?? product.originalPrice ?? 0),
    quantity,
  };
}

export function CartProvider({ children }) {
  const [items, setItems] = useState([]);
  const [ready, setReady] = useState(false);

  // Load once on mount.
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) setItems(JSON.parse(raw));
    } catch {
      /* ignore */
    }
    setReady(true);
  }, []);

  // Persist on change (after the initial load).
  useEffect(() => {
    if (!ready) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch {
      /* ignore */
    }
  }, [items, ready]);

  const add = useCallback((product, quantity = 1) => {
    setItems((prev) => {
      const i = prev.findIndex((l) => l.id === product.id);
      if (i === -1) return [...prev, toLine(product, quantity)];
      const next = [...prev];
      next[i] = { ...next[i], quantity: next[i].quantity + quantity };
      return next;
    });
  }, []);

  const setQty = useCallback((id, quantity) => {
    setItems((prev) =>
      prev
        .map((l) => (l.id === id ? { ...l, quantity } : l))
        .filter((l) => l.quantity > 0)
    );
  }, []);

  const remove = useCallback((id) => {
    setItems((prev) => prev.filter((l) => l.id !== id));
  }, []);

  const clear = useCallback(() => setItems([]), []);

  const count = useMemo(
    () => items.reduce((n, l) => n + (l.quantity > 0 ? 1 : 0), 0),
    [items]
  );
  const subtotal = useMemo(
    () => items.reduce((s, l) => s + l.price * l.quantity, 0),
    [items]
  );

  const value = { items, ready, add, setQty, remove, clear, count, subtotal };
  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used within CartProvider');
  return ctx;
}

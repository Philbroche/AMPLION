import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { CartItem, DiscountCode } from '../types';

interface CartContextType {
  items: CartItem[];
  discountCode: DiscountCode | null;
  addItem: (item: Omit<CartItem, 'quantity'>) => void;
  removeItem: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  applyDiscount: (code: DiscountCode) => void;
  removeDiscount: () => void;
  clearCart: () => void;
  subtotal: number;
  discountAmount: number;
  total: number;
  itemCount: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const CART_STORAGE_KEY = 'amplion_cart';
const DISCOUNT_STORAGE_KEY = 'amplion_discount';

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [discountCode, setDiscountCode] = useState<DiscountCode | null>(null);

  useEffect(() => {
    const savedCart = localStorage.getItem(CART_STORAGE_KEY);
    const savedDiscount = localStorage.getItem(DISCOUNT_STORAGE_KEY);
    if (savedCart) {
      try {
        setItems(JSON.parse(savedCart));
      } catch (e) {
        console.error('Failed to parse cart from localStorage');
      }
    }
    if (savedDiscount) {
      try {
        setDiscountCode(JSON.parse(savedDiscount));
      } catch (e) {
        console.error('Failed to parse discount from localStorage');
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
  }, [items]);

  useEffect(() => {
    if (discountCode) {
      localStorage.setItem(DISCOUNT_STORAGE_KEY, JSON.stringify(discountCode));
    } else {
      localStorage.removeItem(DISCOUNT_STORAGE_KEY);
    }
  }, [discountCode]);

  const addItem = (item: Omit<CartItem, 'quantity'>) => {
    setItems((prev) => {
      const existingItem = prev.find((i) => i.product_id === item.product_id);
      if (existingItem) {
        return prev.map((i) =>
          i.product_id === item.product_id
            ? { ...i, quantity: Math.min(i.quantity + 1, 10) }
            : i
        );
      }
      return [...prev, { ...item, quantity: 1 }];
    });
  };

  const removeItem = (productId: string) => {
    setItems((prev) => prev.filter((item) => item.product_id !== productId));
  };

  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity < 1 || quantity > 10) return;
    setItems((prev) =>
      prev.map((item) =>
        item.product_id === productId ? { ...item, quantity } : item
      )
    );
  };

  const applyDiscount = (code: DiscountCode) => {
    setDiscountCode(code);
  };

  const removeDiscount = () => {
    setDiscountCode(null);
  };

  const clearCart = () => {
    setItems([]);
    setDiscountCode(null);
  };

  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const discountAmount = discountCode
    ? discountCode.discount_type === 'percentage'
      ? (subtotal * discountCode.discount_value) / 100
      : discountCode.discount_value
    : 0;

  const total = Math.max(subtotal - discountAmount, 0);

  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        items,
        discountCode,
        addItem,
        removeItem,
        updateQuantity,
        applyDiscount,
        removeDiscount,
        clearCart,
        subtotal,
        discountAmount,
        total,
        itemCount,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within CartProvider');
  }
  return context;
}

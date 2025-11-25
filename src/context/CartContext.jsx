// src/context/CartContext.jsx
import React, { useState, useMemo, useCallback, useEffect } from "react";
import { CartContext } from "./CartContextValue";

export const CartProvider = ({ children }) => {
  // Initialize cartItems from localStorage
  const [cartItems, setCartItems] = useState(() => {
    const saved = localStorage.getItem("cartItems");
    return saved ? JSON.parse(saved) : [];
  });

  // Add to cart
  const addToCart = useCallback((product, quantity) => {
    setCartItems(prev => {
      const exists = prev.find(item => item.id === product.id);
      let updated;
      if (exists) {
        updated = prev.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      } else {
        updated = [...prev, { ...product, quantity }];
      }
      localStorage.setItem("cartItems", JSON.stringify(updated));
      return updated;
    });
  }, []);

  // Remove from cart
  const removeFromCart = useCallback((id) => {
    setCartItems(prev => {
      const updated = prev.filter(item => item.id !== id);
      localStorage.setItem("cartItems", JSON.stringify(updated));
      return updated;
    });
  }, []);

  // Update quantity
  const updateCartQuantity = useCallback((id, quantity) => {
    setCartItems(prev => {
      const updated = prev.map(item =>
        item.id === id ? { ...item, quantity } : item
      );
      localStorage.setItem("cartItems", JSON.stringify(updated));
      return updated;
    });
  }, []);

  // Auto-sync cart across multiple tabs
  useEffect(() => {
    const handleStorage = (event) => {
      if (event.key === "cartItems") {
        setCartItems(event.newValue ? JSON.parse(event.newValue) : []);
      }
    };
    window.addEventListener("storage", handleStorage);
    return () => window.removeEventListener("storage", handleStorage);
  }, []);

  const value = useMemo(() => ({
    cartItems,
    addToCart,
    removeFromCart,
    updateCartQuantity
  }), [cartItems, addToCart, removeFromCart, updateCartQuantity]);

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};

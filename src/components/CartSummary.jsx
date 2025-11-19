import React, { useContext } from "react";
import { CartContext } from "../context/CartContext";

export const CartSummary = () => {
  const { cartItems } = useContext(CartContext);

  const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className="p-4 border rounded shadow mt-4">
      <h3 className="font-bold">Total: UGX {total}</h3>
    </div>
  );
};

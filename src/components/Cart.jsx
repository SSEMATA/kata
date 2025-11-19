import React, { useContext } from "react";
import { CartContext } from "../context/CartContext";

export const Cart = () => {
  const { cartItems, removeFromCart } = useContext(CartContext);

  return (
    <div className="border p-4 rounded shadow">
      <h2 className="font-bold mb-2">Cart</h2>
      {cartItems.length === 0 ? (
        <p>Cart is empty</p>
      ) : (
        cartItems.map((item) => (
          <div key={item.id} className="flex justify-between mb-2">
            <span>{item.name} x {item.quantity}</span>
            <button
              className="text-red-600"
              onClick={() => removeFromCart(item.id)}
            >
              Remove
            </button>
          </div>
        ))
      )}
    </div>
  );
};

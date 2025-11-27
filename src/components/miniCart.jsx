// src/components/MiniCart.jsx
import React, { useState, useContext, useRef, useEffect } from "react";
import { CartContext } from "../context/CartContextValue";
import { useNavigate } from "react-router-dom";
import { FaShoppingCart, FaTrash } from "react-icons/fa";

export default function MiniCart() {
  const { cartItems, addToCart, removeFromCart } = useContext(CartContext);
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const dropdownRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const totalPrice = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const increment = (item) => addToCart(item, 1);
  const decrement = (item) => {
    if (item.quantity > 1) {
      addToCart(item, -1);
    }
  };

  return (
    <div className="relative">
      {/* Cart Icon */}
      <button
        onClick={() => setOpen(!open)}
        className="relative p-2 text-gray-700 hover:text-green-700"
      >
        <FaShoppingCart size={24} />
        {cartItems.length > 0 && (
          <span className="absolute top-0 right-0 bg-green-600 text-white text-xs px-1 rounded-full">
            {cartItems.length}
          </span>
        )}
      </button>

      {/* Dropdown */}
      {open && (
        <div
          ref={dropdownRef}
          className="absolute right-0 mt-2 w-80 max-h-96 bg-white rounded shadow-lg z-50 overflow-auto"
        >
          <div className="p-4 flex flex-col gap-3">
            <h3 className="text-lg font-bold">Your Cart</h3>

            {cartItems.length === 0 ? (
              <p className="text-sm text-gray-500">Cart is empty</p>
            ) : (
              cartItems.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center justify-between gap-2 border-b pb-2"
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-12 h-12 object-contain rounded"
                  />
                  <div className="flex-1">
                    <p className="text-sm font-semibold">{item.name}</p>
                    <p className="text-xs text-gray-500">{item.type}</p>
                  </div>

                  {/* Quantity */}
                  <div className="flex items-center gap-1">
                    <button
                      className="bg-gray-200 px-1 rounded text-sm"
                      onClick={() => decrement(item)}
                    >
                      -
                    </button>
                    <span className="text-sm">{item.quantity}</span>
                    <button
                      className="bg-green-600 text-white px-1 rounded text-sm"
                      onClick={() => increment(item)}
                    >
                      +
                    </button>
                  </div>

                  {/* Price */}
                  <p className="text-green-700 text-sm font-semibold">
                    {item.price * item.quantity} UGX
                  </p>

                  {/* Delete */}
                  <button
                    className="text-red-600 ml-1"
                    onClick={() => removeFromCart(item.id)}
                  >
                    <FaTrash />
                  </button>
                </div>
              ))
            )}

            {cartItems.length > 0 && (
              <>
                <div className="flex justify-between font-bold mt-2">
                  <span>Total:</span>
                  <span>{totalPrice} UGX</span>
                </div>
                <button
                  onClick={() => {
                    navigate("/cart");
                    setOpen(false);
                  }}
                  className="mt-3 w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
                >
                  Go to Cart
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

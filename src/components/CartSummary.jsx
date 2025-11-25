// src/components/CartSummary.jsx
import React, { useContext, useEffect, useRef, useState } from "react";
import { CartContext } from "../context/CartContextValue";
import { products } from "../data/products";
import { useNavigate } from "react-router-dom";

export default function CartSummary() {
  const { cartItems, addToCart, removeFromCart, updateCartQuantity } = useContext(CartContext);
  const cartRef = useRef(null);
  const [visibleCount, setVisibleCount] = useState(1);
  const navigate = useNavigate();

  // Filter products not in cart
  const relatedProducts = products.filter(
    (p) => !cartItems.some((c) => c.id === p.id)
  ).slice(0, 8);

  const peopleAlsoBuy = products.filter(
    (p) => !cartItems.some((c) => c.id === p.id)
  ).slice(0, 8);

  // Responsive visible count
  useEffect(() => {
    const updateVisibleCount = () => {
      if (!cartRef.current) return;
      const cartHeight = cartRef.current.offsetHeight;
      const cardHeight = 80;
      const count = Math.floor(cartHeight / (cardHeight + 16));
      setVisibleCount(Math.max(1, count));
    };
    updateVisibleCount();
    window.addEventListener("resize", updateVisibleCount);
    return () => window.removeEventListener("resize", updateVisibleCount);
  }, [cartItems]);

  // Slide animation index
  const [currentIndex, setCurrentIndex] = useState(0);
  useEffect(() => {
    if (cartItems.length === 0) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % products.length);
    }, 2000);
    return () => clearInterval(interval);
  }, [cartItems]);

  const totalPrice = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  // Navigate to product page
  const goToProductPage = (productId) => {
    navigate(`/product/${productId}`);
  };

  return (
    <div className="p-4 max-w-7xl mx-auto flex flex-col gap-4">

      {/* Row: Sidebars + Cart */}
      <div className="flex flex-col md:flex-row justify-center gap-4">

        {/* Left Sidebar: Related Products */}
        {cartItems.length > 0 && (
          <div className="hidden md:flex flex-col w-64 flex-shrink-0 space-y-4">
            <h2 className="text-xl font-bold mb-2">Related Products</h2>
            {relatedProducts.slice(0, visibleCount).map((p) => (
              <div
                key={p.id}
                className="bg-white p-2 rounded shadow flex flex-col items-center text-center cursor-pointer"
                onClick={() => goToProductPage(p.id)}
              >
                <img
                  src={p.image}
                  alt={p.name}
                  className="w-16 h-16 object-contain rounded"
                />
                <p className="font-semibold text-sm mt-1">{p.name}</p>
                <p className="text-green-700 text-xs">{p.price} UGX</p>
                <button
                  className="bg-green-600 text-white px-2 py-1 mt-1 rounded text-xs hover:bg-blue-700 transition"
                  onClick={(e) => { e.stopPropagation(); goToProductPage(p.id); }}
                >
                  + Add
                </button>
              </div>
            ))}
          </div>
        )}

        {/* Main Cart Column */}
        <div className="flex-1 max-w-xl flex flex-col gap-4">

          {/* Animated Slide */}
          {cartItems.length > 0 && (
            <div className="overflow-hidden relative w-full h-28 rounded shadow bg-gray-100 flex items-center justify-center cursor-pointer"
                 onClick={() => goToProductPage(products[currentIndex].id)}>
              <img
                key={currentIndex}
                src={products[currentIndex].image}
                alt={products[currentIndex].name}
                className="w-24 h-24 object-contain rounded slide-in-right"
              />
              <button
                className="absolute right-2 bottom-2 bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700 transition text-xs"
                onClick={(e) => { e.stopPropagation(); goToProductPage(products[currentIndex].id); }}
              >
                + Add
              </button>
            </div>
          )}

          {/* Cart Summary */}
          <div
            ref={cartRef}
            className="bg-white p-4 rounded shadow flex flex-col gap-4"
          >
            <h2 className="text-2xl font-bold mb-4">Your Cart</h2>
            {cartItems.length === 0 ? (
              <div className="flex flex-col items-center gap-4">
                <p>Your cart is empty.</p>
                <button
                  className="bg-green-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition"
                  onClick={() => (window.location.href = "/")}
                >
                  Start Buying
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                {cartItems.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center justify-between p-2 border rounded"
                  >
                    <div className="flex items-center gap-4">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-16 h-16 object-contain rounded"
                      />
                      <div>
                        <p className="font-semibold">{item.name}</p>
                        <p className="text-green-700">{item.price} UGX</p>
                        <div className="flex items-center gap-2 mt-1">
                          <button
                            className="bg-gray-300 text-gray-700 px-2 py-0.5 rounded hover:bg-gray-400 transition"
                            onClick={() =>
                              updateCartQuantity(item.id, item.quantity - 1)
                            }
                          >
                            -
                          </button>
                          <span className="text-sm">{item.quantity}</span>
                          <button
                            className="bg-green-600 text-white px-2 py-0.5 rounded hover:bg-green-700 transition"
                            onClick={() => addToCart(item, 1)}
                          >
                            +
                          </button>
                        </div>
                      </div>
                    </div>
                    <button
                      className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700 transition"
                      onClick={() => removeFromCart(item.id)}
                    >
                      Remove
                    </button>
                  </div>
                ))}
              </div>
            )}

            {/* Total Price */}
            {cartItems.length > 0 && (
              <div className="flex justify-between font-bold text-lg mt-2">
                <span>Total:</span>
                <span>{totalPrice} UGX</span>
              </div>
            )}
          </div>
        </div>

        {/* Right Sidebar: People Also Buy */}
        {cartItems.length > 0 && (
          <div className="hidden md:flex flex-col w-64 flex-shrink-0 space-y-4">
            <h2 className="text-xl font-bold mb-2">People Also Buy</h2>
            {peopleAlsoBuy.slice(0, visibleCount).map((p) => (
              <div
                key={p.id}
                className="bg-white p-2 rounded shadow flex flex-col items-center text-center cursor-pointer"
                onClick={() => goToProductPage(p.id)}
              >
                <img
                  src={p.image}
                  alt={p.name}
                  className="w-16 h-16 object-contain rounded"
                />
                <p className="font-semibold text-sm mt-1">{p.name}</p>
                <p className="text-green-700 text-xs">{p.price} UGX</p>
                <button
                  className="bg-green-600 text-white px-2 py-1 mt-1 rounded text-xs hover:bg-blue-700 transition"
                  onClick={(e) => { e.stopPropagation(); goToProductPage(p.id); }}
                >
                  + Add
                </button>
              </div>
            ))}
          </div>
        )}

      </div>

      {/* Place Order Button */}
      {cartItems.length > 0 && (
        <div className="flex justify-center mt-6">
          <button
            className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-yellow-700 transition"
            onClick={() => alert("Order Placed!")}
          >
            Place Order
          </button>
        </div>
      )}

      {/* Slide-in CSS */}
      <style>
        {`
          .slide-in-right {
            animation: slideInRight 0.6s ease-out forwards;
          }
          @keyframes slideInRight {
            from { transform: translateX(100%); opacity: 0; }
            to { transform: translateX(0); opacity: 1; }
          }
        `}
      </style>
    </div>
  );
}

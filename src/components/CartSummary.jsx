// src/components/CartSummary.jsx
import React, { useContext, useEffect, useRef, useState } from "react";
import { CartContext } from "../context/CartContextValue";
import { products } from "../data/products";
import { useNavigate } from "react-router-dom";

export default function CartSummary() {
  const { cartItems, addToCart, removeFromCart, updateCartQuantity } =
    useContext(CartContext);
  const cartRef = useRef(null);
  const [visibleCount, setVisibleCount] = useState(1);
  const navigate = useNavigate();

  const relatedProducts = products
    .filter((p) => !cartItems.some((c) => c.id === p.id))
    .slice(0, 8);

  const peopleAlsoBuy = products
    .filter((p) => !cartItems.some((c) => c.id === p.id))
    .slice(0, 8);

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

  const [currentIndex, setCurrentIndex] = useState(0);
  useEffect(() => {
    if (cartItems.length === 0) return;
    const interval = setInterval(
      () => setCurrentIndex((prev) => (prev + 1) % products.length),
      2000
    );
    return () => clearInterval(interval);
  }, [cartItems]);

  const totalPrice = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const goToProductPage = (productId) => {
    navigate(`/product/${productId}`);
  };

  // WhatsApp Order with Images
  const handlePlaceOrder = () => {
    if (cartItems.length === 0) return;

    let message = "🛒 *My Order*\n\n";

    cartItems.forEach((item, idx) => {
      const subtotal = item.price * item.quantity;
      message += `${idx + 1}. ${item.name}\n`;
      message += `Type: ${item.type}\n`;
      message += `Quantity: ${item.quantity}\n`;
      message += `Price: ${item.price} UGX\n`;
      message += `Subtotal: ${subtotal} UGX\n`;
      message += `Image: ${item.image}\n\n`; // Add image URL
    });

    message += `*Total: ${totalPrice} UGX*`;

    const encodedMessage = encodeURIComponent(message);
    const waLink = `https://wa.me/786023858?text=${encodedMessage}`;
    window.open(waLink, "_blank");
  };

  return (
    <div className="p-4">
      <div className="w-full flex flex-col md:flex-row justify-center gap-4 px-[10%]">
        {/* LEFT SIDEBAR */}
        {cartItems.length > 0 && (
          <div className="hidden md:flex flex-col w-[15%] flex-shrink-0 space-y-4">
            <h2 className="text-xl font-bold mb-2">Related Products</h2>
            {relatedProducts.slice(0, visibleCount).map((p) => (
              <div
                key={p.id}
                className="bg-white p-2 rounded shadow flex flex-col items-center text-center cursor-pointer"
                onClick={() => goToProductPage(p.id)}
              >
                <img src={p.image} alt={p.name} className="w-16 h-16 object-contain" />
                <p className="font-semibold text-sm mt-1">{p.name}</p>
                <p className="text-green-700 text-xs">{p.price} UGX</p>
              </div>
            ))}
          </div>
        )}

        {/* MAIN CART */}
        <div className="w-full md:w-[50%] flex flex-col gap-4">
          {/* Slide Banner */}
          {cartItems.length > 0 && (
            <div
              className="overflow-hidden relative w-full h-28 rounded shadow bg-gray-100 flex items-center justify-center cursor-pointer"
              onClick={() => goToProductPage(products[currentIndex].id)}
            >
              <img
                key={currentIndex}
                src={products[currentIndex].image}
                alt={products[currentIndex].name}
                className="w-24 h-24 object-contain slide-in-right"
              />
            </div>
          )}

          {/* Cart Summary */}
          <div ref={cartRef} className="bg-white p-4 rounded shadow flex flex-col gap-4">
            <h2 className="text-2xl font-bold">Your Cart</h2>

            {cartItems.length === 0 ? (
              <div className="flex flex-col items-center gap-4">
                <p>Your cart is empty.</p>
                <button
                  className="bg-green-600 text-white px-6 py-2 rounded"
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
                    className="grid grid-cols-12 items-center p-2 border rounded gap-2"
                  >
                    {/* IMAGE + NAME + TYPE */}
                    <div className="col-span-5 flex items-center gap-3">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-14 h-14 object-contain rounded"
                      />
                      <div>
                        <p className="font-semibold text-sm">{item.name}</p>
                        <p className="text-gray-500 text-xs">{item.type}</p>
                      </div>
                    </div>

                    {/* QUANTITY */}
                    <div className="col-span-3 flex items-center gap-2">
                      <button
                        className={`px-2 rounded ${
                          (item.type === "Wholesale" && item.quantity <= 10) ||
                          (item.type === "Retail" && item.quantity <= 1)
                            ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                            : "bg-gray-300 text-gray-700"
                        }`}
                        onClick={() => {
                          if (item.type === "Wholesale") {
                            if (item.quantity > 10)
                              updateCartQuantity(item.id, item.quantity - 1);
                          } else {
                            if (item.quantity > 1)
                              updateCartQuantity(item.id, item.quantity - 1);
                          }
                        }}
                        disabled={
                          (item.type === "Wholesale" && item.quantity <= 10) ||
                          (item.type === "Retail" && item.quantity <= 1)
                        }
                      >
                        -
                      </button>
                      <span className="text-sm">{item.quantity}</span>
                      <button
                        className="bg-green-600 text-white px-2 rounded"
                        onClick={() => addToCart(item, 1)}
                      >
                        +
                      </button>
                    </div>

                    {/* PRICE */}
                    <div className="col-span-3 text-green-700 font-semibold text-sm">
                      {item.price * item.quantity} UGX
                    </div>

                    {/* DELETE BUTTON */}
                    <div className="col-span-1 flex justify-end">
                      <button
                        className="text-red-600 text-lg font-bold"
                        onClick={() => removeFromCart(item.id)}
                      >
                        <i className="fa-solid fa-trash"></i>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {cartItems.length > 0 && (
              <div className="flex justify-between font-bold text-lg">
                <span>Total:</span>
                <span>{totalPrice} UGX</span>
              </div>
            )}
          </div>
        </div>

        {/* RIGHT SIDEBAR */}
        {cartItems.length > 0 && (
          <div className="hidden md:flex flex-col w-[15%] flex-shrink-0 space-y-4">
            <h2 className="text-xl font-bold mb-2">People Also Buy</h2>
            {peopleAlsoBuy.slice(0, visibleCount).map((p) => (
              <div
                key={p.id}
                className="bg-white p-2 rounded shadow flex flex-col items-center text-center cursor-pointer"
                onClick={() => goToProductPage(p.id)}
              >
                <img src={p.image} alt={p.name} className="w-16 h-16 object-contain" />
                <p className="font-semibold text-sm mt-1">{p.name}</p>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* PLACE ORDER */}
      {cartItems.length > 0 && (
        <div className="flex justify-center mt-6">
          <button
            className="bg-green-600 text-white px-6 py-2 rounded"
            onClick={handlePlaceOrder}
          >
            Place Order
          </button>
        </div>
      )}

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

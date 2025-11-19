// src/components/ProductCard.jsx
import React, { useState } from "react";

export const ProductCard = ({ product }) => {
  const [quantity, setQuantity] = useState(1);

  const increment = () => setQuantity(quantity + 1);
  const decrement = () => setQuantity(quantity > 1 ? quantity - 1 : 1);

  return (
    <div className="bg-white shadow-lg rounded-lg p-4 flex flex-col items-center hover:shadow-xl transition-all">
      {/* Product Image */}
      <img
        src={product.image}
        alt={product.name}
        className="w-40 h-40 object-cover mb-4 rounded"
        onError={(e) => { e.target.src = "https://via.placeholder.com/150"; }}
      />

      {/* Product Info */}
      <h2 className="font-semibold text-lg text-center">{product.name}</h2>
      <p className="text-gray-600 text-sm text-center mt-1">{product.description}</p>
      <p className="font-bold mt-2 text-green-700 text-center">{quantity * product.price} UGX</p>

      {/* Quantity Controls */}
      <div className="flex items-center gap-3 mt-3">
        <button
          onClick={decrement}
          className="bg-gray-200 px-3 py-1 rounded hover:bg-gray-300 transition"
        >
          -
        </button>
        <span className="font-medium">{quantity}</span>
        <button
          onClick={increment}
          className="bg-gray-200 px-3 py-1 rounded hover:bg-gray-300 transition"
        >
          +
        </button>
      </div>

      {/* Add to Cart */}
      <button className="bg-blue-600 text-white px-6 py-2 mt-4 rounded hover:bg-blue-700 transition">
        Add to Cart
      </button>
    </div>
  );
};

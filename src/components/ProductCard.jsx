import React, { useState, useContext } from "react";
import { CartContext } from "../context/CartContext";

export const ProductCard = ({ product }) => {
  const { addToCart } = useContext(CartContext);
  const [quantity, setQuantity] = useState(1);

  return (
    <div className="border p-4 rounded shadow">
      <img src={product.image} alt={product.name} className="h-32 w-full object-cover mb-2"/>
      <h3 className="font-bold">{product.name}</h3>
      <p className="text-sm">{product.description}</p>
      <p className="font-bold">UGX {product.price * quantity}</p>
      <div className="flex items-center mt-2">
        <button
          className="px-2 py-1 border"
          onClick={() => setQuantity((q) => Math.max(1, q - 1))}
        >
          -
        </button>
        <span className="px-2">{quantity}</span>
        <button
          className="px-2 py-1 border"
          onClick={() => setQuantity((q) => q + 1)}
        >
          +
        </button>
      </div>
      <button
        className="mt-2 bg-green-600 text-white px-4 py-2 rounded"
        onClick={() => addToCart(product, quantity)}
      >
        Add to Cart
      </button>
    </div>
  );
};

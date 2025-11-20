import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { products } from "../data/products";
import { ProductCard } from "../components/ProductCard";

export default function Product() {
  const { productId } = useParams();
  const product = products.find((p) => p.id === parseInt(productId));

  const [quantity, setQuantity] = useState(1);

  if (!product) return <p>Product not found</p>;

  const increment = () => setQuantity((q) => q + 1);
  const decrement = () => setQuantity((q) => (q > 1 ? q - 1 : 1));

  const scrollToFullDesc = () => {
    const el = document.getElementById(`full-desc-${product.id}`);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  const relatedProducts = products.filter(
    (p) => p.category === product.category && p.id !== product.id
  );

  const peopleAlsoBuy = products.filter((p) => p.category !== product.category);

  return (
    <div className="p-4 max-w-5xl mx-auto">
      {/* Product Info */}
      <div className="flex flex-col md:flex-row gap-6 bg-white p-4 rounded shadow">
        <img
          src={product.image}
          alt={product.name}
          className="w-full md:w-1/2 h-64 md:h-96 object-contain rounded"
          onError={(e) => { e.target.src = "https://via.placeholder.com/300"; }}
        />

        <div className="flex-1 flex flex-col gap-4 justify-center items-center">
          {/* Name */}
          <h1 className="text-3xl font-bold text-center">{product.name}</h1>

          {/* Price */}
          <p className="text-green-700 font-bold text-xl text-center">
            {quantity * product.price} UGX
          </p>

          {/* Small Description */}
          <p className="text-gray-700 text-left w-full md:w-auto">
            {product.shortDescription}{" "}
            {product.fullDescription && product.fullDescription !== product.shortDescription && (
              <button
                className="text-blue-600 underline ml-1"
                onClick={scrollToFullDesc}
              >
                Read More
              </button>
            )}
          </p>

          {/* Quantity Selector */}
          <div className="flex items-center gap-3 mt-2 justify-center">
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
          <button className="bg-green-600 text-white px-6 py-2 mt-4 rounded hover:bg-blue-700 transition w-full md:w-40 text-center">
            Add to Cart
          </button>
        </div>
      </div>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <div className="mt-12">
          <h2 className="text-2xl font-bold mb-4">Related Products</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {relatedProducts.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      )}

      {/* People Also Buy */}
      {peopleAlsoBuy.length > 0 && (
        <div className="mt-12">
          <h2 className="text-2xl font-bold mb-4">People Also Buy</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {peopleAlsoBuy.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      )}

      {/* Full Description & Ingredients */}
      <div
        id={`full-desc-${product.id}`}
        className="mt-12 bg-white p-4 rounded shadow"
      >
        {product.fullDescription && (
          <>
            <h2 className="text-2xl font-bold mb-2">Full Description</h2>
            <p className="text-gray-700 mb-4">{product.fullDescription}</p>
          </>
        )}

        {product.ingredients && product.ingredients.length > 0 && (
          <>
            <h2 className="text-2xl font-bold mb-2">Ingredients</h2>
            <ul className="list-disc list-inside text-gray-700">
              {product.ingredients.map((ing, idx) => (
                <li key={idx}>{ing}</li>
              ))}
            </ul>
          </>
        )}
      </div>
    </div>
  );
}

import React from "react";
import { Link } from "react-router-dom";

const ProductCardComponent = ({ product }) => {
  if (!product) return null;

  return (
    <Link to={`/product/${product.id || "#"}`} className="w-full">
      <div className="w-full bg-white shadow-lg rounded-lg p-2 flex flex-col items-center hover:shadow-xl transition-all h-40 md:h-60">
        <img
          src={product.image || "https://via.placeholder.com/150"}
          alt={product.name || "Product"}
          className="w-full h-24 md:h-40 object-contain mb-2 rounded"
          onError={(e) => { e.target.src = "https://via.placeholder.com/150"; }}
        />
        <h2 className="font-semibold text-sm sm:text-base md:text-lg text-center mt-auto">
          {product.name || "Unnamed Product"}
        </h2>
      </div>
    </Link>
  );
};

export const ProductCard = React.memo(ProductCardComponent);

import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { products } from "../data/products";
import { ProductCard } from "../components/ProductCard";

export default function Category() {
  const { categoryName } = useParams();
  const navigate = useNavigate();

  // FILTER PRODUCTS BY CATEGORY
  const filteredProducts = products.filter(
    (p) => p.category.toLowerCase() === categoryName.toLowerCase()
  );

  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold mb-6 capitalize">
        {categoryName}
      </h1>

      {filteredProducts.length === 0 ? (
        <p className="text-gray-500">No products found in this category.</p>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4 gap-4">
          {filteredProducts.map((p) => (
            <ProductCard
              key={p.id}
              product={p}
              onClick={() => navigate(`/product/${p.id}`)}
            />
          ))}
        </div>
      )}
    </div>
  );
}

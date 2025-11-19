import React from "react";
import { useParams } from "react-router-dom";
import { products } from "../data/products";
import { ProductCard } from "../components/ProductCard";

export default function Category() {
  const { categoryName } = useParams();
  const filtered = products.filter((p) => p.category === categoryName);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">{categoryName}</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {filtered.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </div>
  );
}

import React from "react";
import { products } from "../data/products";
import { ProductCard } from "../components/ProductCard";

export default function Home() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {products.map((p) => (
        <ProductCard key={p.id} product={p} />
      ))}
    </div>
  );
}

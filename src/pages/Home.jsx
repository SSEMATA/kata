import React from "react";
import { products } from "../data/products";
import { ProductCard } from "../components/ProductCard";

export default function Home() {
  return (
    <div className="grid grid-cols-3 gap-4 p-4">
      {products.map((p) => (
        <div key={p.id} className="w-full">
          <ProductCard product={p} />
        </div>
      ))}
    </div>
  );
}

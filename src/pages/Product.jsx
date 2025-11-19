import React from "react";
import { useParams } from "react-router-dom";
import { products } from "../data/products";
import { ProductCard } from "../components/ProductCard";

export default function Product() {
  const { productId } = useParams();
  const product = products.find((p) => p.id === Number(productId));

  if (!product) return <p>Product not found</p>;

  return <ProductCard product={product} />;
}

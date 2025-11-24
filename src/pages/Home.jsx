import React from "react";
import { products } from "../data/products";
import { ProductCard } from "../components/ProductCard";
import { AdBanner } from "../components/AdBanner";

// Categories with slides
const categories = [
  {
    key: "seeds",
    title: "Seeds",
    slides: [
      {
        id: 6,
        name: "Onions - Premium",
        description: "High germination, disease resistant.",
        image: "./media/onions.jpg",
      },
      {
        id: 7,
        name: "Tomato Seeds - Hybrid",
        description: "Juicy, large fruits. Resistant to diseases.",
        image: "./media/tomato.jpg",
      },
      {
        id: 8,
        name: "WaterMelon",
        description: "Perfect for oil extraction and bird feed.",
        image: "./media/watermelon.jpg",
      },
    ],
  },
  {
    key: "herbicides",
    title: "Herbicides",
    slides: [
      {
        id: 1,
        name: "2, 4D Amine (500 ML)",
        description: "Selective post-emergence herbicide.",
        image: "/media/2-4D-Amine-500ml.jpg",
      },
      {
        id: 2,
        name: "2, 4D Amine (1 Ltr)",
        description: "Controls broadleaf weeds in crops.",
        image: "/media/2-4D-Amine-1Ltr.jpg",
      },
      {
        id: 3,
        name: "Amino Force 2,4D (1 Ltr)",
        description: "Selective, post-emergence herbicide.",
        image: "/media/aminoforce-2-4D.jpg",
      },
    ],
  },
  {
    key: "fertilizers",
    title: "Fertilizers",
    slides: [
      {
        id: 9,
        name: "NPK 15-15-15",
        description: "Balanced fertilizer for all crops.",
        image: "/media/npk-15-15-15.jpg",
      },
      {
        id: 10,
        name: "Urea 46%",
        description: "High Nitrogen fertilizer for vegetative growth.",
        image: "/media/urea-46.jpg",
      },
    ],
  },
  {
    key: "supplies",
    title: "Supplies",
    slides: [
      {
        id: 11,
        name: "Garden Gloves",
        description: "Comfortable and durable gloves.",
        image: "/media/garden-gloves.jpg",
      },
      {
        id: 12,
        name: "Watering Can",
        description: "Lightweight watering can for efficient use.",
        image: "/media/watering-can.jpg",
      },
    ],
  },
  {
    key: "tools",
    title: "Tools",
    slides: [
      {
        id: 13,
        name: "Hand Trowel",
        description: "Durable hand trowel for gardening.",
        image: "/media/hand-trowel.jpg",
      },
      {
        id: 14,
        name: "Pruning Shears",
        description: "Sharp pruning shears for trimming plants.",
        image: "/media/pruning-shears.jpg",
      },
    ],
  },
];

export default function Home() {
  return (
    <div className="space-y-12 p-4">
      {categories.map((category) => {
        const categoryProducts = products.filter(
          (p) => p.category === category.key
        );

        if (!categoryProducts || categoryProducts.length === 0) return null;

        return (
          <div key={category.key} className="space-y-4">
            {/* Ad Banner Carousel */}
            <AdBanner slides={category.slides} />

            {/* Section Title */}
            <h2 className="text-xl font-bold text-green-700">{category.title}</h2>

            {/* Responsive Product Grid */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {categoryProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}

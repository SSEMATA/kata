import React, { useState } from "react";
import { products } from "../data/products";
import { ProductCard } from "../components/ProductCard";
import { AdBanner } from "../components/AdBanner";

// Categories with slides
const categories = [
  {
    key: "seeds",
    title: "Seeds",
    slides: [
      { id: 6, name: "Onions - Premium", description: "High germination, disease resistant.", image: "./media/onions.webp" },
      { id: 7, name: "Tomato Seeds - Hybrid", description: "Juicy, large fruits. Resistant to diseases.", image: "./media/tomato.webp" },
      { id: 8, name: "WaterMelon", description: "Perfect for oil extraction and bird feed.", image: "./media/watermelon.webp" },
    ],
  },
  {
    key: "herbicides",
    title: "Herbicides",
    slides: [
      { id: 1, name: "2, 4D Amine (500 ML)", description: "Selective post-emergence herbicide.", image: "/media/2-4D-Amine-500ml.jpg" },
      { id: 2, name: "2, 4D Amine (1 Ltr)", description: "Controls broadleaf weeds in crops.", image: "/media/2-4D-Amine-1Ltr.jpg" },
      { id: 3, name: "Amino Force 2,4D (1 Ltr)", description: "Selective, post-emergence herbicide.", image: "/media/aminoforce-2-4D.jpg" },
    ],
  },
  {
    key: "fertilizers",
    title: "Fertilizers",
    slides: [
      { id: 9, name: "NPK 15-15-15", description: "Balanced fertilizer for all crops.", image: "/media/npk-15-15-15.jpg" },
      { id: 10, name: "Urea 46%", description: "High Nitrogen fertilizer for vegetative growth.", image: "/media/urea-46.jpg" },
    ],
  },
  {
    key: "supplies",
    title: "Supplies",
    slides: [
      { id: 11, name: "Garden Gloves", description: "Comfortable and durable gloves.", image: "/media/garden-gloves.jpg" },
      { id: 12, name: "Watering Can", description: "Lightweight watering can for efficient use.", image: "/media/watering-can.jpg" },
    ],
  },
  {
    key: "Supplies",
    title: "Supplies",
    slides: [
      { id: 13, name: "Hand Trowel", description: "Durable hand trowel for gardening.", image: "/media/hand-trowel.jpg" },
      { id: 14, name: "Pruning Shears", description: "Sharp pruning shears for trimming plants.", image: "/media/pruning-shears.jpg" },
    ],
  },
  {
    key: "Insectcides",
    title: "Insecticides",
    slides: [
      { id: 80, name: "Osefin 7.5 Dust (1kg)", description: "Contact insecticide for stored grains.", image: "/media/osefin-7-5-dust.jpg" },
      { id: 81, name: "Ocelamectin (1Ltr)", description: "Systemic insecticide and acaricide.", image: "/media/ocelamectin-1ltr.jpg" },
      { id: 82, name: "Neem Oil (500ml)", description: "Natural insect repellent for crops.", image: "/media/neem-oil-500ml.jpg" },
    ],
  },
  
  {
    key: "Fungcides",
    title: "Fungcides",
    slides: [
      { id: 80, name: "Osefin 7.5 Dust (1kg)", description: "Contact insecticide for stored grains.", image: "/media/osefin-7-5-dust.jpg" },
      { id: 81, name: "Ocelamectin (1Ltr)", description: "Systemic insecticide and acaricide.", image: "/media/ocelamectin-1ltr.jpg" },
      { id: 82, name: "Neem Oil (500ml)", description: "Natural insect repellent for crops.", image: "/media/neem-oil-500ml.jpg" },
    ],
  },
];

export default function Home() {
  const [modalOpen, setModalOpen] = useState(false);
  const [modalCategory, setModalCategory] = useState(null);
  const [showModal, setShowModal] = useState(false); // For fade animation

  const handleViewMore = (categoryKey) => {
    const categoryProducts = products.filter((p) => p.category === categoryKey);
    setModalCategory({ key: categoryKey, products: categoryProducts });
    setModalOpen(true);
    setTimeout(() => setShowModal(true), 10);
  };

  const closeModal = () => {
    setShowModal(false);
    setTimeout(() => {
      setModalOpen(false);
      setModalCategory(null);
    }, 300); // match animation duration
  };

  return (
    <div className="space-y-12 p-4 bg-green-50">
      {categories.map((category) => {
        const categoryProducts = products.filter((p) => p.category === category.key);
        if (!categoryProducts || categoryProducts.length === 0) return null;

        const displayedProducts = categoryProducts.slice(0, 6);

        return (
          <div key={category.key} className="space-y-4">
            {/* Ad Banner Carousel */}
            <AdBanner slides={category.slides} />

            {/* Section Title */}
            <h2 className="text-xl font-bold text-green-700">{category.title}</h2>

            {/* Responsive Product Grid */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {displayedProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>

            {/* View More Button */}
            {categoryProducts.length > 6 && (
              <div className="flex justify-center mt-4">
                <button
                  onClick={() => handleViewMore(category.key)}
                  className="bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-semibold py-2 px-6 rounded transition-all duration-200"
                >
                  View More
                </button>
              </div>
            )}
          </div>
        );
      })}

      {/* Modal */}
      {modalOpen && modalCategory && (
        <div
          onClick={closeModal}
          className={`fixed inset-0 z-50 flex justify-center items-start bg-black bg-opacity-90 p-4 transition-opacity duration-300 overflow-y-auto ${
            showModal ? "opacity-100" : "opacity-0"
          }`}
        >
          {/* Modal content */}
          <div
            onClick={(e) => e.stopPropagation()}
            className={`bg-green-50 rounded-lg w-full max-w-5xl p-6 overflow-y-auto max-h-[calc(100vh-80px)] transform transition-transform duration-300 mt-16 mb-16`}
          >
            {/* Header */}
            <div className="relative mb-4 sticky top-0 bg-green-50 z-10 p-2 flex items-center justify-center">
              <h2 className="text-2xl font-bold text-green-700">{modalCategory.key.toUpperCase()}</h2>
              <button
                onClick={closeModal}
                className="absolute right-2 bg-red-600 hover:bg-red-700 text-white font-bold text-xl rounded-full w-8 h-8 flex items-center justify-center transition-all duration-200"
              >
                &times;
              </button>
            </div>

            {/* Product Grid */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {modalCategory.products.map((product) => (
                <div key={product.id} className="scale-90">
                  <ProductCard product={product} />
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

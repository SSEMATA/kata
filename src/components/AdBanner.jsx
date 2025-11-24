import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const AdBanner = ({ slides = [] }) => {
  const [current, setCurrent] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    if (!slides || slides.length === 0) return;

    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [slides]);

  if (!slides || slides.length === 0) {
    slides = [
      {
        id: 0,
        name: "Placeholder Product",
        description: "This is a placeholder ad.",
        image: "https://via.placeholder.com/800x300?text=Ad+Banner",
      },
    ];
  }

  const handleBuyNow = () => {
    const product = slides[current];
    if (product?.id) {
      navigate(`/product/${product.id}`);
    }
  };

  return (
    <div className="relative w-full overflow-hidden rounded-xl shadow-md bg-gray-100 h-48 md:h-64">
      {/* Background Image */}
      <img
        src={slides[current].image}
        alt={slides[current].name}
        className="w-full h-full object-cover transition-all duration-500"
        onError={(e) => {
          e.target.src = "https://via.placeholder.com/800x300?text=Ad+Banner";
        }}
      />

      {/* Full overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-center items-start p-6">
        <h3 className="text-white text-xl md:text-2xl font-bold">{slides[current].name}</h3>
        <p className="text-white text-sm md:text-base mt-2">{slides[current].description}</p>
        <button
          onClick={handleBuyNow}
          className="mt-4 bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded transition-all duration-200"
        >
          Buy Now
        </button>
      </div>
    </div>
  );
};

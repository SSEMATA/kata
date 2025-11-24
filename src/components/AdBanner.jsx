import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const AdBanner = ({ slides = [] }) => {
  const [current, setCurrent] = useState(0);
  const [prev, setPrev] = useState(null); // track previous slide
  const navigate = useNavigate();

  const handleBuyNow = (id) => {
    if (id) navigate(`/product/${id}`);
  };

  if (!slides || slides.length === 0) {
    slides = [
      {
        id: 0,
        name: "Placeholder Product",
        description: "This is a placeholder ad.",
        image: "https://via.placeholder.com/1200x400?text=Ad+Banner",
      },
    ];
  }

  // Slide change every 4 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setPrev(current);
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [current, slides.length]);

  return (
    <div className="relative w-full h-48 md:h-64 overflow-hidden">
      {slides.map((slide, index) => {
        let className =
          "absolute inset-0 w-full h-full transition-all";

        if (index === current) className += " slide-in-right z-20";
        else if (index === prev) className += " slide-out-left z-10";
        else className += " opacity-0 z-0";

        return (
          <div key={slide.id} className={className}>
            {/* Slide image */}
            <img
              src={slide.image}
              alt={slide.name}
              className="w-full h-full object-cover"
              onError={(e) =>
                (e.target.src =
                  "https://via.placeholder.com/1200x400?text=Ad+Banner")
              }
            />

            {/* Overlay centered */}
            <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-center items-center text-center p-0">
              <h3 className="text-white text-xl md:text-2xl font-bold">
                {slide.name}
              </h3>
              <p className="text-white text-sm md:text-base mt-2">
                {slide.description}
              </p>
              <button
                onClick={() => handleBuyNow(slide.id)}
                className="mt-4 bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded transition-all duration-200"
              >
                Buy Now
              </button>
            </div>
          </div>
        );
      })}

      {/* CSS animations */}
      <style>
        {`
          .slide-in-right {
            animation: slideInRight 0.6s ease-out forwards;
          }

          .slide-out-left {
            animation: slideOutLeft 0.6s ease-out forwards;
          }

          @keyframes slideInRight {
            from { transform: translateX(100%); opacity: 0; }
            to { transform: translateX(0); opacity: 1; }
          }

          @keyframes slideOutLeft {
            from { transform: translateX(0); opacity: 1; }
            to { transform: translateX(-100%); opacity: 0; }
          }
        `}
      </style>
    </div>
  );
};

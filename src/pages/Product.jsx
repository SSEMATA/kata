import React, { useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { products } from "../data/products";
import { ProductCard } from "../components/ProductCard";
import { CartContext } from "../context/CartContextValue";

export default function Product() {
  const { productId } = useParams();
  const product = products.find((p) => p.id === parseInt(productId));
  const navigate = useNavigate();
  const { addToCart } = useContext(CartContext);

  const [showDetails, setShowDetails] = useState(false);
  const [selectedPrice, setSelectedPrice] = useState(null);
  const [quantity, setQuantity] = useState(1);

  if (!product) return <p>Product not found</p>;

  const toggleDetails = () => setShowDetails((prev) => !prev);

  const handleAddToCart = () => {
    if (!selectedPrice) return;
    addToCart({ ...product, price: selectedPrice }, quantity);
    navigate("/cart");
  };

  const increment = () => setQuantity((q) => q + 1);
  const decrement = () => setQuantity((q) => (q > 1 ? q - 1 : 1));

  const relatedProducts = products.filter(
    (p) => p.category === product.category && p.id !== product.id
  );
  const peopleAlsoBuy = products.filter((p) => p.category !== product.category);

  const relatedToShow = relatedProducts.slice(0, 8);
  const peopleAlsoBuyToShow = peopleAlsoBuy.slice(0, 8);

  return (
    <div className="p-4 max-w-5xl mx-auto">
      {/* Product Info */}
      <div
        className="flex flex-col md:flex-row gap-6 bg-white p-4 rounded shadow
                      max-[780px]:p-3 max-[480px]:p-2 max-[780px]:gap-4 max-[480px]:gap-2"
      >
        <img
          src={product.image}
          alt={product.name}
          className="w-full md:w-1/2 h-64 md:h-96 object-contain rounded
                     max-[780px]:h-48 max-[480px]:h-40"
          onError={(e) => {
            e.target.src = "https://via.placeholder.com/300";
          }}
        />

        <div className="flex-1 flex flex-col gap-4 justify-center items-center">
          <h1
            className="text-3xl font-bold text-center
                         max-[780px]:text-2xl max-[480px]:text-xl"
          >
            {product.name}
          </h1>

          <p className="text-gray-700 text-left w-full md:w-auto text-sm max-[480px]:text-xs">
            {product.shortDescription}{" "}
            {product.fullDescription && (
              <button
                className="text-blue-600 underline ml-1 text-sm max-[480px]:text-xs"
                onClick={toggleDetails}
              >
                {showDetails ? "Hide" : "Details"}
              </button>
            )}
          </p>

          {/* Full Details */}
          {showDetails && (
            <div className="mt-2 bg-gray-50 p-4 rounded w-full">
              {product.fullDescription && (
                <>
                  <h2 className="text-xl font-bold mb-2">Full Description</h2>
                  <p className="text-gray-700 mb-4">{product.fullDescription}</p>
                </>
              )}
              {product.ingredients && product.ingredients.length > 0 && (
                <>
                  <h2 className="text-xl font-bold mb-2">Ingredients</h2>
                  <ul className="list-disc list-inside text-gray-700">
                    {product.ingredients.map((ing, idx) => (
                      <li key={idx}>{ing}</li>
                    ))}
                  </ul>
                </>
              )}
              {/* Hide Button below full desc */}
              <div className="flex justify-center mt-4">
                <button
                  onClick={toggleDetails}
                  className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 text-sm"
                >
                  Hide
                </button>
              </div>
            </div>
          )}


          {/* Price & Quantity - only after selection */}
          {selectedPrice && (
            <>
              <p className="text-green-700 font-bold text-xl mt-4 text-center">
                {selectedPrice * quantity} UGX
              </p>

              <div className="flex items-center gap-3 mt-2 justify-center max-[480px]:gap-2">
                <button
                  onClick={decrement}
                  className="bg-gray-200 px-3 py-1 rounded hover:bg-gray-300 transition max-[480px]:px-2 max-[480px]:py-0.5"
                >
                  -
                </button>
                <span className="font-medium text-sm max-[480px]:text-xs">{quantity}</span>
                <button
                  onClick={increment}
                  className="bg-gray-200 px-3 py-1 rounded hover:bg-gray-300 transition max-[480px]:px-2 max-[480px]:py-0.5"
                >
                  +
                </button>
              </div>
                       {/* Retail / Wholesale Buttons - below qty, responsive */}
<div className="flex gap-4 mt-4 flex-wrap justify-center flex-nowrap max-[480px]:flex-wrap">
  <button
    onClick={() => {
      setSelectedPrice(product.retailPrice);
      setQuantity(1);
    }}
    className={`px-3 py-1 rounded font-medium text-sm whitespace-nowrap ${
      selectedPrice === product.retailPrice
        ? "bg-green-700 text-white"
        : "bg-gray-200"
    }`}
  >
    Buy Retail ({product.retailPrice} UGX)
  </button>
  <button
    onClick={() => {
      setSelectedPrice(product.wholesalePrice);
      setQuantity(1);
    }}
    className={`px-3 py-1 rounded font-medium text-sm whitespace-nowrap ${
      selectedPrice === product.wholesalePrice
        ? "bg-green-700 text-white"
        : "bg-gray-200"
    }`}
  >
    Buy Wholesale ({product.wholesalePrice} UGX)
  </button>
</div>


              {/* Add to Cart */}
              <div className="flex justify-center mt-4">
                <button
                  onClick={handleAddToCart}
                  className="bg-green-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition w-40 text-center max-[780px]:w-32 max-[480px]:w-28 max-[480px]:py-1"
                >
                  Add to Cart
                </button>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Related Products */}
      {relatedToShow.length > 0 && (
        <div className="mt-12">
          <h2 className="text-2xl font-bold mb-4">Related Products</h2>
          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-8 gap-4">
            {relatedToShow.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      )}

      {/* People Also Buy */}
      {peopleAlsoBuyToShow.length > 0 && (
        <div className="mt-12">
          <h2 className="text-2xl font-bold mb-4">People Also Buy</h2>
          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-8 gap-4">
            {peopleAlsoBuyToShow.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

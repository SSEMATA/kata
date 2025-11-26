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
  const [selectedType, setSelectedType] = useState(null); // "Retail" or "Wholesale"

  if (!product) return <p>Product not found</p>;

  const toggleDetails = () => setShowDetails((prev) => !prev);

  const handleAddToCart = () => {
    if (!selectedPrice) return;
    addToCart(
      { ...product, price: selectedPrice, type: selectedType },
      quantity
    );
    navigate("/cart");
  };

  // Increment / Decrement
  const increment = () => setQuantity((q) => q + 1);
  const decrement = () => {
    if (selectedType === "Wholesale") {
      setQuantity((q) => (q > 10 ? q - 1 : 10)); // minimum 10
    } else {
      setQuantity((q) => (q > 1 ? q - 1 : 1));
    }
  };

  // When selecting type
  const selectRetail = () => {
    setSelectedPrice(product.retailPrice);
    setSelectedType("Retail");
    setQuantity(1);
  };

  const selectWholesale = () => {
    setSelectedPrice(product.wholesalePrice);
    setSelectedType("Wholesale");
    setQuantity(10); // start from 10
  };

  const relatedProducts = products.filter(
    (p) => p.category === product.category && p.id !== product.id
  );
  const peopleAlsoBuy = products.filter((p) => p.category !== product.category);

  const relatedToShow = relatedProducts.slice(0, 8);
  const peopleAlsoBuyToShow = peopleAlsoBuy.slice(0, 8);

  return (
    <div className="p-4 max-w-5xl mx-auto">
      {/* Product Info */}
      <div className="flex flex-col md:flex-row gap-6 bg-white p-4 rounded shadow">
        <img
          src={product.image}
          alt={product.name}
          className="w-full md:w-1/2 h-64 md:h-96 object-contain rounded"
          onError={(e) => { e.target.src = "https://via.placeholder.com/300"; }}
        />

        <div className="flex-1 flex flex-col gap-4 justify-center items-center">
          <h1 className="text-3xl font-bold text-center">{product.name}</h1>

          <p className="text-gray-700 text-left w-full md:w-auto text-sm">
            {product.shortDescription}{" "}
            {product.fullDescription && (
              <button
                className="text-blue-600 underline ml-1 text-sm"
                onClick={toggleDetails}
              >
                {showDetails ? "Hide" : "Details"}
              </button>
            )}
          </p>

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

          {/* Retail / Wholesale Buttons */}
<div className="flex gap-4 mt-4 flex-wrap justify-center w-full">

  <button
    onClick={selectRetail}
    className={`px-4 py-2 rounded font-medium text-sm w-[45%] sm:w-[40%] md:w-auto text-center ${
      selectedPrice === product.retailPrice
        ? "bg-green-700 text-white"
        : "bg-gray-200"
    }`}
  >
    Buy Retail
  </button>

  <button
    onClick={selectWholesale}
    className={`px-4 py-2 rounded font-medium text-sm w-[45%] sm:w-[40%] md:w-auto text-center ${
      selectedPrice === product.wholesalePrice
        ? "bg-green-700 text-white"
        : "bg-gray-200"
    }`}
  >
    Buy Wholesale
  </button>

</div>

          {/* Price & Quantity */}
          {selectedPrice && (
            <>
              <p className="text-green-700 font-bold text-xl mt-4 text-center">
                {selectedPrice * quantity} UGX
              </p>

              <div className="flex items-center gap-3 mt-2 justify-center">
                <button
                  onClick={decrement}
                  className={`bg-gray-200 px-3 py-1 rounded hover:bg-gray-300 transition ${
                    selectedType === "Wholesale" && quantity <= 10 ? "cursor-not-allowed opacity-50" : ""
                  }`}
                  disabled={selectedType === "Wholesale" && quantity <= 10}
                >
                  -
                </button>
                <span className="font-medium text-sm">{quantity}</span>
                <button
                  onClick={increment}
                  className="bg-gray-200 px-3 py-1 rounded hover:bg-gray-300 transition"
                >
                  +
                </button>
              </div>

              <div className="flex justify-center mt-4">
                <button
                  onClick={handleAddToCart}
                  className="bg-green-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition w-40 text-center"
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

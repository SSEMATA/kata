import React, { useState, useContext, useRef, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { products } from "../data/products";
import { ProductCard } from "../components/ProductCard";
import { CartContext } from "../context/CartContextValue";

export default function Product() {
  const { productId } = useParams();
  const product = products.find((p) => p.id === parseInt(productId));
  const navigate = useNavigate();
  const { addToCart } = useContext(CartContext);

  // Reset sections whenever productId changes
  useEffect(() => {
    setShowDetails(false);
    setShowBenefits(false);
    setShowGrowing(false);
    setShowIngredients(false);
    setShowDirections(false);
    setSelectedPrice(null);
    setSelectedType(null);
    setQuantity(1);
  }, [productId]);

  const [showDetails, setShowDetails] = useState(false);
  const [selectedPrice, setSelectedPrice] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [selectedType, setSelectedType] = useState(null);

  const [showGrowing, setShowGrowing] = useState(false);
  const [showBenefits, setShowBenefits] = useState(false);
  const [showIngredients, setShowIngredients] = useState(false);
  const [showDirections, setShowDirections] = useState(false);

  // refs for scrolling
  const benefitsRef = useRef(null);
  const growingRef = useRef(null);
  const productTopRef = useRef(null);

  useEffect(() => {
    if (showBenefits && benefitsRef.current) {
      benefitsRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [showBenefits]);

  useEffect(() => {
    if (showGrowing && growingRef.current) {
      growingRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [showGrowing]);

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

  const increment = () => setQuantity((q) => q + 1);
  const decrement = () => {
    if (selectedType === "Wholesale") {
      setQuantity((q) => (q > 10 ? q - 1 : 10));
    } else {
      setQuantity((q) => (q > 1 ? q - 1 : 1));
    }
  };

  const selectRetail = () => {
    setSelectedPrice(product.retailPrice);
    setSelectedType("Retail");
    setQuantity(1);
  };

  const selectWholesale = () => {
    setSelectedPrice(product.wholesalePrice);
    setSelectedType("Wholesale");
    setQuantity(10);
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
      <div
        ref={productTopRef}
        className="flex flex-col md:flex-row gap-6 bg-white p-4 rounded shadow"
      >
        <img
          src={product.image}
          alt={product.name}
          className="w-full md:w-1/2 h-64 md:h-96 object-contain rounded"
          onError={(e) => {
            e.target.src = "https://via.placeholder.com/300";
          }}
        />

        <div className="flex-1 flex flex-col gap-4 justify-center items-center">
          <h1 className="text-3xl font-bold text-center">{product.name}</h1>

          <p className="text-gray-700 text-left w-full md:w-auto text-sm">
            {product.shortDescription}{" "}
            {product.fullDescription && (
              <button
                className="text-green-600 underline ml-1 text-sm"
                onClick={toggleDetails}
              >
                {showDetails ? "Hide" : "Details"}
              </button>
            )}
          </p>

          {/* DETAILS SECTION */}
          {showDetails && (
            <div className="mt-2 bg-gray-50 p-4 rounded w-full">
              {/* FULL DESCRIPTION */}
              {product.fullDescription && (
                <>
                  <h2 className="text-xl font-bold mb-2">Full Description</h2>
                  <p className="text-gray-700 mb-4">{product.fullDescription}</p>
                </>
              )}

              {/* SEEDS */}
              {product.category.toLowerCase() === "seeds" && (
                <div className="mb-4 w-full flex flex-col gap-2">
                  <div
                    ref={benefitsRef}
                    className={`overflow-hidden transition-all duration-500 ${
                      showBenefits ? "max-h-[1000px] mt-2" : "max-h-0"
                    }`}
                  >
                    {showBenefits && (
                      <>
                        <h3 className="text-lg font-semibold mb-1">
                          Benefits for Farmers
                        </h3>
                        <ul className="list-disc list-inside text-gray-700 mb-2">
                          {product.benefits.map((benefit, idx) => (
                            <li key={idx}>{benefit}</li>
                          ))}
                        </ul>
                        <div className="mb-2">
                          <button
                            onClick={() => setShowBenefits(false)}
                            className="text-green-600 underline"
                          >
                            Read Less
                          </button>
                        </div>
                      </>
                    )}
                  </div>

                  <div
                    ref={growingRef}
                    className={`overflow-hidden transition-all duration-500 ${
                      showGrowing ? "max-h-[1000px] mt-2" : "max-h-0"
                    }`}
                  >
                    {showGrowing && (
                      <>
                        <h3 className="text-lg font-semibold mb-1">
                          Growing Requirements
                        </h3>
                        <ul className="list-disc list-inside text-gray-700 mb-2">
                          {product.growingRequirements.map((req, idx) => (
                            <li key={idx}>{req}</li>
                          ))}
                        </ul>
                        <div className="mb-2">
                          <button
                            onClick={() => setShowGrowing(false)}
                            className="text-green-600 underline"
                          >
                            Read Less
                          </button>
                        </div>
                      </>
                    )}
                  </div>

                  <div className="flex gap-4">
                    {!showGrowing && (
                      <button
                        onClick={() => setShowGrowing(true)}
                        className="text-green-600 underline"
                      >
                        Read Growing Requirements
                      </button>
                    )}
                    {!showBenefits && (
                      <button
                        onClick={() => setShowBenefits(true)}
                        className="text-green-600 underline"
                      >
                        Read Benefits for Farmers
                      </button>
                    )}
                  </div>
                </div>
              )}

              {/* FERTILIZERS */}
              {product.category.toLowerCase() === "fertilizers" && (
                <div className="mb-4 w-full flex flex-col gap-4">
                  <div className="flex flex-col md:flex-row gap-6">
                    {/* Ingredients */}
                    <div
                      className={`flex-1 overflow-hidden transition-all duration-500 ${
                        showIngredients ? "max-h-[1000px]" : "max-h-0"
                      }`}
                    >
                      {showIngredients && product.ingredients && product.ingredients.length > 0 && (
                        <>
                          <h3 className="text-lg font-semibold mb-1">Ingredients</h3>
                          <ul className="list-disc list-inside text-gray-700 mb-2">
                            {product.ingredients.map((ing, idx) => (
                              <li key={idx}>{ing}</li>
                            ))}
                          </ul>
                          <button
                            onClick={() => setShowIngredients(false)}
                            className="text-green-600 underline mb-2"
                          >
                            Read Less
                          </button>
                        </>
                      )}
                    </div>

                    {/* Directions */}
                    <div
                      className={`flex-1 overflow-hidden transition-all duration-500 ${
                        showDirections ? "max-h-[1000px]" : "max-h-0"
                      }`}
                    >
                      {showDirections && product.directions && product.directions.length > 0 && (
                        <>
                          <h3 className="text-lg font-semibold mb-1">Directions for Use</h3>
                          <ul className="list-disc list-inside text-gray-700 mb-2">
                            {product.directions.map((dir, idx) => (
                              <li key={idx}>
                                <strong>{dir.method}:</strong> {dir.instructions}
                              </li>
                            ))}
                          </ul>
                          <button
                            onClick={() => setShowDirections(false)}
                            className="text-green-600 underline mb-2"
                          >
                            Read Less
                          </button>
                        </>
                      )}
                    </div>
                  </div>

                  {/* Toggle buttons */}
                  <div className="flex gap-4">
                    {!showIngredients && (
                      <button
                        onClick={() => setShowIngredients(true)}
                        className="text-green-600 underline"
                      >
                        Read Ingredients
                      </button>
                    )}
                    {!showDirections && (
                      <button
                        onClick={() => setShowDirections(true)}
                        className="text-green-600 underline"
                      >
                        Read Directions
                      </button>
                    )}
                  </div>
                </div>
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

          {/* RETAIL & WHOLESALE BUTTONS */}
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

          {/* SELECTED PRICE & QUANTITY */}
          {selectedPrice && (
            <>
              <p className="text-green-700 font-bold text-xl mt-4 text-center">
                {selectedPrice * quantity} UGX
              </p>

              <div className="flex items-center gap-3 mt-2 justify-center">
                <button
                  onClick={decrement}
                  className={`bg-gray-200 px-3 py-1 rounded hover:bg-gray-300 transition ${
                    selectedType === "Wholesale" && quantity <= 10
                      ? "cursor-not-allowed opacity-50"
                      : ""
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

      {/* RELATED PRODUCTS */}
      {relatedToShow.length > 0 && (
        <div className="mt-12">
          <h2 className="text-2xl font-bold mb-4">Related Products</h2>
          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4 gap-4">
            {relatedToShow.map((p) => (
              <ProductCard
                key={p.id}
                product={p}
                className="cursor-pointer w-full"
                onClick={() => {
                  navigate(`/product/${p.id}`);
                  setShowDetails(false);
                  setShowGrowing(false);
                  setShowBenefits(false);
                  setShowIngredients(false);
                  setShowDirections(false);
                  setSelectedPrice(null);
                  setSelectedType(null);
                  setQuantity(1);
                  setTimeout(() => {
                    productTopRef.current?.scrollIntoView({
                      behavior: "smooth",
                      block: "start",
                    });
                  }, 100);
                }}
              />
            ))}
          </div>
        </div>
      )}

      {/* PEOPLE ALSO BUY */}
      {peopleAlsoBuyToShow.length > 0 && (
        <div className="mt-12">
          <h2 className="text-2xl font-bold mb-4">People Also Buy</h2>
          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4 gap-4">
            {peopleAlsoBuyToShow.map((p) => (
              <ProductCard
                key={p.id}
                product={p}
                className="cursor-pointer w-full"
                onClick={() => {
                  navigate(`/product/${p.id}`);
                  setShowDetails(false);
                  setShowGrowing(false);
                  setShowBenefits(false);
                  setShowIngredients(false);
                  setShowDirections(false);
                  setSelectedPrice(null);
                  setSelectedType(null);
                  setQuantity(1);
                  setTimeout(() => {
                    productTopRef.current?.scrollIntoView({
                      behavior: "smooth",
                      block: "start",
                    });
                  }, 100);
                }}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

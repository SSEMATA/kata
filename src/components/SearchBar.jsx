import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { products } from "../data/products";

export const SearchBar = () => {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [isFocused, setIsFocused] = useState(false);
  const navigate = useNavigate();
  const wrapperRef = useRef();

  // Close suggestions when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setIsFocused(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    if (!query) return setSuggestions([]);
    const filtered = products.filter((p) =>
      p.name.toLowerCase().includes(query.toLowerCase())
    );
    setSuggestions(filtered.slice(0, 5));
  }, [query]);

  const handleSearch = () => {
    if (!query) return;
    const product = products.find(
      (p) => p.name.toLowerCase() === query.toLowerCase()
    );
    if (product) navigate(`/product/${product.id}`);
    else alert("Product not found");
  };

  const handleSuggestionClick = (name) => {
    const product = products.find((p) => p.name === name);
    if (product) navigate(`/product/${product.id}`);
  };

  return (
    <div
      ref={wrapperRef}
      className="relative w-full max-w-xl mx-auto transition-transform duration-200"
      style={{ transform: isFocused ? "scale(1.02)" : "scale(1)" }}
    >
      <div className="flex">
        <input
          type="text"
          className="flex-1 border border-gray-300 rounded-l px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-400"
          placeholder="Search products..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setIsFocused(true)}
        />
        <button
          onClick={handleSearch}
          className="bg-green-500 text-white px-4 rounded-r hover:bg-blue-600 transition"
        >
          Search
        </button>
      </div>

      {isFocused && suggestions.length > 0 && (
        <ul className="absolute top-full left-0 right-0 bg-white border border-gray-300 rounded mt-1 z-50 shadow-lg">
          {suggestions.map((s) => (
            <li
              key={s.id}
              onClick={() => handleSuggestionClick(s.name)}
              className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
            >
              {s.name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

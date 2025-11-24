// src/components/Footer.jsx
import React from "react";

export const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-6 mt-8">
      <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-4">
        <p className="text-sm">&copy; 2025 Kata Chemicals. All rights reserved.</p>
        <div className="flex gap-4 text-sm">
          <a href="/" className="hover:underline">Home</a>
          <a href="/category/seeds" className="hover:underline">Seeds</a>
          <a href="/category/herbicides" className="hover:underline">Herbicides</a>
          <a href="/category/equipment" className="hover:underline">Equipment</a>
        </div>
      </div>
    </footer>
  );
};

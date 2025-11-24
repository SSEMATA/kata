// src/components/Footer.jsx
import React from "react";
import { Facebook, Twitter, Instagram, Linkedin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="fixed bottom-0 left-0 w-full bg-gray-800 text-white shadow-inner z-50">
      <div className="max-w-7xl mx-auto px-4 py-4 flex flex-col md:flex-row justify-between items-center gap-4">
        
        {/* Company Info */}
        <div className="text-center md:text-left">
          <h1 className="font-bold text-lg">Kata Chemicals</h1>
          <p className="text-sm">Providing quality agricultural solutions since 2025</p>
        </div>

        {/* Quick Links */}
        <div className="flex gap-4 text-sm">
          <a href="/" className="hover:text-green-400 transition">Home</a>
          <a href="/category/seeds" className="hover:text-green-400 transition">Seeds</a>
          <a href="/category/herbicides" className="hover:text-green-400 transition">Herbicides</a>
          <a href="/category/equipment" className="hover:text-green-400 transition">Equipment</a>
          <a href="/category/supplies" className="hover:text-green-400 transition">Supplies</a>
        </div>

        {/* Social Media */}
        <div className="flex gap-3">
          <a href="#" className="hover:text-green-400 transition"><Facebook className="w-5 h-5" /></a>
          <a href="#" className="hover:text-green-400 transition"><Twitter className="w-5 h-5" /></a>
          <a href="#" className="hover:text-green-400 transition"><Instagram className="w-5 h-5" /></a>
          <a href="#" className="hover:text-green-400 transition"><Linkedin className="w-5 h-5" /></a>
        </div>
      </div>
      <div className="text-center text-xs text-gray-400 mt-2">
        &copy; 2025 Kata Chemicals. All rights reserved.
      </div>
    </footer>
  );
}

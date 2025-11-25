// src/components/Footer.jsx
import React, { useEffect, useState } from "react";
import { Facebook, Instagram } from "lucide-react";
import { SiX, SiTiktok, SiWhatsapp } from "react-icons/si"; // X, TikTok, WhatsApp icons

export default function Footer() {
  const [showFooter, setShowFooter] = useState(true);
  const [lastScroll, setLastScroll] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScroll = window.scrollY;

      // Always show when user reaches bottom
      if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 10) {
        setShowFooter(true);
        return;
      }

      if (currentScroll > lastScroll) {
        // scrolling down → show
        setShowFooter(true);
      } else {
        // scrolling up → hide
        setShowFooter(false);
      }

      setLastScroll(currentScroll);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScroll]);

  return (
    <footer
      className={`w-full bg-gray-800 text-white shadow-inner transition-all duration-500 ${
        showFooter ? "opacity-100 translate-y-0" : "opacity-0 translate-y-full"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 py-4 flex flex-col md:flex-row justify-between items-center gap-4">
        
        {/* Company Info */}
        <div className="text-center md:text-left">
          <h1 className="font-bold text-lg">Kata Chemicals</h1>
          <p className="text-sm">Providing quality agricultural solutions since 2025</p>
          <p className="text-xs text-gray-300">
            Located Along Bundibugyo Road, Kisenyi Fort Portal City
          </p>
        </div>

        {/* Quick Links */}
        <div className="flex gap-4 text-sm">
          <a href="/" className="hover:text-green-400 transition">Home</a>
          <a href="/category/seeds" className="hover:text-green-400 transition">Seeds</a>
          <a href="/category/herbicides" className="hover:text-green-400 transition">Herbicides</a>
          <a href="/category/pesticides" className="hover:text-green-400 transition">Pesticides</a>
          <a href="/category/equipment" className="hover:text-green-400 transition">Equipment</a>
          <a href="/category/supplies" className="hover:text-green-400 transition">Supplies</a>
        </div>

        {/* Social Media */}
        <div className="flex gap-3">
          <a href="#" className="hover:text-green-400 transition"><Facebook className="w-5 h-5" /></a>

          {/* X (Twitter) */}
          <a href="#" className="hover:text-green-400 transition"><SiX size={20} /></a>

          <a href="#" className="hover:text-green-400 transition"><Instagram className="w-5 h-5" /></a>

          {/* TikTok */}
          <a href="#" className="hover:text-green-400 transition"><SiTiktok size={20} /></a>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="text-center text-xs text-gray-400 mt-2 pb-2">
        &copy; 2025 Kata Chemicals. All rights reserved. <br />
        Designed by{" "}
        <a
          href="https://wa.me/256786023858"
          target="_blank"
          rel="noopener noreferrer"
          className="text-green-400 hover:underline inline-flex items-center gap-1"
        >
          <SiWhatsapp size={14} className="text-green-400" />
          0786023858
        </a>
      </div>
    </footer>
  );
}

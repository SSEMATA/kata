import React, { useState } from "react";
import { Sidebar } from "./Sidebar";
import { SearchBar } from "./SearchBar";
import { Home, Leaf, FlaskConical, Tractor, Package } from "lucide-react";

export const Layout = ({ children, showSidebar = true }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex flex-col w-full bg-gray-50 transition-all duration-300 ease-in-out">
      {/* Top header */}
      <header className="w-full flex items-center justify-between px-4 py-3 bg-white shadow-sm rounded-b-2xl transition-all duration-300">
        {/* Left: Logo */}
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1 text-xl font-semibold text-green-700">
            <span className="text-3xl">Kata Chemicals</span>
          </div>
        </div>

        {/* Cart */}
        <div className="flex items-center gap-1 text-2xl text-gray-800">
          🛒 <span className="text-base">0</span>
        </div>
      </header>

      {/* Search bar under header */}
      <div className="w-full px-4 py-3 bg-white shadow-sm flex justify-center rounded-xl transition-all duration-300">
        <div className="w-full max-w-xl">
          <SearchBar />
        </div>
      </div>

      {/* Mobile nav links */}
      <nav className="w-full bg-white border-b px-4 py-3 flex justify-between text-center text-gray-700 text-sm font-medium md:hidden rounded-xl shadow-sm transition-all duration-300">
        <a href="/" className="flex flex-col items-center gap-1 cursor-pointer hover:text-green-700 transition-all duration-200">
          <Home className="w-6 h-6" />
          Home
        </a>
        <a href="/seeds" className="flex flex-col items-center gap-1 cursor-pointer hover:text-green-700 transition-all duration-200">
          <Leaf className="w-6 h-6" />
          Seeds
        </a>
        <a href="/herbicides" className="flex flex-col items-center gap-1 cursor-pointer hover:text-green-700 transition-all duration-200">
          <FlaskConical className="w-6 h-6" />
          Herbicides
        </a>
        <a href="/equipment" className="flex flex-col items-center gap-1 cursor-pointer hover:text-green-700 transition-all duration-200">
          <Tractor className="w-6 h-6" />
          Equipment
        </a>
        <a href="/supplies" className="flex flex-col items-center gap-1 cursor-pointer hover:text-green-700 transition-all duration-200">
          <Package className="w-6 h-6" />
          Supplies
        </a>
      </nav>

      {/* Main layout */}
      <div className="flex flex-1 min-h-screen bg-gray-100 transition-all duration-300 ease-in-out">
        {showSidebar && (
          <>
            {/* Desktop sidebar */}
            <aside className="hidden md:flex flex-col bg-[#2E7D32] shadow rounded-2xl w-64 m-4 transition-all duration-300">
              <Sidebar />
            </aside>

            {/* Mobile sidebar drawer */}
            {sidebarOpen && (
              <div
                className="fixed inset-0 z-50 bg-black bg-opacity-50 transition-all duration-300"
                onClick={() => setSidebarOpen(false)}
              >
                <aside
                  className="absolute left-0 top-0 h-full w-64 bg-[#2E7D32] shadow p-4 rounded-r-2xl transition-all duration-300"
                  onClick={(e) => e.stopPropagation()}
                >
                  <Sidebar />
                </aside>
              </div>
            )}
          </>
        )}

        {/* Main content */}
        <div className="flex-1 flex flex-col p-4 transition-all duration-300 ease-in-out">{children}</div>
      </div>
    </div>
  );
};

import React from "react";
import { Sidebar } from "./Sidebar";
import { SearchBar } from "./SearchBar";

export const Layout = ({ children, showSidebar = true }) => {
  return (
    <div className="flex flex-col w-full bg-white border-b border-gray-200">
      {/* Top header */}
      <header className="w-full flex items-center justify-between px-6 py-4 bg-white">
        {/* Logo */}
        <div className="text-3xl font-semibold text-green-700">Kata Chemicals</div>

        {/* Search bar centered */}
        <div className="flex-1 flex justify-center px-8">
          <div className="w-full max-w-3xl">
            <SearchBar />
          </div>
        </div>

        {/* Right side items */}
        <div className="flex items-center gap-6 text-gray-700 text-lg">
          <div className="flex items-center gap-1">
            <span className="text-pink-600 text-xl"></span>
            
          </div>
          <button className="bg-green-700 text-white px-6 py-2 rounded-full font-medium hover:bg-green-800 transition">
            Log In
          </button>
          <div className="flex items-center gap-2 text-xl">
            🛒
            <span className="text-base">0</span>
          </div>
        </div>
      </header>

      {/* Main layout */}
      <div className="flex min-h-screen bg-gray-100">
        {/* Sidebar */}
        {showSidebar && (
          <aside className="hidden md:flex flex-col bg-white shadow rounded-lg w-64 m-4">
            <div className="flex flex-col h-full sticky top-28">
              <Sidebar />
            </div>
          </aside>
        )}

        {/* Main content */}
        <div className="flex-1 flex flex-col p-4">
          {children}
        </div>
      </div>
    </div>
  );
};

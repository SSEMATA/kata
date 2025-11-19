import React, { useState } from "react";
import { Sidebar } from "./Sidebar";
import { SearchBar } from "./SearchBar";

export const Layout = ({ children, showSidebar = true }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex flex-col w-full bg-white border-b border-gray-200">
      {/* Top header */}
      <header className="w-full flex items-center justify-between px-4 sm:px-6 py-4 bg-white shadow">
        {/* Logo */}
        <div className="text-2xl sm:text-3xl font-semibold text-green-700">Kata Chemicals</div>

        {/* Search bar centered */}
        <div className="flex-1 flex justify-center px-2 sm:px-8">
          <div className="w-full max-w-lg sm:max-w-3xl">
            <SearchBar />
          </div>
        </div>

        {/* Right side items */}
        <div className="flex items-center gap-2 sm:gap-6 text-gray-700 text-lg">
          {/* Hamburger for mobile */}
          <button
            className="md:hidden text-green-700 text-2xl p-2"
            onClick={() => setSidebarOpen(!sidebarOpen)}
          >
            ☰
          </button>

          <button className="bg-green-700 text-white px-4 sm:px-6 py-2 rounded-full font-medium hover:bg-green-800 transition">
            Log In
          </button>

          <div className="flex items-center gap-1 sm:gap-2 text-xl">
            🛒
            <span className="text-base sm:text-lg">0</span>
          </div>
        </div>
      </header>

      {/* Main layout */}
      <div className="flex flex-1 min-h-screen bg-gray-100">
        {/* Sidebar */}
        {showSidebar && (
          <>
            {/* Desktop sidebar */}
            <aside className="hidden md:flex flex-col bg-white shadow rounded-lg w-64 m-4">
              <div className="flex flex-col h-full sticky top-28">
                <Sidebar />
              </div>
            </aside>

            {/* Mobile sidebar drawer */}
            {sidebarOpen && (
              <div className="fixed inset-0 z-50 bg-black bg-opacity-50" onClick={() => setSidebarOpen(false)}>
                <aside
                  className="absolute left-0 top-0 h-full w-64 bg-white shadow p-4"
                  onClick={(e) => e.stopPropagation()}
                >
                  <Sidebar />
                </aside>
              </div>
            )}
          </>
        )}

        {/* Main content */}
        <div className="flex-1 flex flex-col p-4">{children}</div>
      </div>
    </div>
  );
};

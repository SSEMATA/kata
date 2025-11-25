import React, { useContext, useState, useEffect } from "react";
import { Sidebar } from "./Sidebar";
import { SearchBar } from "./SearchBar";
import { Home, Leaf, FlaskConical, Tractor, Package, ShoppingCart } from "lucide-react";
import { Outlet, Link, useNavigate, useLocation } from "react-router-dom";
import { CartContext } from "../context/CartContextValue";
import Footer from "./footer";

export const Layout = () => {
  const { cartItems } = useContext(CartContext);
  const navigate = useNavigate();
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [showSidebar, setShowSidebar] = useState(true); // for scroll detection

  // Show sidebar only on selected pages (exclude /cart)
  const showSidebarOnPage = !location.pathname.startsWith("/cart");

  useEffect(() => {
    if (!showSidebarOnPage) return;

    let timeout;
    const handleScroll = () => {
      setShowSidebar(false); // hide while scrolling
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        setShowSidebar(true); // show after scrolling stops
      }, 150); // 150ms after scroll stops
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [showSidebarOnPage]);

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">

      {/* Top Header */}
      <header className="w-full flex items-center justify-between px-4 py-3 bg-white shadow-sm rounded-b-2xl">
        <div className="text-3xl font-semibold text-green-700">Kata Chemicals</div>

        {/* Cart Icon */}
        <div
          className="relative cursor-pointer"
          onClick={() => navigate("/cart")}
        >
          <ShoppingCart className="w-7 h-7" />
          {cartItems.length > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
              {cartItems.length}
            </span>
          )}
        </div>
      </header>

      {/* Search Bar */}
      <div className="w-full px-4 py-3 bg-white shadow-sm flex justify-center rounded-xl">
        <div className="w-full max-w-xl">
          <SearchBar />
        </div>
      </div>

      {/* Mobile Navigation */}
      <nav className="w-full bg-white border-b px-4 py-3 flex justify-between text-center text-gray-700 text-sm font-medium md:hidden rounded-xl shadow-sm mt-2">
        <Link to="/" className="flex flex-col items-center gap-1 hover:text-green-700 transition-all duration-200">
          <Home className="w-6 h-6" />
          Home
        </Link>
        <Link to="/category/seeds" className="flex flex-col items-center gap-1 hover:text-green-700 transition-all duration-200">
          <Leaf className="w-6 h-6" />
          Seeds
        </Link>
        <Link to="/category/herbicides" className="flex flex-col items-center gap-1 hover:text-green-700 transition-all duration-200">
          <FlaskConical className="w-6 h-6" />
          Herbicides
        </Link>
        <Link to="/category/pesticides" className="flex flex-col items-center gap-1 hover:text-green-700 transition-all duration-200">
          Pesticides
        </Link>
        <Link to="/category/equipment" className="flex flex-col items-center gap-1 hover:text-green-700 transition-all duration-200">
          <Tractor className="w-6 h-6" />
          Equipment
        </Link>
        <Link to="/category/supplies" className="flex flex-col items-center gap-1 hover:text-green-700 transition-all duration-200">
          <Package className="w-6 h-6" />
          Supplies
        </Link>
      </nav>

      {/* Main Layout */}
      <div className="flex flex-1 bg-gray-100 p-4 gap-4">

        {/* Desktop Sidebar */}
        {showSidebarOnPage && (
          <aside
            className={`hidden md:flex w-64 bg-green-600 text-white p-4 rounded-2xl shadow flex-col
                        sticky top-32 transition-opacity duration-[3000ms] ease-in-out`}
            style={{
              height: "500px",
              opacity: showSidebar ? 1 : 0,
              pointerEvents: showSidebar ? "auto" : "none",
            }}
          >
            <Sidebar />
          </aside>
        )}

        {/* Mobile Sidebar Overlay */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 z-50 bg-black bg-opacity-50"
            onClick={() => setSidebarOpen(false)}
          >
            <aside
              className="absolute left-0 top-0 w-64 bg-green-600 text-white shadow p-4 rounded-r-2xl overflow-y-auto"
              style={{ height: "600px" }}
              onClick={(e) => e.stopPropagation()}
            >
              <Sidebar />
            </aside>
          </div>
        )}

        {/* Main Content */}
        <div className="flex-1 flex flex-col">
          <Outlet />
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};

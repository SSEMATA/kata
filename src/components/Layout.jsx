import React, { useContext, useState, useEffect, useRef } from "react";
import { Sidebar } from "./Sidebar";
import { SearchBar } from "./SearchBar";
import { Home, Leaf, FlaskConical, Tractor, Package, ShoppingCart, X, Bug, Droplet } from "lucide-react";
import { Outlet, Link, useNavigate, useLocation } from "react-router-dom";
import { CartContext } from "../context/CartContextValue";
import Footer from "./footer";
import { products } from "../data/products"; // Make sure products imported for breadcrumb product name

export const Layout = () => {
  const { cartItems } = useContext(CartContext);
  const navigate = useNavigate();
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [showSidebar, setShowSidebar] = useState(true);
  const [showMiniCart, setShowMiniCart] = useState(false);
  const miniCartRef = useRef();

  const showSidebarOnPage = !location.pathname.startsWith("/cart");

  // Scroll detection for sidebar
  useEffect(() => {
    if (!showSidebarOnPage) return;
    let timeout;
    const handleScroll = () => {
      setShowSidebar(false);
      clearTimeout(timeout);
      timeout = setTimeout(() => setShowSidebar(true), 150);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [showSidebarOnPage]);

  // Close mini cart on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (miniCartRef.current && !miniCartRef.current.contains(event.target)) {
        setShowMiniCart(false);
      }
    };
    if (showMiniCart) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [showMiniCart]);

  const toggleMiniCart = () => setShowMiniCart((prev) => !prev);

  // Breadcrumbs generation
  const generateBreadcrumbs = () => {
    if (location.pathname === "/") return []; // No breadcrumbs on Home

    const paths = location.pathname.split("/").filter(Boolean);
    const crumbs = [{ name: "Home", url: "/" }];

    if (paths[0] === "category" && paths[1]) {
      crumbs.push({
        name: paths[1].charAt(0).toUpperCase() + paths[1].slice(1),
        url: location.pathname,
      });
    } else if (paths[0] === "product" && paths[1]) {
      const productId = parseInt(paths[1]);
      const product = products.find((p) => p.id === productId);
      if (product) {
        crumbs.push({
          name: product.category.charAt(0).toUpperCase() + product.category.slice(1),
          url: `/category/${product.category}`,
        });
        crumbs.push({ name: product.name, url: location.pathname });
      } else {
        crumbs.push({ name: "Product", url: location.pathname });
      }
    } else {
      paths.forEach((path, idx) => {
        crumbs.push({
          name: path.charAt(0).toUpperCase() + path.slice(1).replace(/-/g, " "),
          url: "/" + paths.slice(0, idx + 1).join("/"),
        });
      });
    }

    return crumbs;
  };

  const breadcrumbs = generateBreadcrumbs();

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">

      {/* Top Header */}
      <header className="w-full flex items-center justify-between px-4 py-3 bg-white shadow-sm rounded-b-2xl">
        <div className="text-3xl font-semibold text-green-500">Kata Chemicals</div>

        {/* Cart Icon */}
        <div className="relative cursor-pointer" onClick={toggleMiniCart}>
          <ShoppingCart className="w-7 h-7" />
          {cartItems.length > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
              {cartItems.length}
            </span>
          )}
        </div>
      </header>

      {/* Search Bar */}
      <div className="w-full px-4 py-3 bg-white shadow-sm flex justify-center rounded-xl mt-2">
        <div className="w-full max-w-xl">
          <SearchBar />
        </div>
      </div>

      {/* Breadcrumbs */}
      {breadcrumbs.length > 0 && (
        <div className="w-full px-4 py-2 bg-white shadow-sm rounded-xl my-2">
          <ul className="flex gap-1 flex-wrap text-sm text-gray-600">
            {breadcrumbs.map((crumb, idx) => (
              <li key={idx} className="flex items-center gap-1">
                {idx > 0 && <span>/</span>}
                {idx === breadcrumbs.length - 1 ? (
                  <span className="font-semibold text-gray-800">{crumb.name}</span>
                ) : (
                  <Link to={crumb.url} className="hover:underline text-green-700">{crumb.name}</Link>
                )}
              </li>
            ))}
          </ul>
        </div>
      )}

{/* Mobile Navigation */}
<nav className="w-full bg-green-500 px-4 py-3 flex justify-between text-center text-white text-sm font-medium md:hidden shadow-sm mt-2">
  <Link to="/" className="flex flex-col items-center gap-1 hover:text-gray-200 transition-all duration-200">
    <Home className="w-6 h-6" />
    Home
  </Link>
  <Link to="/category/seeds" className="flex flex-col items-center gap-1 hover:text-gray-200 transition-all duration-200">
    <Leaf className="w-6 h-6" />
    Seeds
  </Link>
  <Link to="/category/herbicides" className="flex flex-col items-center gap-1 hover:text-gray-200 transition-all duration-200">
    <FlaskConical className="w-6 h-6" />
    Herbicides
  </Link>
  <Link to="/category/pestcides" className="flex flex-col items-center gap-1 hover:text-gray-200 transition-all duration-200">
    <Bug className="w-6 h-6" />
    Pesticides
  </Link>
  <Link to="/category/fungicides" className="flex flex-col items-center gap-1 hover:text-gray-200 transition-all duration-200">
    <Droplet className="w-6 h-6" />
    Fungicides
  </Link>
  <Link to="/category/supplies" className="flex flex-col items-center gap-1 hover:text-gray-200 transition-all duration-200">
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

      {/* Mini Cart */}
      {showMiniCart && cartItems.length > 0 && (
        <div
          ref={miniCartRef}
          className="fixed right-4 top-16 w-80 bg-white shadow-lg rounded-xl p-4 z-50"
        >
          <div className="flex justify-between items-center mb-2">
            <h3 className="font-bold text-lg">Your Cart</h3>
            <button onClick={() => setShowMiniCart(false)}>
              <X className="w-5 h-5 text-gray-600" />
            </button>
          </div>
          <div className="space-y-2 max-h-60 overflow-y-auto">
            {cartItems.map((item) => (
              <div key={item.id} className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <img src={item.image} alt={item.name} className="w-10 h-10 object-contain rounded" />
                  <div className="flex flex-col">
                    <span className="text-sm font-semibold">{item.name}</span>
                    <span className="text-xs text-gray-500">{item.type}</span>
                    <span className="text-xs text-green-700">{item.quantity} x {item.price} UGX</span>
                  </div>
                </div>
                <span className="text-sm font-bold text-green-700">{item.price * item.quantity} UGX</span>
              </div>
            ))}
          </div>
          <div className="mt-3 flex justify-between font-bold text-lg">
            <span>Total:</span>
            <span>{cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)} UGX</span>
          </div>
          <button
            className="mt-3 w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 transition"
            onClick={() => { navigate("/cart"); setShowMiniCart(false); }}
          >
            Proceed To Place Order
          </button>
        </div>
      )}

      {/* Footer */}
      <Footer />
    </div>
  );
};

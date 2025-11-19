// ================================
// components/Navbar.jsx
// ================================
import { NavLink } from "react-router-dom";
import { useState } from "react";
import { Menu } from "lucide-react"; // hamburger icon

export function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const links = [
    { name: "Admin Panel", to: "/" },
    { name: "Dashboard", to: "/dashboard" },
    { name: "Users", to: "/users" },
    { name: "Products", to: "/products" },
    { name: "Orders", to: "/orders" },
    { name: "Reports & Analytics", to: "/reports" },
    { name: "Settings", to: "/settings" },
  ];

  return (
    <header className="h-16 bg-white shadow flex items-center justify-between px-4 md:hidden fixed left-0 right-0 top-0 z-20">
      <h3 className="text-xl font-semibold">Admin Dashboard</h3>

      {/* Hamburger Menu */}
      <button onClick={() => setMenuOpen(!menuOpen)} className="p-2 rounded hover:bg-gray-100">
        <Menu className="w-6 h-6" />
      </button>

      {/* Mobile Menu */}
      {menuOpen && (
        <nav className="absolute top-16 left-0 right-0 bg-gray-900 text-white shadow-md flex flex-col space-y-2 p-4 z-10">
          {links.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              onClick={() => setMenuOpen(false)} // close menu on click
              className={({ isActive }) =>
                isActive
                  ? "text-orange-400 font-semibold block"
                  : "hover:text-orange-400 block"
              }
            >
              {link.name}
            </NavLink>
          ))}
        </nav>
      )}
    </header>
  );
}

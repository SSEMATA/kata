// ================================
// App.jsx
// ================================
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Sidebar } from "./components/Sidebar";
import { Navbar } from "./components/Navbar";

import Dashboard from "./pages/Dashboard";
import { Users } from "./pages/Users";
import { Products } from "./pages/Products";
import { Orders } from "./pages/Orders";
import { Settings } from "./pages/Settings";
import { Reports } from "./pages/Reports"; // ✅ NEW

export default function App() {
  return (
    <Router>
      {/* Sidebar for medium+ screens */}
      <Sidebar />

      {/* Navbar for small screens */}
      <Navbar />

      {/* Main content */}
      <div className="ml-0 md:ml-64 mt-16 p-6">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/users" element={<Users />} />
          <Route path="/products" element={<Products />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/settings" element={<Settings />} />

          {/* ============================ */}
          {/*        REPORTS PAGE          */}
          {/* ============================ */}
          <Route path="/reports" element={<Reports />} /> {/* 🎉 NEW */}
        </Routes>
      </div>
    </Router>
  );
}

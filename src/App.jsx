import React from "react";
import { Routes, Route } from "react-router-dom";
import { Layout } from "./components/Layout";
import Home from "./pages/Home";
import Category from "./pages/Category";
import Product from "./pages/Product";
import Login from "./pages/Login";
import Reports from "./pages/Reports";
import { CartProvider } from "./context/CartContext";

export default function App() {
  return (
    <CartProvider>
      <Routes>
        {/* Pages without sidebar/navbar */}
        <Route path="/login" element={<Login />} />

        {/* Pages with sidebar/navbar */}
        <Route
          path="/*"
          element={
            <Layout>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="category/:categoryName" element={<Category />} />
                <Route path="product/:productId" element={<Product />} />
                <Route path="reports" element={<Reports />} />
              </Routes>
            </Layout>
          }
        />
      </Routes>
    </CartProvider>
  );
}

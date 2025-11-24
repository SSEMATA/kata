import React from "react";
import { Routes, Route } from "react-router-dom";
import { Layout } from "./components/Layout";
import Home from "./pages/Home";
import Category from "./pages/Category";
import Product from "./pages/Product";
import Login from "./pages/Login";
import Reports from "./pages/Reports";
import CartSummary from "./components/CartSummary";
import { CartProvider } from "./context/CartContext";

export default function App() {
  return (
    <CartProvider>
      <Routes>
        {/* Pages without layout */}
        <Route path="/login" element={<Login />} />

        {/* Pages with layout */}
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="category/:categoryName" element={<Category />} />
          <Route path="product/:productId" element={<Product />} />
          <Route path="reports" element={<Reports />} />
          <Route path="cart" element={<CartSummary />} />
        </Route>
      </Routes>
    </CartProvider>
  );
}

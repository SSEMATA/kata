import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

export function Products() {
  const products = [
    { id: 1, name: "Chicken Biryani", price: 12000, stock: 10 },
    { id: 2, name: "Beef Burger", price: 9000, stock: 5 },
    { id: 3, name: "Milk Tea", price: 3000, stock: 20 },
  ];

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold mb-4">Products</h1>

      <Card className="rounded-2xl shadow-xl">
        <CardHeader>
          <CardTitle>Product List</CardTitle>
        </CardHeader>
        <CardContent>
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b">
                <th className="py-2 px-4">ID</th>
                <th className="py-2 px-4">Name</th>
                <th className="py-2 px-4">Price</th>
                <th className="py-2 px-4">Stock</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product.id} className="border-b hover:bg-gray-50">
                  <td className="py-2 px-4">{product.id}</td>
                  <td className="py-2 px-4">{product.name}</td>
                  <td className="py-2 px-4">UGX {product.price.toLocaleString()}</td>
                  <td className="py-2 px-4">{product.stock}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </CardContent>
      </Card>
    </div>
  );
}

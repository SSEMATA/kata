import React, { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";

export function Orders() {
  const initialOrders = [
    {
      id: 101,
      customer: "John Doe",
      items: ["Chicken Biryani", "Coke"],
      total: 15.5,
      time: "2025-11-14 12:30",
      delivery: "Delivery",
      contact: "0800123456",
      status: "Pending",
    },
    {
      id: 102,
      customer: "Jane Smith",
      items: ["Milk Tea"],
      total: 3.5,
      time: "2025-11-14 13:00",
      delivery: "Pickup",
      contact: "0800987654",
      status: "In Progress",
    },
    {
      id: 103,
      customer: "Mike Johnson",
      items: ["Beef Burger"],
      total: 7,
      time: "2025-11-13 18:20",
      delivery: "Delivery",
      contact: "0800112233",
      status: "Completed",
    },
    {
      id: 104,
      customer: "Alice Brown",
      items: ["Pizza", "Pepsi"],
      total: 12,
      time: "2025-11-14 14:45",
      delivery: "Delivery",
      contact: "0800445566",
      status: "Cancelled",
    },
  ];

  const [orders, setOrders] = useState(initialOrders);
  const [activeTab, setActiveTab] = useState("Pending");

  const handleAction = (id, action) => {
    setOrders((prev) =>
      prev.map((order) => {
        if (order.id === id) {
          switch (action) {
            case "confirm":
              return { ...order, status: "In Progress" };
            case "deliver":
              return { ...order, status: "Completed" };
            case "cancel":
              return { ...order, status: "Cancelled" };
            default:
              return order;
          }
        }
        return order;
      })
    );
  };

  const tabs = ["Pending", "In Progress", "Completed", "Cancelled", "Revenue"];
  const filteredOrders = orders.filter((o) => o.status === activeTab);

  // Revenue calculations (example)
  const revenueOrders = orders.filter((o) => o.status === "Completed");
  const totalRevenue = revenueOrders.reduce((sum, o) => sum + o.total, 0);

  const dailyRevenue = [
    { date: "Mon", revenue: 120 },
    { date: "Tue", revenue: 250 },
    { date: "Wed", revenue: 180 },
    { date: "Thu", revenue: 300 },
    { date: "Fri", revenue: 220 },
    { date: "Sat", revenue: 400 },
    { date: "Sun", revenue: 350 },
  ];

  const revenueSources = [
    { name: "Food", value: 70 },
    { name: "Drinks", value: 20 },
    { name: "Delivery Fee", value: 10 },
  ];
  const COLORS = ["#FFBB28", "#FF8042", "#00C49F"];

  return (
    <div className="p-4 md:p-6 bg-gray-50 min-h-screen space-y-4">
      <h1 className="text-2xl md:text-3xl font-bold text-gray-800">Orders & Revenue Dashboard</h1>

      {/* Tabs */}
      <div className="flex flex-wrap gap-2 mb-4">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-3 md:px-5 py-1 md:py-2 rounded-full font-semibold text-sm md:text-base transition-colors duration-200 ${
              activeTab === tab
                ? "bg-orange-400 text-white shadow-lg"
                : "bg-white text-gray-600 hover:bg-orange-100"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Orders Table Card */}
      {activeTab !== "Revenue" && (
        <Card className="rounded-2xl shadow-xl">
          <CardHeader>
            <CardTitle className="text-lg md:text-xl">{activeTab} Orders</CardTitle>
          </CardHeader>
          <CardContent className="overflow-x-auto">
            <table className="min-w-full text-left border-collapse text-sm md:text-base">
              <thead className="bg-gray-100 sticky top-0 z-10">
                <tr>
                  <th className="py-1 px-2 md:py-2 md:px-4 border-b sticky left-0 bg-gray-100 z-20">ID</th>
                  <th className="py-1 px-2 md:py-2 md:px-4 border-b">Customer</th>
                  <th className="py-1 px-2 md:py-2 md:px-4 border-b">Items</th>
                  <th className="py-1 px-2 md:py-2 md:px-4 border-b">Total</th>
                  <th className="py-1 px-2 md:py-2 md:px-4 border-b">Time</th>
                  <th className="py-1 px-2 md:py-2 md:px-4 border-b">Delivery</th>
                  <th className="py-1 px-2 md:py-2 md:px-4 border-b">Contact</th>
                  <th className="py-1 px-2 md:py-2 md:px-4 border-b">Status</th>
                  <th className="py-1 px-2 md:py-2 md:px-4 border-b">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredOrders.length === 0 && (
                  <tr>
                    <td colSpan="9" className="text-center py-4 text-gray-500 text-sm">
                      No orders in this category.
                    </td>
                  </tr>
                )}
                {filteredOrders.map((order) => (
                  <tr key={order.id} className="hover:bg-gray-50 transition text-sm">
                    <td className="py-1 px-2 md:py-2 md:px-4 border-b sticky left-0 bg-white z-10">{order.id}</td>
                    <td className="py-1 px-2 md:py-2 md:px-4 border-b">{order.customer}</td>
                    <td className="py-1 px-2 md:py-2 md:px-4 border-b">{order.items.join(", ")}</td>
                    <td className="py-1 px-2 md:py-2 md:px-4 border-b">${order.total.toFixed(2)}</td>
                    <td className="py-1 px-2 md:py-2 md:px-4 border-b">{order.time}</td>
                    <td className="py-1 px-2 md:py-2 md:px-4 border-b">{order.delivery}</td>
                    <td className="py-1 px-2 md:py-2 md:px-4 border-b">{order.contact}</td>
                    <td className="py-1 px-2 md:py-2 md:px-4 border-b">
                      <span
                        className={`px-2 py-0.5 md:px-3 md:py-1 rounded-full font-semibold text-xs md:text-sm ${
                          order.status === "Pending"
                            ? "bg-yellow-200 text-yellow-800"
                            : order.status === "In Progress"
                            ? "bg-blue-200 text-blue-800"
                            : order.status === "Completed"
                            ? "bg-green-200 text-green-800"
                            : "bg-red-200 text-red-800"
                        }`}
                      >
                        {order.status}
                      </span>
                    </td>
                    <td className="py-1 px-2 md:py-2 md:px-4 border-b flex flex-wrap gap-1">
                      {order.status === "Pending" && (
                        <>
                          <button
                            onClick={() => handleAction(order.id, "confirm")}
                            className="px-2 py-0.5 md:px-3 md:py-1 bg-green-500 text-white rounded-md text-xs md:text-sm hover:bg-green-600 transition"
                          >
                            ✔ Confirm
                          </button>
                          <button
                            onClick={() => handleAction(order.id, "cancel")}
                            className="px-2 py-0.5 md:px-3 md:py-1 bg-red-500 text-white rounded-md text-xs md:text-sm hover:bg-red-600 transition"
                          >
                            ✖ Cancel
                          </button>
                        </>
                      )}
                      {order.status === "In Progress" && (
                        <button
                          onClick={() => handleAction(order.id, "deliver")}
                          className="px-2 py-0.5 md:px-3 md:py-1 bg-blue-500 text-white rounded-md text-xs md:text-sm hover:bg-blue-600 transition"
                        >
                          🚚 Deliver
                        </button>
                      )}
                      <button className="px-2 py-0.5 md:px-3 md:py-1 bg-gray-200 text-gray-700 rounded-md text-xs md:text-sm hover:bg-gray-300 transition">
                        🔍 Details
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </CardContent>
        </Card>
      )}

      {/* Revenue Tab */}
      {activeTab === "Revenue" && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card className="p-4 rounded-2xl shadow-xl bg-green-50">
              <CardHeader>
                <CardTitle>Total Revenue</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold">${totalRevenue.toFixed(2)}</p>
              </CardContent>
            </Card>

            <Card className="p-4 rounded-2xl shadow-xl bg-blue-50">
              <CardHeader>
                <CardTitle>Daily Revenue Trend</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={200}>
                  <LineChart data={dailyRevenue}>
                    <CartesianGrid stroke="#f0f0f0" strokeDasharray="5 5" />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey="revenue" stroke="#1f77b4" strokeWidth={3} />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card className="p-4 rounded-2xl shadow-xl bg-yellow-50">
              <CardHeader>
                <CardTitle>Revenue Sources</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={200}>
                  <PieChart>
                    <Pie
                      data={revenueSources}
                      dataKey="value"
                      nameKey="name"
                      cx="50%"
                      cy="50%"
                      outerRadius={60}
                      label
                    >
                      {revenueSources.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </div>
      )}
    </div>
  );
}

import React, { useState } from "react";
// Direct relative import instead of @ alias
import { Card, CardHeader, CardTitle, CardContent } from "../components/ui/card";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";

export default function Dashboard() {
  const [orders] = useState([
    { id: 101, customer: "John Doe", item: "Chicken Biryani", status: "Pending" },
    { id: 102, customer: "Jane Smith", item: "Milk Tea", status: "Complete" },
    { id: 103, customer: "Mike Johnson", item: "Beef Burger", status: "Cancelled" },
    { id: 104, customer: "Alice Brown", item: "Pizza", status: "In Progress" },
  ]);

  const stats = {
    total: orders.length,
    pending: orders.filter((o) => o.status === "Pending").length,
    completed: orders.filter((o) => o.status === "Complete").length,
    cancelled: orders.filter((o) => o.status === "Cancelled").length,
  };

  const salesData = [
    { date: "Mon", orders: 3 },
    { date: "Tue", orders: 5 },
    { date: "Wed", orders: 2 },
    { date: "Thu", orders: 6 },
    { date: "Fri", orders: 4 },
    { date: "Sat", orders: 7 },
    { date: "Sun", orders: 5 },
  ];

  return (
    <div className="space-y-6 p-6">
      <h1 className="text-3xl font-bold mb-4">Dashboard Overview</h1>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="rounded-2xl shadow-xl p-4 bg-blue-50">
          <CardHeader>
            <CardTitle>Total Orders</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">{stats.total}</p>
          </CardContent>
        </Card>

        <Card className="rounded-2xl shadow-xl p-4 bg-yellow-50">
          <CardHeader>
            <CardTitle>Pending Orders</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">{stats.pending}</p>
          </CardContent>
        </Card>

        <Card className="rounded-2xl shadow-xl p-4 bg-green-50">
          <CardHeader>
            <CardTitle>Completed Orders</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">{stats.completed}</p>
          </CardContent>
        </Card>

        <Card className="rounded-2xl shadow-xl p-4 bg-red-50">
          <CardHeader>
            <CardTitle>Cancelled Orders</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">{stats.cancelled}</p>
          </CardContent>
        </Card>
      </div>

      {/* Sales Trend Chart */}
      <Card className="rounded-2xl shadow-xl mt-6 p-4">
        <CardHeader>
          <CardTitle>Weekly Sales Trend</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={salesData}>
              <CartesianGrid stroke="#f0f0f0" strokeDasharray="5 5" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="orders" stroke="#ff7f00" strokeWidth={3} />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
}

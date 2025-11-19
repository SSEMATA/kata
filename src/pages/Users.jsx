import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

export function Users() {
  const users = [
    {
      id: 1,
      name: "John Doe",
      email: "john@example.com",
      phone: "+256700000001",
      orders: 24,
      totalSpent: "$560",
      recentActivity: "Ordered 2 items yesterday",
    },
    {
      id: 2,
      name: "Jane Smith",
      email: "jane@example.com",
      phone: "+256700000002",
      orders: 14,
      totalSpent: "$320",
      recentActivity: "Viewed menu today",
    },
    {
      id: 3,
      name: "Mike Johnson",
      email: "mike@example.com",
      phone: "+256700000003",
      orders: 5,
      totalSpent: "$80",
      recentActivity: "Cancelled order 2 days ago",
    },
  ];

  return (
    <div className="space-y-6">
      <h1 className="text-2xl md:text-3xl font-bold mb-4">Users</h1>

      <Card className="rounded-2xl shadow-xl overflow-x-auto">
        <CardHeader>
          <CardTitle>User List</CardTitle>
        </CardHeader>

        <CardContent className="p-2 md:p-4">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[700px] text-left border-collapse text-sm md:text-base">
              <thead>
                <tr className="border-b bg-gray-100">
                  <th className="py-2 px-3 md:py-3 md:px-4">Name</th>
                  <th className="py-2 px-3 md:py-3 md:px-4">Email</th>
                  <th className="py-2 px-3 md:py-3 md:px-4">Phone</th>
                  <th className="py-2 px-3 md:py-3 md:px-4">Number of Orders</th>
                  <th className="py-2 px-3 md:py-3 md:px-4">Total Spent</th>
                  <th className="py-2 px-3 md:py-3 md:px-4">Recent Activity</th>
                </tr>
              </thead>

              <tbody>
                {users.map((user) => (
                  <tr key={user.id} className="border-b hover:bg-gray-50">
                    <td className="py-2 px-3 md:py-3 md:px-4">{user.name}</td>
                    <td className="py-2 px-3 md:py-3 md:px-4">{user.email}</td>
                    <td className="py-2 px-3 md:py-3 md:px-4">{user.phone}</td>
                    <td className="py-2 px-3 md:py-3 md:px-4">{user.orders}</td>
                    <td className="py-2 px-3 md:py-3 md:px-4">{user.totalSpent}</td>
                    <td className="py-2 px-3 md:py-3 md:px-4">{user.recentActivity}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

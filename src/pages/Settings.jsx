import React, { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

export function Settings() {
  const initialUsers = [
    { id: 1, name: "John Doe", role: "Super Admin", email: "john@admin.com" },
    { id: 2, name: "Jane Smith", role: "Admin", email: "jane@admin.com" },
    { id: 3, name: "Mike Johnson", role: "Staff (Kitchen)", email: "mike@staff.com" },
  ];

  const [users, setUsers] = useState(initialUsers);
  const [newUser, setNewUser] = useState({ name: "", email: "", role: "Staff" });
  const [notifications, setNotifications] = useState({
    orders: true,
    newStaff: true,
    systemAlerts: false,
  });

  const roles = [
    "Super Admin",
    "Admin",
    "Staff (Kitchen)",
    "Staff (Waiter)",
    "Staff (Manager)",
    "Staff (Accountant)",
  ];

  const handleAddUser = () => {
    if (!newUser.name || !newUser.email) return;
    setUsers([...users, { id: Date.now(), ...newUser }]);
    setNewUser({ name: "", email: "", role: "Staff" });
  };

  const handleRemoveUser = (id) => {
    setUsers(users.filter((u) => u.id !== id));
  };

  const handleRoleChange = (id, role) => {
    setUsers(users.map((u) => (u.id === id ? { ...u, role } : u)));
  };

  return (
    <div className="p-4 md:p-6 mt-16 md:ml-64 space-y-6 w-full">
      <h1 className="text-3xl font-bold mb-2">Settings</h1>
      <p className="text-gray-600 mb-4">Configure system, notifications, and preferences.</p>

      {/* Notification Preferences Card */}
      <Card className="mb-6 rounded-2xl shadow-xl w-full">
        <CardHeader>
          <CardTitle>Notification Preferences</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex flex-col gap-3 md:flex-row md:items-center md:gap-6">
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={notifications.orders}
                onChange={() =>
                  setNotifications({ ...notifications, orders: !notifications.orders })
                }
                className="w-4 h-4"
              />
              Orders Notifications
            </label>
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={notifications.newStaff}
                onChange={() =>
                  setNotifications({ ...notifications, newStaff: !notifications.newStaff })
                }
                className="w-4 h-4"
              />
              New Staff Notifications
            </label>
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={notifications.systemAlerts}
                onChange={() =>
                  setNotifications({ ...notifications, systemAlerts: !notifications.systemAlerts })
                }
                className="w-4 h-4"
              />
              System Alerts
            </label>
          </div>
        </CardContent>
      </Card>

      {/* Add New User Card */}
      <Card className="mb-6 rounded-2xl shadow-xl w-full">
        <CardHeader>
          <CardTitle>Add New Staff / Admin</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex flex-wrap gap-2 items-center w-full">
            <input
              type="text"
              placeholder="Full Name"
              className="border rounded-md px-3 py-2 text-sm flex-1 min-w-[150px]"
              value={newUser.name}
              onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
            />
            <input
              type="email"
              placeholder="Email"
              className="border rounded-md px-3 py-2 text-sm flex-1 min-w-[150px]"
              value={newUser.email}
              onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
            />
            <select
              className="border rounded-md px-3 py-2 text-sm"
              value={newUser.role}
              onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}
            >
              {roles.map((r) => (
                <option key={r} value={r}>
                  {r}
                </option>
              ))}
            </select>
            <button
              onClick={handleAddUser}
              className="px-4 py-2 bg-green-500 text-white rounded-md text-sm hover:bg-green-600 transition"
            >
              Add User
            </button>
          </div>
        </CardContent>
      </Card>

      {/* Users Table Card */}
      <Card className="rounded-2xl shadow-xl overflow-x-auto w-full">
        <CardHeader>
          <CardTitle>Staff & Admin Accounts</CardTitle>
        </CardHeader>
        <CardContent>
          <table className="min-w-full text-left text-sm md:text-base">
            <thead className="bg-gray-100 sticky top-0 z-10">
              <tr>
                <th className="py-2 px-3 border-b">Name</th>
                <th className="py-2 px-3 border-b">Email</th>
                <th className="py-2 px-3 border-b">Role</th>
                <th className="py-2 px-3 border-b">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id} className="hover:bg-gray-50 transition">
                  <td className="py-2 px-3 border-b">{user.name}</td>
                  <td className="py-2 px-3 border-b">{user.email}</td>
                  <td className="py-2 px-3 border-b">
                    <select
                      className="border rounded-md px-2 py-1 text-sm"
                      value={user.role}
                      onChange={(e) => handleRoleChange(user.id, e.target.value)}
                    >
                      {roles.map((r) => (
                        <option key={r} value={r}>
                          {r}
                        </option>
                      ))}
                    </select>
                  </td>
                  <td className="py-2 px-3 border-b flex gap-2 flex-wrap">
                    <button className="px-2 py-1 bg-blue-500 text-white rounded-md text-xs hover:bg-blue-600 transition">
                      Change Password
                    </button>
                    <button
                      onClick={() => handleRemoveUser(user.id)}
                      className="px-2 py-1 bg-red-500 text-white rounded-md text-xs hover:bg-red-600 transition"
                    >
                      Remove Access
                    </button>
                  </td>
                </tr>
              ))}
              {users.length === 0 && (
                <tr>
                  <td colSpan="4" className="text-center py-4 text-gray-500 text-sm">
                    No staff/admin accounts added yet.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </CardContent>
      </Card>
    </div>
  );
}

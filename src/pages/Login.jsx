import React from "react";

export default function Login() {
  return (
    <div className="max-w-md mx-auto mt-10 p-6 border rounded shadow">
      <h2 className="text-2xl font-bold mb-4">Login</h2>
      <input type="text" placeholder="Username" className="w-full mb-2 p-2 border"/>
      <input type="password" placeholder="Password" className="w-full mb-2 p-2 border"/>
      <button className="w-full bg-blue-600 text-white py-2 rounded">Login</button>
    </div>
  );
}

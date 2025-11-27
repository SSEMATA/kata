import React from "react";
import { NavLink } from "react-router-dom";

export const Sidebar = () => {
  return (
    <div className="bg-[#F4C430] h-full w-full p-4 rounded-2xl shadow-xl overflow-y-auto">

      <nav className="flex flex-col space-y-3">

        <NavLink
          to="/"
          className={({ isActive }) =>
            `px-4 py-2 rounded font-semibold transition 
            ${isActive ? "bg-green-700 text-white" : "text-gray-900 hover:bg-yellow-200"}`
          }
        >
          Home
        </NavLink>

        {/* Seeds */}
        <NavLink
          to="/category/seeds"
          className={({ isActive }) =>
            `px-4 py-2 rounded font-semibold transition 
            ${isActive ? "bg-green-700 text-white" : "text-gray-900 hover:bg-yellow-200"}`
          }
        >
          Seeds
        </NavLink>

        {/* Herbicides */}
        <NavLink
          to="/category/Herbicides"
          className={({ isActive }) =>
            `px-4 py-2 rounded font-semibold transition 
            ${isActive ? "bg-green-700 text-white" : "text-gray-900 hover:bg-yellow-200"}`
          }
        >
          Herbicides
        </NavLink>

        {/* Fertilizers */}
        <NavLink
          to="/category/Fertilizers"
          className={({ isActive }) =>
            `px-4 py-2 rounded font-semibold transition 
            ${isActive ? "bg-green-700 text-white" : "text-gray-900 hover:bg-yellow-200"}`
          }
        >
          Fertilizers
        </NavLink>

        {/* Equipment */}
        <NavLink
          to="/category/Supplies"
          className={({ isActive }) =>
            `px-4 py-2 rounded font-semibold transition 
            ${isActive ? "bg-green-700 text-white" : "text-gray-900 hover:bg-yellow-200"}`
          }
        >
          Supplies
        </NavLink>

        {/* Insecticides */}
        <NavLink
          to="/category/Insectcides"
          className={({ isActive }) =>
            `px-4 py-2 rounded font-semibold transition 
            ${isActive ? "bg-green-700 text-white" : "text-gray-900 hover:bg-yellow-200"}`
          }
        >
          Insecticides
        </NavLink>

        {/* Fungicides */}
        <NavLink
          to="/category/fungcides"
          className={({ isActive }) =>
            `px-4 py-2 rounded font-semibold transition 
            ${isActive ? "bg-green-700 text-white" : "text-gray-900 hover:bg-yellow-200"}`
          }
        >
          Fungicides
        </NavLink>

      </nav>

    </div>
  );
};

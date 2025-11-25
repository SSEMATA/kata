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

        <NavLink
          to="/category/seeds"
          className={({ isActive }) =>
            `px-4 py-2 rounded font-semibold transition 
            ${isActive ? "bg-green-700 text-white" : "text-gray-900 hover:bg-yellow-200"}`
          }
        >
          Seeds
        </NavLink>

        <NavLink
          to="/category/herbicides"
          className={({ isActive }) =>
            `px-4 py-2 rounded font-semibold transition 
            ${isActive ? "bg-green-700 text-white !important" : "text-gray-900 hover:bg-yellow-200"}`
          }
        >
          Herbicides
        </NavLink>

        <NavLink
          to="/category/fertilizers"
          className={({ isActive }) =>
            `px-4 py-2 rounded font-semibold transition 
            ${isActive ? "bg-green-700 text-white" : "text-gray-900 hover:bg-yellow-200"}`
          }
        >
          Fertilizers
        </NavLink>

        <NavLink
          to="/category/equipment"
          className={({ isActive }) =>
            `px-4 py-2 rounded font-semibold transition 
            ${isActive ? "bg-green-700 text-white" : "text-gray-900 hover:bg-yellow-200"}`
          }
        >
          Equipment
        </NavLink>

        <NavLink
          to="/category/supplies"
          className={({ isActive }) =>
            `px-4 py-2 rounded font-semibold transition 
            ${isActive ? "bg-green-700 text-white" : "text-gray-900 hover:bg-yellow-200"}`
          }
        >
          Supplies
        </NavLink>

        <NavLink
          to="/category/pesticides"
          className={({ isActive }) =>
            `px-4 py-2 rounded font-semibold transition 
            ${isActive ? "bg-green-700 text-white" : "text-gray-900 hover:bg-yellow-200"}`
          }
        >
          Pesticides
        </NavLink>

      </nav>

    </div>
  );
};

import React from "react";
import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBug, faDroplet } from "@fortawesome/free-solid-svg-icons"; // Pesticides and Fungicides icons

export const Sidebar = () => {
  return (
    <div className="bg-[#F4C430] h-full w-full p-4 rounded-2xl shadow-xl overflow-y-auto">
      <nav className="flex flex-col space-y-3 mt-2">

        <NavLink
          to="/"
          className={({ isActive }) =>
            `px-4 py-2 rounded-xl font-semibold flex items-center gap-2 transition 
            ${isActive ? "bg-green-700 text-white" : "text-gray-900 hover:bg-yellow-200"}`
          }
        >
          Home
        </NavLink>

        <NavLink
          to="/category/seeds"
          className={({ isActive }) =>
            `px-4 py-2 rounded-xl font-semibold flex items-center gap-2 transition 
            ${isActive ? "bg-green-700 text-white" : "text-gray-900 hover:bg-yellow-200"}`
          }
        >
          Seeds
        </NavLink>

        <NavLink
          to="/category/herbicides"
          className={({ isActive }) =>
            `px-4 py-2 rounded-xl font-semibold flex items-center gap-2 transition 
            ${isActive ? "bg-green-700 text-white" : "text-gray-900 hover:bg-yellow-200"}`
          }
        >
          Herbicides
        </NavLink>

        <NavLink
          to="/category/pesticides"
          className={({ isActive }) =>
            `px-4 py-2 rounded-xl font-semibold flex items-center gap-2 transition 
            ${isActive ? "bg-green-700 text-white" : "text-gray-900 hover:bg-yellow-200"}`
          }
        >
          <FontAwesomeIcon icon={faBug} />
          Pesticides
        </NavLink>

        <NavLink
          to="/category/fungicides"
          className={({ isActive }) =>
            `px-4 py-2 rounded-xl font-semibold flex items-center gap-2 transition 
            ${isActive ? "bg-green-700 text-white" : "text-gray-900 hover:bg-yellow-200"}`
          }
        >
          <FontAwesomeIcon icon={faDroplet} />
          Fungicides
        </NavLink>

        <NavLink
          to="/category/supplies"
          className={({ isActive }) =>
            `px-4 py-2 rounded-xl font-semibold flex items-center gap-2 transition 
            ${isActive ? "bg-green-700 text-white" : "text-gray-900 hover:bg-yellow-200"}`
          }
        >
          Supplies
        </NavLink>

      </nav>
    </div>
  );
};

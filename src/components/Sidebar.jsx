import React from "react";
import { NavLink } from "react-router-dom";

export const Sidebar = () => {
  return (
    <nav className="flex flex-col mt-4 space-y-2">
      <NavLink
        to="/"
        className="px-4 py-2 rounded hover:bg-orange-100 transition"
      >
        Home
      </NavLink>
      <NavLink
        to="/category/herbicides"
        className="px-4 py-2 rounded hover:bg-orange-100 transition"
      >
        Herbicides
      </NavLink>
      <NavLink
        to="/category/fertilizers"
        className="px-4 py-2 rounded hover:bg-orange-100 transition"
      >
        Fertilizers
      </NavLink>
      <NavLink
        to="/category/pesticides"
        className="px-4 py-2 rounded hover:bg-orange-100 transition"
      >
        Pesticides
      </NavLink>
    </nav>
  );
};

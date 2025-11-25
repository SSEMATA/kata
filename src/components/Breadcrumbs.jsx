// src/components/Breadcrumbs.jsx
import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

export default function Breadcrumbs() {
  const location = useLocation();
  const [breadcrumbs, setBreadcrumbs] = useState([]);

  useEffect(() => {
    const paths = location.pathname.split("/").filter(Boolean);
    const crumbs = paths.map((path, index) => {
      const url = "/" + paths.slice(0, index + 1).join("/");
      // Replace IDs with readable format if needed
      const name = isNaN(path)
        ? path.charAt(0).toUpperCase() + path.slice(1).replace(/-/g, " ")
        : `Item ${path}`;
      return { name, url };
    });
    setBreadcrumbs(crumbs);
  }, [location]);

  if (breadcrumbs.length === 0) return null;

  return (
    <nav className="text-sm text-gray-600 my-2">
      <ul className="flex gap-1 flex-wrap">
        <li>
          <Link to="/" className="hover:underline">Home</Link>
        </li>
        {breadcrumbs.map((crumb, idx) => (
          <li key={idx} className="flex items-center gap-1">
            <span>/</span>
            {idx === breadcrumbs.length - 1 ? (
              <span className="font-semibold">{crumb.name}</span>
            ) : (
              <Link to={crumb.url} className="hover:underline">{crumb.name}</Link>
            )}
          </li>
        ))}
      </ul>
    </nav>
  );
}

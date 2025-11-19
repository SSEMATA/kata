import { NavLink } from "react-router-dom";

export function Sidebar() {
  return (
    <aside className="hidden md:block w-64 h-screen bg-gray-900 text-white p-5 fixed left-0 top-0 shadow-xl">
      <h2 className="text-2xl font-bold mb-8">Admin Panel</h2>

      <nav>
        <ul className="space-y-4">
          <li>
            <NavLink
              to="/dashboard"
              className={({ isActive }) =>
                isActive ? "text-orange-400 font-semibold" : "hover:text-orange-400"
              }
            >
              Dashboard
            </NavLink>
          </li>

          <li>
            <NavLink
              to="/users"
              className={({ isActive }) =>
                isActive ? "text-orange-400 font-semibold" : "hover:text-orange-400"
              }
            >
              Users
            </NavLink>
          </li>

          <li>
            <NavLink
              to="/products"
              className={({ isActive }) =>
                isActive ? "text-orange-400 font-semibold" : "hover:text-orange-400"
              }
            >
              Products
            </NavLink>
          </li>

          <li>
            <NavLink
              to="/orders"
              className={({ isActive }) =>
                isActive ? "text-orange-400 font-semibold" : "hover:text-orange-400"
              }
            >
              Orders
            </NavLink>
          </li>

          <li>
            <NavLink
              to="/reports"
              className={({ isActive }) =>
                isActive ? "text-orange-400 font-semibold" : "hover:text-orange-400"
              }
            >
              Reports & Analytics
            </NavLink>
          </li>

          <li>
            <NavLink
              to="/settings"
              className={({ isActive }) =>
                isActive ? "text-orange-400 font-semibold" : "hover:text-orange-400"
              }
            >
              Settings
            </NavLink>
          </li>
        </ul>
      </nav>
    </aside>
  );
}

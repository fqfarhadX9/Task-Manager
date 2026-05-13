import {
  LayoutDashboard,
  Users,
  CheckSquare,
  Calendar,
  MessageSquare,
  Clock4,
} from "lucide-react";

import SidebarItem from "./SidebarItem";
import { useLocation, useNavigate } from "react-router-dom";

export default function Sidebar({ sidebarOpen }) {
  const user = JSON.parse(localStorage.getItem("user") || "{}");

  const location = useLocation();
  const navigate = useNavigate();

  const menuItems = [
    { label: "Dashboard", icon: <LayoutDashboard size={18} />, path: "/dashboard" },
    { label: "Members", icon: <Users size={18} />, path: "/members" },
    { label: "Tasks", icon: <CheckSquare size={18} />, path: "/my-tasks" },
    { label: "Calendar", icon: <Calendar size={18} />, path: "/calendar" },
    { label: "Attendance", icon: <Clock4 size={18} />, path: "/attendance" },
    { label: "Messages", icon: <MessageSquare size={18} />, path: "/messages" },
  ];

  return (
    <aside
      className={`
        ${sidebarOpen ? "w-64" : "w-0"}
        transition-all duration-300
        overflow-hidden
        bg-white dark:bg-gray-950
        flex flex-col
      `}
    >
      {/* HEADER */}
      <div className="flex items-center gap-3 px-6 h-16">
        <div className="w-9 h-9 rounded-lg bg-blue-400 flex items-center justify-center text-white font-bold">
          ✓
        </div>
        <h1 className="text-lg font-semibold text-gray-800 dark:text-white">
          Taskify
        </h1>
      </div>

      {/* NAV */}
      <nav className="flex-1 px-4 py-6 space-y-5">
        <h1 className="text-gray-500 dark:text-gray-400 text-sm">
          MAIN NAVIGATION
        </h1>

        {menuItems.map((item) => (
          <SidebarItem
            key={item.label}
            icon={item.icon}
            label={item.label}
            active={location.pathname === item.path}
            onClick={() => navigate(item.path)}
          />
        ))}
      </nav>

      {/* USER */}
      <div className="px-4 py-4 border-t border-gray-200 dark:border-[#1E293B]">
        <div className="flex items-center gap-3">
          {user?.profileImageUrl ? (
            <img
              src={user.profileImageUrl}
              alt="user"
              className="w-10 h-10 rounded-full object-cover"
            />
          ) : (
            <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center text-white font-semibold">
              {user?.name?.charAt(0)?.toUpperCase() || "U"}
            </div>
          )}

          <div>
            <p className="text-sm font-medium text-gray-800 dark:text-white">
              {user?.name}
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              {user?.email}
            </p>
          </div>
        </div>
      </div>
    </aside>
  );
}
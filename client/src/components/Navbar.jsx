import { Search, Bell, Sun, Moon, Menu } from "lucide-react";
import { useTheme } from "../hooks/useTheme.js";

export default function Navbar({ sidebarOpen, setSidebarOpen }) {
  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="h-16 bg-white dark:bg-gray-950 flex items-center justify-between px-6 transition-colors duration-300">

      <button
        onClick={() => setSidebarOpen(!sidebarOpen)}
        className="p-2 rounded-lg hover:bg-gray-200 dark:hover:bg-[#1E293B]"
      >
        <Menu size={20} />
      </button>

      {/* SEARCH */}
      <div className="relative w-80">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
        <input
          type="text"
          placeholder="Search..."
          className="w-full bg-white dark:bg-gray-950
          border border-gray-200 dark:border-gray-800
          rounded-lg pl-10 pr-4 py-2 text-sm
          text-gray-800 dark:text-gray-300
          focus:outline-none  hover:border-blue-500 focus:border-blue-400 focus:ring-2 focus:ring-blue-400"
        />
      </div>

      {/* RIGHT */}
      <div className="flex items-center gap-4">

        {/* 🌙 Toggle */}
        <button
          onClick={toggleTheme}
          className="p-2 rounded-lg hover:bg-gray-200 dark:hover:bg-[#1E293B]"
        >
          {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
        </button>

        <Bell className="text-gray-600 dark:text-gray-300" size={20} />

        <div>
          {user?.profileImageUrl ? (
            <img src={user.profileImageUrl} className="w-8 h-8 rounded-full" />
          ) : (
            <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center">
              {user?.name?.charAt(0)?.toUpperCase() || "U"}
            </div>
          )}
        </div>

      </div>
    </header>
  );
}
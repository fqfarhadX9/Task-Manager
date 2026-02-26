import { Search, Plus, Bell, Sun, Moon } from "lucide-react";
import { Menu } from "lucide-react";
import { useEffect, useState } from "react";

export default function Navbar({ sidebarOpen, setSidebarOpen }) {
  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const [darkMode, setDarkMode] = useState(true);

  // Dark Mode Toggle
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  return (
    <header className="h-16 border-b border-gray-700 dark:border-[#1F2937] 
    bg-white dark:bg-[#0F172A] 
    flex items-center justify-between px-6 transition-colors duration-300">
      <button
        onClick={() => setSidebarOpen(!sidebarOpen)}
        className="p-2 rounded-lg hover:bg-gray-200 dark:hover:bg-[#1E293B] transition"
      >
       <Menu size={20} />
      </button>
      {/* SEARCH */}
      <div className="relative w-80">
        <Search
          size={18}
          className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
        />
        <input
          type="text"
          placeholder="Search tasks..."
          className="w-full bg-gray-100 dark:bg-[#111827] 
          border border-gray-300 dark:border-[#1F2937] 
          rounded-lg pl-10 pr-4 py-2 text-sm 
          text-gray-800 dark:text-gray-300 
          focus:outline-none focus:ring-1 focus:ring-blue-600"
        />
      </div>

      {/* RIGHT SECTION */}
      <div className="flex items-center gap-4">

        <button
          onClick={() => setDarkMode(!darkMode)}
          className="p-2 rounded-lg hover:bg-gray-200 dark:hover:bg-[#1E293B] transition"
        >
          {darkMode ? <Sun size={18} /> : <Moon size={18} />}
        </button>

        <div className="relative cursor-pointer">
          <Bell size={20} className="text-gray-600 dark:text-gray-300" />
          <span className="absolute -top-1 -right-1 bg-red-500 text-xs text-white w-4 h-4 flex items-center justify-center rounded-full">
            3
          </span>
        </div>

        <div className="cursor-pointer">
          {user?.profileImageUrl ? (
            <img
              src={user.profileImageUrl}
              alt="profile"
              className="w-8 h-8 rounded-full object-cover"
            />
          ) : (
            <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white text-sm font-semibold">
              {user?.name?.charAt(0)?.toUpperCase() || "U"}
            </div>
          )}
        </div>

      </div>
    </header>
  );
}
import {
  LayoutDashboard,
  Users,
  CheckSquare,
  Calendar,
  BarChart2,
  MessageSquare,
} from "lucide-react";

import SidebarItem from "./SidebarItem";

export default function Sidebar({ sidebarOpen }) {
  const user = JSON.parse(localStorage.getItem("user") || "{}");

  return (
    <aside
      className={`
        ${sidebarOpen ? "w-64" : "w-0"}
        transition-all duration-300
        overflow-hidden
        bg-[#0F172A]
        border-r border-[#1F2937]
        flex flex-col
      `}
    >
      <div className="flex items-center gap-3 px-6 py-5 border-b border-[#1F2937]">
        <div className="w-9 h-9 rounded-lg bg-blue-600 flex items-center justify-center text-white font-bold">
          ✓
        </div>
        <h1 className="text-lg font-semibold text-white">Taskify</h1>
      </div>

      <nav className="flex-1 px-4 py-6 space-y-2">
        <SidebarItem icon={<LayoutDashboard size={18} />} label="Dashboard" active />
        <SidebarItem icon={<Users size={18} />} label="Members" />
        <SidebarItem icon={<CheckSquare size={18} />} label="Tasks" />
        <SidebarItem icon={<Calendar size={18} />} label="Calendar" />
        <SidebarItem icon={<BarChart2 size={18} />} label="Performance" />
        <SidebarItem icon={<MessageSquare size={18} />} label="Messages" />
      </nav>

      <div className="px-4 py-4 border-t border-[#1F2937]">
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
            <p className="text-sm font-medium text-white">
              {user?.name}
            </p>
            <p className="text-xs text-gray-400">
              {user?.email}
            </p>
          </div>

        </div>
      </div>
    </aside>
  );
}
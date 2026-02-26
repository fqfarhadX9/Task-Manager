function SidebarItem({ icon, label, active }) {
  return (
    <div
      className={`flex items-center gap-3 px-4 py-2 rounded-lg cursor-pointer transition-all
        ${
          active
            ? "bg-blue-600/20 text-blue-400"
            : "text-gray-400 hover:bg-[#1E293B] hover:text-white"
        }`}
    >
      {icon}
      <span className="text-sm font-medium">{label}</span>
    </div>
  );
}

export default SidebarItem;
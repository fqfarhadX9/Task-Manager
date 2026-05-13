export default function SidebarItem({ icon, label, active, onClick }) {
  return (
    <div
      onClick={onClick}
      className={`
        flex items-center gap-3 px-4 py-2 rounded-lg cursor-pointer
        transition-all duration-200

        ${
          active
            ? "bg-blue-600/20 text-blue-500 dark:text-blue-400 shadow-sm"
            : `
              text-gray-600 dark:text-gray-400
              hover:bg-gray-200 dark:hover:bg-[#1E293B]
              hover:text-blue-500 dark:hover:text-blue-400
            `
        }
      `}
    >
      {icon}
      <span className="text-sm font-medium">{label}</span>
    </div>
  );
}
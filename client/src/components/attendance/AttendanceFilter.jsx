export default function AttendanceFilter({ statusFilter, setStatusFilter }) {
  return (
    <div className="w-full sm:w-auto">

      <label className="block text-xs text-gray-400 mb-1 sm:hidden">
        Filter by Status
      </label>

      <select
        value={statusFilter}
        onChange={(e) => setStatusFilter(e.target.value)}
        className="w-full sm:w-auto bg-[#1E293B] border border-gray-700 rounded-md px-3 py-2 text-xs sm:text-sm md:text-base focus:outline-none focus:ring-2 focus:ring-gray-500 transition"
      >
        <option value="all">All Statuses</option>
        <option value="present">Present</option>
        <option value="late">Late</option>
        <option value="absent">Absent</option>
        <option value="half day">Half Day</option>
      </select>

    </div>
  );
}
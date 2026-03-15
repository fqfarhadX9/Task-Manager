export default function AttendanceFilter({ statusFilter, setStatusFilter }) {
  return (
    <select
      value={statusFilter}
      onChange={(e) => setStatusFilter(e.target.value)}
      className="bg-[#1E293B] border border-gray-700 rounded-md px-3 py-2 text-sm"
    >
      <option value="all">All Statuses</option>
      <option value="present">Present</option>
      <option value="late">Late</option>
      <option value="absent">Absent</option>
      <option value="half">Half Day</option>
    </select>
  );
}

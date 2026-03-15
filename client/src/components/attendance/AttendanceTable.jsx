import AttendanceRow from "./AttendanceRow";

export default function AttendanceTable({ data }) {
  return (
    <div className="bg-[#020817] border border-gray-800 rounded-xl overflow-hidden">

      <table className="w-full text-sm">

        <thead className="text-gray-400 border-b border-gray-800">
          <tr className="text-left">
            <th className="p-4">Name</th>
            <th className="p-4">Date</th>
            <th className="p-4">Check In</th>
            <th className="p-4">Check Out</th>
            <th className="p-4">Status</th>
            <th className="p-4">Hours</th>
            <th className="p-4">Actions</th>
          </tr>
        </thead>

        <tbody>
          {data.map((item, index) => (
            <AttendanceRow key={index} item={item} />
          ))}
        </tbody>

      </table>

    </div>
  );
}
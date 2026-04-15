import AttendanceRow from "./AttendanceRow";
import TodayAttendanceCard from "./TodayAttendanceCard";

export default function AttendanceTable({ data, attendanceData, refreshAttendance, statusFilter, setStatusFilter}) {
  const present = attendanceData.filter(
    (item) => item.status === "present"
  ).length;

  const half = attendanceData.filter(
    (item) => item.status === "half"
  ).length;

  const late = attendanceData.filter(
    (item) => item.status === "late"
  ).length;

  const absent = attendanceData.filter(
    (item) => item.status === "absent"
  ).length;
  return (
    <div className="border-b border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950 rounded-xl p-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-xl font-semibold text-black dark:text-white">Daily Attendance</h1>
          <p className="text-gray-400 text-sm">
            Attendance records for {new Date().toLocaleDateString()}
          </p>
        </div>

        <div>
          <div className="flex gap-4 text-sm">

            <div className="flex items-center gap-2 text-gray-400">
              <span className="w-2 h-2 bg-green-500 rounded-full"></span>
              Present: <span className="text-gray-800 dark:text-white">{present + half}</span>
            </div>

            <div className="flex items-center gap-2 text-gray-400">
              <span className="w-2 h-2 bg-yellow-500 rounded-full"></span>
              Late: <span className="text-gray-800 dark:text-white">{late}</span>
            </div>

            <div className="flex items-center gap-2 text-gray-400">
              <span className="w-2 h-2 bg-red-500 rounded-full"></span>
              Absent: <span className="text-gray-800 dark:text-white">{absent}</span>
            </div>

          </div>
        </div>

      </div>

      <div className="flex justify-between items-center mt-10 mb-4">
        <div>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="w-full sm:w-auto border bg-white dark:bg-gray-950 border-gray-200 dark:border-gray-800 text-black dark:text-white rounded-md px-3 py-2 text-xs sm:text-sm md:text-base"
          >
            <option value="all">All Statuses</option>
            <option value="present">Present</option>
            <option value="late">Late</option>
            <option value="absent">Absent</option>
            <option value="half day">Half Day</option>
          </select>
        </div>

         <div>
          <TodayAttendanceCard refreshAttendance={refreshAttendance}/>
        </div>
      </div>

      <div>
        <table className="w-full text-sm">

          <thead className="text-gray-400 border-b border-gray-500 dark:border-gray-800">
            <tr className="text-left">
              <th className="p-4 ">Name</th>
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
    </div>
  );
}
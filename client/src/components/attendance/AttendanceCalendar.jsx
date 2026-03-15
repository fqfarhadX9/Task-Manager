import { useEffect, useState } from "react";
import axios from "../../api/axios.js"

// const attendanceData = {
//   1: "absent",
//   2: "present",
//   3: "late",
//   4: "present",
//   5: "present",
//   6: "present",
//   7: "present",
//   8: "absent",
//   9: "present",
//   10: "half",
//   11: "present",
//   12: "half",
//   13: "present",
//   14: "absent",
//   15: "absent",
//   16: "absent",
//   17: "late",
//   18: "present",
//   19: "present",
//   20: "late",
//   21: "half",
//   22: "absent",
//   23: "present",
//   24: "present",
//   25: "present",
//   26: "present",
//   27: "present",
//   28: "half",
//   29: "absent",
//   30: "present",
//   31: "present",
// };

const statusColor = {
  present: "bg-green-500/20 text-green-400",
  late: "bg-orange-500/20 text-orange-400",
  "halfday": "bg-blue-500/20 text-blue-400",
  absent: "bg-red-500/20 text-red-400",
};

export default function AttendanceCalendar({userId}) {
  const [attendance, setAttendance] = useState([]);
  const [month, setMonth] = useState(new Date().toISOString().slice(0, 7));

  const daysInMonth = new Date(
    new Date(month).getFullYear(),
    new Date(month).getMonth() + 1,
    0
  ).getDate();

const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);

   useEffect(() => {

      const fetchAttendance = async () => {

        const res = await axios.get(
          `/attendance/${userId}?month=${month}`
        );
        setAttendance(res.data.attendance);
      };

      fetchAttendance();

    }, [month, userId]);

  return (
    <div className="bg-[#020817] border border-gray-800 rounded-xl p-6">

      <div className="flex justify-between mb-6">
        <h2 className="text-lg font-semibold">Calendar</h2>

        <div className="flex items-center gap-4">
          <button>{"<"}</button>
          <span className="bg-[#0F172A] px-3 py-1 rounded-md">
            Mar 2026
          </span>
          <button>{">"}</button>
        </div>
      </div>

      <div className="grid grid-cols-7 text-sm text-gray-400 mb-3">
        <span>SUN</span>
        <span>MON</span>
        <span>TUE</span>
        <span>WED</span>
        <span>THU</span>
        <span>FRI</span>
        <span>SAT</span>
      </div>

      <div className="grid grid-cols-7 gap-3">
        {days.map((day) => {
          const record = attendance.find((a) => {
            return new Date(a.date).getDate() === day;
          });

          const status = record?.status;

          return (
            <div
              key={day}
              className="border border-gray-800 rounded-lg p-3 h-20 flex flex-col justify-between"
            >
              <span className="text-sm">{day}</span>

              {status && (
                <span
                  className={`text-xs px-2 py-1 rounded-md w-12 truncate ${statusColor[status]}`}
                >
                  {status}
                </span>
              )}
            </div>
          );
        })}
      </div>

      {/* Legend */}
      <div className="flex gap-6 mt-6 text-sm">
        <span className="flex items-center gap-2">
          <span className="w-3 h-3 bg-green-500 rounded-full"></span>
          Present
        </span>

        <span className="flex items-center gap-2">
          <span className="w-3 h-3 bg-orange-500 rounded-full"></span>
          Late
        </span>

        <span className="flex items-center gap-2">
          <span className="w-3 h-3 bg-blue-500 rounded-full"></span>
          Half Day
        </span>

        <span className="flex items-center gap-2">
          <span className="w-3 h-3 bg-red-500 rounded-full"></span>
          Absent
        </span>
      </div>
    </div>
  );
}
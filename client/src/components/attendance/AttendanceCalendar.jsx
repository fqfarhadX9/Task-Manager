import { useEffect, useState } from "react";
import axios from "../../api/axios.js"

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
    <div className="bg-white dark:bg-gray-950 border border-gray-200 dark:border-gray-800 rounded-xl sm:p-4 md:p-6">

      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 gap-3">
        <h2 className="text-base md:text-lg font-semibold text-black dark:text-white">Calendar</h2>

        <div className="flex items-center justify-between sm:justify-end gap-4">
          <button className="px-2 py-1 hover:bg-blue-100 dark:hover:bg-[#0F172A] rounded text-black dark:text-white">{"<"}</button>
          <span className="border border-gray-200 dark:border-gray-800 text-black dark:text-white px-3 py-1 rounded-md text-xs md:text-sm">
            Mar 2026
          </span>
          <button className="px-2 py-1 hover:bg-blue-100 dark:hover:bg-[#0F172A] rounded text-black dark:text-white">{">"}</button>
        </div>
      </div>

      <div className="grid grid-cols-7 text-[10px] md:text-sm sm:text-xs text-gray-400 mb-2 md:mb-3">
        <span>SUN</span>
        <span>MON</span>
        <span>TUE</span>
        <span>WED</span>
        <span>THU</span>
        <span>FRI</span>
        <span>SAT</span>
      </div>

      <div className="grid grid-cols-7 gap-1 md:gap-3 sm:gap-2">
        {days.map((day) => {
          const record = attendance.find((a) => {
            return new Date(a.date).getDate() === day;
          });

          const status = record?.status;

          return (
            <div
              key={day}
              className="border border-gray-200 dark:border-gray-800 text-black dark:text-white rounded-lg p-1.5 sm:p-2 md:p-3 h-14 sm:h-16 md:h-20 flex flex-col justify-between"
            >
              <span className="text-[10px] sm:text-xs md:text-sm">{day}</span>

              {status && (
                <span
                  title={status}
                  className={`text-[9px] sm:text-[10px] md:text-xs
                  px-1 py-[2px]
                  rounded-md
                  block w-full text-center
                  overflow-hidden whitespace-nowrap text-ellipsis
                  ${statusColor[status]}`}
                >
                  {status}
                </span>
              )}

            </div>
          );
        })}
      </div>

      <div className="flex justify-center gap-3 sm:gap-4 md:gap-6 mt-6  text-xs sm:text-sm">
        <span className="flex items-center gap-1.5 sm:gap-2 text-black dark:text-white">
          <span className="w-3 h-3 bg-green-500 rounded-full"></span>
          Present
        </span>

        <span className="flex items-center gap-1.5 sm:gap-2 text-black dark:text-white">
          <span className="w-3 h-3 bg-orange-500 rounded-full"></span>
          Late
        </span>

        <span className="flex items-center gap-1.5 sm:gap-2 text-black dark:text-white">
          <span className="w-3 h-3 bg-blue-500 rounded-full"></span>
          Half Day
        </span>

        <span className="flex items-center gap-1.5 sm:gap-2 text-black dark:text-white">
          <span className="w-3 h-3 bg-red-500 rounded-full"></span>
          Absent
        </span>
      </div>
    </div>
  );
}
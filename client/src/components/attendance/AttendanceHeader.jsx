import TodayAttendanceCard from "./TodayAttendanceCard";

export default function AttendanceHeader({ attendanceData = [], refreshAttendance }) {

  const present = attendanceData.filter((item) => item.status === "present").length;
  const half = attendanceData.filter((item) => item.status === "half").length;
  const late = attendanceData.filter((item) => item.status === "late").length;
  const absent = attendanceData.filter((item) => item.status === "absent").length;

  return (
    <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">

      <div>
        <h1 className="text-lg sm:text-xl font-semibold">
          Daily Attendance
        </h1>

        <p className="text-gray-400 text-xs sm:text-sm mt-1 sm:mt-2">
          Attendance records for {new Date().toLocaleDateString()}
        </p>
      </div>

      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between md:justify-end gap-3 sm:gap-4">

        <TodayAttendanceCard refreshAttendance={refreshAttendance} />

        <div className="flex flex-wrap gap-3 sm:gap-4 text-xs sm:text-sm">

          <div className="flex items-center gap-1.5 sm:gap-2">
            <span className="w-2 h-2 bg-green-500 rounded-full"></span>
            Present: {present + half}
          </div>

          <div className="flex items-center gap-1.5 sm:gap-2">
            <span className="w-2 h-2 bg-yellow-500 rounded-full"></span>
            Late: {late}
          </div>

          <div className="flex items-center gap-1.5 sm:gap-2">
            <span className="w-2 h-2 bg-red-500 rounded-full"></span>
            Absent: {absent}
          </div>

        </div>

      </div>

    </div>
  );
}
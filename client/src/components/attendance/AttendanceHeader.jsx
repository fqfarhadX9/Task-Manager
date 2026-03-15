export default function AttendanceHeader({attendanceData=[]}) {
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

  const today = new Date().toLocaleDateString();
  return (
    <div className="flex justify-between items-center">

      <div>
        <h1 className="text-xl font-semibold">Daily Attendance</h1>
        <p className="text-gray-400 text-sm">
          Attendance records for {today}
        </p>
      </div>

      <div className="flex gap-4 text-sm">

        <div className="flex items-center gap-2">
          <span className="w-2 h-2 bg-green-500 rounded-full"></span>
          Present: {present+half}
        </div>

        <div className="flex items-center gap-2">
          <span className="w-2 h-2 bg-yellow-500 rounded-full"></span>
          Late: {late}
        </div>

        <div className="flex items-center gap-2">
          <span className="w-2 h-2 bg-red-500 rounded-full"></span>
          Absent: {absent}
        </div>

      </div>
    </div>
  );
}
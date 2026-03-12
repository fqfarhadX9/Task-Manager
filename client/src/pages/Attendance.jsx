import AttendanceHeader from "../components/attendance/AttendanceHeader";
import AttendanceFilter from "../components/attendance/AttendanceFilter";
import AttendanceTable from "../components/attendance/AttendanceTable";
import TimeOffRequests from "../components/attendance/TimeOffRequests";
import LateArrivalsAnalysis from "../components/attendance/LateArrivalsAnalysis";
import AttendanceCalendar from "../components/attendance/AttendanceCalendar";
import WFHTracker from "../components/attendance/WFHTracker";
export default function Attendance() {

  const attendanceData = [
    {
      name: "John Smith",
      date: "May 18, 2025",
      checkIn: "8:45 AM",
      checkOut: "5:30 PM",
      status: "present",
      hours: "8h 45m",
    },
    {
      name: "Sarah Johnson",
      date: "May 18, 2025",
      checkIn: "9:05 AM",
      checkOut: "5:45 PM",
      status: "present",
      hours: "8h 40m",
    },
    {
      name: "Michael Brown",
      date: "May 18, 2025",
      checkIn: "8:30 AM",
      checkOut: "4:30 PM",
      status: "present",
      hours: "8h 00m",
    },
    {
      name: "Emily Davis",
      date: "May 18, 2025",
      checkIn: "10:15 AM",
      checkOut: "6:30 PM",
      status: "late",
      hours: "8h 15m",
    },
    {
      name: "David Wilson",
      date: "May 18, 2025",
      checkIn: "--",
      checkOut: "--",
      status: "absent",
      hours: "--",
    },
    {
      name: "Jennifer Lee",
      date: "May 18, 2025",
      checkIn: "8:55 AM",
      checkOut: "5:50 PM",
      status: "present",
      hours: "8h 55m",
    },
    {
      name: "Robert Taylor",
      date: "May 18, 2025",
      checkIn: "9:00 AM",
      checkOut: "3:30 PM",
      status: "half",
      hours: "6h 30m",
    },
  ];

  return (
    <div className="p-6 bg-[#0F172A] min-h-screen text-white">

      <AttendanceHeader />

      <div className="mt-6">
        <AttendanceFilter />
      </div>

      <div className="mt-6">
        <AttendanceTable data={attendanceData} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">
        <TimeOffRequests />
        <LateArrivalsAnalysis />
      </div>

       <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">
        <AttendanceCalendar />
        <WFHTracker />
       </div>

    </div>
  );
}
import AttendanceHeader from "../components/attendance/AttendanceHeader";
import AttendanceFilter from "../components/attendance/AttendanceFilter";
import AttendanceTable from "../components/attendance/AttendanceTable";
import TimeOffRequests from "../components/attendance/TimeOffRequests";
import LateArrivalsAnalysis from "../components/attendance/LateArrivalsAnalysis";
import AttendanceCalendar from "../components/attendance/AttendanceCalendar";
import TodayAttendanceCard from "../components/attendance/TodayAttendanceCard";
import WFHTracker from "../components/attendance/WFHTracker";
import axios from "../api/axios.js";
import { useState } from "react";
import { useEffect } from "react";


export default function Attendance() {
  const [attendanceData, setAttendanceData] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [statusFilter, setStatusFilter] = useState("all");

  const filteredData =
    statusFilter === "all"
      ? attendanceData
      : attendanceData.filter((item) =>
          item.status === statusFilter);
  
  const fetchAttendance = async (date=new Date()) => {
      try {

        const formattedDate = date.toISOString().split("T")[0];

        const res = await axios.get(
          `/attendance?date=${formattedDate}`
        );

        setAttendanceData(res.data.attendance);

      } catch (error) {
        console.error(error);
      }
    };


  useEffect(() => {
    fetchAttendance(selectedDate);
  }, [setSelectedDate])

  return (
    <div className="p-6 bg-[#0F172A] min-h-screen text-white">
       <div className="mt-6">
        <TodayAttendanceCard 
          refreshAttendance={fetchAttendance} 
        />
      </div>

      <AttendanceHeader 
        attendanceData={attendanceData} 
      />

      <div className="mt-6">
        <AttendanceFilter 
          statusFilter={statusFilter}
          setStatusFilter={setStatusFilter}
        />
      </div>

      <div className="mt-6">
        <AttendanceTable data={filteredData} />
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
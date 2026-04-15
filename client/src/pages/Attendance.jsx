import AttendanceHeader from "../components/attendance/AttendanceHeader";
import AttendanceTable from "../components/attendance/AttendanceTable";
import TimeOffRequests from "../components/attendance/TimeOffRequests";
import LateArrivalsAnalysis from "../components/attendance/LateArrivalsAnalysis";
import AttendanceCalendar from "../components/attendance/AttendanceCalendar";
import WFHTracker from "../components/attendance/WFHTracker";
import LateArrivalList from "../components/attendance/LateArrivalList";
import axios from "../api/axios.js";
import { useMemo, useState } from "react";
import { useEffect } from "react";


export default function Attendance() {
  const [attendanceData, setAttendanceData] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [statusFilter, setStatusFilter] = useState("all");

  const user = useMemo(() => {
    return JSON.parse(localStorage.getItem("user"));
  }, []);
  const userId = user._id;

  const filteredData =
    statusFilter === "all"
      ? attendanceData
      : attendanceData.filter((item) =>
          item.status === statusFilter);
  
  const fetchAttendance = async (date=new Date()) => {
      try {

        const formattedDate = date.toLocaleDateString("en-CA");

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
  }, [selectedDate])

  return (
    <div className="p-6 min-h-screen bg-blue-50 dark:bg-[#020818]">
      <AttendanceHeader />

      <div className="mt-6">
        <AttendanceTable 
          data={filteredData} 
          attendanceData={attendanceData} 
          refreshAttendance={fetchAttendance} 
          statusFilter={statusFilter}
          setStatusFilter={setStatusFilter}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">
        <AttendanceCalendar userId={userId}/>
        {user.role === "admin" ? (
        <LateArrivalsAnalysis />
      ) : (
        <LateArrivalList />
      )}
      </div>

       <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">
        <TimeOffRequests />
        <WFHTracker />
       </div>
       
    </div>
  );
}
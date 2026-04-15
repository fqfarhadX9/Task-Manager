import { useEffect, useState } from "react";
import axios from "../../api/axios";

export default function TodayAttendanceCard({refreshAttendance}) {

  const [attendance, setAttendance] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchTodayAttendance = async () => {
    try {
      const res = await axios.get("/attendance/today");
      setAttendance(res.data.attendance);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTodayAttendance();
  }, []);

  const handleCheckIn = async () => {
    try {
      const res = await axios.post("/attendance/checkin");
      setAttendance(res.data.attendance);
      refreshAttendance()
      fetchTodayAttendance();
    } catch (error) {
      console.error(error);
    }
  };

  const handleCheckOut = async () => {
    try {
      const res = await axios.post("/attendance/checkout");
      setAttendance(res.data.attendance);
      refreshAttendance()
      fetchTodayAttendance();
    } catch (error) {
      console.error(error);
    }
  };

  if (loading) return null;

  return (
    <div>

      {!attendance && (
        <button
          onClick={handleCheckIn}
          className="bg-blue-400 hover:bg-blue-500 px-5 py-2 rounded-lg text-white"
        >
          Check In
        </button>
      )}

      {attendance && !attendance.checkOut && (
        <button
          onClick={handleCheckOut}
          className="bg-blue-400 hover:bg-blue-500 px-5 py-2 rounded-lg text-white"
        >
          Check Out
        </button>
      )}

    </div>
  );
}

import CalendarHeader from "../components/calendar/CalendarHeader";
import CalendarGrid from "../components/calendar/CalendarGrid";
import UpcomingEvents from "../components/calendar/UpcomingEvents";
import axios from "../api/axios.js"
import { useState } from "react";
import { useEffect } from "react";

export default function CalendarPage() {
    const [events, setEvents] = useState([]);
    const [currentDate, setCurrentDate] = useState(new Date());

    useEffect(() => {

      const fetchEvents = async () => {
        try {

          const today = new Date();
          const month = today.getMonth() + 1;
          const year = today.getFullYear();

          const {data} = await axios.get(
            `/event?month=${month}&year=${year}`
          );

          setEvents(data);

        } catch (err) {
          console.error(err);
        }
      };

      fetchEvents();

    }, [currentDate]);

  return (
    <div className="p-6 bg-[#111827] min-h-screen text-white">
      <CalendarHeader  
        currentDate={currentDate}
        setCurrentDate={setCurrentDate}
      />

      <div className="mt-6">
        <CalendarGrid events={events} currentDate={currentDate}/>
      </div>

      <UpcomingEvents events={events}/>

    </div>
  );
}
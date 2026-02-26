import Calendar from "react-calendar";
import { useState } from "react";

export default function DashboardCalendar() {

  const [date, setDate] = useState(new Date());

  return (
    <div className="bg-[#0F172A] border border-[#1F2937] rounded-2xl p-6 h-full">

      <h2 className="text-lg font-semibold text-white mb-6">
        Calendar
      </h2>

      <div className="bg-[#111827] rounded-xl p-4 calender-dark">
        <Calendar
          onChange={setDate}
          value={date}
        />
      </div>

    </div>
  );
}
import Calendar from "react-calendar";
import { useState } from "react";

export default function DashboardCalendar() {

  const [date, setDate] = useState(new Date());

  const changeMonth = (direction) => {
    const newDate = new Date(date);
    newDate.setMonth(newDate.getMonth() + direction);
    setDate(newDate);
  };

  const monthYear = date.toLocaleString("default", {
    month: "long",
    year: "numeric",
  });


  return (
    <div className="bg-white dark:bg-[#020617] border border-gray-200 dark:border-[#1F2937] rounded-2xl p-6 h-full">
      
       <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold text-black dark:text-white">
          Calendar
        </h2>

        <div className="flex items-center gap-3 text-black dark:text-white">
          <button onClick={() => changeMonth(-1)}>«</button>
          <span className="font-medium">{monthYear}</span>
          <button onClick={() => changeMonth(1)}>»</button>
        </div>
      </div>

      <div className="bg-white dark:bg-[#111827] rounded-xl p-4 calender-dark">
        <Calendar
          onChange={setDate}
          value={date}
          showNavigation={false}
        />
      </div>

    </div>
  );
}
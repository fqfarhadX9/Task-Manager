import DayCell from "./DayCell";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function CalendarGrid({
  events,
  currentDate,
  setCurrentDate
}) {

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const days = [
    "Sun","Mon","Tue","Wed",
    "Thu","Fri","Sat"
  ];

  const firstDay = new Date(year,month,1).getDay();
  const totalDays = new Date(year,month+1,0).getDate();

  const dates = [];

  for(let i=0;i<firstDay;i++){
    dates.push(null);
  }

  for(let i=1;i<=totalDays;i++){
    dates.push(i);
  }

  const monthName = currentDate.toLocaleString("default", { month: "long" });
  const year1 = currentDate.getFullYear();

  const prevMonth = () => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() - 1)
    );
  };

  const nextMonth = () => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() + 1)
    );
  };



  return (

    <div className="bg-white dark:bg-gray-950 border border-gray-200 dark:border-gray-800 p-4 rounded-md">

      <div className="flex justify-between items-center mb-8">
        <h1 className="text-xl font-semibold text-black dark:text-white">
          {monthName} {year1}
        </h1>

        <div className="flex gap-3">

        <button
          onClick={prevMonth}
          className="hover:bg-blue-100 dark:hover:bg-gray-900/50 px-1 py-0.5 rounded"
        >
          <ChevronLeft size={16} />
        </button>

        <p className="border border-gray-200 dark:border-gray-800 text-black dark:text-white px-2 py-0.5 rounded-md">Today</p>

        <button
          onClick={nextMonth}
          className="hover:bg-blue-100 dark:hover:bg-gray-900/50 px-1 py-0.5 rounded"
        >
          <ChevronRight size={16} />
        </button>

      </div>


      </div>

      <div className="grid grid-cols-7 text-center mb-2 text-gray-400">

        {days.map(day => (
          <div key={day}>{day}</div>
        ))}

      </div>

      <div className="grid grid-cols-7 gap-2">

        {dates.map((date,index) => (

          <DayCell
            key={index}
            date={date}
            events={events}
            month={month}
            year={year}
          />

        ))}

      </div>

    </div>
  );
}
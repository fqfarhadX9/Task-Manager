import { CalendarDays } from "lucide-react";
import Calendar from "react-calendar";
import "../../dist/Calendar.css";
import { useState } from "react";

export default function TaskCalendar({ data = [] }) {

  const [date, setDate] = useState(new Date());

  const getTaskCount = (date) => {
    return data.filter(
      task =>
        new Date(task.dueDate).toDateString() === date.toDateString()
    ).length;
  };

  const prevMonth = () => {
    setDate(new Date(date.getFullYear(), date.getMonth() - 1, 1));
  };

  const nextMonth = () => {
    setDate(new Date(date.getFullYear(), date.getMonth() + 1, 1));
  };

  const monthYear = date.toLocaleString("default", {
    month: "long",
    year: "numeric",
  });

  return (
    <div className="bg-[#0F172A] p-4 sm:p-6 rounded-xl border border-gray-800">

      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2">

        <div className="flex items-center gap-2">
          <CalendarDays size={18} className="text-blue-500" />

          <h2 className="text-base sm:text-lg font-semibold">
            Task Calendar
          </h2>
        </div>

        <div className="flex items-center justify-between sm:justify-end gap-3 text-gray-300 w-full sm:w-auto">

          <button
            onClick={prevMonth}
            className="px-2 py-1 rounded hover:bg-gray-800"
          >
            ‹
          </button>

          <span className="text-sm sm:text-base whitespace-nowrap">
            {monthYear}
          </span>

          <button
            onClick={nextMonth}
            className="px-2 py-1 rounded hover:bg-gray-800"
          >
            ›
          </button>

        </div>

      </div>

      <div className="border-b border-gray-800 my-3 sm:my-4"></div>

      <div className="text-xs sm:text-sm">
        <Calendar
          onChange={setDate}
          value={date}
          showNavigation={false}

          tileContent={({ date }) => {
            const count = getTaskCount(date);

            if (count === 0) return null;

            return (
              <div className="text-[9px] sm:text-[10px] mt-1 text-blue-400 font-semibold">
                {count} tasks
              </div>
            );
          }}
        />
      </div>

    </div>
  );
}
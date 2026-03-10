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
    <div className="bg-[#0F172A] p-6 rounded-xl border border-gray-800">

      {/* Header */}
      <div className="flex justify-between items-center">

        <h2 className="text-lg font-semibold">
          Task Calendar
        </h2>

        <div className="flex items-center gap-3 text-gray-300">

          <button onClick={prevMonth} className="px-2 py-1 rounded hover:bg-gray-800">
            ‹
          </button>

          <span>{monthYear}</span>

          <button onClick={nextMonth} className="hover:text-white">
            ›
          </button>

        </div>

      </div>

      {/* Divider */}
      <div className="border-b border-gray-800 my-4"></div>

      {/* Calendar */}
      <Calendar
        onChange={setDate}
        value={date}
        showNavigation={false}

        tileContent={({ date }) => {
          const count = getTaskCount(date);

          if (count === 0) return null;

          return (
            <div className="text-[10px] mt-1 text-blue-400 font-semibold">
              {count} tasks
            </div>
          );
        }}
      />

    </div>
  );
}
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

  return (
    <div className="bg-[#0F172A] p-6 rounded-xl border border-gray-800">

      <h2 className="text-lg font-semibold mb-6">
        Task Calendar
      </h2>

     <Calendar
        onChange={setDate}
        value={date}

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
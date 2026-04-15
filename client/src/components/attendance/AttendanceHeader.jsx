import {useRef, useState } from "react";
import { Calendar } from "lucide-react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./datepicker.css";

export default function AttendanceHeader() {
   const dateRef = useRef(null);
   const [selectedDate, setSelectedDate] = useState(new Date());

  return (
   <div className="flex justify-between items-center">

      <div>
        <h1 className="text-3xl font-semibold text-black dark:text-white mb-6">Attendance</h1>
      </div>

      <div className="flex flex-col items-end">

        <div className="relative w-fit">
      
          <div
            onClick={() => dateRef.current.setOpen(true)}
            className="flex items-center gap-3 px-4 py-2 
                      border border-gray-200 dark:border-gray-800 rounded-xl text-black dark:text-white 
                      bg-white dark:bg-gray-950 cursor-pointer">
            
              <Calendar className="w-5 h-5 text-gray-400" />
              
              <span className="text-sm">
                {selectedDate.toDateString()}
              </span>
          </div>

          {/* Hidden DatePicker */}
          <DatePicker
            ref={dateRef}
            selected={selectedDate}
            onChange={(date) => setSelectedDate(date)}
            className="hidden"
            popperPlacement="bottom-start"
            popperModifiers={[
              {
                name: "offset",
                options: {
                  offset: [0, 10],
                },
              },
            ]}
          />
        </div>

      </div>

    </div>
  );
}
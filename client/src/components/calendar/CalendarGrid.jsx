import DayCell from "./DayCell";

export default function CalendarGrid({
  events,
  currentDate
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

  return (

    <div>

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
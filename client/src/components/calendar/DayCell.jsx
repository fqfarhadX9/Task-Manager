export default function DayCell({ date, events, month, year }) {

  if (!date) {
    return <div className="h-24"></div>;
  }

  const dayEvents = events.filter((event) => {

    const eventDate = new Date(event.startDate);

    return (
      eventDate.getDate() === date &&
      eventDate.getMonth() === month &&
      eventDate.getFullYear() === year
    );
  });

  return (
    <div className="bg-[#1F2937] h-24 rounded-md p-2 hover:bg-[#374151] flex flex-col">

      <div className="text-sm text-gray-300 mb-1">
        {date}
      </div>

      <div className="flex flex-col gap-1 overflow-hidden">

        {dayEvents.slice(0,2).map((event) => {

          const time = new Date(event.startDate)
            .toLocaleTimeString([],{
              hour:"2-digit",
              minute:"2-digit"
            });

          return (
            <div
              key={event._id}
              className="text-xs bg-blue-600 text-white px-1 rounded truncate"
            >
              {time} {event.title}
            </div>
          );
        })}

        {dayEvents.length > 2 && (
          <span className="text-xs text-gray-400">
            +{dayEvents.length - 2} more
          </span>
        )}

      </div>

    </div>
  );
}
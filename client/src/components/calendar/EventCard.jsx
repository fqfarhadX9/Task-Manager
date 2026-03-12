import { Clock, Pencil } from "lucide-react";

export default function EventCard({ event }) {

  const colorMap = {
    green: "bg-green-900 text-green-400",
    yellow: "bg-yellow-900 text-yellow-400",
    blue: "bg-blue-900 text-blue-400",
    red: "bg-red-900 text-red-400",
  };

  const date = new Date(event.startDate);

  const month = date.toLocaleString("default",{month:"short"});
  const day = date.getDate();

  const time = date.toLocaleTimeString([],{
    hour:"2-digit",
    minute:"2-digit"
  });

  return (
    <div className="bg-[#0B1220] border border-gray-800 rounded-xl p-6 flex justify-between items-start">

      <div className="flex gap-4">

        <div
          className={`w-16 h-16 flex flex-col items-center justify-center rounded-lg ${colorMap[event.color]}`}
        >
          <span className="text-xs">{month}</span>
          <span className="text-xl font-bold">{day}</span>
        </div>

        <div>

          <h3 className="font-semibold text-lg">
            {event.title}
          </h3>

          <div className="flex items-center gap-2 text-gray-400 text-sm mt-1">
            <Clock size={14} />
            {time}
          </div>

          <p className="text-gray-400 text-sm mt-2">
            {event.description}
          </p>

        </div>

      </div>

      <button className="flex items-center gap-1 border border-gray-700 px-3 py-1 rounded-md text-sm hover:bg-gray-800">
        <Pencil size={14} />
        Edit
      </button>

    </div>
  );
}
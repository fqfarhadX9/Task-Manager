import { Clock, Pencil, Trash2} from "lucide-react";

export default function EventCard({ event, onEdit, error, isConfirming, onConfirmDelete, onCancelDelete, onAskDelete }) {

  const colorMap = {
    green: "bg-green-900 text-green-400",
    yellow: "bg-yellow-900 text-yellow-400",
    blue: "bg-blue-900 text-blue-400",
    red: "bg-red-900 text-red-400",
  };

  const date = new Date(event.startDate);

  const month = date.toLocaleString("default",{month:"short"});
  const day = date.getDate();

  const time = date.toLocaleTimeString("en-IN", {
    hour: "2-digit",
    minute: "2-digit",
  })

  return (
    <div className="bg-[#0B1220] border border-gray-800 rounded-xl p-4 md:p-6 flex flex-col md:flex-row md:justify-between md:items-start gap-4">

      <div className="flex gap-3 md:gap-4">

        <div className={`w-14 h-14 md:w-16 md:h-16 flex flex-col items-center justify-center rounded-lg ${colorMap[event.color]}`}>
          <span className="text-xs">{month}</span>
          <span className="text-xl font-bold">{day}</span>
        </div>

        <div>

          <h3 className="font-semibold text-base md:text-lg">
            {event.title}
          </h3>

          <div className="flex items-center gap-2 text-gray-400 text-xs md:text-sm mt-1">
            <Clock size={14} />
            {time}
          </div>

          {event.description && (
            <p className="text-gray-400 text-xs md:text-sm mt-2">
              {event.description}
            </p>
          )}

          {error && (
          <div className="text-red-400 mt-2 text-xs md:text-sm">
            ⚠ {error}
          </div>
        )}

        </div>

      </div>

      <div className="flex items-center gap-2 mt-3 md:mt-0">

        {!isConfirming ? (
          <>
            <button 
              onClick={() => onEdit(event)}
              className="flex items-center justify-center gap-1 border border-gray-700 px-3 py-1.5 rounded-md text-xs md:text-sm w-full sm:w-auto hover:bg-gray-800 transition duration-200"
            >
              <Pencil size={14} />
              Edit
            </button>

            <button 
              onClick={onAskDelete}
              className="flex items-center justify-center gap-1 border border-red-700 text-red-400 px-3 py-1.5 rounded-md text-xs md:text-sm w-full sm:w-auto hover:bg-red-900/30 transition duration-200"
            >
              <Trash2 size={16} />
              Delete
            </button>
          </>
        ) : (
          <>
            <span className="text-red-400 font-medium text-xs md:text-sm w-full sm:w-auto transition">
              Are you sure?
            </span>

            <button 
              onClick={onConfirmDelete}
              className="bg-red-600 hover:bg-red-700 px-3 py-1 rounded text-xs md:text-sm w-full sm:w-auto transition"
            >
              Yes
            </button>

            <button 
              onClick={onCancelDelete}
              className="border border-gray-700 hover:bg-gray-800 px-3 py-1 rounded text-xs md:text-sm w-full sm:w-auto"
            >
              Cancel
            </button>
          </>
        )}

      </div>
    </div>
  );
}
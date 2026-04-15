import { Clock } from "lucide-react";

export default function LateArrivalCard({ data }) {

  const date = new Date(data.date).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric"
  });

  return (
    <div className="flex items-center gap-4 border border-gray-200 dark:border-gray-800 p-4 rounded-lg">

      <div className="bg-blue-100 dark:bg-[#1E293B] text-blue-400 p-3 rounded-full">
        <Clock size={18} />
      </div>

      <div>
        {data.userId?.name && (
          <p className="font-medium text-black dark:text-white">
            {data.userId.name}
          </p>
        )}

        <p className="text-sm text-gray-400">
          {date} • {data.lateMinutes} min late
        </p>
      </div>

    </div>
  );
}
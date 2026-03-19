import { Clock } from "lucide-react";

export default function LateArrivalCard({ data }) {

  const date = new Date(data.date).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric"
  });

  return (
    <div className="flex items-center gap-4 border border-gray-800 p-4 rounded-lg">

      <div className="bg-[#0F172A] p-3 rounded-lg">
        <Clock size={18} />
      </div>

      <div>
        {data.userId?.name && (
          <p className="font-medium">{data.userId.name}</p>
        )}

        <p className="text-sm text-gray-400">
          {date} • {data.lateMinutes} min late
        </p>
      </div>

    </div>
  );
}
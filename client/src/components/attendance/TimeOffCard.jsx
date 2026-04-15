import { Calendar } from "lucide-react";

export default function TimeOffCard({ data, updateStatus, error }) {

  const statusColor = {
    approved: "bg-green-500/20 text-green-400",
    pending: "bg-yellow-500/20 text-yellow-400",
    rejected: "bg-red-500/20 text-red-400"
  };

  const formatLeaveDate = (start, end) => {
    const startDate = new Date(start);
    const endDate = new Date(end);

    const options = { month: "short", day: "numeric", year: "numeric" };

    if (startDate.toDateString() === endDate.toDateString()) {
      return startDate.toLocaleDateString("en-US", options);
    }

    const startMonth = startDate.toLocaleString("en-US", { month: "short" });
    const startDay = startDate.getDate();

    const endDay = endDate.getDate();
    const year = endDate.getFullYear();

    return `${startMonth} ${startDay}-${endDay}, ${year}`;
  };

  return (
    <div className="border border-gray-200 dark:border-gray-800 rounded-lg p-4">

      <div className="flex items-center justify-between">

        <div className="flex items-center gap-4">

          <div className="p-3 rounded-full bg-blue-100 text-blue-500">
            <Calendar size={18} />
          </div>

          <div>
            <p className="font-medium text-black dark:text-white">{data.userId.name}</p>
            <p className="text-sm text-gray-500">
              {data.reason} • {formatLeaveDate(data.startDate, data.endDate)}
            </p>
          </div>

        </div>

        <select
          value={data.status}
          onChange={(e) => updateStatus(data._id, e.target.value)}
          className={`px-3 py-1 text-xs rounded-full capitalize bg-transparent border ${statusColor[data.status]}`}
        >
          <option value="pending">Pending</option>
          <option value="approved">Approved</option>
          <option value="rejected">Rejected</option>
        </select>

      </div>

      {error && (
        <p className="text-red-400 text-xs mt-3">
          {error}
        </p>
      )}

    </div>
  );
}
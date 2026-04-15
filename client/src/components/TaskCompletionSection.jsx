import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
} from "recharts";

export default function TaskCompletionSection({ completed, pending, inProgress }) {
  const total = completed + pending + inProgress;
  const completedPercentage = total > 0 ? Math.round((completed / total) * 100) : 0;
  const inProgressPercentage = total > 0 ? Math.round((inProgress / total) * 100) : 0;
  const pendingPercentage = total > 0 ? Math.round((pending / total) * 100) : 0;

  const data = [
    { name: "Completed", value: completedPercentage, color: "#22C55E" },
    { name: "In Progress", value: inProgressPercentage, color: "#3B82F6" },
    { name: "Not Started", value: pendingPercentage, color: "#9CA3AF" },
  ];

  return (
    <div className="bg-white dark:bg-[#020617] border border-gray-200 dark:border-[#1F2937] rounded-2xl p-6 h-full">

      <h2 className="text-lg font-semibold text-black dark:text-white mb-6">
        Task Completion
      </h2>

      {/* Chart */}
      <div className="relative w-64 h-64 mx-auto">

        <ResponsiveContainer>
          <PieChart>
            <Pie
              data={data}
              innerRadius={80}
              outerRadius={100}
              paddingAngle={2}
              dataKey="value"
            >
              {data.map((entry, index) => (
                <Cell key={index} fill={entry.color} />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>

        {/* Center Text */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <h1 className="text-3xl font-bold text-gray-800 dark:text-white">
            {completedPercentage}%
          </h1>
          <p className="text-sm text-gray-400">
            Completed
          </p>
        </div>
      </div>

      {/* Legend */}
      <div className="flex justify-around mt-8 text-center">

        {data.map((item, index) => (
          <div key={index}>
            <div
              className="w-3 h-3 rounded-full mx-auto mb-2"
              style={{ backgroundColor: item.color }}
            />
            <p className="text-sm text-gray-800 dark:text-gray-400">
              {item.name}
            </p>
            <p className="text-gray-900 dark:text-white font-semibold">
              {item.value}%
            </p>
          </div>
        ))}

      </div>

    </div>
  );
}
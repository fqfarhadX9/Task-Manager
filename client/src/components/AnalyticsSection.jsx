import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
} from "recharts";
import {useState } from "react";

export default function AnalyticsSection({ analytics }) {
  const [timeFilter, setTimeFilter] = useState("week");

  const chartData = [
    { name: "Planning", value: 0, color: "#3B82F6" },
    { name: "In Progress", value: analytics.in_progress, color: "#F59E0B" },
    { name: "Completed", value: analytics.completed, color: "#10B981" },
    { name: "Pending", value: analytics.pending, color: "#EF4444" },
  ];

  const total = analytics.total || 0;

  return (
    <div className="bg-white dark:bg-gray-950 border border-gray-200 dark:border-gray-800 rounded-2xl p-6 h-full">

      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold text-black dark:text-white">
          Project Analytics
        </h2>

        <select
          value={timeFilter}
          onChange={(e) => setTimeFilter(e.target.value)}
          className="border border-gray-200 dark:border-gray-800 text-sm text-gray-400 rounded-lg px-3 py-1 focus:outline-none"
        >
          <option value="week">This Week</option>
          <option value="month">This Month</option>
        </select>
      </div>

      {/* Content */}
      <div className="flex flex-col lg:flex-row items-center gap-6">

        {/* Donut Chart */}
        <div className="relative w-64 h-64 mx-auto">

          <ResponsiveContainer>
            <PieChart>
              <Pie
                data={chartData}
                innerRadius={80}
                outerRadius={100}
                paddingAngle={3}
                dataKey="value"
              >
                {chartData.map((entry, index) => (
                  <Cell key={index} fill={entry.color} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>

          {/* Center Content */}
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <p className="text-sm text-gray-400">
              Total Projects: {total}
            </p>
          </div>

        </div>

        {/* Side Stats */}
        <div className="flex-1 space-y-4">
          {chartData.map((item, index) => (
            <div key={index} className="flex items-center justify-between">

              <div className="flex items-center gap-3">
                <span
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: item.color }}
                ></span>
                <p className="text-sm text-gray-800 dark:text-gray-300">
                  {item.name}
                </p>
              </div>

              <p className="text-sm font-semibold text-gray-900 dark:text-gray-300 ml-2 sm:ml-0">
                {item.value}
              </p>

            </div>
          ))}
        </div>

      </div>

    </div>
  );
}
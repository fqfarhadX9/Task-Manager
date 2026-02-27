import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
} from "recharts";
import axios from "../api/axios.js";
import { useEffect, useState } from "react";

export default function AnalyticsSection() {
  const [timeFilter, setTimeFilter] = useState("week");

  const [analytics, setAnalytics] = useState({
    total: 0,
    in_progress: 0,
    completed: 0,
    pending: 0,
    thisWeek: 0,
    thisMonth: 0,
  });

  // ✅ Correct Time Based Value
  const timeMap = {
    week: analytics.thisWeek,
    month: analytics.thisMonth,
  };

  const fetchAnalytics = async () => {
    try {
      const { data } = await axios.get("/analytics/project-status");
      setAnalytics(data);
    } catch (error) {
      console.error(error);
    }
  };

  const chartData = [
    { name: "Planning", value: 0, color: "#3B82F6" },
    { name: "In Progress", value: analytics.in_progress, color: "#F59E0B" },
    { name: "Completed", value: analytics.completed, color: "#10B981" },
    { name: "Pending", value: analytics.pending, color: "#EF4444" },
  ];

  useEffect(() => {
    fetchAnalytics();
  }, []);

  return (
    <div className="bg-[#0F172A] border border-[#1F2937] rounded-2xl p-6 h-full">

      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold text-white">
          Project Analytics
        </h2>

        {/* ✅ FIXED SELECT */}
        <select
          value={timeFilter}
          onChange={(e) => setTimeFilter(e.target.value)}
          className="bg-[#111827] border border-[#1F2937] text-sm text-gray-300 rounded-lg px-3 py-1 focus:outline-none"
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
            <h1 className="text-3xl font-bold text-white">
              {timeMap[timeFilter]}
            </h1>
            <p className="text-sm text-gray-400">
              {timeFilter === "week" ? "This Week" : "This Month"}
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
                <p className="text-sm text-gray-300">
                  {item.name}
                </p>
              </div>

              <p className="text-sm font-semibold text-white">
                {item.value}
              </p>

            </div>
          ))}
        </div>

      </div>

    </div>
  );
}
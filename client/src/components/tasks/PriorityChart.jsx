import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";

export default function PriorityChart({ data = [] }) {

  const COLORS = {
    high: "#ef4444",
    medium: "#f59e0b",
    low: "#22c55e"
  };

  const totalTasks = data.reduce((acc, item) => acc + item.value, 0);

  return (
    <div className="bg-white dark:bg-[#020818] border border-gray-100 dark:border-gray-800 p-4 sm:p-6 rounded-xl">

      <h2 className="text-base sm:text-lg font-semibold mb-4 text-black dark:text-white">
        Priority Distribution
      </h2>

      <div className="relative h-52 sm:h-60">

        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              innerRadius={50}
              outerRadius={70}
              paddingAngle={3}
              dataKey="value"
            >
              {data.map((entry, index) => (
                <Cell key={index} fill={COLORS[entry.name]} />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>

        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <p className="text-xl sm:text-3xl font-bold text-black dark:text-white">
            {totalTasks}
          </p>
          <p className="text-gray-400 text-xs sm:text-sm">
            Total Tasks
          </p>
        </div>

      </div>

      <div className="flex flex-col sm:flex-row sm:justify-around gap-2 sm:gap-0 mt-4 text-xs sm:text-sm">

        {data.map((item) => (
          <div key={item.name} className="flex items-center gap-2">

            <span
              className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full"
              style={{ background: COLORS[item.name] }}
            ></span>

            <span className="capitalize text-gray-400">
              {item.name}
            </span>

            <span style={{ color: COLORS[item.name] }}>
              ({item.value})
            </span>

          </div>
        ))}

      </div>

    </div>
  );
}
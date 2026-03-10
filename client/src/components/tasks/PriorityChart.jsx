import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";

export default function PriorityChart({ data = [] }) {

  const COLORS = {
    high: "#ef4444",
    medium: "#f59e0b",
    low: "#22c55e"
  };

  const totalTasks = data.reduce((acc, item) => acc + item.value, 0);

  return (
    <div className="bg-[#0F172A] p-6 rounded-xl border border-gray-800">

      <h2 className="text-lg font-semibold mb-4">
        Priority Distribution
      </h2>

      <div className="relative h-60">

        <ResponsiveContainer width="100%" height="100%">
          <PieChart>

            <Pie
              data={data}
              innerRadius={70}
              outerRadius={90}
              paddingAngle={4}
              dataKey="value"
            >
              {data.map((entry, index) => (
                <Cell
                  key={index}
                  fill={COLORS[entry.name]}
                />
              ))}
            </Pie>

          </PieChart>
        </ResponsiveContainer>

        <div className="absolute inset-0 flex flex-col items-center justify-center">

          <p className="text-3xl font-bold">
            {totalTasks}
          </p>

          <p className="text-gray-400 text-sm">
            Total Tasks
          </p>

        </div>

      </div>

      <div className="flex justify-around mt-4 text-sm">

        {data.map((item) => (

          <div key={item.name} className="flex items-center gap-2">

            <span
              className="w-3 h-3 rounded-full"
              style={{ background: COLORS[item.name] }}
            ></span>

            <span className="capitalize text-gray-300">
              {item.name}
            </span>

            <span className="text-gray-400">
              ({item.value})
            </span>

          </div>

        ))}

      </div>

    </div>
  );
}
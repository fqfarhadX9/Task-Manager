import {
  BarChart,
  Bar,
  XAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export default function TaskDistribution({ tasks }) {

  // Group + Count Logic
  const categoryCount = {};

  tasks.forEach((task) => {
    const category = task.category || "Other";

    if (categoryCount[category]) {
      categoryCount[category] += 1;
    } else {
      categoryCount[category] = 1;
    }
  });

  // Convert Object → Array (Chart Format)
  const data = Object.keys(categoryCount).map((key) => ({
    name: key,
    tasks: categoryCount[key],
  }));

  return (
    <div className="bg-[#0F172A] border border-[#1F2937] rounded-2xl p-6 h-full">

      <h2 className="text-lg font-semibold text-white mb-6">
        Task Distribution
      </h2>

      <div className="w-full h-72">
        <ResponsiveContainer>
          <BarChart data={data}>
            <XAxis dataKey="name" stroke="#9CA3AF" />
            <Tooltip />
            <Bar dataKey="tasks" fill="#3B82F6" radius={[6,6,0,0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

    </div>
  );
}
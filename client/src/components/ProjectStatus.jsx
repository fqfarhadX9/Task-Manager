export default function ProjectStatus({ analytics}) {

  const total = analytics?.total || 0;
  const pending = analytics?.pending || 0;
  const inProgress = analytics?.in_progress || 0;
  const completed = analytics?.completed || 0;
  
  const pendingPercentage = total > 0 ? Math.round((pending / total) * 100) : 0;
  const inProgressPercentage = total > 0 ? Math.round((inProgress / total) * 100) : 0;
  const completedPercentage = total > 0 ? Math.round((completed / total) * 100) : 0;

  const data = [
    { name: "Pending", value: pendingPercentage, color: "#EF4444" },
    { name: "In Progress", value: inProgressPercentage, color: "#3B82F6" },
    { name: "Completed", value: completedPercentage, color: "#22C55E" },
  ];


  return (
    <div className="bg-white dark:bg-gray-950 border border-gray-200 dark:border-gray-800 rounded-2xl p-6 h-full">

      <h2 className="text-lg font-semibold text-black dark:text-white mb-6">
        Project Status
      </h2>

      <div className="space-y-6">
        {data.map((item, index) => (
          <div key={index}>
            
            <div className="flex justify-between mb-2">
              <span className=" text-gray-800 text-sm dark:text-gray-400">{item.name}</span>
              <span className=" text-black text-base dark:text-gray-400">{item.value}%</span>
            </div>

            <div className="w-full h-3 bg-gray-200 dark:bg-[#1F2937] rounded-full">
              <div
                className="h-3 rounded-full transition-all duration-500"
                style={{
                  width: `${item.value}%`,
                  backgroundColor: item.color,
                }}
              />
            </div>

          </div>
        ))}
      </div>

    </div>
  );
}
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
    <div className="bg-[#0F172A] border border-[#1F2937] rounded-2xl p-6 h-full">

      <h2 className="text-lg font-semibold text-white mb-6">
        Project Status
      </h2>

      <div className="space-y-6">
        {data.map((item, index) => (
          <div key={index}>
            
            <div className="flex justify-between text-sm text-gray-400 mb-2">
              <span>{item.name}</span>
              <span>{item.value}%</span>
            </div>

            <div className="w-full h-3 bg-[#1F2937] rounded-full">
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
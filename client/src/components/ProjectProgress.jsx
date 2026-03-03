export default function ProjectProgress({ tasks }) {
  return (
    <div className="bg-[#0F172A] border border-[#1F2937] rounded-2xl p-6 h-full">

      <h2 className="text-lg font-semibold text-white mb-6">
        Project Progress
      </h2>

      <div className="space-y-6">
        {tasks.map((project, index) => (
          <div key={index}>
            
            <div className="flex justify-between text-sm text-gray-400 mb-2">
              <span>{project.title}</span>
              <span>{project.progress}%</span>
            </div>

            <div className="w-full h-3 bg-[#1F2937] rounded-full">
              <div
                className="bg-indigo-500 h-3 rounded-full"
                style={{ width: `${project.progress}%` }}
              />
            </div>

          </div>
        ))}
      </div>

    </div>
  );
}
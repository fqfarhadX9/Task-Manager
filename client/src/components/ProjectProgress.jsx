export default function ProjectProgress({ tasks }) {
  return (
    <div className="bg-white dark:bg-gray-950 border border-gray-200 dark:border-gray-800 rounded-2xl p-6 h-full">

      <h2 className="text-lg font-semibold text-black dark:text-white mb-6">
        Project Progress
      </h2>

      <div className="space-y-6">
        {tasks.map((project, index) => (
          <div key={index}>
            
            <div className="flex justify-between mb-2">
              <span className="text-gray-900 text-sm dark:text-gray-400">{project.title}</span>
              <span className="text-black text-base dark:text-gray-400">{project.progress}%</span>
            </div>

            <div className="w-full h-3 bg-gray-200 dark:bg-[#1F2937] rounded-full">
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
export default function TaskCategories({ data = [] }) {

  const totalTasks = data.reduce((sum, item) => sum + item.tasks, 0);

  const colorMap = {
    development: "bg-blue-500",
    design: "bg-purple-500",
    marketing: "bg-pink-500",
    research: "bg-green-500",
    testing: "bg-yellow-500",
    default: "bg-gray-500"
  };

  return (
    <div className="bg-white dark:bg-[#020818] border border-gray-100 dark:border-gray-800 p-4 sm:p-6 rounded-xl">

      <h2 className="text-base sm:text-lg font-semibold mb-4 sm:mb-6 text-black dark:text-white">
        Task Categories
      </h2>

      {data.map((cat, index) => {

        const percent = totalTasks
          ? Math.round((cat.tasks / totalTasks) * 100)
          : 0;

        const key = cat?.name?.toLowerCase();

        const barColor = colorMap[key] || colorMap.default;

        return (
          <div key={index} className="mb-4 sm:mb-5">

            <div className="flex justify-between items-center mb-1 text-sm sm:text-base">

              <span className="capitalize text-black dark:text-white">{cat.name}</span>

              <span className="text-gray-400 text-xs sm:text-sm">
                {cat.tasks} ({percent}%)
              </span>

            </div>

            <div className="w-full bg-gray-800 h-2 rounded overflow-hidden">

              <div
                className={`${barColor} h-2 rounded transition-all duration-300`}
                style={{ width: `${percent}%` }}
              ></div>

            </div>

          </div>
        );

      })}

    </div>
  );
}
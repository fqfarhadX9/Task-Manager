export default function TeamWorkload({ data = [] }) {

  const maxTasks = Math.max(...data.map(user => user.tasks), 1);

  const colors = [
    "bg-yellow-500",
    "bg-green-500",
    "bg-blue-500",
    "bg-purple-500",
    "bg-pink-500",
    "bg-orange-500"
  ];

  return (
    <div className="bg-white dark:bg-[#020818] border border-gray-100 dark:border-gray-800 p-4 sm:p-6 rounded-xl border">

      <h2 className="text-base sm:text-lg font-semibold mb-4 sm:mb-6 text-black dark:text-white">
        Team Workload
      </h2>

      {data?.map((member, index) => {

        const progress = Math.round((member.tasks / maxTasks) * 100);

        const barColor = colors[index % colors.length];

        return (
          <div key={index} className="mb-4 sm:mb-6">

            <div className="flex justify-between items-center mb-1 text-sm sm:text-base">

              <div className="flex items-center gap-2 sm:gap-3">

                <img
                  src={member.profilePic}
                  alt={member.name}
                  className="w-7 h-7 sm:w-8 sm:h-8 rounded-full object-cover"
                />

                <span className="truncate max-w-[120px] sm:max-w-none text-black dark:text-white">
                  {member.name}
                </span>

              </div>

              <span className="text-gray-400 text-xs sm:text-sm whitespace-nowrap">
                {member.completedTasks}/{member.tasks} tasks
              </span>

            </div>

            <div className="w-full bg-gray-800 h-2 rounded overflow-hidden">

              <div
                className={`${barColor} h-2 rounded transition-all duration-300`}
                style={{ width: `${progress}%` }}
              ></div>

            </div>

          </div>
        );

      })}

    </div>
  );
}
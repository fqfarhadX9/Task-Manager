export default function TeamActivity() {

  const activities = [
    {
      name: "Farhad",
      action: "completed",
      task: "API Integration",
      time: "2h ago",
    },
    {
      name: "Ali",
      action: "created",
      task: "Login Page",
      time: "4h ago",
    },
    {
      name: "Sarah",
      action: "updated",
      task: "Dashboard UI",
      time: "6h ago",
    },
    {
      name: "John",
      action: "marked as done",
      task: "Bug Fixes",
      time: "1d ago",
    },
  ];

  return (
    <div className="bg-[#0F172A] border border-[#1F2937] rounded-2xl p-6 h-full">

      <h2 className="text-lg font-semibold text-white mb-6">
        Team Activity
      </h2>

      <div className="space-y-6">
        {activities.map((activity, index) => (
          <div key={index} className="flex items-start gap-4">

            {/* Avatar */}
            <div className="w-9 h-9 rounded-full bg-indigo-600 flex items-center justify-center text-white font-bold">
              {activity.name.charAt(0)}
            </div>

            {/* Content */}
            <div className="flex-1">
              <p className="text-sm text-white">
                <span className="font-semibold">
                  {activity.name}
                </span>{" "}
                {activity.action}{" "}
                <span className="text-indigo-400">
                  {activity.task}
                </span>
              </p>

              <p className="text-xs text-gray-400 mt-1">
                {activity.time}
              </p>
            </div>

          </div>
        ))}
      </div>

    </div>
  );
}
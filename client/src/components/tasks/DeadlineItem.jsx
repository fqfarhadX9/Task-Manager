import { Clock } from "lucide-react";

export default function DeadlineItem({ task }) {

  const priorityColor = {
    high: "text-red-400",
    medium: "text-yellow-400",
    low: "text-green-400"
  };

  const formatName = (name) => {
    const parts = name.split(" ");
    if (parts.length === 1) return parts[0];

    return `${parts[0]} ${parts[1][0]}.`;
  };

 const getDueLabel = (date) => {
  const now = new Date();
  const due = new Date(date);

  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const dueDay = new Date(due.getFullYear(), due.getMonth(), due.getDate());

  const diffTime = dueDay - today;
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  // past
  if (diffDays < 0) return `${Math.abs(diffDays)} days overdue`;

  // short range
  if (diffDays === 0) return "Today";
  if (diffDays === 1) return "Tomorrow";
  if (diffDays < 7) return `${diffDays} days`;

  // weeks
  if (diffDays < 30) {
    const weeks = Math.floor(diffDays / 7);
    return weeks === 1 ? "1 week" : `${weeks} weeks`;
  }

  // months
  const months = Math.floor(diffDays / 30);
  return months === 1 ? "1 month" : `${months} months`;
};

  return (

    <div className="flex justify-between items-start sm:items-center bg-[#020817] p-3 sm:p-4 rounded-lg gap-3">

      <div className="flex gap-3">

        <div className="bg-blue-500/10 p-2 rounded-lg h-fit">
          <Clock size={16} className="text-blue-500" />
        </div>

        <div>

          <p className="font-medium text-sm sm:text-base">
            {task.title}
          </p>

          <p className="text-xs sm:text-sm text-gray-400">
            Due {getDueLabel(task.dueDate)} • Assigned to:{" "}
            
            {task.assignedUsers?.length
              ? formatName(task.assignedUsers[0].name)
              : "Unassigned"}
            {task.assignedUsers?.length > 1 && (
              <span className="ml-1 text-gray-500">
                +{task.assignedUsers.length - 1}
              </span>
            )}
          </p>

        </div>

      </div>

      <span
        className={`text-xs sm:text-sm font-medium ${priorityColor[task.priority]} whitespace-nowrap`}
      >
        {task.priority}
      </span>

    </div>

  );
}
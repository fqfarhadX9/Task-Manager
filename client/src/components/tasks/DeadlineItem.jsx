export default function DeadlineItem({ task }) {
    const priorityColor = {
      high: "text-red-400",
      medium: "text-yellow-400",
      low: "text-green-400"
    };
  return (

    <div className="flex justify-between items-center bg-[#020817] p-4 rounded-lg">

      <div>

        <p className="font-medium">
          {task.title}
        </p>

        <p className="text-sm text-gray-400">
          Due:  Due {new Date(task.dueDate).toLocaleDateString()} • Assigned to: {task.assignedUsers.map((User, i) => (
            <span key={i}>{User.name}{i < task.assignedUsers.length - 1 && ", "}</span>
          ))}
        </p>

      </div>

      <span
            className={`text-xs font-medium ${priorityColor[task.priority]}`}
          >
            {task.priority}
          </span>

    </div>

  );
}
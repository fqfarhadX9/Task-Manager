import AssignUsersModal from "./AssignUsersModel";
import { useNavigate } from "react-router-dom";

const TaskCard = ({ task, setEditingTask}) => {
  const navigate = useNavigate();

  const user =  JSON.parse(localStorage.getItem("user"));
  const canUpdate =
    user.role === "admin" ||
    task.createdBy === user._id 
    // task.assignedTo?.includes(user._id);

  const today = new Date();
  const taskDate = new Date(task.dueDate);

  today.setHours(0, 0, 0, 0);
  taskDate.setHours(0, 0, 0, 0);

  let dueDateClass = "text-green-400";

  if (taskDate < today) {
    dueDateClass = "text-red-500";
  } else if (taskDate.getTime() === today.getTime()) {
    dueDateClass = "text-yellow-400";
  }

  return (
    <div className="group bg-white dark:bg-gray-950 border border-gray-200 dark:border-[#1E293B] rounded-2xl p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">

      {/* Top Section */}
      <div className="flex justify-between items-start gap-4">
        <h3 className="text-lg font-semibold text-black dark:text-white leading-snug">
          {task.title}
        </h3>

        <div className="flex gap-2 flex-wrap justify-end">

          {/* Priority Badge */}
          <span
            className={`px-3 py-1 text-xs rounded-full font-medium 
              ${
                task.priority === "high"
                  ? "bg-red-500/20 text-red-400"
                  : task.priority === "medium"
                  ? "bg-yellow-500/20 text-yellow-400"
                  : "bg-green-500/20 text-green-400"
              }
            `}
          >
            {task.priority}
          </span>

          {/* Status Badge */}
          <span
            className={`px-3 py-1 text-xs rounded-full font-medium
              ${
                task.status === "completed"
                  ? "bg-green-500/20 text-green-400"
                  : task.status === "in_progress"
                  ? "bg-yellow-500/20 text-yellow-400"
                  : "bg-red-500/20 text-red-400"
              }
            `}
          >
            {task.status.replace("_", " ")}
          </span>

        </div>
      </div>

      <p className="text-sm text-gray-600 dark:text-gray-400 mt-3 line-clamp-2">
        {task.description}
      </p>

      <p className={`mt-4 text-sm font-medium ${dueDateClass}`}>
        Due: {task.dueDate?.split("T")[0]}
      </p>

      {task.assignedTo?.length > 0 && (
        <div className="flex flex-wrap gap-2 mt-4">
          <span className="text-gray-500 dark:text-gray-400">Assigned To:</span>{" "}
          {task.assignedTo.map((u) => (
            <div
              key={u._id}
              className=" bg-gray-200 dark:bg-[#1E293B]
            text-gray-700 dark:text-gray-300 px-3 py-1 rounded-full text-xs"
            >
              {u.name}
            </div>
          ))}
        </div>
      )}

      <div className="flex items-center justify-between mt-6">

        {canUpdate && (
          <button
            onClick={() => setEditingTask(task)}
            className="text-sm px-4 py-2 rounded-lg bg-gray-200 dark:bg-[#1E293B]
          text-gray-800 dark:text-gray-300
          hover:bg-gray-300 dark:hover:bg-[#334155] transition"
          >
            Edit
          </button>
        )}

        <button
          onClick={() => navigate(`/task/${task._id}`)}
          className="text-sm px-4 py-2 rounded-lg bg-gray-200 dark:bg-[#1E293B]
          text-gray-800 dark:text-gray-300
          hover:bg-gray-300 dark:hover:bg-[#334155] transition"
        >
          View Details
        </button>

      </div>

    </div>
  );
};

export default TaskCard;

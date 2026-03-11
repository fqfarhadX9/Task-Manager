export default function TaskStatusCard({ task }) {

  const priorityColor = {
    high: "bg-red-500",
    medium: "bg-yellow-500",
    low: "bg-green-500"
  };

  const now = new Date();
  let dueDate = new Date(task.dueDate);
  const riskLimit = new Date(now.getTime() + 48 * 60 * 60 * 1000);

  let status = "On track";

  if (task.status === "completed") {
    status = "Completed";
  }
  else if (dueDate < now) {
    status = "Overdue";
  }
  else if (dueDate <= riskLimit) {
    status = "At risk";
  }
  
  const statusColor = {
    "Overdue": "text-red-400",
    "At risk": "text-yellow-400",
    "On track": "text-green-400",
    "Completed": "text-blue-400"
  };


  const diffTime = dueDate - now;
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  let dueLabel = "";

  if (diffDays < 0) {
    dueLabel =  dueDate.toLocaleDateString();
  }
  else if (diffDays === 0) {
    dueLabel = "Today";
  }
  else if (diffDays === 1) {
    dueLabel = "Tomorrow";
  }
  else if (diffDays < 7) {
    dueLabel = `In ${diffDays} days`;
  }
  else if (diffDays < 14) {
    dueLabel = "In 1 week";
  }
  else if (diffDays < 30) {
    dueLabel = `In ${Math.floor(diffDays / 7)} weeks`;
  }
  else {
    dueLabel = dueDate.toLocaleDateString();
  
  }
  return (

    <div className="bg-[#0F172A] border border-gray-800 rounded-xl p-6">

      <div className="flex justify-between items-start mb-3">

        <div className="flex items-center gap-2">

          <span
            className={`w-3 h-3 rounded-full ${priorityColor[task.priority]}`}
          ></span>

          <h3 className="font-semibold text-lg">
            {task.title}
          </h3>

        </div>

        <div className="flex gap-3">

          <button className="border border-gray-700 px-3 py-1 rounded-lg text-sm">
            Edit
          </button>

          <button className="border border-gray-700 px-3 py-1 rounded-lg text-sm">
            Complete
          </button>

        </div>

      </div>

      <p className="text-gray-400 text-sm truncate mt-1 mb-3">
        {task.description}
      </p>

      <p className="text-sm text-gray-400">
        Assigned to: {task.assignedTo?.length
        ? task.assignedTo.map((item, i) => (
          <span key={i}>
            {item.name}{i !== task.assignedTo.length - 1 && ", "}
          </span>
        ))
        : "Unassigned"} • Due: {dueLabel}
        <span className={`ml-3 ${statusColor[status]}`}>
          {status}
        </span>
      </p>

    </div>

  );
}
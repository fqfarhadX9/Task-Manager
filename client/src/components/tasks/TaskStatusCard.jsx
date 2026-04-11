export default function TaskStatusCard({ task, handleEdit, handleComplete, error }) {

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

    <div className="bg-white dark:bg-[#020818] border border-gray-100 dark:border-gray-800 rounded-xl p-4 sm:p-6">

      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-3 mb-3">

        <div className="flex items-center gap-2">

          <span
            className={`w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full ${priorityColor[task.priority]}`}
          ></span>

          <h3 className="font-semibold text-base sm:text-lg text-black dark:text-white">
            {task.title}
          </h3>

        </div>

        <div className="hidden sm:flex gap-2">

          <button 
            onClick={() => handleEdit(task)}
            className="border border-gray-200 dark:border-gray-700 text-black dark:text-white px-2 sm:px-3 py-1 rounded-md text-xs sm:text-sm dark:hover:bg-gray-800">
              Edit
          </button>

          <button 
            onClick={() => handleComplete(task)}
            className="bg-blue-500 border border-gray-200 dark:border-gray-700 text-white px-2 sm:px-3 py-1 rounded-md text-xs sm:text-sm hover:bg-blue-600">
              Complete
          </button>

        </div>

      </div>

      <p className="text-gray-400 text-xs sm:text-sm line-clamp-2 mb-3">
        {task.description}
      </p>

      <p className="hidden sm:block text-xs text-gray-400 leading-relaxed">
        Assigned to: {" "}
        {task.assignedTo?.length
        ? `Team Member ${task.assignedTo.length}`
        : "Team Memer 0"} 
        • Due: {dueLabel}
        <span className={`ml-2 sm:ml-3 font-medium ${statusColor[status]}`}>
          {status}
        </span>
      </p>

      <div className="sm:hidden text-[10.5px] text-gray-400 leading-relaxed space-y-1">
        <p>
          Assigned to: {" "}
          {task.assignedTo?.length
          ? `Team Member ${task.assignedTo.length}`
          : "Team Memer 0"} 
        </p>

        <div className="flex justify-between items-center w-full pr-4">
          <span>Due: {dueLabel}</span> 
          <span className={`font-medium ${statusColor[status]}`}>
          {status}
        </span>
        </div>
      </div>

      <div className="flex gap-2 sm:hidden mt-3">
        <button
          onClick={() => handleEdit(task)} 
          className="border border-gray-200 dark:border-gray-700 text-black dark:text-white px-2 sm:px-3 py-1 rounded-md text-xs sm:text-sm dark:hover:bg-gray-800">
            Edit
        </button>

        <button
          onClick={() => handleComplete(task)} 
          className="bg-blue-500 border border-gray-200 dark:border-gray-700 text-white px-2 sm:px-3 py-1 rounded-md text-xs sm:text-sm hover:bg-blue-600">
            Complete
          </button>
      </div>

      {error && (
        <p className="text-red-400 text-xs mt-2">
          ⚠ {error}
        </p>
      )}

    </div>

  );
}
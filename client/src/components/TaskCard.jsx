import { useState } from "react";
import axios from "../api/axios";
import AssignUsersModal from "./AssignUsersModel";

const TaskCard = ({ task, setTasks, setEditingTask, handleUnassign }) => {
  const [assignOpen, setAssignOpen] = useState(false);

  const updateStatus = async (newStatus) => {
    try {
      const {data} = await axios.put(`/task/status/${task._id}`, {
        status: newStatus
      });
      setTasks(prevTasks => 
        prevTasks.map(t => 
          t && t._id === data.task._id ? data.task : t))
    } catch (error) {
      console.error(error);
    }
  };
  

  const user =  JSON.parse(localStorage.getItem("user"));
  const canUpdate =
    user.role === "admin" ||
    task.createdBy === user._id ||
    task.assignedTo?.includes(user._id);

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
    <div className="bg-gray-900 p-4 rounded-xl shadow-md">
     <div className="flex justify-between items-start">
        <h3 className="text-lg font-semibold">{task.title}</h3>

        <span
          className={`px-2 py-1 text-xs rounded
            ${
              task.priority === "high"
                ? "bg-red-600"
                : task.priority === "medium"
                ? "bg-yellow-500"
                : "bg-green-600"
            }
          `}
        >
          {task.priority}
        </span>
    </div>
      <p className="text-sm text-gray-400">{task.description}</p>
      <p className="mt-2 text-sm">Status: {task.status}</p>
      <p className={`mt-1 text-sm ${dueDateClass}`}>
        Due: {task.dueDate?.split("T")[0]}
      </p>
      <div className="flex flex-wrap gap-2 mt-2">
        Assigned:{task.assignedTo.map(u => (
          <div
            key={u._id}
            className="flex items-center gap-1 bg-gray-700 px-2 py-1 rounded text-xs"
          >
            {u.name}
            <button
              onClick={() => handleUnassign(task._id, u._id)}
              className="text-red-400 ml-1"
            >
              ✕
            </button>
          </div>
        ))}
      </div>

      <div className="flex gap-2 mt-3">
         {canUpdate && (<button
          onClick={() => updateStatus("in_progress")}
          className="bg-yellow-500 px-3 py-1 rounded"
          disabled={task.status === "in_progress"}
        >
          In Progress
        </button>
         )}

        {canUpdate && (
          <button
          onClick={() => updateStatus("completed")}
          className="bg-green-600 px-3 py-1 rounded"
          disabled={task.status === "completed"}
        >
          Completed
        </button>
        )}

        {canUpdate && (
          <button
            onClick={() => setEditingTask(task)}
            className="bg-gray-700 px-3 py-1 rounded"
          >
            Edit
          </button>
        )}

        {(user.role === "admin" || task.createdBy === user._id) && (
          <button
            onClick={() => setAssignOpen(true)}
            className="bg-blue-500 px-3 py-1 rounded"
          >
            Assign Users
          </button>
        )}
        {assignOpen && (
          <AssignUsersModal
            task={task}
            setOpen={setAssignOpen}
            setTasks={setTasks}
          />
        )}

      </div>
    </div>
  );
};

export default TaskCard;

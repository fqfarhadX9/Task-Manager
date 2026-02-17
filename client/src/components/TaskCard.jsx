import axios from "../api/axios";

const TaskCard = ({ task, setTasks }) => {

  const updateStatus = async (newStatus) => {
    try {
      const {data} = await axios.put(`/task/status/${task._id}`, {
        status: newStatus
      });
      console.log(data);
      setTasks(prevTasks => 
        prevTasks.map(t => 
          t && t._id === data.task._id ? data.task : t))
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="bg-gray-900 p-4 rounded-xl shadow-md">
      <h3 className="text-lg font-semibold">{task.title}</h3>
      <p className="text-sm text-gray-400">{task.description}</p>
      <p className="mt-2 text-sm">Status: {task.status}</p>

      <div className="flex gap-2 mt-3">
        <button
          onClick={() => updateStatus("in_progress")}
          className="bg-yellow-500 px-3 py-1 rounded"
        >
          In Progress
        </button>

        <button
          onClick={() => updateStatus("completed")}
          className="bg-green-600 px-3 py-1 rounded"
        >
          Completed
        </button>
      </div>
    </div>
  );
};

export default TaskCard;

import { useState } from "react";
import TaskStatusCard from "./TaskStatusCard";
import EditTaskModal from "./EditTaskModal";
import axios from "../../api/axios.js";

export default function TaskStatus({data=[], fetchDashboard}) {
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);
  const [error, setError] = useState({})

  const handleEdit = (task) => {
    setSelectedTask(task);
    setIsEditOpen(true);
  };

  const handleComplete = async (task) => {
    try {
      await axios.put(`/task/${task._id}`, {status: "completed"});
      fetchDashboard();
    } catch (err) {
      console.log(err);
       setError(prev => ({
        ...prev,
        [task._id]: error.response?.data?.message || "Something went wrong"
      }));

      setTimeout(() => {
        setError(prev => ({
          ...prev,
          [task._id]: ""
        }));
      }, 3000);
    }

  }

  return (

    <div className="mt-6 sm:mt-8">

      <div className="bg-[#0F172A] rounded-xl border border-gray-800 bg-card p-4 sm:p-6">

      <h2 className="text-lg sm:text-xl font-semibold mb-4 sm:mb-6">
        Task Status
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-2 gap-4 sm:gap-6">

        {data.map((task, index) => (
          <TaskStatusCard key={index} task={task} setSelectedTask={setSelectedTask} setIsEditOpen={setIsEditOpen} handleEdit={handleEdit} handleComplete={handleComplete} error={error[task._id]}/>
        ))}

      </div>
      </div>

      {isEditOpen && (
        <EditTaskModal
          task={selectedTask}
          onClose={() => setIsEditOpen(false)}
          fetchDashboard={fetchDashboard}
        />
      )}

    </div>
  );
}
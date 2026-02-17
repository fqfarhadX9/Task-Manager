import { useEffect, useState } from "react";
import axios from "../api/axios.js";
import Navbar from "../components/Navbar";
import StatsCard from "../components/StatsCard";
import TaskCard from "../components/TaskCard";
import CreateTaskModal from "../components/CreateTaskModal.jsx";

const Dashboard = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen]  = useState(false)

  const fetchTasks = async () => {
    try {
      const { data } = await axios.get("/task/my-tasks");
      setTasks(data.tasks);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  // Stats calculations
  const total = tasks.length;
  const pending = tasks.filter(task => task && task.status === "pending").length;
  const inProgress = tasks.filter(task => task && task.status === "in_progress").length;
  const completed = tasks.filter(task => task && task.status === "completed").length;

  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar />

      <div className="p-6 flex flex-col gap-8">

        {/* Header Section */}
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Dashboard</h2>

        <button
          onClick={() => setOpen(true)}
          className="bg-white text-black px-4 py-2 rounded-lg font-medium hover:opacity-90"
        >
          + Create Task
        </button>

        {open && (
         <CreateTaskModal
         setOpen={setOpen}
         refreshTasks={fetchTasks}
         />
        )}

      </div>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatsCard title="Total Tasks" value={total} />
          <StatsCard title="Pending" value={pending} />
          <StatsCard title="In Progress" value={inProgress} />
          <StatsCard title="Completed" value={completed} />
        </div>

        {/* Tasks */}
        <div>
          <h2 className="text-xl font-semibold mb-4">My Tasks</h2>

          {loading ? (
            <p>Loading tasks...</p>
          ) : tasks.length === 0 ? (
            <p>No tasks yet 😑</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {tasks.map((task) => (
                <TaskCard key={task._id} task={task} setTasks={setTasks}/>
              ))}
            </div>
          )}
        </div>

      </div>
    </div>
  );
};

export default Dashboard;

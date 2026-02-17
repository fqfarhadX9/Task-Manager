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
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [priorityFilter, setPriorityFilter] = useState("");


  // Stats calculations
  const filteredTasks = tasks.filter(task =>
    task?.title.toLowerCase().includes(search.toLowerCase()) &&
    (statusFilter ? task.status === statusFilter : true) &&
    (priorityFilter ? task.priority === priorityFilter : true)
  );
 
  const total = filteredTasks.length;
  const pending = filteredTasks.filter(task => task?.status === "pending").length;
  const inProgress = filteredTasks.filter(task => task?.status === "in_progress").length;
  const completed = filteredTasks.filter(task => task?.status === "completed").length;

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
        <div className="flex flex-col sm:flex-row gap-4">
          <input
            type="text"
            placeholder="Search tasks..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="flex-1 px-4 py-2 rounded-lg bg-gray-900 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-white"
          />

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-4 py-2 rounded-lg bg-gray-900 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-white"
          >
            <option value="">All Status</option>
            <option value="pending">Pending</option>
            <option value="in_progress">In Progress</option>
            <option value="completed">Completed</option>
          </select>

          <select
            value={priorityFilter}
            onChange={(e) => setPriorityFilter(e.target.value)}
            className="px-4 py-2 rounded-lg bg-gray-900 border border-gray-700"
          >
            <option value="">All Priority</option>
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </div>

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
          ) : filteredTasks.length === 0 ? (
            <p>No tasks yet 😑</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredTasks.map((task) => (
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

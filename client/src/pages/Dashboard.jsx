import { useEffect, useState } from "react";
import axios from "../api/axios.js";
import Navbar from "../components/Navbar";
import StatsCard from "../components/StatsCard";
import TaskCard from "../components/TaskCard";
import CreateTaskModal from "../components/CreateTaskModal.jsx";
import EditTaskModal from "../components/EdittaskModal.jsx";

const Dashboard = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen]  = useState(false)
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [priorityFilter, setPriorityFilter] = useState("");
  const [editingTask, setEditingTask] = useState(null);


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

  const handleUnassign = async (taskId, userId) => {
      try {
        const {data} = await axios.put(`/task/unassign/${taskId}`, {
          userId
        });
        setTasks(prevTasks => 
          prevTasks.map(t => 
            t && t._id === data.task._id ? data.task : t))
      } catch (error) {
        console.error(error);
      }
    };

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
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-900 to-gray-800 text-gray-100">
      <Navbar />

      {/* Main Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="pt-10 pb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6 border-b border-gray-800">
          <div>
            <h2 className="text-3xl font-semibold tracking-tight text-white">
              Dashboard
            </h2>
            <p className="text-gray-400 text-sm mt-2">
              Manage and track your tasks efficiently
            </p>
          </div>

          <button
            onClick={() => setOpen(true)}
            className="bg-white text-black px-6 py-3 rounded-xl font-medium hover:bg-gray-200 transition-all duration-200 shadow-md w-full sm:w-auto"
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

        {/* Stats Section */}
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatsCard title="Total Tasks" value={total} />
          <StatsCard title="Pending" value={pending} />
          <StatsCard title="In Progress" value={inProgress} />
          <StatsCard title="Completed" value={completed} />
        </div>

        {/* Filters Section */}
        <div className="mt-10 bg-gray-900/40 backdrop-blur-sm border border-gray-800 rounded-2xl p-4 sm:p-6">
  
          <div className="flex flex-col lg:flex-row gap-4 lg:items-center">

            <div className="flex-1">
              <input
                type="text"
                placeholder="Search tasks..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full px-5 py-3 rounded-xl bg-gray-900 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-white focus:border-white transition-all"
              />
            </div>

            {/* Filters Group */}
            <div className="flex flex-col sm:flex-row gap-4 w-full lg:w-auto">

              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="px-5 py-3 rounded-xl bg-gray-900 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-white focus:border-white transition w-full sm:w-auto"
              >
                <option value="">All Status</option>
                <option value="pending">Pending</option>
                <option value="in_progress">In Progress</option>
                <option value="completed">Completed</option>
              </select>

              <select
                value={priorityFilter}
                onChange={(e) => setPriorityFilter(e.target.value)}
                className="px-5 py-3 rounded-xl bg-gray-900 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-white focus:border-white transition w-full sm:w-auto"
              >
                <option value="">All Priority</option>
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>

            </div>

          </div>
        </div>

        {/* Tasks Section */}
        <div className="mt-10 pb-12">
          <h2 className="text-xl font-semibold mb-6">My Tasks</h2>

          {loading ? (
            <p className="text-gray-400">Loading tasks...</p>
          ) : filteredTasks.length === 0 ? (
            <p className="text-gray-400">No tasks yet 😑</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredTasks.map((task) => (
                <TaskCard
                  key={task._id}
                  task={task}
                  setTasks={setTasks}
                  setEditingTask={setEditingTask}
                  handleUnassign={handleUnassign}
                />
              ))}
            </div>
          )}

          {editingTask && (
            <EditTaskModal
              task={editingTask}
              setEditingTask={setEditingTask}
              setTasks={setTasks}
            />
          )}
        </div>

      </div>
    </div>
  );
};

export default Dashboard;

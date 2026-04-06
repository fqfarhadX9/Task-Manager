import TaskHeader from "../components/tasks/TaskHeader";
import TaskStats from "../components/tasks/TaskStats";
import PriorityChart from "../components/tasks/PriorityChart";
import TaskCategories from "../components/tasks/TaskCategories";
import TeamWorkload from "../components/tasks/TeamWorkload";
import UpcomingDeadlines from "../components/tasks/UpcomingDeadlines";
import TaskCalendar from "../components/tasks/TaskCalendar";
import TaskStatus from "../components/tasks/TaskStatus";
import {useEffect, useRef, useState } from "react";
import axios from "../api/axios.js";

export default function TaskPage() {
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [dashboard, setDashboard] = useState(null);

  const taskStatusRef = useRef(null);

  const filteredTasks = dashboard?.taskStatusTasks.filter(task => {
    const query = search.toLowerCase();
    return task.title?.toLowerCase().includes(query) || 
    task.description?.toLowerCase().includes(query);
  });
  
  useEffect(() => {
    if (search && taskStatusRef.current) {
      taskStatusRef.current.scrollIntoView({
        behavior: "smooth",
        block: "start"
      });
    }
  }, [search]);

  const fetchDashboard = async () => {
    const {data} = await axios.get("/task/task-dashboard");
    setDashboard(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchDashboard();
  }, []);

  if (loading) {
    return <div className="text-white p-6">Loading dashboard 🙃</div>;
  }

  return (
    <div className="p-4 sm:p-6 text-white">

      <TaskHeader search={search} setSearch={setSearch} />

      {search ? (
        <div className="mt-6" ref={taskStatusRef}>
          <TaskStatus fetchDashboard={fetchDashboard} filteredTasks={filteredTasks}/>   
        </div>
      ) : (
        <>
           <div className="mt-6">
            <TaskStats stats={dashboard.stats} />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">

            <PriorityChart data={dashboard.priorityDistribution}/>

            <TaskCategories data={dashboard.taskCategories}/>

            <TeamWorkload data={dashboard.teamWorkload}/>

          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">

            <UpcomingDeadlines data={dashboard.upcomingDeadlines}/>

            <TaskCalendar data={dashboard.calendarTasks}/>

          </div>

          <div className=" mt-8">
            <TaskStatus fetchDashboard={fetchDashboard} filteredTasks={filteredTasks}/>
          </div>
        </>
      )}

    </div>
  );
}
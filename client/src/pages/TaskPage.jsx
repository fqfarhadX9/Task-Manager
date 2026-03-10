import TaskHeader from "../components/tasks/TaskHeader";
import TaskStats from "../components/tasks/TaskStats";
import PriorityChart from "../components/tasks/PriorityChart";
import TaskCategories from "../components/tasks/TaskCategories";
import TeamWorkload from "../components/tasks/TeamWorkload";
import UpcomingDeadlines from "../components/tasks/UpcomingDeadlines";
import TaskCalendar from "../components/tasks/TaskCalendar";
import TaskStatus from "../components/tasks/TaskStatus";
import { useEffect, useState } from "react";
import axios from "../api/axios.js";

export default function TaskPage() {
  const [loading, setLoading] = useState(true);
  const [dashboard, setDashboard] = useState(null)

  useEffect(() => {
    const fetchDashboard = async () => {
      const {data} = await axios.get("/task/task-dashboard");
      setDashboard(data);
      setLoading(false);
    };

    fetchDashboard();
  }, []);

  if (loading) {
    return <div className="text-white p-6">Loading dashboard 🙃</div>;
  }

  return (
    <div className="p-6 text-white">

      <TaskHeader />

      <TaskStats stats={dashboard.stats}/>

      <div className="grid grid-cols-3 gap-6 mt-8">

        <PriorityChart data={dashboard.priorityDistribution}/>

        <TaskCategories data={dashboard.taskCategories}/>

        <TeamWorkload data={dashboard.teamWorkload}/>

      </div>

      <div className="grid grid-cols-2 gap-6 mt-8">

        <UpcomingDeadlines />

        <TaskCalendar />

      </div>

      <div className=" mt-8">
        <TaskStatus />
      </div>

    </div>
  );
}
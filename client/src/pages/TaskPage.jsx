import TaskHeader from "../components/tasks/TaskHeader";
import TaskStats from "../components/tasks/TaskStats";
import PriorityChart from "../components/tasks/PriorityChart";
import TaskCategories from "../components/tasks/TaskCategories";
import TeamWorkload from "../components/tasks/TeamWorkload";
import UpcomingDeadlines from "../components/tasks/UpcomingDeadlines";
import TaskCalendar from "../components/tasks/TaskCalendar";
import TaskStatus from "../components/tasks/TaskStatus";

export default function TaskPage() {

  return (
    <div className="p-6 text-white">

      <TaskHeader />

      <TaskStats />

      <div className="grid grid-cols-3 gap-6 mt-8">

        <PriorityChart />

        <TaskCategories />

        <TeamWorkload />

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
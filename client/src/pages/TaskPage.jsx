import TaskHeader from "../components/tasks/TaskHeader";
import TaskStats from "../components/tasks/TaskStats";
// import PriorityChart from "../components/tasks/PriorityChart";
// import TaskCategories from "../components/tasks/TaskCategories";
// import TeamWorkload from "../components/tasks/TeamWorkload";

export default function TaskPage() {

  return (
    <div className="p-6 text-white">

      <TaskHeader />

      <TaskStats />

      {/* <div className="grid grid-cols-3 gap-6 mt-8">

        <PriorityChart />

        <TaskCategories />

        <TeamWorkload />

      </div> */}

    </div>
  );
}
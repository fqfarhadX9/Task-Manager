import TaskStatusCard from "./TaskStatusCard";

export default function TaskStatus({data=[]}) {

  // const tasks = [
  //   {
  //     title: "Website redesign",
  //     description: "High priority task that needs immediate attention",
  //     assigned: "Team Member 1",
  //     due: "Today",
  //     status: "Overdue",
  //     priority: "high"
  //   },
  //   {
  //     title: "Content creation",
  //     description: "Medium priority task to be completed this week",
  //     assigned: "Team Member 2",
  //     due: "Tomorrow",
  //     status: "At risk",
  //     priority: "medium"
  //   },
  //   {
  //     title: "Bug fixes",
  //     description: "Low priority task that can be scheduled later",
  //     assigned: "Team Member 3",
  //     due: "In 3 days",
  //     status: "On track",
  //     priority: "low"
  //   },
  //   {
  //     title: "Feature implementation",
  //     description: "Task assigned by the project manager",
  //     assigned: "Team Member 1",
  //     due: "Next week",
  //     status: "Completed",
  //     priority: "high"
  //   },
  // ];

  return (

    <div className="mt-8">

      <h2 className="text-xl font-semibold mb-6">
        Task Status
      </h2>

      <div className="grid grid-cols-2 gap-6">

        {data.map((task, index) => (
          <TaskStatusCard key={index} task={task} />
        ))}

      </div>

    </div>
  );
}
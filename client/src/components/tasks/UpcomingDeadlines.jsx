import DeadlineItem from "./DeadlineItem";

export default function UpcomingDeadlines({data=[]}) {
  return (

    <div className="bg-[#0F172A] p-6 rounded-xl border border-gray-800">

      <div className="flex justify-between mb-6">

        <h2 className="text-lg font-semibold">
          Upcoming Deadlines
        </h2>

        <button className="text-sm text-gray-400">
          View all →
        </button>

      </div>

      <div className="space-y-4">

        {data.map((task, index) => (
          <DeadlineItem key={index} task={task} />
        ))}

      </div>

    </div>
  );
}
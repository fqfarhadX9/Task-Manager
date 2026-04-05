import DeadlineItem from "./DeadlineItem";
import { ArrowRight } from "lucide-react";

export default function UpcomingDeadlines({ data = [] }) {
  return (

    <div className="bg-[#0F172A] p-4 sm:p-6 rounded-xl border border-gray-800">

      <div className="flex  justify-between items-center mb-4 sm:mb-6">

        <h2 className="text-base sm:text-lg font-semibold">
          Upcoming Deadlines
        </h2>

        <button className="flex items-center gap-1 text-xs sm:text-sm text-gray-400 hover:text-white transition">
          View all <ArrowRight size={14}/>
        </button>

      </div>

      <div className="space-y-3 sm:space-y-4">

        {data.map((task, index) => (
          <DeadlineItem key={index} task={task} />
        ))}

      </div>

    </div>
  );
}
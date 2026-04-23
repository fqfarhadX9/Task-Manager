import { BarChart3, CheckCircle2, AlertTriangle, Clock } from "lucide-react";

export default function TaskStats({ stats }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">

      <div className="bg-white dark:bg-gray-950 border border-gray-200 dark:border-gray-800 p-4 md:p-6 rounded-xl flex justify-between items-center">
        <div>
          <p className="text-gray-400 text-sm md:text-base">Total Tasks</p>
          <h2 className="text-2xl md:text-3xl font-bold mt-1 md:mt-2 text-black dark:text-white">
            {stats?.totalTasks}
          </h2>
        </div>
        <div className="bg-blue-500/10 p-2 md:p-3 rounded-full">
          <BarChart3 className="text-blue-500" size={20} />
        </div>
      </div>

      <div className="bg-white dark:bg-gray-950 border border-gray-200 dark:border-gray-800 p-4 md:p-6 rounded-xl flex justify-between items-center">
        <div>
          <p className="text-gray-400 text-sm md:text-base">Completed</p>
          <h2 className="text-2xl md:text-3xl font-bold mt-1 md:mt-2 text-black dark:text-white">
            {stats?.completed}
          </h2>
        </div>
        <div className="bg-green-500/10 p-2 md:p-3 rounded-full">
          <CheckCircle2 className="text-green-500" size={20} />
        </div>
      </div>

      <div className="bg-white dark:bg-gray-950 border border-gray-200 dark:border-gray-800 p-4 md:p-6 rounded-xl flex justify-between items-center">
        <div>
          <p className="text-gray-400 text-sm md:text-base">Overdue</p>
          <h2 className="text-2xl md:text-3xl font-bold mt-1 md:mt-2 text-black dark:text-white">
            {stats?.overdue}
          </h2>
        </div>
        <div className="bg-red-500/10 p-2 md:p-3 rounded-full">
          <AlertTriangle className="text-red-500" size={20} />
        </div>
      </div>

      <div className="bg-white dark:bg-gray-950 border border-gray-200 dark:border-gray-800 p-4 md:p-6 rounded-xl flex justify-between items-center">
        <div>
          <p className="text-gray-400 text-sm md:text-base">Due Soon</p>
          <h2 className="text-2xl md:text-3xl font-bold mt-1 md:mt-2 text-black dark:text-white">
            {stats?.dueSoon}
          </h2>
        </div>
        <div className="bg-yellow-500/10 p-2 md:p-3 rounded-full">
          <Clock className="text-yellow-500" size={20} />
        </div>
      </div>

    </div>
  );
}
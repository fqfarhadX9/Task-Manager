export default function CalendarHeader({ currentDate, setCurrentDate}) {

  return (
    <div className="flex items-center justify-between">

      <h1 className="text-3xl font-semibold text-black dark:text-white">
        Team Calendar
      </h1>

      <div className="px-6 py-1 bg-white dark:bg-gray-950 border border-gray-200 dark:border-gray-800 rounded-md">

        <select  className="bg-transparent outline-none text-black dark:text-white cursor-pointer">
          <option className="bg-white dark:bg-gray-950">Day</option>
          <option className="bg-white dark:bg-gray-950">Week</option>
          <option className="bg-white dark:bg-gray-950">Month</option>
          <option className="bg-white dark:bg-gray-950">Year</option>
        </select>

      </div>

    </div>
  );
}
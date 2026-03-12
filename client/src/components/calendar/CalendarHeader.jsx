export default function CalendarHeader({ currentDate, setCurrentDate}) {

  const prevMonth = () => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() - 1)
    );
  };

  const nextMonth = () => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() + 1)
    );
  };

  const monthName = currentDate.toLocaleString("default", { month: "long" });
  const year = currentDate.getFullYear();

  return (
    <div className="flex items-center justify-between">

      <h1 className="text-2xl font-semibold">
        {monthName} {year}
      </h1>

      <div className="flex gap-3">

        <button
          onClick={prevMonth}
          className="bg-[#1F2937] px-4 py-2 rounded-md"
        >
          Prev
        </button>

        <button
          onClick={nextMonth}
          className="bg-[#1F2937] px-4 py-2 rounded-md"
        >
          Next
        </button>

      </div>

    </div>
  );
}
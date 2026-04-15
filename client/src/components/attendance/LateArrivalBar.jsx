export default function LateArrivalBar({ item, max }) {

  const width = (item.count / max) * 100;

  const dayColors = {
    Sunday: "bg-red-400",
    Monday: "bg-blue-400",
    Tuesday: "bg-green-400",
    Wednesday: "bg-orange-300",
    Thursday: "bg-purple-400",
    Friday: "bg-pink-400",
    Saturday: "bg-indigo-400",
  };


  return (
    <div className="group">

      <div className="flex justify-between text-sm mb-1">
        <span className="text-black dark:text-white">{item.day}</span>
        <span className="text-black dark:text-white">
          {item.count}
        </span>
      </div>

      <div className="w-full h-2 bg-gray-200 dark:bg-[#0F172A] rounded overflow-hidden">

        <div
          style={{ width: `${width}%` }}
          className={`h-2 rounded transition-all duration-500 group-hover:opacity-80 ${dayColors[item.day]}`}
        />

      </div>

    </div>
  );
}
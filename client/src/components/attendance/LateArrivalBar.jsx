export default function LateArrivalBar({ item, max }) {

  const width = (item.count / max) * 100;

  return (
    <div className="group">

      <div className="flex justify-between text-sm mb-1">
        <span className="text-gray-300">{item.day}</span>
        <span className="text-gray-400">
          {item.count}
        </span>
      </div>

      <div className="w-full h-2 bg-[#0F172A] rounded overflow-hidden">

        <div
          style={{ width: `${width}%` }}
          className="h-2 bg-orange-400 rounded transition-all duration-500 group-hover:bg-orange-300"
        />

      </div>

    </div>
  );
}
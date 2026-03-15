export default function AttendanceRow({ item }) {

  const statusStyle = {
    present: "bg-green-500/20 text-green-400",
    late: "bg-yellow-500/20 text-yellow-400",
    absent: "bg-red-500/20 text-red-400",
    "half day": "bg-blue-500/20 text-blue-400",
  };

  function formatTime(hoursDecimal) {
    const totalSeconds = Math.floor(hoursDecimal * 3600);

    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    return `${hours}h ${minutes}m ${seconds}s`;
  }

  const time = formatTime(item.hours);

  return (
    <tr className="border-b border-gray-800 hover:bg-[#020817]">

      <td className="p-4">{item.userId?.name}</td>
      <td className="p-4 text-gray-400">{item.date}</td>
      <td className="p-4">{new Date(item.checkIn).toLocaleTimeString()}</td>
      <td className="p-4">{new Date(item.checkOut).toLocaleTimeString()}</td>

      <td className="p-4">
        <span
          className={`px-3 py-1 rounded-full text-xs capitalize ${statusStyle[item.status]}`}
        >
          {item.status}
        </span>
      </td>

      <td className="p-4">{time}</td>

      <td className="p-4 text-blue-400 cursor-pointer hover:underline">
        Edit
      </td>

    </tr>
  );
}
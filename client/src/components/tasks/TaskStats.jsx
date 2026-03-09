export default function TaskStats() {

  return (

    <div className="grid grid-cols-4 gap-6">

      <div className="bg-[#0F172A] p-6 rounded-xl border border-gray-800">
        <p className="text-gray-400">Total Tasks</p>
        <h2 className="text-3xl font-bold mt-2">42</h2>
      </div>

      <div className="bg-[#0F172A] p-6 rounded-xl border border-gray-800">
        <p className="text-gray-400">Completed</p>
        <h2 className="text-3xl font-bold mt-2">24</h2>
      </div>

      <div className="bg-[#0F172A] p-6 rounded-xl border border-gray-800">
        <p className="text-gray-400">Overdue</p>
        <h2 className="text-3xl font-bold mt-2">5</h2>
      </div>

      <div className="bg-[#0F172A] p-6 rounded-xl border border-gray-800">
        <p className="text-gray-400">Due Soon</p>
        <h2 className="text-3xl font-bold mt-2">8</h2>
      </div>

    </div>
  );
}
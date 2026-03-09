export default function TaskHeader() {
  return (
    <div className="flex justify-between items-center mb-8">

      <h1 className="text-3xl font-bold">
        Tasks
      </h1>

      <input
        placeholder="Search tasks..."
        className="bg-[#0F172A] border border-gray-700 px-4 py-2 rounded-lg outline-none"
      />

    </div>
  );
}
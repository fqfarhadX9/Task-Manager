export default function TaskHeader({search, setSearch}) {
  return (
    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-6 md:mb-8">

      <h1 className="text-xl sm:text-2xl md:text-3xl font-bold">
        Tasks
      </h1>

      <input
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search tasks..."
        className="w-full sm:w-64 md:w-80 bg-[#0F172A] border border-gray-700 px-3 sm:px-4 py-2 rounded-lg outline-none text-sm md:text-base"
      />

    </div>
  );
}
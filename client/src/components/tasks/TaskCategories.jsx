export default function TaskCategories({ data = [] }) {

  const totalTasks = data.reduce((sum, item) => sum + item.tasks, 0);

  return (
    <div className="bg-[#0F172A] p-6 rounded-xl border border-gray-800">

      <h2 className="text-lg font-semibold mb-6">
        Task Categories
      </h2>

      {data.map((cat, index) => {

        const percent = Math.round((cat.tasks / totalTasks) * 100);

        return (

          <div key={index} className="mb-5">

            <div className="flex justify-between mb-1">

              <span>{cat.name}</span>

              <span className="text-gray-400 text-sm">
                {percent}% ({cat.tasks})
              </span>

            </div>

            <div className="w-full bg-gray-800 h-2 rounded">

              <div
                className="bg-blue-500 h-2 rounded"
                style={{ width: `${percent}%` }}
              ></div>

            </div>

          </div>

        );

      })}

    </div>
  );
}
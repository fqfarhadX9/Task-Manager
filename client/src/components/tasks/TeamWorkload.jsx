export default function TeamWorkload({ data = [] }) {

  const maxTasks = Math.max(...data.map(user => user.tasks), 1);

  return (

    <div className="bg-[#0F172A] p-6 rounded-xl border border-gray-800">

      <h2 className="text-lg font-semibold mb-6">
        Team Workload
      </h2>

      {data.map((member, index) => {

        const progress = Math.round((member.tasks / maxTasks) * 100);

        return (

          <div key={index} className="mb-6">

            <div className="flex justify-between mb-1">

              <div className="flex items-center gap-2">

                <img
                  src={member.profilePic}
                  alt={member.name}
                  className="w-6 h-6 rounded-full"
                />

                <span>{member.name}</span>

              </div>

              <span className="text-gray-400 text-sm">
                {member.tasks} tasks
              </span>

            </div>

            <div className="w-full bg-gray-800 h-2 rounded">

              <div
                className="bg-yellow-500 h-2 rounded"
                style={{ width: `${progress}%` }}
              ></div>

            </div>

          </div>

        );

      })}

    </div>
  );
}
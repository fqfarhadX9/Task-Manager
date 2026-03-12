export default function TeamPerformance() {

  const team = [
    { name: "Farhad", role: "Frontend Dev", performance: 85 },
    { name: "Ali", role: "Backend Dev", performance: 60 },
    { name: "Sarah", role: "UI Designer", performance: 75 },
    { name: "John", role: "QA Tester", performance: 50 },
  ];

  return (
    <div className="bg-[#0F172A] border border-[#1F2937] rounded-2xl p-6 h-full">

      <h2 className="text-lg font-semibold text-white mb-6">
        Team Performance
      </h2>

      <div className="space-y-6">
        {team.map((member, index) => (
          <div key={index}>
            
            <div className="flex items-center justify-between mb-2">
              
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold">
                  {member.name.charAt(0)}
                </div>
                <div>
                  <p className="text-sm text-white">{member.name}</p>
                  <p className="text-xs text-gray-400">{member.role}</p>
                </div>
              </div>

              <span className="text-sm text-gray-400">
                {member.performance}%
              </span>
            </div>

            <div className="w-full h-3 bg-[#1F2937] rounded-full">
              <div
                className="bg-green-500 h-3 rounded-full"
                style={{ width: `${member.performance}%` }}
              />
            </div>

          </div>
        ))}
      </div>

    </div>
  );
}
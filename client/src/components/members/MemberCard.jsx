import { MessageSquare, User } from "lucide-react";

const MemberCard = ({ member, setSelectedMember }) => {
  return (
    <div className="bg-[#111827] rounded-2xl p-6 border border-gray-800 hover:border-gray-600 transition cursor-pointer" onClick={() => setSelectedMember(member)}>

      {/* TOP SECTION */}
      <div className="flex items-start gap-4 ">

        <img
          src={member.profileImageUrl}
          alt={member.name}
          className="w-14 h-14 rounded-xl object-cover"
        />

        {/* Name + Designation + Status */}
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-white">
            {member.name}
          </h3>

          <div className="flex items-center gap-3 mt-1">
            <p className="text-sm text-gray-400">
              {member.position || "Developer"}
            </p>

            <span
              className={`text-xs px-3 py-1 rounded-full font-medium
                ${
                  member.isActive
                    ? "bg-green-900 text-green-400"
                    : "bg-yellow-900 text-yellow-400"
                }
              `}
            >
              {member.isActive ? "Active" : "Away"}
            </span>
          </div>
        </div>

      </div>

      {/* INFO SECTION */}
      <div className="mt-6 space-y-3 text-sm">

        <div className="flex justify-between text-gray-400">
          <span>Email</span>
          <span className="text-white">{member.email}</span>
        </div>

        <div className="flex justify-between text-gray-400">
          <span>Access</span>
          <span className="text-white capitalize">
            {member.role}
          </span>
        </div>

      </div>

      {/* SKILLS SECTION */}
      <div className="flex flex-wrap gap-2 mt-6">

        {(member.skills || ["React", "Node.js", "UI/UX"]).map(
          (skill, index) => (
            <span
              key={index}
              className="bg-[#1F2937] text-gray-300 text-xs px-3 py-1 rounded-lg"
            >
              {skill}
            </span>
          )
        )}

      </div>

      {/* BUTTONS */}
      <div className="flex gap-4 mt-6">

        <button className="flex-1 flex items-center justify-center gap-2 border border-gray-700 text-white py-2 rounded-lg hover:bg-gray-800 transition text-sm">
          <User size={16} />
          Profile
        </button>

        <button className="flex-1 flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg transition text-sm">
          <MessageSquare size={16} />
          Message
        </button>

      </div>

    </div>
  );
};

export default MemberCard;
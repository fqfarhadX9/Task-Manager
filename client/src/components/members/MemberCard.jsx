import { MessageSquare, User } from "lucide-react";

const MemberCard = ({ member, setSelectedMember }) => {
  return (
    <div 
      className="bg-white dark:bg-gray-950 rounded-2xl p-6 border border-gray-200 dark:border-[#1F2937] transition cursor-pointer" 
      onClick={(e) => {
        e.stopPropagation();
        setSelectedMember(member)
      }}
    >

      {/* TOP SECTION */}
      <div className="flex items-start gap-4 ">

        <img
          src={member.profileImageUrl}
          alt={member.name}
          className="w-14 h-14 rounded-xl object-cover"
        />

        {/* Name + Designation + Status */}
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
            {member.name}
          </h3>

          <div className="flex items-center gap-3 mt-1">
            <p className="text-sm text-gray-400">
              {member.position || "Developer"}
            </p>

            <span
              className={`text-xs px-3 py-1 rounded-full font-medium
                ${
                  member.status === "active"
                    ? "border border-green-400 text-green-400"
                    : "border border-yellow-400 text-yellow-400"
                }
              `}
            >
              {member.status === "active" ? "Active" : "Away"}
            </span>
          </div>
        </div>

      </div>

      {/* INFO SECTION */}
      <div className="mt-6 space-y-3 text-sm">

        <div className="flex justify-between text-gray-400">
          <span>Email</span>
          <span className="text-black dark:text-white text-[16px]">{member.email}</span>
        </div>

        <div className="flex justify-between text-gray-400">
          <span>Access</span>
          <span className="text-gray-800 dark:text-white capitalize">
            {member.role}
          </span>
        </div>

      </div>

      {/* SKILLS SECTION */}
      <div className="flex flex-wrap gap-2 mt-6">

        {(member.skills).map(
          (skill, index) => (
            <span
              key={index}
              className="bg-blue-700/90 dark:bg-gray-900/50 text-gray-300 text-xs px-3 py-1 rounded-lg"
            >
              {skill.name}
            </span>
          )
        )}

      </div>

      {/* BUTTONS */}
      <div className="flex gap-4 mt-6">

        <button className="flex-1 flex items-center justify-center gap-2 bg-white dark:bg-gray-950 border border-gray-300 dark:border-gray-700 text-gray-900 dark:text-white py-2 rounded-lg transition text-sm">
          <User size={16} />
          Profile
        </button>

        <button className="flex-1 flex items-center justify-center gap-2 bg-blue-400 hover:bg-blue-500 text-white py-2 rounded-lg transition text-sm">
          <MessageSquare size={16} />
          Message
        </button>

      </div>

    </div>
  );
};

export default MemberCard;
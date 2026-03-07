import { useState } from "react";
import { X } from "lucide-react";

const MemberDetailsModal = ({ member, onClose }) => {
  const [activeTab, setActiveTab] = useState("info");

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">

      <div className="bg-[#0F172A] w-[650px] rounded-xl border border-gray-800 p-6 relative">

        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-gray-400 hover:text-white"
        >
          <X size={18} />
        </button>

        <div className="flex items-center gap-4 mb-6">

          <img
            src={member?.profileImageUrl || "https://i.pravatar.cc/150"}
            className="w-16 h-16 rounded-lg object-cover"
          />

          <div>
            <h2 className="text-xl font-semibold text-white">
              {member?.name || "Alex Johnson"}
            </h2>

            <div className="flex gap-2 mt-1">

              <span className="text-sm text-gray-400">
                {member?.position || "Developer"}
              </span>

              <span className="px-2 py-[2px] text-xs bg-green-500/20 text-green-400 rounded">
                Active
              </span>

              <span className="px-2 py-[2px] text-xs bg-blue-500/20 text-blue-400 rounded">
                Admin
              </span>

            </div>
          </div>

        </div>

        <div className="flex bg-[#020617] rounded-lg p-1 mb-6">

          <button
            onClick={() => setActiveTab("info")}
            className={`flex-1 py-2 rounded-md text-sm ${
              activeTab === "info"
                ? "bg-[#111827] text-white"
                : "text-gray-400"
            }`}
          >
            Information
          </button>

          <button
            onClick={() => setActiveTab("projects")}
            className={`flex-1 py-2 rounded-md text-sm ${
              activeTab === "projects"
                ? "bg-[#111827] text-white"
                : "text-gray-400"
            }`}
          >
            Projects
          </button>

          <button
            onClick={() => setActiveTab("skills")}
            className={`flex-1 py-2 rounded-md text-sm ${
              activeTab === "skills"
                ? "bg-[#111827] text-white"
                : "text-gray-400"
            }`}
          >
            Skills
          </button>

        </div>

        {/* INFORMATION TAB */}

        {activeTab === "info" && (
          <div className="space-y-5 text-sm text-gray-300">

            <div>
              <p className="text-gray-400">Email</p>
              <p>alex@example.com</p>
            </div>

            <div>
              <p className="text-gray-400">Phone</p>
              <p>+1 (555) 123-4567</p>
            </div>

            <div>
              <p className="text-gray-400">Location</p>
              <p>San Francisco, CA</p>
            </div>

            <div>
              <p className="text-gray-400">Joined</p>
              <p>Jan 15, 2024</p>
            </div>

            <div>
              <p className="text-gray-400">Bio</p>
              <p>
                Full-stack developer with 5 years of experience building
                scalable web applications.
              </p>
            </div>

          </div>
        )}

        {/* PROJECTS TAB */}

        {activeTab === "projects" && (
          <div className="text-gray-400 text-sm">
            Project A <br/>
            Project B <br/>
            Project C
          </div>
        )}

        {/* SKILLS TAB */}

        {activeTab === "skills" && (
          <div className="flex gap-2 flex-wrap">

            <span className="px-3 py-1 bg-[#111827] rounded text-sm">
              React
            </span>

            <span className="px-3 py-1 bg-[#111827] rounded text-sm">
              Node.js
            </span>

            <span className="px-3 py-1 bg-[#111827] rounded text-sm">
              AWS
            </span>

            <span className="px-3 py-1 bg-[#111827] rounded text-sm">
              MongoDB
            </span>

          </div>
        )}

        {/* Footer */}
        <div className="flex justify-between mt-8">

          <button
            onClick={onClose}
            className="px-4 py-2 bg-[#020617] border border-gray-700 rounded-lg text-sm"
          >
            Close
          </button>

          <div className="flex gap-3">

            <button className="px-4 py-2 border border-gray-700 rounded-lg text-sm">
              View Profile
            </button>

            <button className="px-4 py-2 bg-blue-600 rounded-lg text-sm">
              Message
            </button>

          </div>

        </div>

      </div>
    </div>
  );
};

export default MemberDetailsModal;
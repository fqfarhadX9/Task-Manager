import { useEffect, useState } from "react";
import { X, Gift, MoreHorizontal } from "lucide-react";
import axios from "../../api/axios.js";
import { useNavigate } from "react-router-dom";
import DotMenu from "./DotMenu.jsx";
import toast from "react-hot-toast";

const MemberDetailsModal = ({ member, setEditMember, onClose, refresh }) => {
  const [activeTab, setActiveTab] = useState("info");
  const [projects, setProjects] = useState([])
  const [loadingProjects, setLoadingProjects] = useState(false);
   const [loading, setLoading] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const navigate = useNavigate();

  const fetchProjects = async () => {
    try {
      setLoadingProjects(true);
      const {data} = await axios.get(`/task/tasks/user/${member._id}`);
      setProjects(data.projects);
    } catch (error) {
      console.log(error);
    } finally {
      setLoadingProjects(false);
    }
  }
  
  // user(member) delete func
  const handleDelete = async () => {
    setLoading(true);
    try {
      await axios.delete(`/user/${member._id}`);
      toast.success("User deleted successfully");
      onClose()
      refresh()
    } catch (error) {
      toast.error(error?.response?.data?.message || "Delete failed");
    }finally {
      setLoading(false);
    } 
  }

  useEffect(() => {
    if (activeTab === "projects") {
      fetchProjects();
    }
  }, [activeTab]);


  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">

      <div className="bg-white dark:bg-gray-950 w-[95%] sm:w-[500px] md:w-[650px] max-h-[90vh] overflow-y-auto rounded-xl border border-gray-200 dark:border-gray-800 p-4 sm:p-6 relative">
      
        <div className="absolute right-10 sm:right-12 top-4 text-gray-400 hover:text-gray-500">
          <button
          onClick={() => setShowMenu(!showMenu)}
          >
           <MoreHorizontal size={20}/> 
          </button>

          {showMenu && 
            <DotMenu 
              loading={loading} 
              onEdit={() => {
                setEditMember(member);
                onClose();
              }} 
              onDeleteClick={() => setShowConfirm(true)} 
              setShowMenu={setShowMenu}
            />
          }
        </div>

        <button
          onClick={() => {
            onClose();
        }}
          className="absolute right-4 top-4 text-gray-400 hover:text-red-600 transition"
        >
          <X size={20} />
        </button>

        <div className="flex flex-col items-center text-center sm:flex-row sm:text-left sm:items-center gap-4">

          <img
            src={member?.profileImageUrl}
            className="w-16 h-16 rounded-lg object-cover"
          />

          <div>
            <h2 className="text-xl font-semibold text-gray-800 dark:text-white">
              {member?.name}
            </h2>

            <div className="flex gap-2 mt-1">

              <span className="text-sm text-gray-400">
                {member?.position}
              </span>

              <span className={`px-2 py-[2px] text-xs rounded ${member?.status === "active" ?  "border border-gray-300 dark:border-gray-700 text-black dark:text-white" : "border dark:border-gray-700 bg-blue-600 dark:bg-[#020617] text-white"}`}>
                {member?.status === "active" ? "Active" : "Away"}
              </span>

              <span className="px-2 py-[2px] text-xs rounded bg-blue-400 text-white" >
                {member?.role === "admin" ? "Admin" : "Member"}
              </span>

            </div>
          </div>

        </div>

        <div className="flex flex-col sm:flex-row bg-blue-50 dark:bg-[#020617] rounded-lg p-1 mb-6 mt-4">

          <button
            onClick={() => setActiveTab("info")}
            className={`flex-1 py-2 rounded-md text-sm ${
              activeTab === "info"
                ? "bg-blue-400 dark:bg-gray-950 text-white border border-gray-200 dark:border-gray-800"
                : "text-gray-400 hover:bg-blue-400 hover:text-white"
            }`}
          >
            Information
          </button>

          <button
            onClick={() => setActiveTab("projects")}
            className={`flex-1 py-2 rounded-md text-sm ${
              activeTab === "projects"
                ? "bg-blue-400 dark:bg-gray-950 text-white border border-gray-200 dark:border-gray-800"
                : "text-gray-400 hover:bg-blue-400 hover:text-white"
            }`}
          >
            Projects
          </button>

          <button
            onClick={() => setActiveTab("skills")}
            className={`flex-1 py-2 rounded-md text-sm ${
              activeTab === "skills"
                ? "bg-blue-400 dark:bg-gray-950 text-white border border-gray-200 dark:border-gray-800"
                : "text-gray-400 hover:bg-blue-400 hover:text-white"
            }`}
          >
            Skills
          </button>

        </div>

        {/* INFORMATION TAB */}

        {activeTab === "info" && (
          <div className="space-y-5 text-sm text-black dark:text-white">

            <div>
              <p>Email</p>
              <p className="text-gray-400">{member?.email}</p>
            </div>

            <div>
              <p>Phone</p>
              <p className="text-gray-400">{member?.phone}</p>
            </div>

            <div>
              <p>Location</p>
              <p className="text-gray-400">{member?.location}</p>
            </div>

            <div>
              <p>Joined</p>
              <p className="text-gray-400">{member?.joinedDate || "Jan 15, 2026"}</p>
            </div>

            <div>
              <p>Bio</p>
              <p className="text-gray-400">
               {member?.bio || "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."}
              </p>
            </div>

          </div>
        )}

        {/* PROJECTS TAB */}

        {activeTab === "projects" && (
          <div className="space-y-3">

            {loadingProjects ? (
              <p className="text-gray-400 text-sm">Loading projects...</p>
            ) : projects?.length === 0 ? (
              <p className="text-gray-400 text-sm">No projects assigned</p>
            ) : (
              projects?.map((project, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between border border-gray-200 dark:border-gray-800 px-4 py-3 rounded-lg"
                >

                  {/* LEFT */}
                  <div className="flex items-center gap-3">

                    {/* ICON */}
                    <div className="w-8 h-8 flex items-center justify-center rounded-md">
                      <Gift size={16} className="text-blue-400" />
                    </div>

                    {/* NAME + STATUS */}
                    <div>
                      <p className="text-sm text-black dark:text-white font-medium">
                        {project.title}
                      </p>

                      <p className="text-xs text-gray-400">
                        {project.status === "completed"
                          ? "Completed"
                          : project.status === "in_progress"
                          ? "Active Project"
                          : "Pending"}
                      </p>
                    </div>

                  </div>

                  {/* RIGHT */}
                  <button
                    onClick={() => navigate(`/task/${project._id}`)} 
                    className="text-sm px-3 py-1 text-black dark:text-white border border-gray-200 dark:border-gray-800 rounded-md">
                    View
                  </button>

                </div>
              ))
            )}

          </div>
        )}

        {/* SKILLS TAB */}

        {activeTab === "skills" && (
          <div>
            <div className="flex gap-2 flex-wrap">

              {(member?.skills || []).map((skill, index) => (
                  <span
                    key={index}
                    className="bg-blue-700/90 dark:bg-gray-900/50 text-white text-xs px-3 py-1 rounded-lg"
                  >
                    {skill.name}
                  </span>
                )
              )}
            </div>

            <div className="mt-4">
              <h3 className="text-sm text-black dark:text-white mb-3">
                Expertise Areas
              </h3>

              {member?.skills?.map((skill, i) => (
                <div key={i} className="mb-4">

                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-800 dark:text-white">{skill.name}</span>
                    <span className="text-gray-800 dark:text-white">{skill.level}%</span>
                  </div>

                  <div className="w-full h-2 bg-gray-200 dark:bg-[#1F2937] rounded-full overflow-hidden">
                    <div
                      className="h-full bg-blue-500 rounded-full transition-all"
                      style={{ width: `${skill.level}%` }}
                    />
                  </div>

                </div>
              ))}
            </div>
          </div>
        )}

        {/* Footer */}
        <div className="flex flex-col sm:flex-row gap-2 sm:justify-between mt-4">
          <button
            onClick={() => {
              onClose();
            }}
            className="px-4 py-2 border border-gray-200 dark:border-gray-800 hover:bg-blue-100 dark:hover:bg-gray-900/50 text-black dark:text-white rounded-lg text-sm"
          >
            Close
          </button>

          <div className="flex gap-3">

            <button className="px-4 py-2 border hover:bg-blue-100 dark:hover:bg-gray-900/50 border-gray-200 dark:border-gray-800 text-black dark:text-white rounded-lg text-sm">
              View Profile
            </button>

            <button className="px-4 py-2 bg-blue-400 hover:bg-blue-500 rounded-lg text-sm">
              Message
            </button>

          </div>

        </div>

      </div>

      {showConfirm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          
          <div className="bg-white dark:bg-gray-950 p-6 rounded-xl  w-[80%] sm:w-[300px]">
            
            <h2 className="text-lg font-semibold mb-2 text-black dark:text-white">
              Delete Member
            </h2>

            <p className="text-sm text-gray-500 mb-4">
              Are you sure you want to delete this member?
            </p>

            <div className="flex justify-end gap-2">
              
              <button
                onClick={() => setShowConfirm(false)}
                className="px-3 py-1 border border-gray-200 dark:border-gray-800 hover:bg-blue-100 dark:hover:bg-gray-900/50 rounded-md text-sm"
              >
                Cancel
              </button>

              <button
                disabled={loading}
                onClick={() => {
                  handleDelete();
                  setShowConfirm(false);
                }}
                className="px-3 py-1 bg-red-500  hover:bg-red-600 border border-gray-200 dark:border-gray-800 text-white rounded-md text-sm"
              >
                {loading ? "Deleting..." : "Delete"}
              </button>

            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default MemberDetailsModal;
import { useState } from "react";
import WFHUserCard from "./WFHUserCard";
import { useEffect } from "react";
import axios from "../../api/axios.js";

export default function WFHTracker() {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [mode, setMode] = useState("office");

  const currentUser = JSON.parse(localStorage.getItem("user"));
  const currentUserId = currentUser._id;
  const role = currentUser.role;
  const currentUserData = users.find((u) => String(u.userId) === String(currentUserId))


  const wfoUser = users.filter(u => u.shedule === "office").length;
  const wfhUser = users.filter(u => u.shedule === "remote").length;
  const total = users.length;
  const Percent = total ? (wfoUser / total) * 100 : 0;

  const handleEdit = (user) => {
    setSelectedUser(user);        
    setMode(user.shedule);        
    setIsOpen(true);              
  };

  const fetchData = async () => {
    const res = await axios.get("/attendance/week/all");
    setUsers(res.data);
  };

  const handleToggleMode = async (userId, currentMode) => {
  const newMode = currentMode === "office" ? "remote" : "office";

  await axios.post("/attendance/mode", {
    userId,
    mode: newMode,
  });

  fetchData();
};

  useEffect(() => {
    fetchData();
  }, [])

  return (
    <div className="bg-white dark:bg-gray-950 border border-gray-200 dark:border-gray-800 rounded-xl p-6">
      {role === "admin" && (
       <>
        <div className="flex justify-between mb-6">
          <h2 className="text-lg font-semibold text-black dark:text-white">
            Work From Home Tracker
          </h2>

          <span className="text-gray-400 text-xs bg-blue-200 dark:bg-[#1E293B] px-3 py-1 rounded-full">
            {users.length} Members 👥
          </span>
        </div>

        <div className="mb-6">

          <div className="flex justify-between text-sm mb-2">
            <span className="text-indigo-400">Office: {wfoUser}</span>
            <span className="text-green-400">Remote: {wfhUser}</span>
          </div>

          <div className="w-full bg-gray-200 dark:bg-[#0F172A] h-2 rounded">
            <div
              className="bg-blue-500 h-2 rounded"
              style={{ width: `${Percent}%` }} 
            ></div>
          </div>

        </div>

        <div className="space-y-4">
            {users?.map((user, i) => (
              <WFHUserCard user={user} key={i} onEdit={handleEdit} onToggle={handleToggleMode}/>
            ))}
        </div>

        {isOpen && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
            <div className="bg-white dark:bg-gray-950 p-6 rounded-lg w-80 relative">

              <button
                onClick={() => setIsOpen(false)}
                className="absolute top-2 right-2 text-gray-400 hover:text-red-500"
              >
                ✕
              </button>

              <h3 className="mb-4 text-black dark:text-white">Update Mode</h3>

              <select
                value={mode}
                onChange={(e) => setMode(e.target.value)}
                className="w-full p-2 border border-gray-200 dark:border-gray-800 text-gray-400"
              >
                <option value="office">Office</option>
                <option value="remote">Remote</option>
              </select>

              <button
                onClick={async () => {
                  await axios.post("/attendance/mode", {
                    userId: selectedUser.userId,
                    shedule: mode,
                  });

                  setIsOpen(false);
                  fetchData();
                }}
                className="mt-4 w-full bg-blue-400 hover:bg-blue-500 py-2 rounded"
              >
                Save
              </button>

            </div>
          </div>
        )}
       </>
      )}

      {role === "user" && currentUserData && (
        <>
          <div className="flex justify-between mb-6 items-center">
            <h2 className="text-lg font-semibold text-black dark:text-white">
              My Work Mode
            </h2>
          </div>

          <WFHUserCard
            user={currentUserData}
          />
        </>
      )}
    </div>
  );
}
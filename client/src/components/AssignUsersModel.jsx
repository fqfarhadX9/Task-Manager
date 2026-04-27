import { useEffect, useState } from "react";
import axios from "../api/axios";

const AssignUsersModal = ({ task, setOpen, setTask, setTasks }) => {
  const [users, setUsers] = useState([]);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  const user  = JSON.parse(localStorage.getItem("user") || "{}");
  const currentUser = user;

  const fetchUsers = async () => {
    try {
      const { data } = await axios.get("/user");
      setUsers(data.users);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const toggleUser = (userId) => {
    setSelectedUsers(prev =>
      prev.includes(userId)
        ? prev.filter(id => id !== userId)
        : [...prev, userId]
    );
  };

  const handleAssign = async () => {
    if (selectedUsers.length === 0) return;

    try {
      setLoading(true);

      const { data } = await axios.put(
        `/task/assign/${task._id}`,
        { userIds: selectedUsers }
      );

      if (setTask) setTask(data);
      if (setTasks) {
        setTasks(prev =>
        prev.map(t => t._id === data.task._id ? data.task : t)
        );
      }
      setOpen(false);

    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  //[{ _id: "1", name: "Aman" },{ _id: "2", name: "Naman" }];
  const alreadyAssignedIds = task.assignedTo.map(u => u._id);

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50">

      <div className="bg-white dark:bg-gray-950 border border-gray-200 dark:border-gray-700 w-full max-w-md rounded-2xl p-6 shadow-2xl">

        <h2 className="text-black dark:text-white text-lg font-semibold mb-4">
          Assign Users
        </h2>

        <div className="max-h-64 overflow-y-auto space-y-2 mb-4">

          {users
          .filter(u => u.role === "user" && u._id !== currentUser?._id) // don't show current user and admin in the list
          .map(user => {
            const isAlreadyAssigned = alreadyAssignedIds.includes(user._id);
            
            return (
              <div
                key={user._id}
                onClick={() => !isAlreadyAssigned && toggleUser(user._id)}
                className={`flex items-center justify-between px-4 py-2 rounded-lg cursor-pointer transition
                ${
                  isAlreadyAssigned
                    ? "bg-green-600 opacity-50 cursor-not-allowed"
                    : selectedUsers.includes(user._id)
                    ? "bg-blue-600/30 border border-blue-500"
                    : "text-black dark:text-white border border-gray-200 dark:border-gray-700 hover:bg-blue-100 dark:hover:bg-gray-900/50"
                }`}
              >
                <span className="text-sm">{user.name}</span>

                {isAlreadyAssigned ? (
                  <span className="text-xs text-green-400">
                    Assigned
                  </span>
                ) : selectedUsers.includes(user._id) ? (
                  <span className="text-xs text-blue-400">
                    Selected
                  </span>
                ) : null}
              </div>
            );
          })}

        </div>

        <div className="flex justify-end gap-3">

          <button
            onClick={() => setOpen(false)}
            className="px-4 py-2 text-sm border border-gray-300 dark:border-gray-700 text-black dark:text-white hover:bg-blue-100 dark:hover:bg-gray-900 rounded-lg"
          >
            Cancel
          </button>

          <button
            onClick={handleAssign}
            disabled={loading}
            className="px-4 py-2 text-sm bg-blue-400 hover:bg-blue-500 rounded-lg disabled:opacity-50"
          >
            {loading ? "Assigning..." : "Assign"}
          </button>

        </div>

      </div>
    </div>
  );
};

export default AssignUsersModal;
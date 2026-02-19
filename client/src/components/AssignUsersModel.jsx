import { useContext, useEffect, useState } from "react";
import axios from "../api/axios";
import { AuthContext } from "../context/AuthContext";

const AssignUsersModal = ({ task, setOpen, setTasks }) => {
  const [users, setUsers] = useState([]);
  const [selected, setSelected] = useState([]);

  const {user} = useContext(AuthContext);
  const currentUser = user

  useEffect(() => {
    const fetchUsers = async () => {
      const { data } = await axios.get("/user");
      setUsers(data.users);
      //already assigned users should be selected on the UI
      setSelected(task.assignedTo || []);
    };
    fetchUsers();
  }, []);

  const handleAssign = async () => {
    try {
      const { data } = await axios.put(`/task/assign/${task._id}`, {
        userIds: selected
      });

      setTasks(prev =>
        prev.map(t => t._id === data.task._id ? data.task : t)
      );

      setOpen(false);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center">
      <div className="bg-gray-900 p-6 rounded-xl w-full max-w-md">
        <h2 className="text-xl font-semibold mb-4">Assign Users</h2>
        <div className="flex flex-col gap-2 max-h-60 overflow-y-auto">
          {users
          .filter(u => u.role === "user" && u._id !== currentUser?._id) // don't show current user and admin in the list
          .map(u => (
            <label key={u._id} className="flex items-center gap-2">
              <input
                type="checkbox"
                value={u._id}
                checked={selected.includes(u._id)}
                onChange={e => {
                  const val = e.target.value;
                  setSelected(prev =>
                    prev.includes(val)
                      ? prev.filter(id => id !== val)
                      : [...prev, val]
                  );
                }}
              />
              {u.name} ({u.email})
            </label>
          ))}
        </div>

        <div className="flex justify-end gap-3 mt-4">
          <button
            onClick={() => setOpen(false)}
            className="text-gray-400"
          >
            Cancel
          </button>
          <button
            onClick={handleAssign}
            className="bg-white text-black px-4 py-2 rounded"
          >
            Assign
          </button>
        </div>
      </div>
    </div>
  );
};

export default AssignUsersModal;

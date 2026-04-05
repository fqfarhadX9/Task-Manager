import { useState, useEffect } from "react";
import axios from "../../api/axios.js";

export default function EditTaskModal({ task, onClose, fetchDashboard }) {
  const [error, setError] = useState("");
  const [form, setForm] = useState({
    title: "",
    description: "",
    dueDate: "",
    status: "",
  });

  useEffect(() => {
    if (task) {
      setForm({
        title: task.title || "",
        description: task.description || "",
        dueDate: task.dueDate
          ? new Date(task.dueDate).toISOString().split("T")[0]
          : "",
        status: task.status || "",
      });
    }
  }, [task]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    try {
      // API call
      await axios.put(`/task/${task._id}`, form);

      onClose();
      fetchDashboard();
    } catch (err) {
      console.log(err);
      setError(err.response?.data?.message || "Something went wrong");
      setTimeout(() => {
        setError("");
      }, 3000);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 px-3">

      <div className="bg-[#0F172A] p-5 sm:p-6 rounded-xl w-full max-w-md">

        <h2 className="text-lg font-semibold mb-4">Edit Task</h2>

        <input
          name="title"
          value={form.title}
          onChange={handleChange}
          className="w-full mb-3 px-3 py-2 bg-[#020817] border border-gray-700 rounded"
        />

        <textarea
          name="description"
          value={form.description}
          onChange={handleChange}
          className="w-full mb-4 px-3 py-2 bg-[#020817] border border-gray-700 rounded"
        />

        <input
          type="date"
          name="dueDate"
          value={form.dueDate}
          onChange={handleChange}
          className="w-full mb-4 px-3 py-2 bg-[#020817] border border-gray-700 rounded text-sm"
        />

        <select
          name="status"
          value={form.status}
          onChange={handleChange}
          className="w-full mb-3 px-3 py-2 bg-[#020817] border border-gray-700 rounded text-sm"
        >
          <option value="pending">Pending</option>
          <option value="in_progress">In Progress</option>
          <option value="completed">Completed</option>
        </select>

        <div className="flex justify-end gap-2">

          <button
            onClick={onClose}
            className="px-3 py-1 border border-gray-700 rounded"
          >
            Cancel
          </button>

          <button
            onClick={handleSubmit}
            className="px-3 py-1 bg-blue-600 rounded"
          >
            Save
          </button>

        </div>

        {error && (
         <p className="text-red-400 text-xs mt-2">
           ⚠ {error}
         </p>
        )}

      </div>

    </div>
  );
}
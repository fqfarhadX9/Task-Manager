import { useState } from "react";
import axios from "../api/axios";

const CreateTaskModal = ({ setOpen, refreshTasks }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [priority, setPriority] = useState("medium");


  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post("/task", {
        title,
        description,
        dueDate,
        priority
      });
      refreshTasks(); 
      setOpen(false);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-gray-900 border border-gray-800 rounded-2xl w-full max-w-lg p-8 shadow-2xl animate-fadeIn">

        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-semibold text-white">
            Create New Task
          </h2>
          <button
            onClick={() => setOpen(false)}
            className="text-gray-400 hover:text-white transition"
          >
            ✕
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-5">

          {/* Title */}
          <div className="flex flex-col gap-2">
            <label className="text-sm text-gray-400">Title</label>
            <input
              type="text"
              placeholder="Enter task title..."
              className="bg-gray-800 border border-gray-700 focus:border-white focus:ring-1 focus:ring-white p-3 rounded-lg outline-none transition"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>

          {/* Description */}
          <div className="flex flex-col gap-2">
            <label className="text-sm text-gray-400">Description (optional)</label>
            <textarea
              placeholder="Write short description..."
              className="bg-gray-800 border border-gray-700 focus:border-white focus:ring-1 focus:ring-white p-3 rounded-lg outline-none transition resize-none"
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          {/* Due Date + Priority Row */}
          <div className="grid grid-cols-2 gap-4">

            <div className="flex flex-col gap-2">
              <label className="text-sm text-gray-400">Due Date</label>
              <input
                type="date"
                className="bg-gray-800 border border-gray-700 focus:border-white focus:ring-1 focus:ring-white p-3 rounded-lg outline-none transition"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-sm text-gray-400">Priority</label>
              <select
                value={priority}
                onChange={(e) => setPriority(e.target.value)}
                className="bg-gray-800 border border-gray-700 focus:border-white focus:ring-1 focus:ring-white p-3 rounded-lg outline-none transition"
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
            </div>

          </div>

          {/* Buttons */}
          <div className="flex justify-end gap-3 pt-4">
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="px-4 py-2 rounded-lg border border-gray-700 text-gray-400 hover:text-white hover:border-gray-500 transition"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="px-5 py-2 rounded-lg bg-white text-black font-medium hover:bg-gray-200 transition"
            >
              Create Task
            </button>
          </div>

        </form>
      </div>
    </div>
  );
};

export default CreateTaskModal;

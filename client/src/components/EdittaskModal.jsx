import { useState } from "react";
import axios from "../api/axios";

const EditTaskModal = ({ task, setEditingTask, setTasks }) => {
  const [title, setTitle] = useState(task.title);
  const [description, setDescription] = useState(task.description);
  const [dueDate, setDueDate] = useState(task.dueDate?.split("T")[0]);
  const [priority, setPriority] = useState(task.priority);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const { data } = await axios.put(`/task/${task._id}`, {
        title,
        description,
        dueDate,
        priority,
      });

      setTasks(prev =>
        prev.map(t =>
          t && t._id === data._id ? data : t
        )
      );

      setEditingTask(null);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 px-4">
      
      <div className="bg-gray-900/80 border border-gray-800 backdrop-blur-xl p-8 rounded-2xl w-full max-w-lg shadow-2xl animate-fadeIn">

        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold text-white">
            Edit Task
          </h2>

          <button
            onClick={() => setEditingTask(null)}
            className="text-gray-400 hover:text-white transition text-xl"
          >
            ✕
          </button>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-5">

          <div>
            <label className="text-sm text-gray-400 mb-2 block">
              Title
            </label>
            <input
              className="w-full bg-gray-800 border border-gray-700 focus:border-white focus:ring-2 focus:ring-white p-3 rounded-xl transition outline-none"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          <div>
            <label className="text-sm text-gray-400 mb-2 block">
              Description
            </label>
            <textarea
              rows="4"
              className="w-full bg-gray-800 border border-gray-700 focus:border-white focus:ring-2 focus:ring-white p-3 rounded-xl transition outline-none resize-none"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          <div>
            <label className="text-sm text-gray-400 mb-2 block">
              Due Date
            </label>
            <input
              type="date"
              className="w-full bg-gray-800 border border-gray-700 focus:border-white focus:ring-2 focus:ring-white p-3 rounded-xl transition outline-none"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
            />
          </div>

          <div>
            <label className="text-sm text-gray-400 mb-2 block">
              Priority
            </label>
            <select
              className="w-full bg-gray-800 border border-gray-700 focus:border-white focus:ring-2 focus:ring-white p-3 rounded-xl transition outline-none"
              value={priority}
              onChange={(e) => setPriority(e.target.value)}
            >
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
          </div>

          <div className="flex justify-end gap-4 mt-4">

            <button
              type="button"
              onClick={() => setEditingTask(null)}
              className="px-5 py-2 rounded-lg bg-gray-800 hover:bg-gray-700 transition text-gray-300"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="px-6 py-2 rounded-lg bg-white text-black font-medium hover:bg-gray-200 transition shadow-md"
            >
              Update Task
            </button>

          </div>

        </form>
      </div>
    </div>
  );
};

export default EditTaskModal;

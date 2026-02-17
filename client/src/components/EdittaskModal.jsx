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
      console.log("updated data ->: ", data)

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
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center">
      <div className="bg-gray-900 p-6 rounded-xl w-full max-w-md">
        <h2 className="text-xl font-semibold mb-4">Edit Task</h2>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            className="bg-gray-800 p-3 rounded"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <textarea
            className="bg-gray-800 p-3 rounded"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />

          <input
            type="date"
            className="bg-gray-800 p-3 rounded"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
          />

          <select
            className="bg-gray-800 p-3 rounded"
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
          >
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>

          <div className="flex justify-end gap-3">
            <button
              type="button"
              onClick={() => setEditingTask(null)}
              className="text-gray-400"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="bg-white text-black px-4 py-2 rounded"
            >
              Update
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditTaskModal;

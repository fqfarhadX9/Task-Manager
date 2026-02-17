import { useState } from "react";
import axios from "../api/axios";

const CreateTaskModal = ({ setOpen, refreshTasks }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");


  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post("/task", {
        title,
        description,
        dueDate
      });
    //   console.log("Full response:", res);
    //   console.log("Server response only:", res.data);
      refreshTasks(); 
      setOpen(false);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center">
      <div className="bg-gray-900 p-6 rounded-xl w-full max-w-md">
        <h2 className="text-xl font-semibold mb-4">Create Task</h2>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="text"
            placeholder="Task title"
            className="bg-gray-800 p-3 rounded"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />

          <textarea
            placeholder="Task description"
            className="bg-gray-800 p-3 rounded"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
          
          <label className="text-sm text-gray-400">
          <input
            type="date"
            className="bg-gray-800 p-3 rounded"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
            required
          />
          </label>

          <div className="flex justify-end gap-3">
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="text-gray-400"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="bg-white text-black px-4 py-2 rounded"
            >
              Create
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateTaskModal;

import { useState, useEffect } from "react";
import axios from "../../api/axios";

export default function EventForm({ onClose, onSave, initialData }) {

  const [form, setForm] = useState({
    title: "",
    description: "",
    startDate: "",
    endDate: ""
  });

  // Edit mode ke liye pre-fill
  useEffect(() => {
    if (initialData) {
      setForm({
        title: initialData.title || "",
        description: initialData.description || "",
        startDate: initialData.startDate?.slice(0,16) || "",
        endDate: initialData.endDate?.slice(0,16) || ""
      });
    }
  }, [initialData]);

  // input change handler
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  // submit
  const handleSubmit = async () => {
    try {

      if (initialData) {
        // EDIT
        await axios.put(`/event/${initialData._id}`, form);
      } else {
        // CREATE
        await axios.post("/event", form);
      }

      onSave();   // refresh list
      onClose();  // close modal

    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center">

      <div className="bg-[#0B1220] p-6 rounded-xl w-[400px]">

        <h2 className="text-lg font-semibold mb-4">
          {initialData ? "Edit Event" : "Create Event"}
        </h2>

        {/* Title */}
        <input
          type="text"
          name="title"
          value={form.title}
          onChange={handleChange}
          placeholder="Event Title"
          className="w-full mb-3 p-2 bg-gray-800 rounded"
        />

        {/* Date & Time */}
        <input
          type="datetime-local"
          name="startDate"
          value={form.startDate}
          onChange={handleChange}
          placeholder="Start Date"
          className="w-full mb-3 p-2 bg-gray-800 rounded"
        />

        <input
          type="datetime-local"
          name="endDate"
          value={form.endDate}
          onChange={handleChange}
          placeholder="End Date"
          className="w-full mb-3 p-2 bg-gray-800 rounded"
        />

        {/* Description */}
        <textarea
          name="description"
          value={form.description}
          onChange={handleChange}
          placeholder="Description"
          className="w-full mb-3 p-2 bg-gray-800 rounded"
        />

        {/* Actions */}
        <div className="flex justify-end gap-3 mt-4">

          <button 
            onClick={onClose}
            className="text-gray-400"
          >
            Cancel
          </button>

          <button 
            onClick={handleSubmit}
            className="bg-blue-600 px-4 py-1 rounded"
          >
            {initialData ? "Update" : "Create"}
          </button>

        </div>

      </div>

    </div>
  );
}
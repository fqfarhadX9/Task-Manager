import { useState, useEffect } from "react";
import axios from "../../api/axios";

export default function EventForm({ onClose, onSave, initialData}) {
  
  const [loading, setLoading] = useState(false);
  const[error, setError] = useState("");
  const [form, setForm] = useState({
    title: "",
    description: "",
    startDate: "",
    endDate: ""
  });

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

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async () => {
    try {

      setError("");
      setLoading(true);

      if (initialData) {
        // EDIT
        await axios.put(`/event/${initialData._id}`, form);
      } else {
        // CREATE
        await axios.post("/event", form);
      }

      onSave();   
      onClose();  

    } catch (err) {
      console.log(err);
      setError(err.response?.data?.message || "something went wrong");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if(error) {
      const timer = setTimeout(() => {
        setError("");
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [error])

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center px-3">

      <div className="bg-[#0B1220] p-4 md:p-6 rounded-xl w-[90%] max-w-md">

        <h2 className="text-base md:text-lg font-semibold mb-4">
          {initialData ? "Edit Event" : "Create Event"}
        </h2>

        <input
          type="text"
          name="title"
          value={form.title}
          onChange={handleChange}
          placeholder="Event Title"
          className="w-full mb-3 p-2 text-sm md:text-base bg-gray-800 rounded"
        />

        <input
          type="datetime-local"
          name="startDate"
          value={form.startDate}
          onChange={handleChange}
          placeholder="Start Date"
          className="w-full mb-3 p-2 text-sm md:text-base bg-gray-800 rounded"
        />

        <input
          type="datetime-local"
          name="endDate"
          value={form.endDate}
          onChange={handleChange}
          placeholder="End Date"
          className="w-full mb-3 p-2 text-sm md:text-base bg-gray-800 rounded"
        />

        <textarea
          name="description"
          value={form.description}
          onChange={handleChange}
          placeholder="Description"
          className="w-full mb-3 p-2 text-sm md:text-base bg-gray-800 rounded"
        />
        
        {error && (
          <div className="bg-red-900/40 text-red-400 px-3 py-2 rounded mb-3 text-xs md:text-sm">
            ⚠ {error}
          </div>
        )}

        <div className="flex flex-col-reverse sm:flex-row sm:justify-end gap-2 sm:gap-3 mt-4">

          <button 
            disabled={loading}
            onClick={onClose}
            className="text-gray-400 w-full sm:w-auto disabled:opacity-50"
          >
            Cancel
          </button>

          <button 
            disabled={loading}
            onClick={handleSubmit}
            className="bg-blue-600 px-4 py-2 rounded w-full sm:w-auto disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Saving..." : initialData ? "Update" : "Create"}
          </button>

        </div>

      </div>

    </div>
  );
}
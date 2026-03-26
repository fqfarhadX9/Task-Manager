import { useEffect, useState } from "react";
import EventCard from "./EventCard";
import EventForm from "./EventForm ";
import axios from "../../api/axios.js";

export default function UpcomingEvents({events, fetchEvents}) {
  
  const [showCreate, setShowCreate] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [deleteError, setDeleteError] = useState({});
  const [confirmDeleteId, setConfirmDeleteId] = useState(null);

  const handleEdit = (event) => {
    setSelectedEvent(event);
  };

  const handleDelete = async (id) => {

    setDeleteError(prev => ({...prev, [id]: ""}));

    try {
      await axios.delete(`/event/${id}`);
      fetchEvents()
    } catch (error) {
      console.log(error);
      setDeleteError(prev => ({
        ...prev, 
        [id]: error.response?.data?.message || "something went erong"
      }))

      setTimeout(() => {
        setDeleteError(prev => ({
          ...prev,
          [id]: ""
        }));
      }, 3000);
    }
  };

  useEffect(() => {
    if(confirmDeleteId) {
      const timer = setTimeout(() => {
        setConfirmDeleteId(null);
      }, 5000);
      return() => clearTimeout(timer);
    }
  }, [confirmDeleteId])

  const colors = ["green","blue", "red", "yellow"];
  const upcoming = [...events]
    .sort(
      (a,b)=>
      new Date(a.startDate) -
      new Date(b.startDate)
    )
    .slice(0,4)

  return (
    <div className="mt-10">

      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-6">
    
        <h2 className="text-lg md:text-xl font-semibold">
          Upcoming Events
        </h2>

        <button 
          onClick={() => setShowCreate(true)}
          className="bg-blue-600 hover:bg-blue-700 text-sm px-4 py-2 rounded-md w-full sm:w-auto"
        >
          + Create Event
        </button>

      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
        {upcoming.map((event, index) => (
          <EventCard 
            key={event._id} 
            event={{
              ...event,
              color: colors[index % colors.length]
            }}
            onEdit={handleEdit} 
            error={deleteError[event._id]}
            isConfirming={confirmDeleteId === event._id}
            onConfirmDelete={() => handleDelete(event._id)}
            onCancelDelete={() => setConfirmDeleteId(null)}
            onAskDelete={() => setConfirmDeleteId(event._id)}
          />
        ))}
      </div>

      {showCreate && (
        <EventForm 
          onClose={() => setShowCreate(false)}
          onSave={fetchEvents}
        />
      )}

      {selectedEvent && (
        <EventForm
          initialData={selectedEvent}
          onClose={() => setSelectedEvent(null)}
          onSave={fetchEvents}
        />
      )}

    </div>
  );
}
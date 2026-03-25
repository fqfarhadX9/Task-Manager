import { useState } from "react";
import EventCard from "./EventCard";
import EventForm from "./EventForm ";
import axios from "../../api/axios.js";

export default function UpcomingEvents({events, fetchEvents}) {
  
  const [showCreate, setShowCreate] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);

  const handleEdit = (event) => {
    setSelectedEvent(event);
  };

  const handleDelete = async (id) => {
  const confirm = window.confirm("Are you sure?");
  if (!confirm) return;

  try {
    await axios.delete(`/event/${id}`);
    fetchEvents
  } catch (error) {
    console.log(error);
  }
};

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

      <div className="flex items-center justify-between mb-6">
    
        <h2 className="text-xl font-semibold">
          Upcoming Events
        </h2>

        <button 
          onClick={() => setShowCreate(true)}
          className="bg-blue-600 hover:bg-blue-700 text-sm px-4 py-2 rounded-md"
        >
          + Create Event
        </button>

      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {upcoming.map((event, index) => (
          <EventCard 
            key={event._id} 
            event={{
              ...event,
              color: colors[index % colors.length]
            }}
            onEdit={handleEdit} 
            onDelete={handleDelete}
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
import EventCard from "./EventCard";

export default function UpcomingEvents({events}) {

    const colors = ["green","blue", "red", "yellow"]

  const upcoming = [...events]
    .sort(
      (a,b)=>
      new Date(a.startDate) -
      new Date(b.startDate)
    )
    .slice(0,4)

  return (
    <div className="mt-10">

      <h2 className="text-xl font-semibold mb-6">
        Upcoming Events
      </h2>

      <div className="grid md:grid-cols-2 gap-6">
        {upcoming.map((event, index) => (
          <EventCard 
            key={event._id} 
            event={{
              ...event,
              color: colors[index % colors.length]
            }} />
        ))}
      </div>

    </div>
  );
}
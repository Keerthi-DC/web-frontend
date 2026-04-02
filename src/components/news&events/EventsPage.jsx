import React, { useEffect, useState } from "react";

const EventsPage = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    fetch("/data/events.json")
      .then((res) => res.json())
      .then((data) => setEvents(data))
      .catch((e) => console.error(e));
  }, []);

  if (!events.length) return null;

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-6xl mx-auto px-4">

        <h2 className="text-3xl font-bold mb-10 text-center shake-text">
          All Events
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">

          {events.map((e) => (
            <div
              key={e.id}
              className="bg-white rounded-lg shadow-md overflow-hidden
              transform transition-all duration-300
              hover:-translate-y-2 hover:shadow-2xl"
            >

              {/* Image with zoom animation */}
              <div className="overflow-hidden">
                <img
                  src={e.image}
                  alt={e.title}
                  className="h-56 w-full object-cover
                  transition-transform duration-500
                  hover:scale-110"
                />
              </div>

              <div className="p-4">

                <h3 className="text-xl font-bold mb-1">
                  {e.title}
                </h3>

                <p className="text-sm text-gray-500 mb-2">
                  {e.time} | {e.venue}
                </p>

                <p className="text-gray-700">
                  {e.detail}
                </p>

              </div>

            </div>
          ))}

        </div>
      </div>
    </section>
  );
};

export default EventsPage;
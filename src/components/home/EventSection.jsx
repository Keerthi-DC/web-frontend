/* src/components/home/EventSection.jsx */
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export const EventSection = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    fetch("/data/events.json")
      .then((res) => res.json())
      .then((data) => setEvents(data))
      .catch((e) => console.error(e));
  }, []);

  if (!events.length) return null;

  const displayed = events.slice(0, 6);

  const truncate = (txt, len = 90) =>
    txt.length > len ? txt.substring(0, len) + "…" : txt;

  return (
    <section className="py-16 bg-slate-300">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-2xl font-bold mb-8 shake-text">Upcoming Events</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayed.map((e) => (
            <div
              key={e.id}
              className="relative bg-white rounded-lg shadow-md transition-transform duration-300 hover:shadow-lg hover:-translate-y-1"
            >
              <img
                src={e.image}
                alt={e.title}
                className="h-48 w-full object-cover rounded-t-lg"
              />
              <div className="p-4">
                <h3 className="text-lg font-bold mb-1">{e.title}</h3>
                <p className="text-sm text-gray-500 mb-1">
                  {e.time} | {e.venue}
                </p>
                <p className="text-sm text-gray-700">{truncate(e.detail)}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="text-center mt-8">
          <Link
            to="/events"
            className="bg-yellow-400 text-black px-8 py-3 rounded-md font-semibold hero-btn"
          >
            View More
          </Link>
        </div>
      </div>
    </section>
  );
};

export default EventSection;

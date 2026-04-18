import React from "react";
import { Link } from "react-router-dom";
import useEvents from "../../news&events/hooks/useEvents";
import BietLoader from "../../../components/ui/BietLoader";


const EventSection = () => {
  const { events, loading, error } = useEvents();

  if (loading) return <BietLoader />;
  if (error) console.error(error);
  if (!events.length) return null;

  const displayed = events.slice(0, 3);

  return (
    <section className="py-24 px-12 md:px-24 bg-white">

      {/* HEADER */}
      <h2 className="text-4xl font-bold text-[#001c40] mb-12">
        Upcoming Events
      </h2>

      {/* GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">

        {displayed.map((e, index) => (
          <div
            key={index}
            className="border-l-4 border-yellow-400 bg-[#f3f4f5] p-8 rounded-r-2xl"
          >
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm font-black text-yellow-500">
                {e.date}
              </span>

              <span className="material-symbols-outlined text-gray-400">
                event
              </span>
            </div>

            <h4 className="text-lg font-bold text-[#001c40] mb-2">
              {e.title}
            </h4>

            <p className="text-sm text-gray-500 mb-4">
              {e.venue || "Main Auditorium"} {e.time ? `, ${e.time}` : ""}
            </p>

            <button className="text-xs font-bold text-[#001c40] hover:text-yellow-500 flex items-center gap-1">
              Register Now →
            </button>
          </div>
        ))}

      </div>

      {/* VIEW MORE */}
      <div className="mt-16 text-center">
        <Link
          to="/events"
          className="text-yellow-500 text-sm font-bold uppercase tracking-widest hover:underline"
        >
          View All Events →
        </Link>
      </div>

    </section>
  );
};

export default EventSection;
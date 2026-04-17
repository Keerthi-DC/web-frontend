import React from "react";
import PropTypes from "prop-types";

/**
 * EventCard
 * ----------
 * Re‑usable card UI used by the global Events page.
 * Properties:
 *  - event: Object containing id, title, image, time, venue, detail.
 */
const EventCard = ({ event }) => {
  return (
    <div
      key={event.id}
      className="bg-white rounded-lg shadow-md overflow-hidden transform transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl"
    >
      <div className="overflow-hidden">
        <img
          src={event.image}
          alt={event.title}
          className="h-56 w-full object-cover transition-transform duration-500 hover:scale-110"
        />
      </div>
      <div className="p-4">
        <h3 className="text-xl font-bold mb-1">{event.title}</h3>
        <p className="text-sm text-gray-500 mb-2">
          {event.time} | {event.venue}
        </p>
        <p className="text-gray-700">{event.detail}</p>
      </div>
    </div>
  );
};

EventCard.propTypes = {
  event: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    time: PropTypes.string,
    venue: PropTypes.string,
    detail: PropTypes.string,
  }).isRequired,
};

export default EventCard;

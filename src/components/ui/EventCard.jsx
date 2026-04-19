import React from "react";
import PropTypes from "prop-types";
import { theme } from "./theme";

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
      className={`group bg-white ${theme.radius.xl} ${theme.shadows.sm} hover:${theme.shadows.xl} border border-gray-100 overflow-hidden transform transition-all duration-300 hover:-translate-y-1 relative`}
    >
      <div className={`absolute top-0 left-0 w-full h-1 ${theme.colors.gradientPrimaryToAccent} z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />
      <div className="overflow-hidden relative">
        <img
          src={event.image}
          alt={event.title}
          className="h-56 w-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className={`absolute inset-0 ${theme.colors.gradientOverlay} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />
      </div>
      <div className="p-5">
        <h3 className={`text-xl font-bold mb-2 ${theme.colors.primaryText} group-hover:${theme.colors.primaryText} transition-colors duration-300 line-clamp-1`}>{event.title}</h3>
        <p className="text-sm text-yellow-600 font-semibold mb-3 flex items-center gap-1.5">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
          {event.time} | {event.venue}
        </p>
        <p className="text-gray-600 line-clamp-3 text-sm leading-relaxed">{event.detail}</p>
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

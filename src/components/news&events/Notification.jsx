import React, { useEffect, useState } from 'react';
import useAudit from '../../hooks/useAudit';

const Notification = () => {
  const [events, setEvents] = useState([]);
  const audit = useAudit(); // make sure this returns a function!

  useEffect(() => {
    audit?.('[AUDIT] Component Mounted: Notification');

    fetch('/data/notifications.json')
      .then((r) => r.json())
      .then((data) => setEvents(data.notifications)) // ✅ FIXED
      .catch((e) => {
        audit?.(`[AUDIT] Error in Notification: ${e}`);
      });
  }, []);

  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-3xl font-semibold mb-8 text-gray-900">
        Notifications
      </h1>

      <ul className="space-y-6">
        {events.map((e) => (
          <li
            key={e.id}
            className="flex flex-col bg-white rounded-md border-l-4 border-blue-500 p-4 hover:shadow-md transition-shadow"
          >
            <h2 className="font-bold text-lg text-gray-900">{e.title}</h2>

            <div className="flex items-center mt-2 text-sm text-gray-500 space-x-2">
              <span>📅 {e.date} • ⏰ {e.time} • 📍 {e.venue}</span>
            </div>

            <p className="text-gray-700 mt-3">{e.description}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Notification;
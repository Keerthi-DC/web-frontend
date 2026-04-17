import React, { useEffect } from 'react';
import useAudit from '../../../hooks/useAudit';
import useNotifications from '../hooks/useNotifications';
import PageContainer from "../components/ui/PageContainer";
import SectionTitle from "../components/ui/SectionTitle";

const Notification = () => {
  const { notifications: events, loading, error } = useNotifications(); // make sure this returns a function!
  const audit = useAudit(); // make sure this returns a function!

  useEffect(() => {
    audit?.('[AUDIT] Component Mounted: Notification');
  }, []);

  if (loading) return null;
  if (error) {
    audit?.(`[AUDIT] Error in Notification: ${error}`);
  }

  return (
    <PageContainer>
      <SectionTitle>Notifications</SectionTitle>

      <div className="container mx-auto py-8 px-4">
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
    </PageContainer>
  );
};

export default Notification;
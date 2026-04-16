import { useEffect, useState } from "react";
import { graphqlRequest } from "../../services/graphql";

const mockData = [
  {
    id: 1,
    title: "Tech Innovation Summit",
    image: "https://picsum.photos/seed/event1/600/400",
    detail:
      "Join industry leaders and students to explore the latest innovations in AI and robotics.",
    venue: "Main Auditorium",
    time: "2026-04-12 10:00 AM",
    scope: "institute",
    department: null,
  },
  // keep rest SAME
];

const useEvents = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const query = `
    query ListEvents {
      listEvents {
        id
        title
        image
        detail
        venue
        time
        scope
        department
      }
    }
  `;

  const fetchEvents = async () => {
    try {
      const res = await graphqlRequest(query);

      if (res?.data?.listEvents) {
        setEvents(res.data.listEvents);
      } else {
        setEvents(mockData);
      }
    } catch (err) {
      setError(err);
      setEvents(mockData);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  return {
    events,
    loading,
    error,
    refetch: fetchEvents,
    isEmpty: events.length === 0,
  };
};

export default useEvents;
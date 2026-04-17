import { useEffect, useState } from "react";
import { graphqlRequest } from "../../../services/graphql"; // adjust path
import { LIST_EVENTS } from "../graphql/queries";
const mockData = [
  {
    "id": 1,
    "title": "Tech Innovation Summit",
    "image": "https://picsum.photos/seed/event1/600/400",
    "detail": "Join industry leaders and students to explore the latest innovations in AI and robotics.",
    "venue": "Main Auditorium",
    "time": "2026-04-12 10:00 AM",
    "scope": "institute",
    "department": null
  },
  {
    "id": 2,
    "title": "AI Ethics Workshop",
    "image": "https://picsum.photos/seed/event2/600/400",
    "detail": "A hands‑on workshop discussing ethical considerations in AI deployment across sectors.",
    "venue": "Room 204",
    "time": "2026-04-14 02:00 PM",
    "scope": "institute",
    "department": null
  },
  {
    "id": 3,
    "title": "Quantum Computing Expo",
    "image": "https://picsum.photos/seed/event3/600/400",
    "detail": "Discover breakthroughs in quantum hardware and software showcased by leading research labs.",
    "venue": "Hall B",
    "time": "2026-04-18 09:00 AM",
    "scope": "institute",
    "department": null
  },
  {
    "id": 4,
    "title": "Robotics Demo Day",
    "image": "https://picsum.photos/seed/event4/600/400",
    "detail": "Live demonstrations of autonomous robots in manufacturing and assistive contexts.",
    "venue": "Lab A",
    "time": "2026-04-22 11:30 AM",
    "scope": "institute",
    "department": null
  },
  {
    "id": 5,
    "title": "Future of Education Conference",
    "image": "https://picsum.photos/seed/event5/600/400",
    "detail": "Panel discussion on integrating technology into curricula for next‑generation learners.",
    "venue": "Conference Center",
    "time": "2026-04-25 01:00 PM",
    "scope": "institute",
    "department": null
  },
  {
    "id": 6,
    "title": "Campus Leadership Forum",
    "image": "https://picsum.photos/seed/event6/600/400",
    "detail": "Student leaders share insights on campus governance and student services.",
    "venue": "Student Union",
    "time": "2026-04-28 03:00 PM",
    "scope": "institute",
    "department": null
  },
  {
    "id": 7,
    "title": "Biotech Innovation Lecture",
    "image": "https://picsum.photos/seed/event7/600/400",
    "detail": "Exploring cutting‑edge biotechnology research and its societal impact.",
    "venue": "Lab C",
    "time": "2026-05-02 10:30 AM",
    "scope": "institute",
    "department": null
  },
  {
    "id": 8,
    "title": "Digital Marketing Summit",
    "image": "https://picsum.photos/seed/event8/600/400",
    "detail": "Network with marketing professionals and learn newest digital campaign strategies.",
    "venue": "Auditorium A",
    "time": "2026-05-05 02:00 PM",
    "scope": "institute",
    "department": null
  },
  {
    "id": 9,
    "title": "Sustainability Hackathon",
    "image": "https://picsum.photos/seed/event9/600/400",
    "detail": "Team up to design tech solutions for real‑world sustainability challenges.",
    "venue": "Innovation Hub",
    "time": "2026-05-08 08:00 AM",
    "scope": "institute",
    "department": null
  },
  {
    "id": 10,
    "title": "Startup Pitch Night",
    "image": "https://picsum.photos/seed/event10/600/400",
    "detail": "Pitch your startup ideas to investors and industry mentors.",
    "venue": "Main Hall",
    "time": "2026-05-12 04:00 PM",
    "scope": "institute",
    "department": null
  },
  {
    "id": 11,
    "title": "CSE Hackathon",
    "image": "https://picsum.photos/seed/event11/600/400",
    "detail": "24 hour coding competition.",
    "venue": "CSE Lab",
    "time": "2026-05-20 09:00 AM",
    "scope": "department",
    "department": "cse"
  },
  {
    "id": 12,
    "title": "AI Research Talk",
    "image": "https://picsum.photos/seed/event12/600/400",
    "detail": "Talk on recent AI research by CSE faculty.",
    "venue": "Seminar Hall",
    "time": "2026-05-25 02:00 PM",
    "scope": "department",
    "department": "cse"
  }
];

const useEvents = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const query = LIST_EVENTS;

  const fetchEvents = async () => {
    try {
      const res = await graphqlRequest(query);

      if (res?.data?.listEvents) {
        setEvents(res.data.listEvents);
      } else {
        setEvents(mockData); // fallback
      }
    } catch (err) {
      setError(err);
      setEvents(mockData); // fallback
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  return { events, loading, error, refetch: fetchEvents };
};

export default useEvents;
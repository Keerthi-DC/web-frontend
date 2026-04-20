

const mockData = [
  {
    "id": 1,
    "title": "Tech Innovation Summit",
    "image": "https://loremflickr.com/600/400/college,university?random=471",
    "detail": "Join industry leaders and students to explore the latest innovations in AI and robotics.",
    "venue": "Main Auditorium",
    "time": "2026-04-12 10:00 AM",
    "scope": "institute",
    "department": null
  },
  {
    "id": 2,
    "title": "AI Ethics Workshop",
    "image": "https://loremflickr.com/600/400/college,university?random=194",
    "detail": "A hands‑on workshop discussing ethical considerations in AI deployment across sectors.",
    "venue": "Room 204",
    "time": "2026-04-14 02:00 PM",
    "scope": "institute",
    "department": null
  },
  {
    "id": 3,
    "title": "Quantum Computing Expo",
    "image": "https://loremflickr.com/600/400/college,university?random=14",
    "detail": "Discover breakthroughs in quantum hardware and software showcased by leading research labs.",
    "venue": "Hall B",
    "time": "2026-04-18 09:00 AM",
    "scope": "institute",
    "department": null
  },
  {
    "id": 4,
    "title": "Robotics Demo Day",
    "image": "https://loremflickr.com/600/400/college,university?random=41",
    "detail": "Live demonstrations of autonomous robots in manufacturing and assistive contexts.",
    "venue": "Lab A",
    "time": "2026-04-22 11:30 AM",
    "scope": "institute",
    "department": null
  },
  {
    "id": 5,
    "title": "Future of Education Conference",
    "image": "https://loremflickr.com/600/400/college,university?random=536",
    "detail": "Panel discussion on integrating technology into curricula for next‑generation learners.",
    "venue": "Conference Center",
    "time": "2026-04-25 01:00 PM",
    "scope": "institute",
    "department": null
  },
  {
    "id": 6,
    "title": "Campus Leadership Forum",
    "image": "https://loremflickr.com/600/400/college,university?random=435",
    "detail": "Student leaders share insights on campus governance and student services.",
    "venue": "Student Union",
    "time": "2026-04-28 03:00 PM",
    "scope": "institute",
    "department": null
  },
  {
    "id": 7,
    "title": "Biotech Innovation Lecture",
    "image": "https://loremflickr.com/600/400/college,university?random=726",
    "detail": "Exploring cutting‑edge biotechnology research and its societal impact.",
    "venue": "Lab C",
    "time": "2026-05-02 10:30 AM",
    "scope": "institute",
    "department": null
  },
  {
    "id": 8,
    "title": "Digital Marketing Summit",
    "image": "https://loremflickr.com/600/400/college,university?random=733",
    "detail": "Network with marketing professionals and learn newest digital campaign strategies.",
    "venue": "Auditorium A",
    "time": "2026-05-05 02:00 PM",
    "scope": "institute",
    "department": null
  },
  {
    "id": 9,
    "title": "Sustainability Hackathon",
    "image": "https://loremflickr.com/600/400/college,university?random=824",
    "detail": "Team up to design tech solutions for real‑world sustainability challenges.",
    "venue": "Innovation Hub",
    "time": "2026-05-08 08:00 AM",
    "scope": "institute",
    "department": null
  },
  {
    "id": 10,
    "title": "Startup Pitch Night",
    "image": "https://loremflickr.com/600/400/college,university?random=129",
    "detail": "Pitch your startup ideas to investors and industry mentors.",
    "venue": "Main Hall",
    "time": "2026-05-12 04:00 PM",
    "scope": "institute",
    "department": null
  },
  {
    "id": 11,
    "title": "CSE Hackathon",
    "image": "https://loremflickr.com/600/400/college,university?random=111",
    "detail": "24 hour coding competition.",
    "venue": "CSE Lab",
    "time": "2026-05-20 09:00 AM",
    "scope": "department",
    "department": "cse"
  },
  {
    "id": 12,
    "title": "AI Research Talk",
    "image": "https://loremflickr.com/600/400/college,university?random=263",
    "detail": "Talk on recent AI research by CSE faculty.",
    "venue": "Seminar Hall",
    "time": "2026-05-25 02:00 PM",
    "scope": "department",
    "department": "cse"
  }
];

const useEvents = () => {
  return { events: mockData, loading: false, error: null, refetch: () => {} };
};

export default useEvents;
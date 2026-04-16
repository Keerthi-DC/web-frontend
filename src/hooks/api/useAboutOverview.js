import { useState } from "react";

const mockData = {
  hero: {
    label: "Established 1958",
    title: "Bapuji Educational Association",
    subtitle:
      "Nurturing minds and shaping futures through a legacy of academic excellence and social commitment.",
    image: "https://picsum.photos/800/500",
  },

  growth: {
    title: "A Tradition of Growth",
    items: [
      {
        icon: "school",
        title: "45+ Institutions",
        description:
          "From primary schools to postgraduate centers of excellence.",
      },
      {
        icon: "trending_up",
        title: "Nursery to PG",
        description:
          "Providing a continuous educational journey across all disciplines.",
      },
      {
        icon: "medical_services",
        title: "Healthcare Excellence",
        description:
          "Pioneering medical, dental, nursing, and pharmacy education.",
      },
    ],
  },

  leadership: {
    role: "Chairman",
    name: "Dr. Shamanur Shivashankarappa",
    quote:
      "Education is not just about earning degrees; it's about building character.",
    description:
      "A visionary leader and statesman transforming Davangere.",
    image: "https://picsum.photos/400/300",
  },

  anthem: {
    title: "BEA Anthem",
    lines: [
      "Knowledge is Power",
      "Lighting the torch of wisdom",
      "Building a nation",
    ],
  },

  governingCouncil: [
    {
      name: "Sri. A.C. Jayanna",
      role: "President",
      image: "https://picsum.photos/200",
    },
    {
      name: "Sri. S.S. Bakkesh",
      role: "Vice President",
      image: "https://picsum.photos/201",
    },
  ],

  davangere: {
    title: "About Davangere",
    description: "Educational hub of Karnataka.",
    image: "https://picsum.photos/600/400",
  },
};

const useAboutOverview = () => {
  const [data] = useState(mockData);
  const [loading] = useState(false);
  const [error] = useState(null);

  return { data, loading, error };
};

export default useAboutOverview;
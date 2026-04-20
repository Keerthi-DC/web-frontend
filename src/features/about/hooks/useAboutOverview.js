import { useState } from "react";

const mockData = {
  hero: {
    label: "Established 1958",
    title: "Bapuji Educational Association",
    subtitle:
      "Nurturing minds and shaping futures through a legacy of academic excellence and social commitment.",
    image: "https://loremflickr.com/800/500/college,university?random=937",
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
    image: "https://loremflickr.com/400/300/college,university?random=937",
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
      image: "https://loremflickr.com/200/200/headshot,portrait?random=812",
    },
    {
      name: "Sri. S.S. Bakkesh",
      role: "Vice President",
      image: "https://loremflickr.com/200/200/headshot,portrait?random=813",
    },
  ],

  davangere: {
    title: "About Davangere",
    description: "Educational hub of Karnataka.",
    image: "https://loremflickr.com/600/400/college,university?random=937",
  },
};

export const useAboutOverview = () => {
  const [data] = useState(mockData);
  const [loading] = useState(false);
  const [error] = useState(null);

  return { data, loading, error };
};

export default useAboutOverview;
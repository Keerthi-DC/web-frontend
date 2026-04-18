import { useQuery } from "@apollo/client/react";
import { LIST_NEWS } from "../graphql/queries";

const mockNews = [
  {
    id: 1,
    date: "2026-03-01",
    title: "New Research Center Opens",
    image: "https://picsum.photos/seed/1/800/500",
    details: "The institute today inaugurated its state‑of‑the‑art research & development center, featuring advanced laboratories for AI and materials science."
  },
  {
    id: 2,
    date: "2026-02-20",
    title: "Alumni Meetup 2026",
    image: "https://picsum.photos/seed/2/800/500",
    details: "Last week, the institute hosted its annual alumni meetup, gathering former students and faculty to discuss future collaborations."
  },
  {
    id: 3,
    date: "2026-02-05",
    title: "Admissions Open for Fall 2026",
    image: "https://picsum.photos/seed/3/800/500",
    details: "Applications are now accepted for the Fall 2026 academic year across all undergraduate and postgraduate programs."
  },
  {
    id: 4,
    date: "2026-01-28",
    title: "New Scholarship Program",
    image: "https://picsum.photos/seed/4/800/500",
    details: "The institute has launched a new scholarship scheme aimed at supporting students from underrepresented regions."
  },
  {
    id: 5,
    date: "2026-01-15",
    title: "Tech Conference 2026",
    image: "https://picsum.photos/seed/5/800/500",
    details: "International tech conference hosted by the institute showcased next‑generation AI solutions."
  }
];

const useNews = () => {
  return { news: mockNews, loading: false, error: null, refetch: () => {} };
};

export default useNews;
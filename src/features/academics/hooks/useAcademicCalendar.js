import { useEffect, useState, useMemo } from "react";
import { graphqlRequest } from "../../../services/graphql";
import { LIST_ACADEMIC_CALENDAR } from "../graphql/queries";

const mockData = [
  {
    id: 1,
    title: "Jan - May 2026",
    year: 2026,
    semester: "Even",
    version: "Version 1",
    category: "current",
    pdf: "/pdfs/calendar/jan-may-2026-v1.pdf",
  },
  {
    id: 2,
    title: "Jul - Nov 2026",
    year: 2026,
    semester: "Odd",
    version: "Version 1",
    category: "current",
    pdf: "/pdfs/calendar/jul-nov-2026-v1.pdf",
  },
  {
    id: 3,
    title: "Jan - May 2025",
    year: 2025,
    semester: "Even",
    version: "Version 2",
    category: "current",
    pdf: "/pdfs/calendar/jan-may-2025-v2.pdf",
  },
  {
    id: 4,
    title: "Jul - Nov 2025",
    year: 2025,
    semester: "Odd",
    version: "Version 1",
    category: "current",
    pdf: "/pdfs/calendar/jul-nov-2025-v1.pdf",
  },
  {
    id: 5,
    title: "Jan - May 2024",
    year: 2024,
    semester: "Even",
    version: "",
    category: "historical",
    pdf: "/pdfs/calendar/jan-may-2024.pdf",
  },
  {
    id: 6,
    title: "Jul - Nov 2024",
    year: 2024,
    semester: "Odd",
    version: "",
    category: "historical",
    pdf: "/pdfs/calendar/jul-nov-2024.pdf",
  },
  {
    id: 7,
    title: "Jul - Nov 2023",
    year: 2023,
    semester: "Odd",
    version: "",
    category: "historical",
    pdf: "/pdfs/calendar/jul-nov-2023.pdf",
  },
  {
    id: 8,
    title: "Jan - May 2023",
    year: 2023,
    semester: "Even",
    version: "",
    category: "historical",
    pdf: "/pdfs/calendar/jan-may-2023.pdf",
  },
  {
    id: 9,
    title: "Jul - Nov 2022",
    year: 2022,
    semester: "Odd",
    version: "Version 3",
    category: "historical",
    pdf: "/pdfs/calendar/jul-nov-2022-v3.pdf",
  },
  {
    id: 10,
    title: "Jan - May 2022",
    year: 2022,
    semester: "Even",
    version: "",
    category: "historical",
    pdf: "/pdfs/calendar/jan-may-2022.pdf",
  },
];

const useAcademicCalendar = () => {
  const [entries, setEntries] = useState([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");
  const [yearFilter, setYearFilter] = useState("All");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await graphqlRequest(LIST_ACADEMIC_CALENDAR);
        const data = res?.data?.listAcademicCalendar?.items;

        setEntries(Array.isArray(data) && data.length ? data : mockData);
      } catch {
        setEntries(mockData);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const years = useMemo(() => {
    return [...new Set(entries.map((e) => e.year))].sort((a, b) => b - a);
  }, [entries]);

  const filtered = useMemo(() => {
    return entries.filter((entry) => {
      const matchesSearch = entry.title
        .toLowerCase()
        .includes(search.toLowerCase());

      const matchesYear =
        yearFilter === "All" || entry.year.toString() === yearFilter;

      return matchesSearch && matchesYear;
    });
  }, [entries, search, yearFilter]);

  return {
    loading,
    search,
    setSearch,
    yearFilter,
    setYearFilter,
    years,
    currentEntries: filtered.filter((e) => e.category === "current"),
    historicalEntries: filtered.filter((e) => e.category === "historical"),
  };
};

export default useAcademicCalendar;
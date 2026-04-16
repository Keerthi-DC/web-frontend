import { useEffect, useState, useMemo } from "react";
import { graphqlRequest } from "../../services/graphql"; // adjust path

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
  // keep ALL your mock data SAME
];

const useAcademicCalendar = () => {
  const [entries, setEntries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [search, setSearch] = useState("");
  const [yearFilter, setYearFilter] = useState("All");

  const query = `
    query ListAcademicCalendar {
      listAcademicCalendar {
        id
        title
        year
        semester
        version
        category
        pdf
      }
    }
  `;

  const fetchCalendar = async () => {
    try {
      const res = await graphqlRequest(query);

      if (res?.data?.listAcademicCalendar) {
        setEntries(res.data.listAcademicCalendar);
      } else {
        setEntries(mockData); // fallback
      }
    } catch (err) {
      setError(err);
      setEntries(mockData); // fallback
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCalendar();
  }, []);

  // ✅ KEEP YOUR EXISTING LOGIC (this is GOOD)

  const years = useMemo(() => {
    const set = new Set(entries.map((e) => e.year));
    return Array.from(set).sort((a, b) => b - a);
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

  const currentEntries = filtered.filter(
    (e) => e.category === "current"
  );

  const historicalEntries = filtered.filter(
    (e) => e.category === "historical"
  );

  return {
    entries,
    loading,
    error,
    refetch: fetchCalendar,

    search,
    setSearch,
    yearFilter,
    setYearFilter,

    years,
    currentEntries,
    historicalEntries,
  };
};

export default useAcademicCalendar;
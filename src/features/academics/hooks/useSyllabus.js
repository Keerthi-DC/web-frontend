import { useEffect, useState, useMemo } from "react";
import { graphqlRequest } from "../../../services/graphql";
import { LIST_SYLLABUS } from "../graphql/queries";

/* ✅ MOCK FALLBACK */
const mockData = [
  {
    id: 1,
    department: "Computer Science",
    program: "B.Tech",
    semester: "Semester 1",
    regulation: "2019",
    year: 2025,
    document: "/pdfs/cs_btech_sem1_2019.pdf",
  },
];

const useSyllabus = () => {
  const [syllabus, setSyllabus] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [search, setSearch] = useState("");
  const [programFilter, setProgramFilter] = useState("All");
  const [semesterFilter, setSemesterFilter] = useState("All");
  const [yearFilter, setYearFilter] = useState("All");

  const fetchSyllabus = async () => {
    try {
      const res = await graphqlRequest(LIST_SYLLABUS);

      const data = res?.data?.listSyllabus;

      setSyllabus(data?.length ? data : mockData);
    } catch (err) {
      console.warn("⚠️ Syllabus fallback used");
      setSyllabus(mockData);
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSyllabus();
  }, []);

  /* ✅ FILTER OPTIONS */
  const programs = useMemo(
    () => ["All", ...new Set(syllabus.map((s) => s.program))],
    [syllabus]
  );

  const semesters = useMemo(
    () => ["All", ...new Set(syllabus.map((s) => s.semester))],
    [syllabus]
  );

  const years = useMemo(
    () => ["All", ...new Set(syllabus.map((s) => s.year))],
    [syllabus]
  );

  /* ✅ FILTER LOGIC */
  const filteredSyllabus = useMemo(() => {
    return syllabus.filter((item) => {
      const matchSearch =
        item.department.toLowerCase().includes(search.toLowerCase());

      const matchProgram =
        programFilter === "All" || item.program === programFilter;

      const matchSemester =
        semesterFilter === "All" || item.semester === semesterFilter;

      const matchYear =
        yearFilter === "All" || item.year === yearFilter;

      return (
        matchSearch &&
        matchProgram &&
        matchSemester &&
        matchYear
      );
    });
  }, [syllabus, search, programFilter, semesterFilter, yearFilter]);

  return {
    syllabus,
    loading,
    error,
    refetch: fetchSyllabus,

    filteredSyllabus,

    search,
    setSearch,

    programFilter,
    setProgramFilter,

    semesterFilter,
    setSemesterFilter,

    yearFilter,
    setYearFilter,

    programs,
    semesters,
    years,
  };
};

export default useSyllabus;
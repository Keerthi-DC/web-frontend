import { useEffect, useState, useMemo } from "react";
import { graphqlRequest } from "../../services/graphql"; // adjust path

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
  // keep rest SAME
];

const useSyllabus = () => {
  const [syllabus, setSyllabus] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [search, setSearch] = useState("");
  const [programFilter, setProgramFilter] = useState("All");
  const [semesterFilter, setSemesterFilter] = useState("All");
  const [yearFilter, setYearFilter] = useState("All");

  const query = `
    query ListSyllabus {
      listSyllabus {
        id
        department
        program
        semester
        regulation
        year
        document
      }
    }
  `;

  const fetchSyllabus = async () => {
    try {
      const res = await graphqlRequest(query);

      if (res?.data?.listSyllabus) {
        setSyllabus(res.data.listSyllabus);
      } else {
        setSyllabus(mockData); // fallback
      }
    } catch (err) {
      setError(err);
      setSyllabus(mockData); // fallback
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSyllabus();
  }, []);

  // ✅ KEEP ALL YOUR EXISTING LOGIC BELOW

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

  const filteredSyllabus = useMemo(() => {
    return syllabus.filter((item) => {
      const matchSearch =
        item.department.toLowerCase().includes(search.toLowerCase()) ||
        item.code?.toLowerCase().includes(search.toLowerCase());

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
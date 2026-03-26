import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDepartmentMeta } from "../../../hooks/useDepartmentMeta";

export default function CoursesPage() {
  const { shortName } = useParams();
  const { getId, isReady } = useDepartmentMeta();

  const [courses, setCourses] = useState({ items: [] });
  const [filteredCourses, setFilteredCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // 🔥 Filters
  const [search, setSearch] = useState("");
  const [level, setLevel] = useState(""); // UG / PG
  const [semester, setSemester] = useState("");

  // ================= FETCH =================
  useEffect(() => {
    if (!shortName || !isReady) return;

    const fetchCourses = async () => {
      try {
        setLoading(true);

        const deptId = getId(shortName);

        const res = await fetch(import.meta.env.VITE_APPSYNC_URL, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "x-api-key": import.meta.env.VITE_APPSYNC_API_KEY,
          },
          body: JSON.stringify({
            query: `
              query ($deptId: ID!, $tenantId: ID!) {
                listDeptCourses(deptId: $deptId, tenantId: $tenantId) {
                  items {
                    code
                    name
                    semester
                    credits
                    type
                    scheme
                  }
                }
              }
            `,
            variables: {
              deptId,
              tenantId: "biet-college",
            },
          }),
        });

        const { data, errors } = await res.json();
        if (errors) throw new Error(errors[0].message);

        const items = data?.listDeptCourses?.items || [];

        setCourses({ items });
        setFilteredCourses(items);

      } catch (err) {
        setError(err.toString());
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, [shortName, isReady]);

  // ================= FILTER LOGIC =================
  useEffect(() => {
    let temp = [...courses.items];

    // 🔍 Search
    if (search) {
      temp = temp.filter(
        (c) =>
          c.name.toLowerCase().includes(search.toLowerCase()) ||
          c.code.toLowerCase().includes(search.toLowerCase())
      );
    }

    // 🎓 UG / PG filter (based on scheme)
    if (level) {
      temp = temp.filter((c) =>
        c.scheme?.toLowerCase().includes(level.toLowerCase())
      );
    }

    // 📚 Semester filter
    if (semester) {
      temp = temp.filter(
        (c) => String(c.semester) === String(semester)
      );
    }

    setFilteredCourses(temp);
  }, [search, level, semester, courses]);

  if (loading)
    return <div className="text-center py-20">Loading courses…</div>;

  if (error)
    return (
      <div className="text-center text-red-600 py-20">{error}</div>
    );

  return (
  <section className="max-w-7xl mx-auto px-6 pt-6 pb-16">

    <div className="grid md:grid-cols-4 gap-10 items-start">

      {/* ================= FILTER PANEL ================= */}
      <div className="bg-white p-6 rounded-xl shadow-md h-fit sticky top-24 mt-14">
        <h2 className="text-lg font-semibold mb-5 border-b pb-2">
          Filters
        </h2>

        {/* 🎓 Level */}
        <div className="mb-5">
          <p className="text-sm font-medium mb-2">Level</p>
          <select
            value={level}
            onChange={(e) => setLevel(e.target.value)}
            className="w-full border px-3 py-2 rounded"
          >
            <option value="">All</option>
            <option value="ug">UG</option>
            <option value="pg">PG</option>
          </select>
        </div>

        {/* 📚 Semester */}
        <div>
          <p className="text-sm font-medium mb-2">Semester</p>
          <select
            value={semester}
            onChange={(e) => setSemester(e.target.value)}
            className="w-full border px-3 py-2 rounded"
          >
            <option value="">All</option>
            {[1,2,3,4,5,6,7,8].map((sem) => (
              <option key={sem} value={sem}>
                Semester {sem}
              </option>
            ))}
          </select>
        </div>

      </div>

      {/* ================= COURSES ================= */}
      <div className="md:col-span-3">

        {/* 🔥 COURSES HEADER */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 gap-4">

          <h2 className="text-4xl font-semibold">
            Courses
          </h2>

          {/* 🔍 SEARCH (NOW PERFECTLY PLACED) */}
          <input
            type="text"
            placeholder="Search courses..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full md:w-80 border px-3 py-2 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

        </div>

        {filteredCourses.length === 0 ? (
          <div className="text-gray-500">No courses found.</div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">

            {filteredCourses.map((c, i) => (
              <div
                key={i}
                className="bg-white border rounded-xl p-5 shadow-sm hover:shadow-lg transition"
              >

                {/* Tags */}
                <div className="flex gap-2 mb-3">
                  <span className="text-xs px-2 py-1 bg-blue-100 text-blue-600 rounded-full">
                    {c.scheme}
                  </span>

                  <span className="text-xs px-2 py-1 bg-green-100 text-green-600 rounded-full capitalize">
                    {c.type}
                  </span>
                </div>

                {/* Title */}
                <h3 className="font-semibold">
                  {c.name}
                </h3>

                {/* Code */}
                <p className="text-sm text-gray-500">
                  {c.code}
                </p>

                {/* Info */}
                <div className="mt-3 text-sm text-gray-600">
                  <p>Semester: {c.semester}</p>
                  <p>Credits: {c.credits}</p>
                </div>

              </div>
            ))}

          </div>
        )}
      </div>

    </div>
  </section>
);
}
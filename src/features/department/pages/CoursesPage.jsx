import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDepartmentMeta } from "../hooks/useDepartmentMeta";
import BietLoader from "../../../components/ui/BietLoader";

export default function CoursesPage() {
  const { shortName } = useParams();
  const { getId, isReady } = useDepartmentMeta();

  const [courses, setCourses] = useState({ items: [] });
  const [filteredCourses, setFilteredCourses] = useState([]);

  // 🔥 Filters (derived from backend data)
  const [filters, setFilters] = useState({
    programTypes: [],
    batches: [],
    types: [],
    semesters: [],
    programs: [],
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // 🔥 Filter state
  const [search, setSearch] = useState("");
  const [programType, setProgramType] = useState("");
  const [batch, setBatch] = useState("");
  const [type, setType] = useState("");
  const [semester, setSemester] = useState("");
  const [program, setProgram] = useState("");

  // ================= FETCH COURSES =================
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
                    programType
                    program
                    batch
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

        // ✅ BUILD FILTERS FROM DATA (SAFE)
        const unique = (key) =>
          [...new Set(items.map((c) => c[key]).filter(Boolean))];

        setFilters({
          programTypes: unique("programType"),
          batches: unique("batch"),
          types: unique("type"),
          semesters: unique("semester"),
          programs: unique("program"),
        });

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
    let temp = [...(courses.items || [])];

    if (search) {
      temp = temp.filter(
        (c) =>
          c.name?.toLowerCase().includes(search.toLowerCase()) ||
          c.code?.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (programType) {
      temp = temp.filter((c) => c.programType === programType);
    }

    if (batch) {
      temp = temp.filter((c) => c.batch === batch);
    }

    if (type) {
      temp = temp.filter((c) => c.type === type);
    }

    if (semester) {
      temp = temp.filter(
        (c) => String(c.semester) === String(semester)
      );
    }

    if (program) {
      temp = temp.filter((c) => c.program === program);
    }

    setFilteredCourses(temp);
  }, [search, programType, batch, type, semester, program, courses]);

  if (loading) return <BietLoader />;

  if (error)
    return (
      <div className="text-center text-red-600 py-20">{error}</div>
    );

  return (
  <section className="max-w-5xl mx-auto px-6 pt-8 pb-16">

    {/* ===== TITLE ===== */}
    <div className="mb-6">
      <h2 className="text-3xl font-extrabold text-[#003178] tracking-tight">
        Academic Catalog
      </h2>
      <p className="text-sm text-gray-500 mt-1">
        Explore sophisticated curriculum tracks.
      </p>
    </div>

    {/* ===== SEARCH ===== */}
    <div className="relative mb-6">
      <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-sm">
        🔍
      </span>
      <input
        type="text"
        placeholder="Search courses or codes..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full bg-[#f3f4f5] border border-gray-200 rounded-xl py-3 pl-10 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-blue-200"
      />
    </div>

    {/* ===== FILTER CHIPS ===== */}
    <div className="flex gap-3 flex-wrap mb-8">

      {[
        { label: "Program Type", value: programType, set: setProgramType, options: filters.programTypes },
        { label: "Program", value: program, set: setProgram, options: filters.programs },
        { label: "Batch", value: batch, set: setBatch, options: filters.batches },
        { label: "Course Type", value: type, set: setType, options: filters.types },
        { label: "Semester", value: semester, set: setSemester, options: filters.semesters },
      ].map((f, i) => (
        <select
          key={i}
          value={f.value}
          onChange={(e) => f.set(e.target.value)}
          className="bg-[#f3f4f5] border border-gray-200 rounded-full px-4 py-2 text-xs font-semibold uppercase tracking-wide text-[#003178]"
        >
          <option value="">{f.label}</option>
          {f.options?.map((opt) => (
            <option key={opt} value={opt}>
              {f.label === "Semester" ? `Sem ${opt}` : opt}
            </option>
          ))}
        </select>
      ))}

    </div>

    {/* ===== COURSES (STACK, NOT GRID) ===== */}
    {filteredCourses.length === 0 ? (
      <div className="text-gray-500">No courses found.</div>
    ) : (
      <div className="space-y-6">

        {filteredCourses.map((c, i) => (
          <div
            key={i}
            className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm"
          >

            {/* TOP */}
            <div className="flex justify-between items-start mb-4">
              <div>
                <span className="text-xs font-bold text-blue-400 uppercase tracking-widest">
                  {c.code}
                </span>
                <h3 className="text-lg font-bold text-[#003178] mt-1">
                  {c.name}
                </h3>
              </div>
              <span className="text-gray-400">🔖</span>
            </div>

            {/* TAGS */}
            <div className="flex gap-2 mb-5 flex-wrap">
              {c.type && (
                <span className="bg-blue-100 text-blue-700 text-[10px] font-bold px-3 py-1 rounded-full uppercase">
                  {c.type}
                </span>
              )}
              {c.batch && (
                <span className="bg-gray-100 text-gray-600 text-[10px] font-bold px-3 py-1 rounded-full uppercase">
                  {c.batch}
                </span>
              )}
              {c.programType && (
                <span className="bg-gray-100 text-gray-600 text-[10px] font-bold px-3 py-1 rounded-full uppercase">
                  {c.programType}
                </span>
              )}
            </div>

            {/* DETAILS */}
            <div className="grid grid-cols-3 border-t pt-4 text-sm">
              <div>
                <p className="text-[10px] text-gray-400 uppercase">Semester</p>
                <p className="font-semibold">Sem {c.semester}</p>
              </div>

              <div>
                <p className="text-[10px] text-gray-400 uppercase">Credits</p>
                <p className="font-semibold">{c.credits}</p>
              </div>

              <div>
                <p className="text-[10px] text-gray-400 uppercase">Program</p>
                <p className="font-semibold">{c.program}</p>
              </div>
            </div>

          </div>
        ))}

      </div>
    )}
  </section>
);}

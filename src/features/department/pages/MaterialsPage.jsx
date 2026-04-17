import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDepartmentMeta } from "../hooks/useDepartmentMeta";

export default function MaterialsPage() {
  const { shortName } = useParams();
  const { getId, isReady } = useDepartmentMeta();

  const [materials, setMaterials] = useState(null);
  const [filteredMaterials, setFilteredMaterials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // 🔥 Filters
  const [search, setSearch] = useState("");
  const [semester, setSemester] = useState("");

  useEffect(() => {
    if (!shortName || !isReady) return;

    const fetchMaterials = async () => {
      try {
        setLoading(true);

        const resolvedDeptId = getId(shortName);

        if (!resolvedDeptId) {
          throw new Error("Department not found");
        }

        const res = await fetch(import.meta.env.VITE_APPSYNC_URL, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "x-api-key": import.meta.env.VITE_APPSYNC_API_KEY,
          },
          body: JSON.stringify({
            query: `
              query ($deptId: ID!, $tenantId: ID!) {
                listLearningMaterials(
                  deptId: $deptId
                  tenantId: $tenantId
                ) {
                  items {
                    title
                    type
                    fileUrl
                    courseName
                    uploadedBy

                  }
                }
              }
            `,
            variables: {
              deptId: resolvedDeptId,
              tenantId: "biet-college",
            },
          }),
        });

        const { data, errors } = await res.json();
        if (errors) throw new Error(errors[0].message);

        const items = data?.listLearningMaterials?.items || [];

        setMaterials({ items });
        setFilteredMaterials(items);

      } catch (err) {
        setError(err.toString());
      } finally {
        setLoading(false);
      }
    };

    fetchMaterials();
  }, [shortName, isReady]);

  // 🔥 FILTER LOGIC
  useEffect(() => {
    let temp = [...(materials?.items || [])];

    // Search
    if (search) {
      temp = temp.filter(
        (m) =>
          m.title.toLowerCase().includes(search.toLowerCase()) ||
          m.courseName?.toLowerCase().includes(search.toLowerCase())
      );
    }

    // Semester (extract from courseName if exists)
    if (semester) {
      temp = temp.filter((m) =>
        m.courseName?.toLowerCase().includes(`sem ${semester}`)
      );
    }

    setFilteredMaterials(temp);
  }, [search, semester, materials]);

  if (loading)
    return <div className="text-center py-20">Loading materials…</div>;

  if (error)
    return (
      <div className="text-center text-red-600 py-20">{error}</div>
    );

  return (
    <section className="max-w-7xl mx-auto px-6 pt-6 pb-16">

      {/* HEADER (same as Courses) */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8 gap-4">
        <h2 className="text-4xl font-semibold">Materials</h2>

        <input
          type="text"
          placeholder="Search materials..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full md:w-80 border px-3 py-2 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div className="grid md:grid-cols-4 gap-10 items-start">

        {/* FILTER PANEL */}
        <div className="bg-white p-6 rounded-xl shadow-md h-fit sticky top-24">
          <h2 className="text-lg font-semibold mb-5 border-b pb-2">
            Filters
          </h2>

          {/* Semester */}
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

        {/* MATERIALS GRID */}
        <div className="md:col-span-3">

          {filteredMaterials.length === 0 ? (
            <div className="text-gray-500">No materials found.</div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">

              {filteredMaterials.map((m, i) => (
                <div
                  key={i}
                  className="bg-white border rounded-xl p-5 shadow-sm hover:shadow-lg transition"
                >

                  {/* TYPE */}
                  <div className="flex gap-2 mb-3">
                    <span className="text-xs px-2 py-1 bg-green-100 text-green-600 rounded-full">
                      {m.type}
                    </span>
                  </div>

                  {/* TITLE */}
                  <h3 className="font-semibold">
                    {m.title}
                  </h3>

                  {/* COURSE */}
                  <p className="text-sm text-gray-500">
                    {m.courseName}
                  </p>

                  {/* UPLOADER */}
                  <p className="text-xs text-gray-400 mt-1">
                    Uploaded by: {m.uploadedBy}
                  </p>

                  {/* LINK */}
                  <a
                    href={m.fileUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block mt-4 text-blue-600 text-sm font-medium"
                  >
                    View Material →
                  </a>

                </div>
              ))}

            </div>
          )}
        </div>

      </div>
    </section>
  );
}

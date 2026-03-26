import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDepartmentMeta } from "../../../hooks/useDepartmentMeta";

export default function CoursesPage() {
  const { shortName } = useParams();
  const { getId, isReady } = useDepartmentMeta();

  const [courses, setCourses] = useState({ items: [] });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!shortName || !isReady) return;

    const fetchCourses = async () => {
      try {
        setLoading(true);

        // ✅ Resolve deptId dynamically
        const deptId = getId(shortName);
        console.log("Resolved deptId:", deptId);

        if (!deptId) {
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
                listDeptCourses(
                  deptId: $deptId
                  tenantId: $tenantId
                ) {
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

        console.log("Courses:", items);

        setCourses({ items });

      } catch (err) {
        setError(err.toString());
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, [shortName, isReady]);

  if (loading)
    return <div className="text-center py-20">Loading courses…</div>;

  if (error)
    return (
      <div className="text-center text-red-600 py-20">{error}</div>
    );

  return (
    <section>
      <h2 className="text-2xl font-semibold mb-6">Courses</h2>

      {courses.items.length === 0 ? (
        <div className="text-gray-500">No courses found.</div>
      ) : (
        <div className="grid md:grid-cols-2 gap-6">
          {courses.items.map((c, i) => (
            <div
              key={i}
              className="bg-white shadow-md p-6 rounded-xl border"
            >
              <h3 className="font-bold text-lg">{c.name}</h3>

              <div className="flex justify-between mt-2 text-sm text-gray-500">
                <span>{c.code}</span>
                <span>Sem {c.semester}</span>
              </div>

              <div className="flex justify-between mt-3 items-center">
                <span className="text-sm">Credits: {c.credits}</span>
                <span className="text-xs text-gray-400">{c.scheme}</span>
                <span className="px-3 py-1 bg-blue-100 text-blue-600 text-xs rounded-full">
                  {c.type}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
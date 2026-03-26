import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDepartmentMeta } from "../../../hooks/useDepartmentMeta";

export default function MaterialsPage() {
  const { shortName } = useParams(); // ✅ same as DepartmentHome
  const { getId, isReady } = useDepartmentMeta();

  const [deptId, setDeptId] = useState(null);
  const [materials, setMaterials] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!shortName || !isReady) return;

    const fetchMaterials = async () => {
      try {
        setLoading(true);

        // ✅ Resolve deptId dynamically
        const resolvedDeptId = getId(shortName);
        console.log("Resolved deptId:", resolvedDeptId);

        if (!resolvedDeptId) {
          throw new Error("Department not found");
        }

        setDeptId(resolvedDeptId);

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
              deptId: resolvedDeptId, // ✅ FIXED
              tenantId: "biet-college",
            },
          }),
        });

        const { data, errors } = await res.json();
        if (errors) throw new Error(errors[0].message);

        setMaterials(data.listLearningMaterials);
      } catch (err) {
        setError(err.toString());
      } finally {
        setLoading(false);
      }
    };

    fetchMaterials();
  }, [shortName, isReady]);

  if (loading)
    return <div className="text-center py-20">Loading materials…</div>;

  if (error)
    return (
      <div className="text-center text-red-600 py-20">{error}</div>
    );

  return (
    <section>
      <h2 className="text-2xl font-semibold mb-6">
        Learning Materials
      </h2>

      <div className="grid md:grid-cols-2 gap-6">
        {materials?.items?.map((m, i) => (
          <div
            key={i}
            className="bg-white shadow-md p-6 rounded-xl border"
          >
            <h3>{m.title}</h3>
            <p className="text-sm text-gray-500">
              {m.courseName}
            </p>

            <div className="flex justify-between mt-4">
              <span className="text-xs text-green-600">
                {m.type}
              </span>
              <span className="text-xs text-gray-400">
                {m.uploadedBy}
              </span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
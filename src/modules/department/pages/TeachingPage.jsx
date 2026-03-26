import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDepartmentMeta } from "../../../hooks/useDepartmentMeta";

export default function TeachingPage() {
  const { shortName } = useParams();
  const { getId, isReady } = useDepartmentMeta();

  const [teaching, setTeaching] = useState({ items: [] });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!shortName || !isReady) return;

    const fetchTeaching = async () => {
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
                listInnovativeTeaching(
                  deptId: $deptId
                  tenantId: $tenantId
                ) {
                  items {
                    facultyName
                    method
                    description
                    courseApplied
                    year
                    outcome
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

        const items = data?.listInnovativeTeaching?.items || [];

        console.log("Teaching Data:", items);

        setTeaching({ items });

      } catch (err) {
        setError(err.toString());
      } finally {
        setLoading(false);
      }
    };

    fetchTeaching();
  }, [shortName, isReady]);

  if (loading)
    return <div className="text-center py-20">Loading teaching…</div>;

  if (error)
    return (
      <div className="text-center text-red-600 py-20">{error}</div>
    );

  return (
    <section>
      <h2 className="text-2xl font-semibold mb-6">
        Innovative Teaching
      </h2>

      {teaching.items.length === 0 ? (
        <div className="text-gray-500">
          No innovative teaching records found.
        </div>
      ) : (
        teaching.items.map((t, i) => (
          <div
            key={i}
            className="bg-white shadow-md p-6 rounded-xl border m-4"
          >
            <h3 className="font-medium">
              {t.facultyName} – {t.method}
            </h3>

            <p className="text-sm text-gray-600">
              {t.courseApplied} ({t.year})
            </p>

            <p className="mt-2 text-blue-700">
              {t.description}
            </p>

            <p className="mt-2 text-green-500 text-sm">
              Outcome: {t.outcome}
            </p>
          </div>
        ))
      )}
    </section>
  );
}
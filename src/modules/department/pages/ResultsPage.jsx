import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDepartmentMeta } from "../../../hooks/useDepartmentMeta";

export default function ResultsPage() {
  const { shortName } = useParams();
  const { getId, isReady } = useDepartmentMeta();

  const [results, setResults] = useState({ items: [] });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!shortName || !isReady) return;

    const fetchResults = async () => {
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
                listResultAnalyses(
                  deptId: $deptId
                  tenantId: $tenantId
                ) {
                  items {
                    title
                    semester
                    batch
                    pdfUrl
                    graphImageUrl
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

        const items = data?.listResultAnalyses?.items || [];

        console.log("Results Data:", items);

        setResults({ items });

      } catch (err) {
        setError(err.toString());
      } finally {
        setLoading(false);
      }
    };

    fetchResults();
  }, [shortName, isReady]);

  if (loading)
    return <div className="text-center py-20">Loading results…</div>;

  if (error)
    return (
      <div className="text-center text-red-600 py-20">{error}</div>
    );

  return (
    <section>
      <h2 className="text-2xl font-semibold mb-6">
        Result Analyses
      </h2>

      {results.items.length === 0 ? (
        <div className="text-gray-500">
          No results available.
        </div>
      ) : (
        results.items.map((r, i) => (
          <div key={i} className="border-b py-4">
            <h3 className="font-medium">
              {r.title} – {r.semester} ({r.batch})
            </h3>

            <p className="text-sm text-gray-600">
              PDF:{" "}
              <a
                href={r.pdfUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 underline"
              >
                View
              </a>
            </p>

            {r.graphImageUrl && (
              <p className="mt-2">
                Graph:
                <img
                  src={r.graphImageUrl}
                  alt="Graph"
                  className="h-32 w-auto mt-1"
                />
              </p>
            )}
          </div>
        ))
      )}
    </section>
  );
}
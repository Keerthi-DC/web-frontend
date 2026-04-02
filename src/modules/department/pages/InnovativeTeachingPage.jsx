import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDepartmentMeta } from "../../../hooks/useDepartmentMeta";

export default function TeachingPage() {
  const { shortName } = useParams();
  const { getId, isReady } = useDepartmentMeta();

  const [teaching, setTeaching] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!shortName || !isReady) return;

    const fetchTeaching = async () => {
      try {
        setLoading(true);

        const deptId = getId(shortName);
        if (!deptId) throw new Error("Department not found");

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
                    innovativeTeachingId
                    faculties {
                      facultyId
                      facultyName
                    }
                    description
                    imageUrls
                    pdfUrl
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

        setTeaching(data?.listInnovativeTeaching?.items || []);
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
    <div className="max-w-6xl mx-auto px-6 py-16">

      {/* TITLE */}
      <h1 className="text-3xl font-bold text-center mb-12">
        Innovative Teaching Practices
      </h1>

      {teaching.length === 0 ? (
        <p className="text-center text-gray-500">
          No innovative teaching records found.
        </p>
      ) : (
        <div className="grid md:grid-cols-2 gap-8">
          {teaching.map((t, i) => (
            <div
              key={t.innovativeTeachingId}
              className="bg-white shadow rounded-lg p-6 hover:shadow-lg transition"
            >
              {/* 👩‍🏫 Faculty Names */}
              <h3 className="font-semibold text-lg text-blue-700 mb-2">
                {t.faculties?.map(f => f.facultyName).join(", ")}
              </h3>

              {/* 📄 Description */}
              <p className="text-gray-600 mb-4">
                {t.description}
              </p>

              {/* 🖼 Images */}
              {t.imageUrls?.length > 0 && (
                <div className="flex gap-3 overflow-x-auto mb-4">
                  {t.imageUrls.map((img, idx) => (
                    <img
                      key={idx}
                      src={img}
                      alt="teaching"
                      className="w-32 h-20 object-cover rounded"
                    />
                  ))}
                </div>
              )}

              {/* 📎 PDF */}
              {t.pdfUrl && (
                <a
                  href={t.pdfUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-green-600 hover:underline"
                >
                  View Details →
                </a>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
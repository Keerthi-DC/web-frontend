import React, { useEffect, useState } from "react";

// ✅ GraphQL helper
const fetchGraphQL = async (query) => {
  try {
    const res = await fetch(import.meta.env.VITE_APPSYNC_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": import.meta.env.VITE_APPSYNC_API_KEY,
      },
      body: JSON.stringify({ query }),
    });

    const result = await res.json();
    return result?.data;
  } catch (err) {
    console.error(err);
    return null;
  }
};

export default function ProspectusPage() {
  const [data, setData] = useState(null);

  useEffect(() => {
    const loadProspectus = async () => {
      try {
        const res = await fetchGraphQL(`
          query {
            getProspectus(tenantId: "biet-college") {
              title
              description
              fileUrl
              fileName
              uploadedAt
            }
          }
        `);

        setData(res?.getProspectus);
      } catch (err) {
        console.error("Error fetching prospectus:", err);
      }
    };

    loadProspectus();
  }, []);

  if (!data) {
    return (
      <div className="py-20 text-center text-gray-500">
        Loading...
      </div>
    );
  }

  return (
    <section className="bg-[#f5f6f8] py-20 px-6">
      <div className="max-w-6xl mx-auto">

        {/* HEADER */}
        <span className="inline-block bg-[#e6ebf5] text-[#1e3a8a] text-xs font-semibold px-4 py-1 rounded-full mb-6">
          ACADEMIC SESSION 2025-26
        </span>

        <h1 className="text-5xl font-bold text-[#0b2c5e] mb-6">
          {data.title}
        </h1>

        <p className="text-gray-600 max-w-2xl mb-10 text-lg">
          {data.description}
        </p>

        {/* BUTTONS */}
        <div className="flex gap-4 mb-12">
          <a
            href={data.fileUrl}
            download
            className="bg-[#0b2c5e] text-white px-6 py-3 rounded-lg shadow-md hover:bg-[#082347] transition"
          >
            ⬇ Download {data.fileName || "PDF"}
          </a>

          <a
            href={data.fileUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-gray-200 px-6 py-3 rounded-lg hover:bg-gray-300 transition"
          >
            👁 Open in New Tab
          </a>
        </div>

        {/* PDF PREVIEW */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden border">
          <iframe
            src={data.fileUrl}
            title="Prospectus PDF"
            className="w-full h-[700px]"
          />
        </div>

        {/* FOOTER */}
        <p className="text-sm text-gray-400 mt-6">
          Last updated: {data.uploadedAt || "N/A"}
        </p>

      </div>
    </section>
  );
}
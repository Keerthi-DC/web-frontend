import React, { useEffect, useState } from "react";

const fetchAccreditation = async (variables) => {
  const response = await fetch(import.meta.env.VITE_APPSYNC_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": import.meta.env.VITE_APPSYNC_API_KEY,
    },
    body: JSON.stringify({
      query: `
        query ListAccreditationRecords(
          $type: String!
          $section: String
          $sub_section: String
          $sub_sub_section: String
          $department: String
          $tenantId: ID
        ) {
          listAccreditationRecords(
            type: $type
            section: $section
            sub_section: $sub_section
            sub_sub_section: $sub_sub_section
            department: $department
            tenantId: $tenantId
          ) {
            items {
              title
              file_url
              year
              order
            }
          }
        }
      `,
      variables: { tenantId: "biet-college", ...variables },
    }),
  });

  const result = await response.json();
  return result?.data?.listAccreditationRecords?.items || [];
};

const AISHEPage = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);

      const items = await fetchAccreditation({
        type: "AISHE",
      });

      // 🔥 SORT: latest first
      const sorted = items.sort((a, b) => {
        if (b.year && a.year) return b.year - a.year;
        return (a.order || 0) - (b.order || 0);
      });

      setData(sorted);
      setLoading(false);
    };

    loadData();
  }, []);

  if (loading) {
    return (
      <div className="h-screen flex justify-center items-center">
        Loading AISHE data...
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-6 py-10">

      {/* ================= HEADER ================= */}
      <h1 className="text-3xl font-bold text-[#0b2d5c] mb-8">
        AISHE Reports
      </h1>

      {/* ================= TABLE ================= */}
      <div className="overflow-hidden rounded-2xl border shadow-sm">
        <table className="w-full text-sm">

          <thead className="bg-[#0b2d5c] text-white">
            <tr>
              <th className="p-4 text-left">Year</th>
              <th className="p-4 text-left">Report</th>
              <th className="p-4 text-center">Action</th>
            </tr>
          </thead>

          <tbody>
            {data.map((item, i) => (
              <tr
                key={i}
                className="border-t hover:bg-gray-50 transition"
              >
                <td className="p-4 font-medium">
                  {item.year || "-"}
                </td>

                <td className="p-4">
                  {item.title}
                </td>

                <td className="p-4 text-center">
                  <button
                    onClick={() => window.open(item.file_url, "_blank")}
                    className="bg-[#0b2d5c] text-white px-4 py-1 rounded hover:bg-[#0b2d5c]"
                  >
                    View
                  </button>
                </td>
              </tr>
            ))}
          </tbody>

        </table>
      </div>

    </div>
  );
};

export default AISHEPage;
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
              description
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

const AICTEPage = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeId, setActiveId] = useState("");

  const slugify = (text) =>
    text.toLowerCase().replace(/[^a-z0-9]+/g, "-");

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);

      const sectionsList = [
        {
          title: "AICTE — EOA",
          variables: { type: "AICTE", section: "EOA" },
        },
        {
          title: "AICTE — IDEA LAB",
          variables: { type: "AICTE", section: "IDEA LAB" },
        },
        {
          title: "AICTE — SPICES Activities",
          variables: {
            type: "AICTE",
            section: "SPICES",
            sub_section: "Activities",
          },
        },
        {
          title: "AICTE — SPICES Clubs",
          variables: {
            type: "AICTE",
            section: "SPICES",
            sub_section: "Clubs",
          },
        },
      ];

      const result = [];

      for (let sec of sectionsList) {
        const items = await fetchAccreditation(sec.variables);

        result.push({
          title: sec.title,
          items: items.map((i) => ({
            name: i.title,
            file: i.file_url,
            year: i.year,
            description: i.description,
          })),
        });
      }

      setData({ sections: result });
      setActiveId(slugify(result[0].title));
      setLoading(false);
    };

    loadData();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        Loading AICTE data...
      </div>
    );
  }

  const { sections } = data;
  const ids = sections.map((sec) => slugify(sec.title));

  const activeSection = sections.find(
    (sec, idx) => ids[idx] === activeId
  );

  return (
    <div className="bg-surface text-on-surface min-h-screen px-6 py-10">
      <div className="max-w-6xl mx-auto grid md:grid-cols-[280px_1fr] gap-10">

        {/* ================= SIDEBAR ================= */}
        <aside className="sticky top-24 h-fit">
          <div className="bg-surface-container rounded-2xl p-3 shadow-sm border">

            <p className="text-xs font-bold text-primary px-3 mb-3">
              AICTE Sections
            </p>

            <nav className="space-y-1">
              {sections.map((sec, idx) => {
                const id = ids[idx];
                const active = activeId === id;

                return (
                  <button
                    key={id}
                    onClick={() => setActiveId(id)}
                    className={`w-full flex justify-between px-4 py-3 rounded-xl text-sm font-medium
                    ${
                      active
                        ? "bg-[#0b2d5c] text-white"
                        : "hover:bg-gray-100"
                    }`}
                  >
                    {sec.title}
                  </button>
                );
              })}
            </nav>
          </div>
        </aside>

        {/* ================= MAIN ================= */}
        <main>

          {/* HEADER */}
          <h1 className="text-3xl font-bold text-[#0b2d5c] mb-6">
            AICTE Information Portal
          </h1>

          {/* SECTION */}
          {activeSection && (
            <>
              <h2 className="text-xl font-semibold mb-6">
                {activeSection.title}
              </h2>

              {/* SPECIAL UI FOR EOA */}
              {activeSection.title.includes("EOA") ? (
                <div className="overflow-hidden rounded-xl border">
                  <table className="w-full text-sm">
                    <thead className="bg-[#0b2d5c] text-white">
                      <tr>
                        <th className="p-3 text-left">Subject</th>
                        <th className="p-3">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {activeSection.items.map((item, i) => (
                        <tr key={i} className="border-t">
                          <td className="p-3">{item.name}</td>
                          <td className="p-3 text-center">
                            <button
                              onClick={() =>
                                window.open(item.file, "_blank")
                              }
                              className="bg-[#0b2d5c] text-white px-4 py-1 rounded"
                            >
                              View
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                /* CARDS UI */
                <div className="grid md:grid-cols-2 gap-6">
                  {activeSection.items.map((item, i) => (
                    <div
                      key={i}
                      className="border rounded-xl p-5 shadow-sm"
                    >
                      <h3 className="font-semibold text-[#0b2d5c]mb-2">
                        {item.name}
                      </h3>

                      {item.description && (
                        <p className="text-sm text-gray-600 mb-2">
                          {item.description}
                        </p>
                      )}

                      {item.year && (
                        <p className="text-xs text-gray-500 mb-3">
                          Year: {item.year}
                        </p>
                      )}

                      <button
                        onClick={() => window.open(item.file, "_blank")}
                        className="bg-[#0b2d5c] text-white px-4 py-2 rounded"
                      >
                        View Document
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </>
          )}
        </main>
      </div>
    </div>
  );
};

export default AICTEPage;
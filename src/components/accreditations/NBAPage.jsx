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
              sub_section
              department
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

const NBAPage = () => {
  const [data, setData] = useState(null);
  const [activeTab, setActiveTab] = useState("Accreditation Details");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);

      // 🔥 FETCH ALL DATA
      const accreditation = await fetchAccreditation({
        type: "NBA",
        section: "Accreditation Details",
      });

      const instituteSections = [
        "General",
        "Course Files",
        "First Year Time Table",
        "First Year Faculty List",
        "Governing Bodies",
        "Others",
      ];

      const instituteData = {};

      for (let sec of instituteSections) {
        instituteData[sec] = await fetchAccreditation({
          type: "NBA",
          section: "Institute Level",
          sub_section: sec,
        });
      }

      const departments = [
        "Information Science & Engineering",
        "Bio-Technology Engineering",
        "Chemical Engineering",
        "Textile Technology",
      ];

      const deptData = [];

      for (let dept of departments) {
        const faculty = await fetchAccreditation({
          type: "NBA",
          section: "Department Level",
          sub_section: "Faculty List",
          department: dept,
        });

        const placement = await fetchAccreditation({
          type: "NBA",
          section: "Department Level",
          sub_section: "Placement List",
          department: dept,
        });

        deptData.push({
          name: dept,
          faculty,
          placement,
        });
      }

      setData({
        accreditation,
        instituteData,
        deptData,
      });

      setLoading(false);
    };

    loadData();
  }, []);

  if (loading) {
    return <div className="h-screen flex justify-center items-center">Loading NBA...</div>;
  }

  return (
    <div className="max-w-7xl mx-auto px-6 py-10 grid md:grid-cols-[250px_1fr] gap-10">

      {/* ================= SIDEBAR ================= */}
      <aside className="sticky top-24">
        <div className="bg-white p-4 rounded-2xl shadow border space-y-2">

          {["Accreditation Details", "Institute Level", "Department Level"].map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`w-full text-left px-4 py-2 rounded-lg ${
                activeTab === tab
                  ? "bg-[#0b2d5c] text-white"
                  : "hover:bg-gray-100"
              }`}
            >
              {tab}
            </button>
          ))}

        </div>
      </aside>

      {/* ================= MAIN ================= */}
      <main>

        {/* ================= ACCREDITATION ================= */}
        {activeTab === "Accreditation Details" && (
          <div>
            <h2 className="text-2xl font-bold mb-6">Accreditation Details</h2>

            <div className="grid md:grid-cols-2 gap-6">
              {data.accreditation.map((item, i) => (
                <div key={i} className="border p-5 rounded-xl">
                  <h3 className="font-semibold mb-3">{item.title}</h3>

                  <button
                    onClick={() => window.open(item.file_url)}
                    className="bg-[#0b2d5c] text-white px-4 py-2 rounded"
                  >
                    View Document
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ================= INSTITUTE ================= */}
        {activeTab === "Institute Level" && (
          <div>
            <h2 className="text-2xl font-bold mb-6">Institute Level</h2>

            {Object.entries(data.instituteData).map(([section, items]) => (
              <div key={section} className="mb-8">
                <h3 className="font-semibold text-lg mb-4">{section}</h3>

                <div className="grid md:grid-cols-2 gap-4">
                  {items.map((item, i) => (
                    <div key={i} className="border p-4 rounded-lg">
                      <p>{item.title}</p>

                      <button
                        onClick={() => window.open(item.file_url)}
                        className="text-[#0b2d5c] mt-2"
                      >
                        View →
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* ================= DEPARTMENT ================= */}
        {activeTab === "Department Level" && (
          <div>
            <h2 className="text-2xl font-bold mb-6">Department Level</h2>

            {data.deptData.map((dept, i) => (
              <div key={i} className="mb-8 border rounded-xl p-5">
                <h3 className="font-bold mb-4">{dept.name}</h3>

                <div className="grid md:grid-cols-2 gap-4">

                  <div>
                    <h4 className="font-semibold mb-2">Faculty List</h4>
                    {dept.faculty.map((f, idx) => (
                      <button key={idx} onClick={() => window.open(f.file_url)} className="block text-[#0b2d5c]">
                        {f.title}
                      </button>
                    ))}
                  </div>

                  <div>
                    <h4 className="font-semibold mb-2">Placement List</h4>
                    {dept.placement.map((p, idx) => (
                      <button key={idx} onClick={() => window.open(p.file_url)} className="block text-[#0b2d5c]">
                        {p.title}
                      </button>
                    ))}
                  </div>

                </div>
              </div>
            ))}
          </div>
        )}

      </main>
    </div>
  );
};

export default NBAPage;
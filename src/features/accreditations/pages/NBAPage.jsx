import React from "react";
import useNBA from "../hooks/useNBA";
import ViewButton from "../../../components/ui/ViewButton";

const NBAPage = () => {
  const { loading, error, data, activeTab, setActiveTab } = useNBA();

  if (loading) return <div className="h-screen flex justify-center items-center">Loading NBA...</div>;
  if (error) return <div className="text-center py-20 text-red-600">{String(error)}</div>;

  return (
    <div className="max-w-7xl mx-auto px-6 py-10 grid md:grid-cols-[250px_1fr] gap-10">

      {/* ================= SIDEBAR ================= */}
      <aside className="sticky top-24">
        <div className="bg-white p-4 rounded-2xl shadow border space-y-2">

          {["Accreditation Details", "Institute Level", "Department Level"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`w-full text-left px-4 py-2 rounded-lg ${
                activeTab === tab ? "bg-[#0b2d5c] text-white" : "hover:bg-gray-100"
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
              {data?.accreditation?.map((item, i) => (
                <div key={i} className="border p-5 rounded-xl">
                  <h3 className="font-semibold mb-3">{item.title}</h3>

                  <ViewButton onClick={() => window.open(item.file_url)}>
                    View Document
                  </ViewButton>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ================= INSTITUTE ================= */}
        {activeTab === "Institute Level" && (
          <div>
            <h2 className="text-2xl font-bold mb-6">Institute Level</h2>

            {Object.entries(data?.instituteData || {}).map(([section, items]) => (
              <div key={section} className="mb-8">
                <h3 className="font-semibold text-lg mb-4">{section}</h3>

                <div className="grid md:grid-cols-2 gap-4">
                  {items?.map((item, i) => (
                    <div key={i} className="border p-4 rounded-lg">
                      <p>{item.title}</p>

                      <div className="mt-2">
                        <ViewButton onClick={() => window.open(item.file_url)}>
                          View →
                        </ViewButton>
                      </div>
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

            {data?.deptData?.map((dept, i) => (
              <div key={i} className="mb-8 border rounded-xl p-5">
                <h3 className="font-bold mb-4">{dept.name}</h3>

                <div className="grid md:grid-cols-2 gap-4">

                  <div>
                    <h4 className="font-semibold mb-2">Faculty List</h4>
                    {dept.faculty?.map((f, idx) => (
                      <button key={idx} onClick={() => window.open(f.file_url)} className="block text-[#0b2d5c]">
                        {f.title}
                      </button>
                    ))}
                  </div>

                  <div>
                    <h4 className="font-semibold mb-2">Placement List</h4>
                    {dept.placement?.map((p, idx) => (
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

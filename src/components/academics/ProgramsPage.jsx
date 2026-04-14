import React, { useEffect, useState } from "react";

const ProgramsSection = () => {
  const [departments, setDepartments] = useState([]);
  const [activeTab, setActiveTab] = useState("all");
  const [loading, setLoading] = useState(true); // ✅ NEW

  useEffect(() => {
    fetch(import.meta.env.VITE_APPSYNC_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": import.meta.env.VITE_APPSYNC_API_KEY
      },
      body: JSON.stringify({
        query: `
          query {
            listDepartments {
              items {
                departmentId
                name
                shortName
                description
                programTypes
              }
            }
          }
        `
      })
    })
      .then(res => res.json())
      .then(res => {
        setDepartments(res.data?.listDepartments?.items || []);
        setLoading(false); // ✅ STOP LOADING
      })
      .catch(err => {
        console.error(err);
        setLoading(false); // ✅ STOP EVEN ON ERROR
      });
  }, []);

  const durationMap = {
    UG: "4 Years",
    PG: "2 Years",
    RESEARCH: "3-5 Years"
  };

  const programs = [];

  departments.forEach(dep => {
    dep.programTypes?.forEach(type => {
      programs.push({
        id: dep.departmentId + type,
        name: dep.name,
        type,
        description: dep.description,
        duration: durationMap[type]
      });
    });
  });

  const filteredPrograms =
    activeTab === "all"
      ? programs
      : programs.filter(p => p.type === activeTab.toUpperCase());

  // ✅ LOADING UI
  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center bg-slate-50">
        <div className="flex flex-col items-center gap-4">
          <div className="w-10 h-10 border-4 border-blue-900 border-t-transparent rounded-full animate-spin"></div>
          <p className="text-gray-600 text-sm">Loading programs...</p>
        </div>
      </div>
    );
  }

  // ✅ EMPTY STATE (optional but good UX)
  if (!departments.length) {
    return (
      <div className="h-screen flex items-center justify-center">
        <p className="text-gray-500">No programs available</p>
      </div>
    );
  }

  return (
    <main className="pt-24 pb-32 px-6 max-w-7xl mx-auto bg-slate-50">

      {/* HERO */}
      <section className="mb-16">
        <div className="rounded-3xl bg-gradient-to-br from-[#001b4b] to-[#002f76] p-10 md:p-16 text-white">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Programs Offered
          </h1>
          <p className="text-lg opacity-80">
            Explore diverse undergraduate, postgraduate, and research programs.
          </p>
        </div>
      </section>

      {/* TABS */}
      <div className="flex gap-3 overflow-x-auto pb-8">
        {["all", "ug", "pg", "research"].map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-6 py-2.5 rounded-full text-sm font-medium transition ${
              activeTab === tab
                ? "bg-blue-900 text-white"
                : "bg-slate-200 text-gray-700 hover:bg-slate-300"
            }`}
          >
            {tab === "all"
              ? "All Programs"
              : tab === "ug"
              ? "Undergraduate"
              : tab === "pg"
              ? "Postgraduate"
              : "Research"}
          </button>
        ))}
      </div>

      {/* GRID */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredPrograms.map(p => (
          <div
            key={p.id}
            className="bg-white rounded-xl shadow-lg p-6 flex flex-col justify-between hover:-translate-y-1 transition"
          >
            <div>
              <h3 className="text-xl font-bold text-blue-900 mb-2">
                {p.name}
              </h3>

              <p className="text-gray-500 text-sm mb-4 line-clamp-3">
                {p.description}
              </p>
            </div>

            <div className="flex justify-between items-center">
              <span className="text-xs font-semibold text-gray-400 uppercase">
                {p.duration}
              </span>

              <span className="text-xs bg-blue-100 text-blue-600 px-2 py-1 rounded">
                {p.type}
              </span>
            </div>
          </div>
        ))}
      </div>

    </main>
  );
};

export default ProgramsSection;
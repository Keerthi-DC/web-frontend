import { useEffect, useState } from "react";

export default function CommitteesPage() {
  const [data, setData] = useState(null);
  const [activeSection, setActiveSection] = useState(0);

  useEffect(() => {
    fetch("/data/committees.json")
      .then((res) => res.json())
      .then((json) => setData(json))
      .catch((err) => console.error(err));
  }, []);

  if (!data) return <p className="p-6">Loading...</p>;

  return (
    <div className="relative h-screen overflow-hidden">

      {/* ✅ BACKGROUND */}
      <div className="absolute inset-0 -z-10">
        <img
          src="/images/bg.jpg"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-[#f1f3f5]/80 backdrop-blur-sm"></div>
      </div>

      <div className="flex h-full">

        {/* ✅ SIDEBAR (MATCHED COLOR) */}
        <div className="w-64 bg-white/50 backdrop-blur-xl border-r border-white/20 shadow-xl">

          <h1 className="text-lg font-bold p-4 text-[#0f2a44] border-b border-white/20">
            {data.title}
          </h1>

          {data.sections.map((section, i) => (
            <div
              key={i}
              onClick={() => setActiveSection(i)}
              className={`cursor-pointer px-4 py-3 flex items-center gap-3 transition ${
                activeSection === i
                  ? "bg-[#0f2a44] text-white"
                  : "text-gray-600 hover:bg-white/40"
              }`}
            >
              
              {section.title}
            </div>
          ))}
        </div>

        {/* ✅ CONTENT */}
        <div className="flex-1 overflow-y-auto p-6">

          <h2 className="text-2xl font-bold text-[#0f2a44] mb-6">
            {data.sections[activeSection].title}
          </h2>

          {data.sections[activeSection].committees.map((committee, i) => (
            <Committee key={i} committee={committee} />
          ))}
        </div>
      </div>
    </div>
  );
}

/* ✅ COMMITTEE */
function Committee({ committee }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="mb-4 rounded-xl bg-white/60 backdrop-blur-lg shadow-md border border-white/20">

      <div
        onClick={() => setOpen(!open)}
        className="cursor-pointer px-4 py-3 flex justify-between items-center bg-white/40 hover:bg-white/60 transition"
      >
        <div className="flex items-center gap-3">
          <span className="material-symbols-outlined text-[#0f2a44]">
            groups
          </span>

          <span className="text-[#0f2a44] font-semibold">
            {committee.title}
          </span>
        </div>

        <span
          className={`material-symbols-outlined transition-transform ${
            open ? "rotate-180" : ""
          }`}
        >
          expand_more
        </span>
      </div>

      {open && (
        <div className="p-4">
          {committee.type === "simple" ? (
            <SimpleTable members={committee.members} />
          ) : (
            <DetailedTable
              headers={committee.headers}
              rows={committee.rows}
            />
          )}
        </div>
      )}
    </div>
  );
}

/* ✅ SIMPLE TABLE */
function SimpleTable({ members }) {
  return (
    <table className="w-full text-sm border border-white/20 rounded overflow-hidden">
      <thead className="bg-[#0f2a44] text-white">
        <tr>
          <th className="p-3">Sl. No.</th>
          <th className="p-3">Member Name</th>
        </tr>
      </thead>

      <tbody>
        {members.map((member, i) => (
          <tr key={i} className="even:bg-white/30 hover:bg-white/50">
            <td className="p-3 text-center">{i + 1}</td>
            <td className="p-3">
              <p className="font-semibold text-[#0f2a44]">{member}</p>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

/* ✅ DETAILED TABLE */
function DetailedTable({ headers, rows }) {
  return (
    <table className="w-full text-sm border border-white/20 rounded overflow-hidden">
      <thead className="bg-[#0f2a44] text-white">
        <tr>
          <th className="p-3">Sl. No.</th>
          {headers.map((h, i) => (
            <th key={i} className="p-3">{h}</th>
          ))}
        </tr>
      </thead>

      <tbody>
        {rows.map((row, i) => (
          <tr key={i} className="even:bg-white/30 hover:bg-white/50">
            <td className="p-3 text-center">{i + 1}</td>
            {row.map((cell, j) => (
              <td key={j} className="p-3">{cell}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
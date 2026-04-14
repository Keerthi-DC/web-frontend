import React, { useEffect, useState, useMemo } from "react";

/* 🔥 CUSTOM DROPDOWN COMPONENT */
const CustomDropdown = ({ label, options, value, onChange }) => {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative w-full">
      <p className="text-xs text-gray-400 mb-1">{label}</p>

      {/* BOX */}
      <div
        onClick={() => setOpen(!open)}
        className="h-12 px-4 flex items-center justify-between bg-white border rounded-lg cursor-pointer hover:border-[#000d22]"
      >
        <span>{value}</span>
        <span className="text-gray-500">▾</span>
      </div>

      {/* DROPDOWN */}
      {open && (
        <div className="absolute top-full left-0 w-full bg-white border rounded-lg shadow-lg mt-1 z-50 max-h-60 overflow-auto">
          {options.map((opt) => (
            <div
              key={opt}
              onClick={() => {
                onChange(opt);
                setOpen(false);
              }}
              className={`px-4 py-2 cursor-pointer transition
                ${
                  value === opt
                    ? "bg-[#002f76] text-white"
                    : "hover:bg-gray-100"
                }`}
            >
              {opt}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

const SyllabusPage = () => {
  const [syllabus, setSyllabus] = useState([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");
  const [programFilter, setProgramFilter] = useState("All");
  const [semesterFilter, setSemesterFilter] = useState("All");
  const [yearFilter, setYearFilter] = useState("All");

  const [modalDoc, setModalDoc] = useState(null);

  useEffect(() => {
    fetch("/data/syllabus.json")
      .then((res) => res.json())
      .then((data) => {
        setSyllabus(data.syllabus || []);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  /* 🔥 FILTER OPTIONS */
  const programs = useMemo(
    () => ["All", ...new Set(syllabus.map((s) => s.program))],
    [syllabus]
  );

  const semesters = useMemo(
    () => ["All", ...new Set(syllabus.map((s) => s.semester))],
    [syllabus]
  );

  const years = useMemo(
    () => ["All", ...new Set(syllabus.map((s) => s.year))],
    [syllabus]
  );

  /* 🔥 FILTER LOGIC */
  const filteredSyllabus = useMemo(() => {
    return syllabus.filter((item) => {
      const matchSearch =
        item.department.toLowerCase().includes(search.toLowerCase()) ||
        item.code?.toLowerCase().includes(search.toLowerCase());

      const matchProgram =
        programFilter === "All" || item.program === programFilter;

      const matchSemester =
        semesterFilter === "All" || item.semester === semesterFilter;

      const matchYear =
        yearFilter === "All" || item.year === yearFilter;

      return matchSearch && matchProgram && matchSemester && matchYear;
    });
  }, [syllabus, search, programFilter, semesterFilter, yearFilter]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen text-gray-500">
        Loading syllabus...
      </div>
    );
  }

  return (
    <div className="bg-[#faf9fc] min-h-screen pb-24">
      <div className="max-w-6xl mx-auto px-6 py-6 space-y-8">

        {/* 🔥 HEADER */}
        <section className="space-y-4">
          <div>
            <h1 className="text-[2.5rem] font-black text-[#002f76]">
              Syllabus
            </h1>
            <p className="text-gray-500 font-medium">
              Academic Repository & Blueprints
            </p>
          </div>

          {/* 🔍 SEARCH */}
          <input
            type="text"
            placeholder="Search course or department..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full h-14 px-4 bg-gray-100 rounded-xl outline-none focus:ring-2 focus:ring-[#002f76]"
          />

          {/* 🔥 FILTERS */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">

            <CustomDropdown
              label="Program"
              options={programs}
              value={programFilter}
              onChange={setProgramFilter}
            />

            <CustomDropdown
              label="Semester"
              options={semesters}
              value={semesterFilter}
              onChange={setSemesterFilter}
            />

            <CustomDropdown
              label="Year"
              options={years}
              value={yearFilter}
              onChange={setYearFilter}
            />

          </div>
        </section>

        {/* 🔥 CARDS */}
        <section className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredSyllabus.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-xl p-5 shadow hover:shadow-lg transition border-l-4 border-[#002f76]"
            >
              <div className="mb-3">
                <span className="text-xs font-bold bg-blue-100 px-2 py-1 rounded">
                  {item.code}
                </span>
                <h3 className="text-lg font-bold mt-1">
                  {item.department}
                </h3>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                <div>
                  <p className="text-gray-400 text-xs">Program</p>
                  <p className="font-semibold">{item.program}</p>
                </div>
                <div>
                  <p className="text-gray-400 text-xs">Semester</p>
                  <p className="font-semibold">{item.semester}</p>
                </div>
                <div>
                  <p className="text-gray-400 text-xs">Regulation</p>
                  <p className="font-semibold">{item.regulation}</p>
                </div>
                <div>
                  <p className="text-gray-400 text-xs">Year</p>
                  <p className="font-semibold">{item.year}</p>
                </div>
              </div>

              <button
                onClick={() => setModalDoc(item.document)}
                className="mt-5 w-full md:w-auto px-6 py-2 bg-[#002f76] text-white rounded-lg"
              >
                View Syllabus
              </button>
            </div>
          ))}

          {filteredSyllabus.length === 0 && (
            <p className="col-span-full text-center text-gray-500">
              No syllabus found
            </p>
          )}
        </section>
      </div>

      {/* 🔥 MODAL */}
      {modalDoc && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white w-[90%] md:w-[60%] rounded-xl overflow-hidden shadow-lg">
            <div className="flex justify-between p-4 border-b">
              <h2 className="font-semibold">Syllabus Preview</h2>
              <button onClick={() => setModalDoc(null)}>✕</button>
            </div>

            <iframe
              src={modalDoc}
              className="w-full h-[500px]"
              title="PDF"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default SyllabusPage;
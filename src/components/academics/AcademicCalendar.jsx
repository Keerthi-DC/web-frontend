import React, { useEffect, useState, useMemo } from "react";
import { motion } from "framer-motion";

const AcademicCalendar = () => {
  const [entries, setEntries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [yearFilter, setYearFilter] = useState("All");

  useEffect(() => {
    fetch("/data/academicCalendar.json")
      .then((r) => r.json())
      .then((data) => {
        setEntries(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  const years = useMemo(() => {
    const set = new Set(entries.map((e) => e.year));
    return Array.from(set).sort((a, b) => b - a);
  }, [entries]);

  const filtered = useMemo(() => {
    return entries.filter((entry) => {
      const matchesSearch = entry.title
        .toLowerCase()
        .includes(search.toLowerCase());

      const matchesYear =
        yearFilter === "All" || entry.year.toString() === yearFilter;

      return matchesSearch && matchesYear;
    });
  }, [entries, search, yearFilter]);

  const currentEntries = filtered.filter(
    (e) => e.category === "current"
  );
  const historicalEntries = filtered.filter(
    (e) => e.category === "historical"
  );

  if (loading) {
    return (
      <div className="p-10 text-center text-gray-500">
        Loading Academic Calendar...
      </div>
    );
  }

  return (
    <div className="bg-[#faf9fd] min-h-screen">
      <div className="max-w-7xl mx-auto px-6 py-10">

        {/* HERO */}
        <section className="mb-12 relative overflow-hidden rounded-[2rem] bg-gradient-to-br from-[#001430] to-[#002855] p-12 text-white shadow-xl">
          <div className="max-w-2xl">
            <span className="inline-block px-4 py-1 bg-green-300 text-black text-xs font-bold rounded-full mb-6">
              INSTITUTION RECORD
            </span>

            <h2 className="text-5xl font-extrabold mb-4">
              Academic Calendar 2026
            </h2>

            <p className="text-gray-300 text-lg">
              Strategic timelines and essential milestones for the upcoming academic cycles.
            </p>
          </div>
        </section>

        <div className="grid grid-cols-12 gap-8">

          {/* LEFT */}
          <div className="col-span-12 lg:col-span-8 space-y-12">

            {/* FILTER TABS */}
            <div className="flex items-center justify-between bg-[#eeedf2] p-2 rounded-2xl">
              <div className="flex gap-1">
                <button className="px-6 py-2 bg-white text-[#001430] font-bold rounded-xl shadow-sm text-sm">
                  Current
                </button>
                <button className="px-6 py-2 text-gray-500 font-semibold rounded-xl text-sm">
                  Historical
                </button>
                <button className="px-6 py-2 text-gray-500 font-semibold rounded-xl text-sm">
                  All Years
                </button>
              </div>

              <div className="flex items-center gap-3">
                <input
                  type="text"
                  placeholder="Search..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="px-4 py-2 rounded-xl border text-sm"
                />

                <select
                  value={yearFilter}
                  onChange={(e) => setYearFilter(e.target.value)}
                  className="px-4 py-2 rounded-xl border text-sm"
                >
                  <option value="All">All Years</option>
                  {years.map((y) => (
                    <option key={y}>{y}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* CURRENT */}
            <div className="space-y-10">

              {/* GROUP BY TITLE (like Jan–May) */}
              {[...new Set(currentEntries.map(e => e.title))].map(group => {
                const groupItems = currentEntries.filter(e => e.title === group);

                return (
                  <div key={group}>
                    <div className="flex justify-between items-center mb-6">
                      <h3 className="text-2xl font-extrabold text-[#001430]">
                        {group}
                      </h3>

                      <button
                        onClick={() => window.open(groupItems[0]?.pdf)}
                        className="text-[#001430] font-bold flex items-center gap-2"
                      >
                        View PDF
                      </button>
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                      {groupItems.map((entry) => (
                        <motion.div
                          key={entry.id}
                          whileHover={{ scale: 1.02 }}
                          className="bg-white p-6 rounded-2xl hover:shadow-lg transition border border-transparent hover:border-green-200"
                        >
                          <span className="text-xs font-bold text-gray-400 uppercase">
                            {entry.type || "EVENT"}
                          </span>

                          <h4 className="font-bold text-lg mt-2">
                            {entry.title}
                          </h4>

                          <p className="text-sm text-gray-500 mt-2">
                            {entry.description || "Academic activity"}
                          </p>

                          <button
                            onClick={() => window.open(entry.pdf)}
                            className="mt-4 text-green-600 text-sm font-bold"
                          >
                            View PDF
                          </button>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* HISTORICAL */}
            <section>
              <h2 className="text-xl font-bold mb-6 text-[#001430]">
                Historical Records
              </h2>

              <div className="space-y-2">
                {historicalEntries.map((entry) => (
                  <div
                    key={entry.id}
                    className="flex justify-between bg-white px-4 py-3 rounded-xl hover:bg-gray-50 transition"
                  >
                    <span>{entry.title}</span>

                    <button
                      onClick={() => window.open(entry.pdf)}
                      className="text-blue-600 text-sm"
                    >
                      Download
                    </button>
                  </div>
                ))}
              </div>
            </section>

          </div>

          {/* RIGHT */}
          <div className="col-span-12 lg:col-span-4">
            <div className="bg-[#eeedf2] rounded-3xl p-6 sticky top-24">
              <h3 className="text-xl font-bold mb-6 text-[#001430]">
                Historical Archives
              </h3>

              <p className="text-sm text-gray-500 mb-6">
                Access previous academic calendars
              </p>

              <div className="space-y-4">
                {years.map((year) => (
                  <div
                    key={year}
                    className="bg-white p-4 rounded-xl hover:shadow cursor-pointer transition"
                    onClick={() => setYearFilter(year.toString())}
                  >
                    <div className="flex justify-between items-center">
                      <span className="font-bold">{year}</span>
                      <span className="text-xs bg-green-100 px-2 py-1 rounded">
                        ARCHIVED
                      </span>
                    </div>

                    <button className="mt-3 text-sm text-blue-600">
                      Download Archive
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default AcademicCalendar;
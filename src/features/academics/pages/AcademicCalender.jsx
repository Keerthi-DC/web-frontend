import React from "react";
import { motion } from "framer-motion";
import useAcademicCalendar from "../hooks/useAcademicCalendar";

import PageContainer from "../components/ui/PageContainer";
import SectionTitle from "../components/ui/SectionTitle";

const AcademicCalendar = () => {
  const {
    loading,
    search,
    setSearch,
    yearFilter,
    setYearFilter,
    years,
    currentEntries,
    historicalEntries,
  } = useAcademicCalendar(); // ✅ CORRECT USAGE

  if (loading) {
    return (
      <PageContainer>
        <SectionTitle>Loading...</SectionTitle>
      </PageContainer>
    );
  }

  return (
    <PageContainer>
      <SectionTitle>Academic Calendar</SectionTitle>

      {/* FILTER */}
      <div className="flex gap-4 mb-6">
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search..."
          className="border px-3 py-2 rounded"
        />

        <select
          value={yearFilter}
          onChange={(e) => setYearFilter(e.target.value)}
          className="border px-3 py-2 rounded"
        >
          <option value="All">All</option>
          {years.map((y) => (
            <option key={y}>{y}</option>
          ))}
        </select>
      </div>

      {/* CURRENT */}
      <div className="mb-10">
        <h2 className="text-lg font-bold mb-4">Current</h2>

        <div className="grid md:grid-cols-2 gap-4">
          {currentEntries.map((entry) => (
            <motion.div
              key={entry.id}
              whileHover={{ scale: 1.03 }}
              className="p-4 bg-white rounded-xl shadow"
            >
              <h3 className="font-semibold">{entry.title}</h3>
              <p className="text-sm text-gray-500">{entry.year}</p>

              <button
                onClick={() => window.open(entry.pdf)}
                className="text-blue-600 mt-2 text-sm"
              >
                View PDF
              </button>
            </motion.div>
          ))}
        </div>
      </div>

      {/* HISTORICAL */}
      <div>
        <h2 className="text-lg font-bold mb-4">Historical</h2>

        <div className="space-y-2">
          {historicalEntries.map((entry) => (
            <div
              key={entry.id}
              className="flex justify-between p-3 bg-white rounded shadow"
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
      </div>
    </PageContainer>
  );
};

export default AcademicCalendar;
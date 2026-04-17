import React, { useEffect, useState, useMemo } from 'react';
import {
  FaGraduationCap,
  FaAward,
  FaUniversity,
  FaBook,
  FaHandshake,
} from 'react-icons/fa';
import useScholarships from '../hooks/useScholarships';

export default function ScholarshipPage() {
  const { data: fetched, loading } = useScholarships();
  const [data, setData] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [activeType, setActiveType] = useState('ALL');

  useEffect(() => {
    if (!loading) {
      setData(fetched || []);
      setFiltered(fetched || []);
    }
  }, [fetched, loading]);

  // ✅ CATEGORY FILTER LOGIC
  const handleFilter = (type) => {
    setActiveType(type);

    if (type === "ALL") {
      setFiltered(data);
    } else {
      setFiltered(data.filter((s) => s.type === type));
    }
  };

  // ✅ UNIQUE TYPES
  const categories = ["ALL", ...new Set(data.map((s) => s.type))];

  // Icons
  const categoryIcon = (type) => {
    const icons = {
      STATE: <FaUniversity className="text-4xl text-blue-600" />,
      GOVERNMENT_OF_INDIA: <FaAward className="text-4xl text-yellow-600" />,
      INSTITUTIONAL: <FaGraduationCap className="text-4xl text-green-600" />,
      OTHERS: <FaHandshake className="text-4xl text-purple-600" />,
    };
    return icons[type] ?? <FaBook className="text-4xl text-gray-600" />;
  };

  if (loading) {
    return <p className="text-center py-10">Loading...</p>;
  }

  return (
    <section className="bg-gray-50 min-h-screen">

      {/* HERO */}
      <div className="p-10 text-center bg-gradient-to-r from-[#001b4b] to-[#002f76] text-white">
        <h1 className="text-4xl font-bold">Scholarships & Financial Aid</h1>
        <p className="mt-2 text-blue-200">
          Explore scholarships based on merit, need, and achievements.
        </p>
      </div>

      {/* MAIN LAYOUT */}
      <div className="flex flex-col md:flex-row p-6 gap-6">

        {/* 🔥 SIDEBAR */}
        <div className="md:w-1/4 bg-white rounded-xl shadow p-4 h-fit">
          <h3 className="font-semibold text-lg mb-4">Categories</h3>

          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => handleFilter(cat)}
              className={`w-full text-left px-4 py-2 rounded-lg mb-2 transition 
                ${
                  activeType === cat
                    ? "bg-[#002f76] text-white"
                    : "hover:bg-gray-100 text-gray-700"
                }`}
            >
              {cat.replaceAll("_", " ")}
            </button>
          ))}
        </div>

        {/* 🎯 SCHOLARSHIP GRID */}
        <div className="md:w-3/4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">

          {filtered.map((s) => (
            <div
              key={s.scholarshipId}
              className="bg-white rounded-xl shadow hover:shadow-lg transition transform hover:scale-105 p-6"
            >
              <div className="mb-4">{categoryIcon(s.type)}</div>

              <h4 className="font-semibold text-lg mb-2">{s.name}</h4>

              <p className="text-sm text-gray-600 mb-3">
                {s.description}
              </p>

              <span className="inline-block px-2 py-1 text-xs bg-blue-100 text-[#002f76] rounded-full">
                {s.type.replaceAll("_", " ")}
              </span>

              {s.amount && (
                <p className="text-green-600 font-semibold mt-2">
                  {s.amount}
                </p>
              )}

              {s.eligibility && (
                <p className="text-xs text-gray-500 mt-2">
                  {s.eligibility}
                </p>
              )}
            </div>
          ))}

        </div>
      </div>
    </section>
  );
}

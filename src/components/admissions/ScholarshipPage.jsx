/* src/components/admissions/ScholarshipPage.jsx
 *
 * Renders a modern scholarship directory.
 * Data is loaded from /data/scholarships.json.
 *
 * Requirements:
 * • Hero section with title/subtitle/description
 * • Highlight cards (3 icons)
 * • Category sections – title, optional highlight styling
 * • Scholarship cards – name, authority, type badge
 * • Responsive grid, hover scale & shadow, rounded-xl cards
 * • Tailwind only – no custom CSS
 */

import React, { useEffect, useState } from 'react';
import {
  FaGraduationCap,
  FaAward,
  FaUniversity,
  FaBook,
  FaHandshake,
} from 'react-icons/fa';

export default function ScholarshipPage() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  /** Fetch scholarships JSON on mount */
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const res = await fetch('/data/scholarships.json');
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const json = await res.json();
        setData(json);
      } catch (e) {
        console.error(e);
        setError('Failed to load scholarships');
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // Icons per category (fallback to FaBook)
  const categoryIcon = title => {
    const icons = {
      'Academic Excellence': <FaGraduationCap className="text-4xl text-blue-600" />,
      'Community Service': <FaHandshake className="text-4xl text-green-600" />,
      'Research Grants': <FaUniversity className="text-4xl text-indigo-600" />,
      'Sports Scholarships': <FaAward className="text-4xl text-yellow-600" />,
    };
    return icons[title] ?? <FaBook className="text-4xl text-purple-600" />;
  };

  if (loading) {
    return (
      <section className="py-12 text-center">
        <p>Loading scholarships…</p>
      </section>
    );
  }

  if (error) {
    return (
      <section className="py-12 text-center text-red-600">
        {error}
      </section>
    );
  }

  const { hero, highlights, categories } = data;

  return (
    <section className="p-12 bg-gray-50">
      {/* HERO */}
      <div className="p-4 m-4 flex flex-col items-center justify-center text-center rounded-3xl bg-gradient-to-br from-[#001b4b] to-[#002f76] md:p-16 text-white shadow-xl">

  <h1 className="text-4xl md:text-5xl font-bold mb-4 tracking-wide">
    {hero.title}
  </h1>

  <h2 className="text-xl md:text-2xl font-medium mb-4 text-blue-100">
    {hero.subtitle}
  </h2>

  <p className="max-w-3xl text-blue-200 leading-relaxed">
    {hero.description}
  </p>

</div>
      {/* HIGHLIGHT CARDS */}
      <div className="container mx-auto px-4 mb-20 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {highlights.map((h, idx) => (
          <div
            key={idx}
            className="bg-white rounded-xl shadow hover:shadow-md transition-all flex flex-col items-start p-6"
          >
            <div className="text-indigo-600 mb-4">{h.icon}</div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">{h.title}</h3>
            <p className="text-gray-600">{h.text}</p>
          </div>
        ))}
      </div>

      {/* CATEGORY SECTIONS */}
      {categories.map((cat, idx) => (
        <section key={idx} className="container mx-auto px-4 mb-20">
          <h3
            className={`flex items-center gap-3 text-2xl font-semibold mb-6 ${cat.highlight
              ? 'border-b border-indigo-600 pb-2 text-indigo-600'
              : 'border-b border-gray-300 pb-2'}`}
          >
            {categoryIcon(cat.title)} {cat.title}
          </h3>

          {/* Scholarships Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {cat.scholarships.map((s, sIdx) => (
              <div
                key={sIdx}
                className="bg-white rounded-xl shadow hover:shadow-md transition-transform transform hover:scale-105 p-6"
              >
                <h4 className="font-semibold text-lg text-gray-800 mb-2">{s.name}</h4>
                <span className="inline-block text-xs font-medium text-gray-600 mb-3">{s.authority}</span>
                <span
                  className={`inline-block px-2 py-0.5 text-xs font-medium rounded-full mr-2 ${s.type === 'Merit'
                    ? 'bg-green-100 text-green-800'
                    : 'bg-blue-100 text-blue-800'}`}
                >
                  {s.type}
                </span>
              </div>
            ))}
          </div>
        </section>
      ))}
    </section>
  );
}

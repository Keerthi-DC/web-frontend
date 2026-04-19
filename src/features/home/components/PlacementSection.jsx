import { theme } from "../../../components/ui/theme";
import React, { useEffect, useState } from "react";

const PlacementSection = () => {
  const [students, setStudents] = useState([]);

  useEffect(() => {
    fetch("/data/placementHighlights.json")
      .then((r) => r.json())
      .then(setStudents)
      .catch(console.error);
  }, []);

  return (
    <section className="py-24 px-12 md:px-24 bg-[#f8f9fa]">

      {/* HEADER */}
      <h2 className={`text-4xl font-bold ${theme.colors.primaryText} mb-12 text-center`}>
        Placements
      </h2>

      {/* ================= STATS ================= */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-24">

        <div className={`${theme.colors.primaryBg} p-8 rounded-2xl text-white text-center`}>
          <h4 className="text-3xl font-bold mb-1">95%</h4>
          <p className="text-[10px] uppercase font-bold text-white/50">
            Placement Rate
          </p>
        </div>

        <div className={`bg-yellow-200 p-8 rounded-2xl ${theme.colors.primaryText} text-center`}>
          <h4 className="text-3xl font-bold mb-1">24 LPA</h4>
          <p className="text-[10px] uppercase font-bold opacity-60">
            Highest Package
          </p>
        </div>

        <div className="bg-gray-100 p-8 rounded-2xl text-center">
          <h4 className={`text-3xl font-bold ${theme.colors.primaryText} mb-1`}>6.5 LPA</h4>
          <p className="text-[10px] uppercase font-bold text-gray-400">
            Average Package
          </p>
        </div>

        <div className="bg-gray-100 p-8 rounded-2xl text-center">
          <h4 className={`text-3xl font-bold ${theme.colors.primaryText} mb-1`}>120+</h4>
          <p className="text-[10px] uppercase font-bold text-gray-400">
            Recruiters
          </p>
        </div>

      </div>

      {/* ================= STUDENT HIGHLIGHTS ================= */}
      <h3 className={`text-2xl font-bold ${theme.colors.primaryText} mb-12 text-center`}>
        Student Placement Highlights
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

        {students.slice(0, 3).map((s, index) => (
          <div
            key={index}
            className="bg-white p-8 rounded-3xl border border-gray-100 flex items-center gap-6"
          >
            {/* IMAGE */}
            <img
              src={s.image}
              alt={s.name}
              className="w-16 h-16 rounded-full object-cover"
            />

            {/* TEXT */}
            <div>
              <h5 className={`font-bold ${theme.colors.primaryText}`}>
                {s.name}
              </h5>

              <p className="text-xs text-gray-400 mb-2">
                {s.company}
              </p>

              <span className={`text-[10px] font-bold ${theme.colors.accentText} uppercase`}>
                {s.package}
              </span>
            </div>
          </div>
        ))}

      </div>

    </section>
  );
};

export default PlacementSection;
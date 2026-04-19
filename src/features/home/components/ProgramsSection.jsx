import { theme } from "../../../components/ui/theme";
import React, { useEffect, useState } from "react";

const ProgramsSection = () => {
  const [programs, setPrograms] = useState([]);

  useEffect(() => {
    fetch("/data/programs.json")
      .then((res) => res.json())
      .then((data) => setPrograms(data))
      .catch((e) => console.error(e));
  }, []);

  if (!programs.length) return null;

  const displayed = programs.slice(0, 6);

  return (
    <section className="py-24 px-12 md:px-24 bg-[#f3f4f5]">

      {/* HEADER */}
      <div className="text-center mb-20">
        <h2 className={`text-5xl font-bold ${theme.colors.primaryText} mb-4`}>
          Programs Offered
        </h2>

        <p className="text-gray-600 text-xl max-w-2xl mx-auto italic">
          Explore our diverse range of world-class academic programs designed to launch your career.
        </p>
      </div>

      {/* PROGRAM GRID */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">

        {displayed.map((p, index) => (
          <div
            key={index}
            className="bg-white p-8 rounded-2xl text-center shadow-sm hover:shadow-md transition-all"
          >
            {/* PROGRAM NAME */}
            <h4 className={`text-2xl font-black ${theme.colors.primaryText} mb-1`}>
              {p.name}
            </h4>

            {/* SUBTEXT (optional) */}
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
              {p.type || "Program"}
            </p>
          </div>
        ))}

      </div>

    </section>
  );
};

export default ProgramsSection;
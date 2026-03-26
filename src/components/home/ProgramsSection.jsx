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
    <section className="py-16 bg-slate-50">
      <div className="max-w-6xl mx-auto px-4 text-center">

        <h2 className="text-3xl font-bold mb-10 shake-text">
          Programs Offered
        </h2>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">

          {displayed.map((p) => (
            <div
              key={p.id}
              className="bg-white rounded-xl shadow-md
              flex items-center justify-center
              h-28
              transform transition-all duration-300
              hover:-translate-y-2 hover:shadow-xl"
            >
              <span className="text-2xl font-bold text-gray-800 tracking-wide shake-text">
                {p.name}
              </span>
            </div>
          ))}

        </div>

      </div>
    </section>
  );
};

export default ProgramsSection;
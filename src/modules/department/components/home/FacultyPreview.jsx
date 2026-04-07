import React, { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

const FacultyPreview = ({ data = [], shortName }) => {
  const navigate = useNavigate();
  const scrollRef = useRef(null);

  // 🔥 AUTO SCROLL EFFECT
  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;

    const interval = setInterval(() => {
      container.scrollLeft += 1;

      // 🔁 loop back to start
      if (
        container.scrollLeft + container.clientWidth >=
        container.scrollWidth
      ) {
        container.scrollLeft = 0;
      }
    }, 20);

    return () => clearInterval(interval);
  }, []);

  if (!Array.isArray(data) || data.length === 0) return null;

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-6">

        {/* HEADER */}
        <div className="flex justify-between items-center mb-10">
          <h2 className="text-3xl font-bold text-gray-800">
            Faculty
          </h2>

          <button
            onClick={() => navigate(`/departments/${shortName}/people`)}
            className="bg-yellow-400 hover:bg-yellow-500 text-black px-6 py-3 rounded-lg font-semibold shadow-md transition"
          >
            Read More →
          </button>
        </div>

        {/* 🔥 AUTO MOVING ROW */}
        <div ref={scrollRef} className="overflow-hidden">
          <div className="flex gap-6 w-max">

            {/* 🔁 duplicate for infinite scroll */}
            {[...data, ...data].map((p, i) => {
              const image =
                p.profileImage ||
                `https://i.pravatar.cc/150?img=${(i % 70) + 1}`;

              return (
                <div
                  key={i}
                  onClick={() => {
                    if (p.cvUrl) {
                      window.open(p.cvUrl, "_blank");
                    }
                  }}
                  className="w-[220px] bg-white shadow rounded-lg p-6 text-center hover:shadow-lg cursor-pointer flex-shrink-0"
                >
                  <div className="w-24 h-24 mx-auto mb-4 rounded-full overflow-hidden bg-gray-100">
                    <img
                      src={image}
                      alt={p.name}
                      className="w-full h-full object-contain"
                    />
                  </div>

                  <h3 className="font-semibold">
                    {p.name || "Faculty"}
                  </h3>

                  <p className="text-sm text-gray-500">
                    {p.designation || "Faculty"}
                  </p>
                </div>
              );
            })}

          </div>
        </div>

      </div>
    </section>
  );
};

export default FacultyPreview;
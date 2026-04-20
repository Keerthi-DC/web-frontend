import { theme } from "../../../../components/ui/theme";
import React, { useEffect, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDepartmentMeta } from "../../hooks/useDepartmentMeta";
import BietLoader from "../../../../components/ui/BietLoader";
import useDepartmentHome from "../../hooks/useDepartmentHome";
import FacultyCard from "../ui/FacultyCard";

const FacultyPreview = () => {
  const { shortName } = useParams();
  const navigate = useNavigate();
  const scrollRef = useRef(null);

  const { getId, isReady } = useDepartmentMeta();
  const deptId = isReady ? getId(shortName) : null;
  const { faculty: data, loading } = useDepartmentHome(deptId);

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
  if (loading) return <BietLoader />;
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
            className={`${theme.colors.accentBg} hover:${theme.colors.accentBg} text-black px-6 py-3 rounded-lg font-semibold shadow-md transition`}
          >
            Read More →
          </button>
        </div>

        {/* 🔥 AUTO MOVING ROW */}
        <div ref={scrollRef} className="overflow-hidden">
          <div className="flex gap-6 w-max">

            {/* 🔁 duplicate for infinite scroll */}
            {[...data, ...data].map((p, i) => (
              <FacultyCard
                key={i}
                faculty={{
                  ...p,
                  profileImage: p.profileImage || `https://loremflickr.com/150/150/headshot,portrait?random=${(i % 70) + 1}`,
                }}
                onClick={() => {
                  if (p.cvUrl) {
                    window.open(p.cvUrl, "_blank");
                  }
                }}
              />
            ))}

          </div>
        </div>

      </div>
    </section>
  );
};

export default FacultyPreview;

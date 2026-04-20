import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useDepartmentMeta } from "../../hooks/useDepartmentMeta";

import useAchievements from "../../hooks/useDepartmentAchievements";

const AchievementsPreview = () => {
  const { shortName } = useParams();
  const { getId, isReady } = useDepartmentMeta();

  const [index, setIndex] = useState(0);

  const deptId = isReady ? getId(shortName) : null;
  const { studentAchievements, facultyAchievements, loading } = useAchievements(deptId);

  const list = React.useMemo(() => {
    return [...studentAchievements, ...facultyAchievements].map((item) => ({
      text: item.text,
      name: item.type === "student" ? "Student" : "Faculty",
      photo: "/assets/default-user.png",
    }));
  }, [studentAchievements, facultyAchievements]);

  const prev = () => {
    setIndex((prev) => (prev === 0 ? list.length - 1 : prev - 1));
  };

  const next = () => {
    setIndex((prev) => (prev === list.length - 1 ? 0 : prev + 1));
  };

  if (loading || !isReady) {
    return (
      <div className="text-center py-20 text-gray-500">
        Loading spotlight...
      </div>
    );
  }

  if (!list || list.length === 0) {
    return (
      <div className="text-center py-20 text-gray-500">
        No achievements available yet
      </div>
    );
  }

  const item = list[index];

  return (
    <section
      className="relative py-24 bg-cover bg-center text-black bg-white"
    >
      <div className="absolute inset-0 bg-black/50"></div>

      <div className="relative max-w-6xl mx-auto px-6 text-center">

        <h2 className="text-2xl font-semibold mb-10">
          Department Spotlight
        </h2>

        <div className="relative flex items-center justify-between backdrop-blur-md bg-white/80 rounded-xl shadow-xl px-10 py-8 max-w-4xl mx-auto text-gray-800">

          {/* Left */}
          <button onClick={prev} className="absolute -left-10 text-white text-3xl">
            ❮
          </button>

          {/* Content */}
          <div className="text-center flex-1 px-6">
            <p className="italic text-gray-600 mb-3">
              {item.text}
            </p>

            <div className="w-10 h-1 bg-red-500 mx-auto mb-2"></div>

            <h3 className="text-xl font-semibold">
              {item.name}
            </h3>
          </div>



          {/* Right */}
          <button onClick={next} className="absolute -right-10 text-white text-3xl">
            ❯
          </button>

        </div>
      </div>
    </section>
  );
};

export default AchievementsPreview;

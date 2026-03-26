import React, { useState } from "react";

const AchievementsPreview = ({ data }) => {
  const [index, setIndex] = useState(0);

  // ✅ Normalize data (handles BOTH formats)
  const list = Array.isArray(data)
    ? data
    : data?.spotlight || [];

  // ✅ Safe fallback
  if (list.length === 0) {
    return (
      <div className="p-6 text-center text-gray-500">
        No achievements available
      </div>
    );
  }

  const prev = () => {
    setIndex((prev) => (prev === 0 ? list.length - 1 : prev - 1));
  };

  const next = () => {
    setIndex((prev) => (prev === list.length - 1 ? 0 : prev + 1));
  };

  const item = list[index] || {};

  return (
    <section
      className="relative py-24 bg-cover bg-center text-white"
      style={{
        backgroundImage:
          "url(https://picsum.photos/1600/600?blur=2)"
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/50"></div>

      <div className="relative max-w-6xl mx-auto px-6 text-center">

        <h2 className="text-2xl font-semibold mb-10">
          Department Spotlight
        </h2>

        <div className="relative flex items-center justify-between backdrop-blur-md bg-white/80 rounded-xl shadow-xl px-10 py-8 max-w-4xl mx-auto text-gray-800">

          {/* Left */}
          <button
            onClick={prev}
            className="absolute -left-10 text-white text-3xl"
          >
            ❮
          </button>

          {/* Content */}
          <div className="text-center flex-1 px-6">
            <p className="italic text-gray-600 mb-3">
              {item.text || "No achievement text"}
            </p>

            <div className="w-10 h-1 bg-red-500 mx-auto mb-2"></div>

            <h3 className="text-xl font-semibold">
              {item.name || "Unknown"}
            </h3>
          </div>

          {/* Image */}
          <img
            src={item.photo || "/assets/default-user.png"}
            alt={item.name || "user"}
            className="w-28 h-28 rounded-full object-cover border-4 border-blue-900"
          />

          {/* Right */}
          <button
            onClick={next}
            className="absolute -right-10 text-white text-3xl"
          >
            ❯
          </button>

        </div>
      </div>
    </section>
  );
};

export default AchievementsPreview;
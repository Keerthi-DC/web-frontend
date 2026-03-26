import React from "react";
import { useNavigate } from "react-router-dom";

const FacultyPreview = ({ data = [], slug }) => {
  const navigate = useNavigate();

  if (!Array.isArray(data) || data.length === 0) return null;

  return (
    <section className="py-12" role="region" aria-label="Faculty Preview">
      <div className="max-w-6xl mx-auto px-6">

        <h2 className="text-2xl font-semibold mb-6 text-center">
          Our Faculty
        </h2>

        {/* ✅ FIXED GRID */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {data.slice(0, 10).map((f, idx) => (
            <div
              key={idx}
              className="bg-white rounded-lg shadow-md p-4 text-center"
            >
              <img
                src={
                  f.profileImage ||
                  `https://i.pravatar.cc/150?img=${(idx % 70) + 1}`
                }
                alt={`${f.firstName || ""} ${f.lastName || ""}`}
                className="rounded-full w-24 h-24 object-cover mx-auto border"
              />

              {/* ✅ Better name logic */}
              <h3 className="mt-4 font-medium text-lg">
                {f.firstName === f.lastName
                  ? f.firstName || "Faculty"
                  : `${f.firstName || ""} ${f.lastName || ""}`}
              </h3>

              <p className="text-sm text-gray-600">
                {f.designation || "Faculty"}
              </p>
            </div>
          ))}
        </div>

        <div className="text-center mt-6">
          <button
            onClick={() => navigate(`/faculty`)}
            className="bg-yellow-400 text-black px-6 py-3 rounded font-semibold hero-btn"
          >
            View All Faculty →
          </button>
        </div>

      </div>
    </section>
  );
};

export default FacultyPreview;
import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDepartmentMeta } from "../../hooks/useDepartmentMeta";
import useDepartmentHome from "../../hooks/useDepartmentHome";

const PlacementStats = () => {
  const { shortName } = useParams();
  const { getId, isReady } = useDepartmentMeta();
  const navigate = useNavigate();

  const deptId = isReady ? getId(shortName) : null;
  const { placements, loading } = useDepartmentHome(deptId);

  const latest = placements?.length > 0 
    ? [...placements].sort((a, b) => (b.academicYear || "").localeCompare(a.academicYear || ""))[0] 
    : null;

  if (loading || !isReady) {
    return (
      <div className="py-32 text-center text-gray-500">
        Loading placements...
      </div>
    );
  }

  if (!latest) {
    return (
      <div className="py-32 text-center text-gray-500">
        No placement data found.
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-6 py-20">

      {/* 🔥 TITLE */}
      <h1 className="text-4xl font-bold mb-12 text-center">
        Placements
      </h1>

      {/* ================= PREVIEW CARDS ================= */}
      <div className="grid md:grid-cols-4 gap-6">

        <div className="bg-blue-50 p-6 rounded-lg text-center">
          <h3 className="text-3xl font-bold text-blue-700">
            {latest.highestPackage} LPA
          </h3>
          <p className="text-gray-600 mt-2">
            Highest Package
          </p>
        </div>

        <div className="bg-blue-50 p-6 rounded-lg text-center">
          <h3 className="text-3xl font-bold text-blue-700">
            {latest.companiesVisited}
          </h3>
          <p className="text-gray-600 mt-2">
            Companies
          </p>
        </div>

        <div className="bg-blue-50 p-6 rounded-lg text-center">
          <h3 className="text-3xl font-bold text-blue-700">
            {latest.studentsInCampus}
          </h3>
          <p className="text-gray-600 mt-2">
            In-Campus
          </p>
        </div>

        <div className="bg-blue-50 p-6 rounded-lg text-center">
          <h3 className="text-3xl font-bold text-blue-700">
            {latest.studentsOffCampus}
          </h3>
          <p className="text-gray-600 mt-2">
            Off-Campus
          </p>
        </div>

      </div>

      {/* ✅ YEAR TAG */}
      <p className="text-center text-gray-500 mt-6">
        Data for {latest.academicYear}
      </p>

      {/* ✅ READ MORE */}
      <div className="flex justify-center mt-10">
        <button
          onClick={() => navigate(`/departments/${shortName}/placements`)}
          className="bg-yellow-400 text-black px-6 py-3 rounded font-semibold hover:bg-yellow-500 transition"
        >
          View Full Statistics →
        </button>
      </div>

    </div>
  );
};

export default PlacementStats;

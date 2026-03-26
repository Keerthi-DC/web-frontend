import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDepartmentMeta } from "../../../../hooks/useDepartmentMeta";

const PlacementStats = () => {
  const { shortName } = useParams();
  const { getId, isReady } = useDepartmentMeta();
  const navigate = useNavigate(); // ✅ FIXED (hook at top)

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!shortName || !isReady) return;

    const fetchData = async () => {
      try {
        setLoading(true);

        // optional (for consistency/logging)
        const deptId = getId(shortName);
        console.log("Resolved deptId:", deptId);

        // JSON fetch using shortName
        const res = await fetch(`/data/departments/${shortName}.json`);
        const json = await res.json();

        setData(json);
      } catch (err) {
        console.error("Placement fetch error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [shortName, isReady]);

  if (loading) {
    return (
      <div className="py-32 text-center text-gray-600">
        Loading placements...
      </div>
    );
  }

  if (!data) {
    return (
      <div className="py-32 text-center text-gray-600">
        No placement data found.
      </div>
    );
  }

  const placements = data.placements || {};

  return (
    <div className="max-w-7xl mx-auto px-6 py-20">

      {/* PAGE TITLE */}
      <h1 className="text-4xl font-bold mb-16 text-center">
        Placements
      </h1>

      {/* ================= OVERVIEW ================= */}
      <section id="overview" className="mb-24 scroll-mt-32">

        <div className="grid md:grid-cols-3 gap-8">
          {/* Highest Package */}
          <div className="bg-blue-50 rounded-lg p-8 text-center">
            <h3 className="text-4xl font-bold text-blue-700">
              {placements.highestPackage}
            </h3>
            <p className="text-gray-600 mt-2">
              Highest Package
            </p>
          </div>

          {/* Average Package */}
          <div className="bg-blue-50 rounded-lg p-8 text-center">
            <h3 className="text-4xl font-bold text-blue-700">
              {placements.averagePackage}
            </h3>
            <p className="text-gray-600 mt-2">
              Average Package
            </p>
          </div>

          {/* Placement Rate */}
          <div className="bg-blue-50 rounded-lg p-8 text-center">
            <h3 className="text-4xl font-bold text-blue-700">
              {placements.placementRate}
            </h3>
            <p className="text-gray-600 mt-2">
              Placement Rate
            </p>
          </div>
        </div>

        {/* ✅ Read More Button */}
        <div className="flex justify-center mt-12">
          <button
            onClick={() =>
              navigate(`/departments/${shortName}/placements#overview`)
            }
            className="bg-yellow-400 text-black px-6 py-3 rounded font-semibold hero-btn hover:bg-yellow-500 transition"
          >
            Read More →
          </button>
        </div>

      </section>

    </div>
  );
};

export default PlacementStats;
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDepartmentMeta } from "../../../hooks/useDepartmentMeta";

const DepartmentPlacements = () => {
  const { shortName } = useParams();
  const { getId, isReady } = useDepartmentMeta();

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!shortName || !isReady) return;

    const fetchData = async () => {
      try {
        setLoading(true);

        // ✅ optional (for consistency/logging)
        const deptId = getId(shortName);
        console.log("Resolved deptId:", deptId);

        // ✅ JSON should use shortName
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
        <h2 className="text-2xl font-semibold mb-6">
          Placement Overview
        </h2>

        <p className="text-gray-600 max-w-3xl mb-10">
          {placements.overview}
        </p>

        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-blue-50 rounded-lg p-8 text-center">
            <h3 className="text-4xl font-bold text-blue-700">
              {placements.highestPackage}
            </h3>
            <p className="text-gray-600 mt-2">
              Highest Package
            </p>
          </div>

          <div className="bg-blue-50 rounded-lg p-8 text-center">
            <h3 className="text-4xl font-bold text-blue-700">
              {placements.averagePackage}
            </h3>
            <p className="text-gray-600 mt-2">
              Average Package
            </p>
          </div>

          <div className="bg-blue-50 rounded-lg p-8 text-center">
            <h3 className="text-4xl font-bold text-blue-700">
              {placements.placementRate}
            </h3>
            <p className="text-gray-600 mt-2">
              Placement Rate
            </p>
          </div>
        </div>
      </section>

      {/* ================= TOP RECRUITERS ================= */}
      <section id="recruiters" className="mb-24 scroll-mt-32">
        <h2 className="text-2xl font-semibold mb-8">
          Top Recruiters
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {(placements.topRecruiters || []).map((company, i) => (
            <div
              key={i}
              className="bg-white shadow rounded-lg p-6 text-center font-medium hover:shadow-lg transition"
            >
              {company}
            </div>
          ))}
        </div>
      </section>

      {/* ================= STATISTICS ================= */}
      <section id="statistics" className="scroll-mt-32">
        <h2 className="text-2xl font-semibold mb-8">
          Placement Statistics
        </h2>

        <div className="grid md:grid-cols-3 gap-8">
          {(placements.statistics || []).map((stat, i) => (
            <div
              key={i}
              className="bg-green-50 rounded-lg p-10 text-center"
            >
              <h3 className="text-4xl font-bold text-green-700">
                {stat.placed}%
              </h3>

              <p className="text-gray-600 mt-2">
                Students Placed ({stat.year})
              </p>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
};

export default DepartmentPlacements;
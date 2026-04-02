import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDepartmentMeta } from "../../../../hooks/useDepartmentMeta";

const API_URL = import.meta.env.VITE_APPSYNC_URL;
const API_KEY = import.meta.env.VITE_APPSYNC_API_KEY;

// ✅ SAME QUERY AS OVERVIEW PAGE
const LIST_PLACEMENTS = `
  query ListPlacementOverviews($deptId: ID!, $academicYear: String, $tenantId: ID) {
    listPlacementOverviews(deptId: $deptId, academicYear: $academicYear, tenantId: $tenantId) {
      items {
        placementOverviewId
        deptId
        academicYear
        companiesVisited
        studentsInCampus
        studentsOffCampus
        highestPackage
      }
    }
  }
`;

const PlacementStats = () => {
  const { shortName } = useParams();
  const { getId, isReady } = useDepartmentMeta();
  const navigate = useNavigate();

  const [latest, setLatest] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!shortName || !isReady) return;

    const fetchPlacements = async () => {
      try {
        setLoading(true);

        const deptId = getId(shortName);
        if (!deptId) return;

        const res = await fetch(API_URL, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "x-api-key": API_KEY,
          },
          body: JSON.stringify({
            query: LIST_PLACEMENTS,
            variables: {
              deptId,
              tenantId: "biet-college",
            },
          }),
        });

        const result = await res.json();

        const items =
          result?.data?.listPlacementOverviews?.items || [];

        if (items.length > 0) {
          // ✅ Get latest year
          const sorted = items.sort((a, b) =>
            b.academicYear.localeCompare(a.academicYear)
          );

          setLatest(sorted[0]);
        }
      } catch (err) {
        console.error("Placement fetch error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchPlacements();
  }, [shortName, isReady]);

  if (loading) {
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
          onClick={() =>
            navigate(`/departments/${shortName}/placements`)
          }
          className="bg-yellow-400 text-black px-6 py-3 rounded font-semibold hover:bg-yellow-500 transition"
        >
          View Full Statistics →
        </button>
      </div>

    </div>
  );
};

export default PlacementStats;
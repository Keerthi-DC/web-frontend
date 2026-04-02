import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDepartmentMeta } from "../../../hooks/useDepartmentMeta";

const API_URL = import.meta.env.VITE_APPSYNC_URL;
const API_KEY = import.meta.env.VITE_APPSYNC_API_KEY;

// ✅ GraphQL Query
const LIST_PLACEMENTS = `
  query ListPlacementOverviews($deptId: ID!, $academicYear: String,$tenantId: ID) {
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

  const [placements, setPlacements] = useState([]);
  const [loading, setLoading] = useState(true);

  // ✅ FETCH FROM APPSYNC
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
            variables: { deptId,tenantId: "biet-college" },
          }),
        });

        const result = await res.json();

        const items =
          result?.data?.listPlacementOverviews?.items || [];

        // ✅ Sort by latest year first
        const sorted = items.sort((a, b) =>
          b.academicYear.localeCompare(a.academicYear)
        );

        setPlacements(sorted);
      } catch (err) {
        console.error("Placement fetch error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchPlacements();
  }, [shortName, isReady]);

  // ✅ LOADING
  if (loading) {
    return (
      <div className="py-32 text-center text-gray-500">
        Loading placements...
      </div>
    );
  }

  if (placements.length === 0) {
    return (
      <div className="py-32 text-center text-gray-500">
        No placement data found.
      </div>
    );
  }

  // ✅ Latest Year Data
  const latest = placements[0];

  return (
    <div className="max-w-7xl mx-auto px-6 py-20">

      {/* 🔥 TITLE */}
      <h1 className="text-4xl font-bold text-center mb-16">
        Placements
      </h1>

      {/* ================= HIGHLIGHTS ================= */}
      <section className="mb-20">
        <h2 className="text-2xl font-semibold mb-8 text-center">
          {latest.academicYear} Highlights
        </h2>

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
              Companies Visited
            </p>
          </div>

          <div className="bg-blue-50 p-6 rounded-lg text-center">
            <h3 className="text-3xl font-bold text-blue-700">
              {latest.studentsInCampus}
            </h3>
            <p className="text-gray-600 mt-2">
              In-Campus Offers
            </p>
          </div>

          <div className="bg-blue-50 p-6 rounded-lg text-center">
            <h3 className="text-3xl font-bold text-blue-700">
              {latest.studentsOffCampus}
            </h3>
            <p className="text-gray-600 mt-2">
              Off-Campus Offers
            </p>
          </div>

        </div>
      </section>

      {/* ================= TABLE ================= */}
      <section>
        <h2 className="text-2xl font-semibold mb-8 text-center">
          Year-wise Placement Statistics
        </h2>

        <div className="overflow-x-auto bg-white shadow rounded-lg">
          <table className="min-w-full text-sm text-left">

            <thead className="bg-gray-100 text-gray-700 uppercase text-xs">
              <tr>
                <th className="px-6 py-4">Year</th>
                <th className="px-6 py-4">Companies</th>
                <th className="px-6 py-4">In-Campus</th>
                <th className="px-6 py-4">Off-Campus</th>
                <th className="px-6 py-4">Highest Package</th>
              </tr>
            </thead>

            <tbody>
              {placements.map((p, index) => (
                <tr
                  key={p.placementOverviewId}
                  className={`border-t ${
                    index % 2 === 0
                      ? "bg-white"
                      : "bg-gray-50"
                  } hover:bg-blue-50 transition`}
                >
                  <td className="px-6 py-4 font-medium">
                    {p.academicYear}
                  </td>
                  <td className="px-6 py-4">
                    {p.companiesVisited}
                  </td>
                  <td className="px-6 py-4">
                    {p.studentsInCampus}
                  </td>
                  <td className="px-6 py-4">
                    {p.studentsOffCampus}
                  </td>
                  <td className="px-6 py-4 font-semibold text-blue-700">
                    {p.highestPackage} LPA
                  </td>
                </tr>
              ))}
            </tbody>

          </table>
        </div>
      </section>

    </div>
  );
};

export default PlacementStats;
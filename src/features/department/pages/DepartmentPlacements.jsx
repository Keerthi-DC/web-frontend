import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDepartmentMeta } from "../hooks/useDepartmentMeta";

const API_URL = import.meta.env.VITE_APPSYNC_URL;
const API_KEY = import.meta.env.VITE_APPSYNC_API_KEY;

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
            variables: { deptId, tenantId: "biet-college" },
          }),
        });

        const result = await res.json();

        const items =
          result?.data?.listPlacementOverviews?.items || [];

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

  if (loading) {
    return (
      <div className="py-32 text-center text-gray-500 animate-pulse">
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

  const latest = placements[0];

  return (
    <div className="max-w-6xl mx-auto px-6 py-16 space-y-12">

      {/* ================= HERO ================= */}
      <section className="space-y-8">
        <div>
          <span className="text-xs uppercase tracking-widest font-bold text-blue-700">
            Academic Session
          </span>
          <h2 className="text-4xl font-extrabold">
            {latest.academicYear} Highlights
          </h2>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 bg-white p-8 rounded-2xl shadow-sm border relative overflow-hidden">
            <div className="absolute -right-10 -top-10 w-40 h-40 bg-blue-100 rounded-full blur-3xl"></div>

            <p className="text-sm font-semibold uppercase text-gray-500">
              Highest Package
            </p>

            <div className="flex items-baseline gap-2 mt-2">
              <span className="text-6xl font-black text-blue-700">
                {latest.highestPackage}
              </span>
              <span className="text-2xl font-bold text-blue-700">
                LPA
              </span>
            </div>

            <p className="text-sm text-gray-500 mt-3">
              New record for the current session
            </p>
          </div>

          <div className="flex flex-col gap-6">
            <div className="bg-gray-50 p-6 rounded-2xl">
              <p className="text-xs font-bold uppercase text-gray-500">
                Companies
              </p>
              <p className="text-4xl font-bold">
                {latest.companiesVisited}
              </p>
            </div>

            <div className="bg-gray-50 p-6 rounded-2xl">
              <p className="text-xs font-bold uppercase text-gray-500">
                In-Campus
              </p>
              <div className="flex items-baseline gap-2">
                <p className="text-4xl font-bold">
                  {latest.studentsInCampus}
                </p>
                <span className="text-sm text-gray-500">
                  / {latest.studentsOffCampus} Off
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= TRENDS ================= */}
      <section className="space-y-6">
        <div className="flex justify-between items-center">
          <h3 className="text-2xl font-bold">
            Placement Trends
          </h3>

          <span className="text-xs bg-blue-100 text-blue-700 px-3 py-1 rounded-full font-bold">
            Live Updates
          </span>
        </div>

        <div className="space-y-4">

          {/* CURRENT YEAR */}
          <div className="bg-blue-50 p-4 rounded-xl border-l-4 border-blue-700">
            <div className="flex justify-between">
              <div>
                <p className="font-bold text-blue-700">
                  {latest.academicYear} Session
                </p>
                <p className="text-xs text-gray-500">
                  Ongoing placement drive
                </p>
              </div>

              <div className="text-right">
                <p className="font-bold">
                  {latest.highestPackage} LPA
                </p>
                <p className="text-xs text-gray-500 uppercase">
                  Top Offer
                </p>
              </div>
            </div>

            <div className="mt-4 flex flex-wrap gap-6 text-xs text-gray-600 border-t pt-3">
              <span>● {latest.companiesVisited} Firms</span>
              <span>● {latest.studentsInCampus} In</span>
              <span>● {latest.studentsOffCampus} Off</span>
              <span>
                ● {Math.round(
                  (latest.studentsInCampus /
                    (latest.studentsInCampus + latest.studentsOffCampus)) *
                    100
                )}% Hired
              </span>
            </div>
          </div>

          {/* OTHER YEARS */}
          {placements.slice(1).map((p) => (
            <div key={p.placementOverviewId} className="bg-gray-50 p-5 rounded-xl">
              <div className="flex justify-between items-center">
                <div>
                  <p className="font-bold text-lg">
                    {p.academicYear}
                  </p>
                  <p className="text-xs text-gray-500">
                    COMPLETED
                  </p>
                </div>

                <div className="text-right">
                  <p className="font-bold text-lg">
                    {p.highestPackage} LPA
                  </p>
                  <p className="text-xs text-gray-500">
                    AVERAGE
                  </p>
                </div>
              </div>

              <div className="mt-3 flex flex-wrap gap-4 text-xs text-gray-500">
                <span>{p.companiesVisited} Firms</span>
                <span>{p.studentsInCampus} In</span>
                <span>{p.studentsOffCampus} Off</span>
              </div>
            </div>
          ))}

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
                    index % 2 === 0 ? "bg-white" : "bg-gray-50"
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

      {/* ================= CTA ================= */}
      <section className="bg-blue-900 p-8 rounded-2xl text-white flex justify-between items-center">
        <div>
          <h4 className="text-2xl font-bold mb-2">
            Career Readiness
          </h4>
          <p className="text-blue-100">
            Access placement preparation resources, mock interviews, and technical test series.
          </p>
        </div>

        <button className="bg-white text-blue-900 px-6 py-3 rounded-lg font-bold text-sm">
          Explore Resources →
        </button>
      </section>

    </div>
  );
};

export default PlacementStats;

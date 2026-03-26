import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDepartmentMeta } from "../../../../hooks/useDepartmentMeta";

const ResearchPreview = () => {
  const navigate = useNavigate();

  const { shortName } = useParams();
  const { getId, isReady } = useDepartmentMeta();

  const [data, setData] = useState({
    publications: [],
    patents: [],
    grants: []
  });

  useEffect(() => {
    if (!shortName || !isReady) return;

    const API_URL = import.meta.env.VITE_APPSYNC_URL;
    const API_KEY = import.meta.env.VITE_APPSYNC_API_KEY;

    const deptId = getId(shortName);
    console.log("Resolved deptId:", deptId);

    if (!deptId) return;

    const fetchData = async () => {
      try {
        const queries = [
          {
            key: "publications",
            query: `
              query ($deptId: ID!, $tenantId: ID!) {
                listDeptPublications(deptId: $deptId, tenantId: $tenantId) {
                  items { title }
                }
              }
            `
          },
          {
            key: "patents",
            query: `
              query ($deptId: ID!, $tenantId: ID!) {
                listPatents(deptId: $deptId, tenantId: $tenantId) {
                  items { text }
                }
              }
            `
          },
          {
            key: "grants",
            query: `
              query ($deptId: ID!, $tenantId: ID!) {
                listResearchGrants(deptId: $deptId, tenantId: $tenantId) {
                  items { text }
                }
              }
            `
          }
        ];

        const responses = await Promise.all(
          queries.map(q =>
            fetch(API_URL, {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                "x-api-key": API_KEY
              },
              body: JSON.stringify({
                query: q.query,
                variables: {
                  deptId,
                  tenantId: "biet-college"
                }
              })
            }).then(res => res.json())
          )
        );

        const result = {
          publications: [],
          patents: [],
          grants: []
        };

        responses.forEach((json, index) => {
          const key = Object.keys(json.data || {})[0];
          result[queries[index].key] = json.data?.[key]?.items || [];
        });

        console.log("🔥 Preview Data:", result);
        setData(result);

      } catch (err) {
        console.error("❌ Fetch Error:", err);
      }
    };

    fetchData();
  }, [shortName, isReady]);

  const items = [
    {
      title: "Publications",
      count: data.publications.length,
      subtitle: "Research Papers"
    },
    {
      title: "Patents",
      count: data.patents.length,
      subtitle: "Innovations Filed"
    },
    {
      title: "Research Grants",
      count: data.grants.length,
      subtitle: "Funded Projects"
    }
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6">

        {/* Heading */}
        <div className="text-3xl font-bold mb-12 flex items-center gap-3">
          <div className="w-1 h-6 bg-blue-600" />
          <h2>Research Highlights</h2>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {items.map((item, i) => (
            <div
              key={i}
              className="relative bg-cover bg-center rounded-xl shadow-lg overflow-hidden flex flex-col justify-center px-6"
              style={{
                backgroundImage: "url('/assets/sticky-note-blue.png')",
                height: "300px",
                padding:"100px"
              }}
            >
              <div className="absolute inset-0 bg-white/30"></div>

              <div className="relative z-10 ">
                <h3 className="text-lg font-semibold text-gray-800">
                  {item.title}
                </h3>

                <p className="text-4xl font-bold text-blue-700 mt-2">
                  {item.count}
                </p>

                <p className="text-sm text-gray-600 mt-1">
                  {item.subtitle}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Button */}
        <div className="flex justify-center mt-12">
          <button
            onClick={() =>
              navigate(`/departments/${shortName}/research`)
            }
            className="bg-yellow-400 hover:bg-yellow-500 text-black px-6 py-3 rounded-lg font-semibold shadow-md transition"
          >
            Explore Research →
          </button>
        </div>

      </div>
    </section>
  );
};

export default ResearchPreview;
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDepartmentMeta } from "../../../hooks/useDepartmentMeta";
import researchBg from "/assets/research-background.gif";

const DepartmentResearch = () => {
  const { shortName } = useParams();
  const { getId, isReady } = useDepartmentMeta();

  const [data, setData] = useState({
    publications: [],
    profiles: [],
    grants: [],
    patents: [],
    summaries: [],
    guides: [],
    scholars: []
  });

  const [loading, setLoading] = useState(true);

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
                  items { title authors journal year type doi }
                }
              }
            `
          },
          {
            key: "profiles",
            query: `
              query ($deptId: ID!, $tenantId: ID!) {
                listPublicationProfiles(deptId: $deptId, tenantId: $tenantId) {
                  items { facultyId googleScholarLink irinsLink }
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
            key: "summaries",
            query: `
              query ($deptId: ID!, $tenantId: ID!) {
                listFacultyResearchSummaries(deptId: $deptId, tenantId: $tenantId) {
                  items {
                    researchArea guideName guideDesignation university
                    yearOfRegistration yearOfDegreeAwarded researchStatus
                  }
                }
              }
            `
          },
          {
            key: "guides",
            query: `
              query ($deptId: ID!, $tenantId: ID!) {
                listPhdGuides(deptId: $deptId, tenantId: $tenantId) {
                  items {
                    facultyName university recognizedYear
                    scholarsGuided ongoingScholars
                  }
                }
              }
            `
          },
          {
            key: "scholars",
            query: `
              query ($deptId: ID!, $tenantId: ID!) {
                listPhdScholars(deptId: $deptId, tenantId: $tenantId) {
                  items {
                    scholarName thesisTitle institution department
                    yearOfRegistration status
                  }
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

        const results = {};

        responses.forEach((json, index) => {
          const key = Object.keys(json.data || {})[0];
          results[queries[index].key] = json.data?.[key]?.items || [];
        });

        console.log("🔥 Research Data:", results);

        setData(results);
        setLoading(false);

      } catch (err) {
        console.error("❌ Error:", err);
        setLoading(false);
      }
    };

    fetchData();
  }, [shortName, isReady]);

  if (loading)
    return <p className="text-center py-20">Loading...</p>;
  
  return (
    <div className="bg-gray-50">

      {/* HERO */}
      <div className="relative h-[280px] flex items-center justify-center text-white mb-16">

  <img
    src={researchBg}
    className="absolute w-full h-full object-cover"
    alt="research background"
  />

  <div className="absolute inset-0 bg-blue-900/70 backdrop-blur-sm"></div>

  <div className="relative text-center">
    <h1 className="text-5xl font-bold mb-3">
      Research & Development
    </h1>
    <p className="text-gray-200">
      Innovation • Publications • Patents • Future Technologies
    </p>
  </div>

</div>

      <div className="max-w-7xl mx-auto px-6">

        {/* STATS */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-20 text-center">
          {[
            { label: "Publications", value: data.publications.length },
            { label: "Patents", value: data.patents.length },
            { label: "Grants", value: data.grants.length },
            { label: "Scholars", value: data.scholars.length }
          ].map((stat, i) => (
            <div key={i} className="bg-white shadow-lg rounded-xl p-6 hover:scale-105 transition">
              <h2 className="text-3xl font-bold text-blue-700">{stat.value}</h2>
              <p className="text-gray-500">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* PUBLICATIONS */}
        <section className="mb-24">
          <h2 className="text-2xl font-semibold mb-8">Publications</h2>
          {data.publications.length === 0 ? (
            <p className="text-gray-500">No publications available</p>
          ) : (
            data.publications.map((pub, i) => (
              <div key={i} className="bg-white border-l-4 border-blue-600 shadow-md p-6 mb-6 rounded-lg">
                <h3 className="font-semibold text-lg">{pub.title}</h3>
                <p className="text-sm text-gray-600">{pub.authors}</p>
                <p className="text-sm text-gray-400">
                  {pub.journal} • {pub.year} • {pub.type}
                </p>
                {pub.doi && <p className="text-xs text-gray-400">DOI: {pub.doi}</p>}
              </div>
            ))
          )}
        </section>

        {/* PROFILES */}
        <section className="mb-24">
          <h2 className="text-2xl font-semibold mb-8">Faculty Publication Profiles</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {data.profiles.map((p, i) => (
              <div key={i} className="bg-white shadow-md p-6 rounded-lg">
                <p className="font-medium">Faculty ID: {p.facultyId}</p>
                {p.googleScholarLink && <a href={p.googleScholarLink} className="text-blue-600 text-sm">Google Scholar</a>}
                {p.irinsLink && <a href={p.irinsLink} className="text-blue-600 text-sm block">IRINS</a>}
              </div>
            ))}
          </div>
        </section>

        {/* GRANTS */}
        <section className="mb-24">
          <h2 className="text-2xl font-semibold mb-8">Research Grants</h2>
          {data.grants.map((g, i) => (
            <div key={i} className="bg-white shadow-md p-6 mb-4 rounded-lg">{g.text}</div>
          ))}
        </section>

        {/* PATENTS */}
        <section className="mb-24">
          <h2 className="text-2xl font-semibold mb-8">Patents</h2>
          {data.patents.map((p, i) => (
            <div key={i} className="bg-white shadow-md p-6 mb-4 rounded-lg">{p.text}</div>
          ))}
        </section>

        {/* SUMMARIES */}
        <section className="mb-24">
          <h2 className="text-2xl font-semibold mb-8">Faculty Research Summary</h2>
          {data.summaries.map((s, i) => (
            <div key={i} className="bg-white shadow-md p-6 mb-6 rounded-lg">
              <h3 className="font-semibold">{s.researchArea}</h3>
              <p className="text-sm">Guide: {s.guideName}</p>
              <p className="text-sm">{s.university}</p>
              <p className="text-xs text-blue-600">Status: {s.researchStatus}</p>
            </div>
          ))}
        </section>

        {/* GUIDES */}
        <section className="mb-24">
          <h2 className="text-2xl font-semibold mb-8">PhD Guides</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {data.guides.map((g, i) => (
              <div key={i} className="bg-white shadow-md p-6 rounded-lg">
                <h3>{g.facultyName}</h3>
                <p>{g.university}</p>
                <p>Guided: {g.scholarsGuided}</p>
              </div>
            ))}
          </div>
        </section>

        {/* SCHOLARS */}
        <section className="pb-20">
          <h2 className="text-2xl font-semibold mb-8">PhD Scholars</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {data.scholars.map((s, i) => (
              <div key={i} className="bg-white shadow-md p-6 rounded-lg">
                <h3>{s.scholarName}</h3>
                <p>{s.thesisTitle}</p>
                <p className="text-xs">{s.status}</p>
              </div>
            ))}
          </div>
        </section>

      </div>
    </div>
  );
};

export default DepartmentResearch;
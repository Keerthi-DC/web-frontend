import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDepartmentMeta } from "../../../hooks/useDepartmentMeta";
import researchBg from "/assets/research-background.gif";
import { Award, FileText, X } from "lucide-react";

const TABS = [
  "profiles",
  "grants",
  "patents",
  "summaries",
  "guides",
  "scholars"
];

const TAB_LABELS = {
  profiles: "Faculty Publications Profile",
  grants: "Research Grants",
  patents: "Patents",
  summaries: "Faculty Research Summary",
  guides: "PhD Guides",
  scholars: "PhD Scholars"
};

const DepartmentResearch = () => {
  const { shortName } = useParams();
  const { getId, isReady } = useDepartmentMeta();

  const [activeTab, setActiveTab] = useState("profiles");
  const [selectedItem, setSelectedItem] = useState(null);

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
    if (!deptId) return;

    const fetchData = async () => {
      try {
        const queries = [
          {
            key: "profiles",
            query: `query ($deptId: ID!, $tenantId: ID!) {
              listPublicationProfiles(deptId: $deptId, tenantId: $tenantId) {
                items { facultyId googleScholarLink irinsLink }
              }
            }`
          },
          {
            key: "grants",
            query: `query ($deptId: ID!, $tenantId: ID!) {
              listResearchGrants(deptId: $deptId, tenantId: $tenantId) {
                items { text }
              }
            }`
          },
          {
            key: "patents",
            query: `query ($deptId: ID!, $tenantId: ID!) {
              listPatents(deptId: $deptId, tenantId: $tenantId) {
                items { text }
              }
            }`
          },
          {
            key: "summaries",
            query: `query ($deptId: ID!, $tenantId: ID!) {
              listFacultyResearchSummaries(deptId: $deptId, tenantId: $tenantId) {
                items {
                  facultyId researchArea guideName guideDesignation university
                  yearOfRegistration yearOfDegreeAwarded researchStatus
                }
              }
            }`
          },
          {
            key: "guides",
            query: `query ($deptId: ID!, $tenantId: ID!) {
              listPhdGuides(deptId: $deptId, tenantId: $tenantId) {
                items { facultyName university recognizedYear scholarsGuided ongoingScholars }
              }
            }`
          },
          {
            key: "scholars",
            query: `query ($deptId: ID!, $tenantId: ID!) {
              listPhdScholars(deptId: $deptId, tenantId: $tenantId) {
                items {
                  scholarName thesisTitle institution department
                  yearOfRegistration status
                }
              }
            }`
          },
          {
            key: "faculty",
            query: `query ($deptId: ID!, $tenantId: ID!) {
              listFaculty(deptId: $deptId, tenantId: $tenantId) {
                items { facultyId name }
              }
            }`
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
                variables: { deptId, tenantId: "biet-college" }
              })
            }).then(res => res.json())
          )
        );

        const results = {};
        responses.forEach((json, index) => {
          const key = Object.keys(json.data || {})[0];
          results[queries[index].key] = json.data?.[key]?.items || [];
        });

        const facultyMap = {};
        (results.faculty || []).forEach(f => {
          facultyMap[f.facultyId] = f.name;
        });

        results.summaries = results.summaries.map(s => ({
          ...s,
          facultyName: facultyMap[s.facultyId] || "-"
        }));

        results.profiles = results.profiles.map(p => ({
          ...p,
          facultyName: facultyMap[p.facultyId] || "-"
        }));

        setData(results);
        setLoading(false);
      } catch (err) {
        console.error(err);
        setLoading(false);
      }
    };

    fetchData();
  }, [shortName, isReady]);

  if (loading) return <p className="text-center py-20">Loading...</p>;

  return (
    <div className="bg-gray-50 min-h-screen">

      {/* HERO */}
      <div className="relative h-[220px] flex items-center justify-center text-white">
        <img src={researchBg} className="absolute w-full h-full object-cover" />
        <div className="absolute inset-0 bg-blue-900/70"></div>
        <h1 className="relative text-4xl font-bold">Research & Development</h1>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-10 flex gap-8">

        {/* SIDEBAR */}
        <div className="w-[260px] bg-white rounded-xl shadow p-4 h-fit sticky top-24">
          {TABS.map(tab => (
            <div
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`cursor-pointer px-4 py-3 rounded-lg mb-2 transition
                ${activeTab === tab
                  ? "bg-blue-600 text-white"
                  : "hover:bg-gray-100 text-gray-700"}`}
            >
              {TAB_LABELS[tab]}
            </div>
          ))}
        </div>

        {/* CONTENT */}
        <div className="flex-1">

          {/* PROFILES */}
          {activeTab === "profiles" && (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {data.profiles.map((p, i) => {
                const initials = p.facultyName
                  ? p.facultyName.split(" ").map(w => w[0]).join("").slice(0, 2)
                  : "NA";

                return (
                  <div key={i} className="bg-white rounded-xl p-6 shadow hover:shadow-lg transition">
                    <div className="flex justify-between mb-6">
                      <div className="h-14 w-14 rounded-full bg-blue-100 flex items-center justify-center font-bold text-blue-700">
                        {initials}
                      </div>
                      <span className="text-xs text-gray-400">ACTIVE</span>
                    </div>

                    <h3 className="font-semibold text-lg text-blue-900">
                      {p.facultyName}
                    </h3>

                    <div className="flex gap-3 mt-6">
                      {p.googleScholarLink && (
                        <a href={p.googleScholarLink} target="_blank" rel="noreferrer"
                          className="flex-1 text-center bg-gray-100 hover:bg-blue-600 hover:text-white py-2 rounded">
                          Scholar
                        </a>
                      )}
                      {p.irinsLink && (
                        <a href={p.irinsLink} target="_blank" rel="noreferrer"
                          className="flex-1 text-center bg-gray-100 hover:bg-blue-600 hover:text-white py-2 rounded">
                          IRINS
                        </a>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {/* GRANTS */}
          {activeTab === "grants" && (
            <div>
              <h2 className="text-2xl font-semibold mb-6">Research Grants</h2>

              {data.grants.length === 0 ? (
                <p className="text-gray-500">No data available</p>
              ) : (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {data.grants.map((g, i) => (
                    <div
                      key={i}
                      onClick={() => setSelectedItem(g)}
                      className="bg-white rounded-xl p-6 shadow hover:shadow-lg transition border-l-4 border-blue-600 cursor-pointer"
                    >
                      <div className="flex justify-between items-center mb-4">
                        <div className="flex items-center gap-2 text-blue-700">
                          <Award size={18} />
                          <span className="text-sm font-medium">Grant #{i + 1}</span>
                        </div>

                        <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded">
                          Funded
                        </span>
                      </div>

                      <p className="text-gray-700 text-sm line-clamp-3">
                        {g.text}
                      </p>

                      <span className="text-blue-600 text-xs mt-2 inline-block">
                        Click to read →
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* PATENTS */}
          {activeTab === "patents" && (
            <div>
              <h2 className="text-2xl font-semibold mb-6">Patents</h2>

              {data.patents.length === 0 ? (
                <p className="text-gray-500">No data available</p>
              ) : (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {data.patents.map((p, i) => (
                    <div
                      key={i}
                      onClick={() => setSelectedItem(p)}
                      className="bg-white rounded-xl p-6 shadow hover:shadow-lg transition border-l-4 border-blue-600 cursor-pointer"
                    >
                      <div className="flex justify-between items-center mb-4">
                        <div className="flex items-center gap-2 text-blue-600">
                          <FileText size={18} />
                          <span className="text-sm font-medium">Patent #{i + 1}</span>
                        </div>

                        <span className="text-xs bg-purple-100 text-blue-600 px-2 py-1 rounded">
                          Filed
                        </span>
                      </div>

                      <p className="text-gray-700 text-sm line-clamp-3">
                        {p.text}
                      </p>

                      <span className="text-blue-600 text-xs mt-2 inline-block">
                        Click to read →
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* REST SAME (tables untouched) */}
          {activeTab === "summaries" && (
            <Table
              title="Faculty Research Summary"
              headers={["#","Faculty","Guide","Designation","University","Area","Reg","Awarded","Status"]}
              rows={data.summaries.map((s, i) => [
                i + 1, s.facultyName, s.guideName, s.guideDesignation,
                s.university, s.researchArea, s.yearOfRegistration,
                s.yearOfDegreeAwarded, s.researchStatus
              ])}
            />
          )}

          {activeTab === "guides" && (
            <Table
              title="PhD Guides"
              headers={["#", "Faculty", "University", "Recognized", "Guided", "Ongoing"]}
              rows={data.guides.map((g, i) => [
                i + 1, g.facultyName, g.university,
                g.recognizedYear, g.scholarsGuided, g.ongoingScholars
              ])}
            />
          )}

          {activeTab === "scholars" && (
            <Table
              title="PhD Scholars"
              headers={["#", "Name", "Institution", "Dept", "Year", "Thesis", "Status"]}
              rows={data.scholars.map((s, i) => [
                i + 1, s.scholarName, s.institution,
                s.department, s.yearOfRegistration,
                s.thesisTitle, s.status
              ])}
            />
          )}

        </div>
      </div>

      {/* MODAL */}
      {selectedItem && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white max-w-2xl w-full rounded-xl p-6 shadow-xl relative">

            <button
              onClick={() => setSelectedItem(null)}
              className="absolute top-4 right-4 text-gray-500 hover:text-red-500"
            >
              <X size={22} />
            </button>

            <h3 className="text-xl font-semibold mb-4">Details</h3>

            <p className="text-gray-700 leading-relaxed">
              {selectedItem.text}
            </p>

          </div>
        </div>
      )}
    </div>
  );
};

const Table = ({ title, headers, rows }) => (
  <div>
    <h2 className="text-2xl font-semibold mb-6">{title}</h2>

    {rows.length === 0 ? (
      <p className="text-gray-500">No data available</p>
    ) : (
      <div className="overflow-x-auto bg-white shadow rounded-xl">
        <table className="min-w-full text-sm">
          <thead className="bg-blue-600 text-white">
            <tr>
              {headers.map((h, i) => (
                <th key={i} className="px-4 py-3">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row, i) => (
              <tr key={i} className="border-b hover:bg-gray-50">
                {row.map((cell, j) => (
                  <td key={j} className="px-4 py-2">{cell}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    )}
  </div>
);

export default DepartmentResearch;

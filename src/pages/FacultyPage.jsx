import React, { useEffect, useState } from "react";
import { FaUniversity, FaUserTie, FaBuilding } from "react-icons/fa";

const API_ENDPOINT = import.meta.env.VITE_APPSYNC_URL;
const API_KEY = import.meta.env.VITE_APPSYNC_API_KEY;

const LIST_DEPARTMENTS_QUERY = `
  query ListDepartments {
    listDepartments {
      items {
        departmentId
        name
        shortName
      }
    }
  }
`;

const LIST_FACULTY_QUERY = `
  query ListFaculty($deptId: ID, $tenantId: ID) {
    listFaculty(deptId: $deptId, tenantId: $tenantId) {
      items {
        facultyId
        name
        designation
        profileImage
        cvUrl
        status
        deptId
      }
    }
  }
`;

export default function FacultyPage() {
  const [departments, setDepartments] = useState([]);
  const [faculty, setFaculty] = useState([]);
  const [selectedDept, setSelectedDept] = useState("");
  const [view, setView] = useState("grid");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const tenantId = "biet-college";

  // 🔥 Fetch Departments
  const fetchDepartments = async () => {
    const res = await fetch(API_ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": API_KEY,
      },
      body: JSON.stringify({ query: LIST_DEPARTMENTS_QUERY }),
    });

    const data = await res.json();
    setDepartments(data?.data?.listDepartments?.items || []);
  };

  // 🔥 Fetch Faculty
  const fetchFaculty = async (deptId = null) => {
    const variables = { deptId: deptId || null, tenantId };

    const res = await fetch(API_ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": API_KEY,
      },
      body: JSON.stringify({
        query: LIST_FACULTY_QUERY,
        variables,
      }),
    });

    const data = await res.json();
    setFaculty(data?.data?.listFaculty?.items || []);
  };

  useEffect(() => {
    const init = async () => {
      try {
        setLoading(true);
        await fetchDepartments();
        await fetchFaculty();
      } catch (e) {
        console.error(e);
        setError("Failed to load data");
      } finally {
        setLoading(false);
      }
    };
    init();
  }, []);

  // 🔥 Filter logic
  const filteredFaculty = selectedDept
    ? faculty.filter((f) => f.departmentId === selectedDept)
    : faculty;

  // 🔥 Grouping logic
  const grouped = {
    principal: [],
    hods: [],
    associate: [],
    assistant: [],
  };

  filteredFaculty.forEach((f) => {
    const role = f.designation?.toLowerCase() || "";

    if (role.includes("principal")) grouped.principal.push(f);
    else if (role.includes("hod")) grouped.hods.push(f);
    else if (role.includes("associate")) grouped.associate.push(f);
    else grouped.assistant.push(f);
  });

  // 🔥 Icons mapping
  const sectionIcons = {
    Principal: <FaUniversity className="text-blue-600" />,
    "Heads of Department": <FaBuilding className="text-gray-600" />,
    "Associate Professors": <FaUserTie className="text-gray-600" />,
    "Assistant Professors": <FaUserTie className="text-gray-500" />,
  };

  // 🔥 Card UI
  const renderCard = (f) => (
    <div
      key={f.facultyId}
      className="flex flex-col items-center bg-white rounded-md shadow-sm p-4 hover:shadow-md transition"
    >
      <img
        src={f.profileImage}
        alt={f.name}
        className="w-24 h-24 rounded-full object-cover mb-3"
      />
      <h3 className="text-lg font-semibold text-gray-800">{f.name}</h3>
      <p className="text-sm text-gray-600">{f.designation}</p>
      <a
        href={f.cvUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="text-blue-600 text-sm mt-2 hover:underline"
      >
        View CV
      </a>
    </div>
  );

  // 🔥 GRID VIEW
  const renderGrid = () => {
    const sections = [
      { title: "Principal", items: grouped.principal, highlight: true },
      { title: "Heads of Department", items: grouped.hods },
      { title: "Associate Professors", items: grouped.associate },
      { title: "Assistant Professors", items: grouped.assistant },
    ];

    return (
      <div className="space-y-8">
        {sections.map((s) => (
          <div key={s.title}>
            <h4
              className={`flex items-center gap-2 font-semibold border-b pb-1 ${
                s.highlight
                  ? "text-blue-600 border-blue-200"
                  : "text-gray-700 border-gray-200"
              }`}
            >
              {sectionIcons[s.title]}
              {s.title}
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-4">
              {s.items.length > 0 ? (
                s.items.map(renderCard)
              ) : (
                <p className="text-gray-500">
                  No {s.title.toLowerCase()}
                </p>
              )}
            </div>
          </div>
        ))}
      </div>
    );
  };

  // 🔥 HIERARCHY VIEW (simple version)
  const renderHierarchy = () => {
    const renderNode = (f) => (
      <div key={f.facultyId} className="text-center">
        <div className="bg-white shadow px-4 py-2 rounded-full inline-block">
          {f.name}
        </div>
      </div>
    );

    return (
      <div className="flex flex-col items-center space-y-6">
        {grouped.principal.length > 0 && renderNode(grouped.principal[0])}

        {grouped.hods.length > 0 && (
          <div className="flex gap-6 flex-wrap justify-center">
            {grouped.hods.map(renderNode)}
          </div>
        )}

        {grouped.associate.length > 0 && (
          <div className="flex gap-6 flex-wrap justify-center">
            {grouped.associate.map(renderNode)}
          </div>
        )}

        {grouped.assistant.length > 0 && (
          <div className="flex gap-6 flex-wrap justify-center">
            {grouped.assistant.map(renderNode)}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="container mx-auto py-8 px-4">
      {/* HEADER */}
      <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-6">
        <h1 className="text-3xl font-semibold text-gray-900">
          Faculty Directory
        </h1>

        {/* FILTER */}
        <select
          value={selectedDept}
          onChange={(e) => setSelectedDept(e.target.value)}
          className="border px-3 py-2 rounded mt-4 md:mt-0"
        >
          <option value="">All Departments</option>
          {departments.map((d) => (
            <option key={d.departmentId} value={d.departmentId}>
              {d.name}
            </option>
          ))}
        </select>

        {/* TOGGLE */}
        <div className="flex items-center gap-2 mt-4 md:mt-0">
          <span>Grid</span>
          <input
            type="checkbox"
            checked={view === "hierarchy"}
            onChange={(e) =>
              setView(e.target.checked ? "hierarchy" : "grid")
            }
          />
          <span>Hierarchy</span>
        </div>
      </div>

      {/* STATES */}
      {loading && <p>Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}

      {!loading && !error && (
        <div>{view === "grid" ? renderGrid() : renderHierarchy()}</div>
      )}
    </div>
  );
}
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

// ✅ VITE ENV (FIXED)
const API_ENDPOINT = import.meta.env.VITE_APPSYNC_URL;
const API_KEY = import.meta.env.VITE_APPSYNC_API_KEY;

// ✅ CORRECT GRAPHQL QUERY (items, not data)
const LIST_DEPARTMENTS_QUERY = `
  query ListDepartments {
    listDepartments {
      items {
        departmentId
        name
        shortName
        imageUrl
        hod
        programTypes
      }
    }
  }
`;

const DepartmentsPage = () => {
  const [departments, setDepartments] = useState([]);
  const [activeType, setActiveType] = useState("UG");
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  // ✅ FETCH DATA
  useEffect(() => {
    const fetchDepartments = async () => {
      try {
        const response = await fetch(API_ENDPOINT, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "x-api-key": API_KEY,
          },
          body: JSON.stringify({
            query: LIST_DEPARTMENTS_QUERY,
          }),
        });

        const result = await response.json();

        if (result.errors) {
          console.error("GraphQL Errors:", result.errors);
        }

        // ✅ CORRECT DATA PATH
        const items = result?.data?.listDepartments?.items || [];
        setDepartments(items);
      } catch (err) {
        console.error("Fetch error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchDepartments();
  }, []);

  // ✅ FILTER LOGIC
  const filteredDepartments = departments.filter((dep) =>
    dep.programTypes?.includes(activeType)
  );

  // ✅ TAB COMPONENT
  const Tab = ({ type, label }) => (
    <button
      onClick={() => setActiveType(type)}
      className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-300
        ${
          activeType === type
            ? "bg-blue-600 text-white shadow-md"
            : "bg-gray-100 text-gray-600 hover:bg-blue-100"
        }`}
    >
      {label}
    </button>
  );

  // ✅ CARD COMPONENT
  const Card = ({ dept }) => (
    <div
      onClick={() => navigate(`/departments/${dept.shortName}`)}
      className="group bg-white rounded-2xl shadow-md hover:shadow-xl hover:-translate-y-2 transition-all duration-300 cursor-pointer overflow-hidden"
    >
      {/* Image */}
      <div className="overflow-hidden">
        <img
          src={dept.imageUrl}
          alt={dept.name}
          className="w-full h-52 object-cover transform group-hover:scale-110 transition duration-500"
        />
      </div>

      {/* Content */}
      <div className="p-5 text-center">
        <h3 className="text-lg font-semibold mb-2">{dept.name}</h3>

        {dept.hod && (
          <p className="text-sm text-gray-500 mb-3">{dept.hod}</p>
        )}

        <button
          onClick={(e) => {
            e.stopPropagation();
            navigate(`/departments/${dept.shortName}`);
          }}
          className="mt-2 px-4 py-2 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
        >
          Visit
        </button>
      </div>
    </div>
  );

  // ✅ LOADING UI
  if (loading) {
    return (
      <div className="text-center py-20 text-lg font-semibold">
        Loading Departments...
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-16">

      {/* Title */}
      <h1 className="text-3xl font-bold text-center mb-10">
        Departments
      </h1>

      {/* Tabs */}
      <div className="flex justify-center gap-4 mb-12 flex-wrap">
        <Tab type="UG" label="Undergraduate" />
        <Tab type="PG" label="Postgraduate" />
        <Tab type="RESEARCH" label="Research" />
      </div>

      {/* Grid */}
      <div className="grid md:grid-cols-3 sm:grid-cols-2 gap-8 transition-all duration-500">

        {filteredDepartments.length === 0 ? (
          <div className="col-span-full text-center text-gray-500">
            No departments available
          </div>
        ) : (
          filteredDepartments.map((dept) => (
            <Card key={dept.departmentId} dept={dept} />
          ))
        )}

      </div>

    </div>
  );
};

export default DepartmentsPage;
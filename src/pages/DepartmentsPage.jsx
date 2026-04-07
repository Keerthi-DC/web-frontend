import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Search, X } from "lucide-react";

const API_ENDPOINT = import.meta.env.VITE_APPSYNC_URL;
const API_KEY = import.meta.env.VITE_APPSYNC_API_KEY;

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
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

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
  const filteredDepartments = departments.filter((dep) => {
    const matchesType = dep.programTypes?.includes(activeType);

    const matchesSearch = dep.name
      ?.toLowerCase()
      .includes(searchTerm.toLowerCase());

    return matchesType && matchesSearch;
  });

  // ✅ TAB
  const Tab = ({ type, label }) => (
    <button
      onClick={() => setActiveType(type)}
      className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-300
        ${
          activeType === type
            ? "bg-[#0B3C6D] text-white shadow-md"
            : "bg-gray-100 text-gray-700 hover:bg-gray-200"
        }`}
    >
      {label}
    </button>
  );

  // ✅ CARD
  const Card = ({ dept }) => (
    <div
      onClick={() => navigate(`/departments/${dept.shortName}`)}
      className="group bg-white rounded-2xl shadow-md hover:shadow-xl hover:-translate-y-2 transition-all duration-300 cursor-pointer overflow-hidden"
    >
      <div className="overflow-hidden">
        <img
          src={dept.imageUrl}
          alt={dept.name}
          className="w-full h-52 object-cover transform group-hover:scale-110 transition duration-500"
        />
      </div>

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
          className="mt-2 px-4 py-2 text-sm bg-[#0B3C6D] text-white rounded-lg hover:opacity-90 transition"
        >
          Visit
        </button>
      </div>
    </div>
  );

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
      <h1 className="text-3xl font-bold text-center mb-8">
        Departments
      </h1>

      {/* 🔍 SEARCH FIRST */}
      <div className="flex justify-center mb-6">
        <div className="relative w-full max-w-md">

          <Search
            size={18}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
          />

          <input
            type="text"
            placeholder="Search departments..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-11 pr-10 py-3 rounded-full border border-gray-300 
            focus:outline-none focus:ring-2 focus:ring-[#0B3C6D] 
            focus:border-[#0B3C6D] shadow-sm transition-all duration-300"
          />

          {searchTerm && (
            <X
              size={18}
              onClick={() => setSearchTerm("")}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 cursor-pointer hover:text-gray-600"
            />
          )}
        </div>
      </div>

      {/* ✅ TABS BELOW SEARCH */}
      <div className="flex justify-center gap-4 mb-12 flex-wrap">
        <Tab type="UG" label="Undergraduate" />
        <Tab type="PG" label="Postgraduate" />
        <Tab type="RESEARCH" label="Research" />
      </div>

      {/* GRID */}
      <div className="grid md:grid-cols-3 sm:grid-cols-2 gap-8">
        {filteredDepartments.length === 0 ? (
          <div className="col-span-full text-center text-gray-500">
            No departments found
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
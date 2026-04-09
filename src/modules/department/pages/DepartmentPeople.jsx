import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDepartmentMeta } from "../../../hooks/useDepartmentMeta";
import { Search, X } from "lucide-react";

const API_URL = import.meta.env.VITE_APPSYNC_URL;
const API_KEY = import.meta.env.VITE_APPSYNC_API_KEY;

// ✅ Faculty Query
const LIST_FACULTY = `
  query ListFaculty($deptId: ID, $tenantId: ID) {
    listFaculty(deptId: $deptId, tenantId: $tenantId) {
      items {
        facultyId
        name
        designation
        profileImage
        cvUrl
        status
      }
    }
  }
`;

// ✅ Staff Query
const LIST_STAFF = `
  query ListDeptStaff(
    $deptId: ID!,
    $staffType: String,
    $limit: Int,
    $tenantId:String
  ) {
    listDeptStaff(
      deptId: $deptId,
      staffType: $staffType,
      limit: $limit,
      tenantId:$tenantId
    ) {
      items {
        deptStaffId
        name
        designation
        staffType
        imageUrl
      }
    }
  }
`;

const DepartmentPeople = () => {
  const { shortName } = useParams();
  const { getId, isReady } = useDepartmentMeta();

  const [faculty, setFaculty] = useState([]);
  const [staff, setStaff] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("faculty");

  // ✅ FETCH DATA
  useEffect(() => {
    if (!shortName || !isReady) return;

    const fetchData = async () => {
      try {
        setLoading(true);

        const deptId = getId(shortName);
        if (!deptId) return;

        let staffType = null;
        if (activeTab === "technical") staffType = "technical";
        if (activeTab === "supporting") staffType = "supporting";

        if (activeTab === "faculty") {
          const res = await fetch(API_URL, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "x-api-key": API_KEY,
            },
            body: JSON.stringify({
              query: LIST_FACULTY,
              variables: {
                tenantId: "biet-college",
                deptId,
              },
            }),
          });

          const result = await res.json();
          const facultyList =
            result?.data?.listFaculty?.items || [];

          setFaculty(
            facultyList.filter((f) => f.status === "active")
          );
        } else {
          const res = await fetch(API_URL, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "x-api-key": API_KEY,
            },
            body: JSON.stringify({
              query: LIST_STAFF,
              variables: {
                deptId,
                staffType,
                limit: 100,
                tenantId: "biet-college",
              },
            }),
          });

          const result = await res.json();
          const staffList =
            result?.data?.listDeptStaff?.items || [];

          setStaff(staffList);
        }
      } catch (err) {
        console.error("FETCH ERROR:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [shortName, isReady, activeTab]);

  // ✅ FILTER (ONLY NAME)
  const filterPeople = (list) => {
    return list.filter((p) =>
      p.name?.toLowerCase().includes(searchTerm.toLowerCase())
    );
  };

  // ✅ CARD RENDER
  const renderCards = (list, type) => (
    <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-8">
      {list.map((p, i) => {
        const isFaculty = type === "faculty";

        const image = isFaculty
          ? p.profileImage ||
            `https://i.pravatar.cc/150?img=${(i % 70) + 1}`
          : p.imageUrl ||
            `https://i.pravatar.cc/150?img=${(i % 70) + 1}`;

        return (
          <div
            key={i}
            onClick={() => {
              if (isFaculty && p.cvUrl) {
                window.open(p.cvUrl, "_blank");
              }
            }}
            className={`bg-white shadow rounded-lg p-6 text-center transition ${
              isFaculty ? "hover:shadow-lg cursor-pointer" : ""
            }`}
          >
            <div className="w-24 h-24 mx-auto mb-4 rounded-full overflow-hidden bg-gray-100">
              <img
                src={image}
                alt={p.name}
                className="w-full h-full object-contain"
              />
            </div>

            <h3 className="font-semibold">{p.name}</h3>
            <p className="text-sm text-gray-500">
              {p.designation}
            </p>
          </div>
        );
      })}
    </div>
  );

  return (
    <div className="max-w-7xl mx-auto px-6 py-20">
      <h1 className="text-4xl font-bold mb-8 text-center">
        People
      </h1>

      {/* 🔍 SEARCH */}
      <div className="flex justify-center mb-6">
        <div className="relative w-full max-w-md">
          <Search
            size={18}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
          />

          <input
            type="text"
            placeholder="Search people..."
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

      {/* 🔥 TABS */}
      <div className="flex justify-center mb-12 gap-4 flex-wrap">
        <button
          onClick={() => setActiveTab("faculty")}
          className={`px-6 py-2 rounded-full ${
            activeTab === "faculty"
              ? "bg-[#0b3c5d] text-white"
              : "bg-gray-200"
          }`}
        >
          Faculty
        </button>

        <button
          onClick={() => setActiveTab("technical")}
          className={`px-6 py-2 rounded-full ${
            activeTab === "technical"
              ? "bg-[#0b3c5d] text-white"
              : "bg-gray-200"
          }`}
        >
          Technical Staff
        </button>

        <button
          onClick={() => setActiveTab("supporting")}
          className={`px-6 py-2 rounded-full ${
            activeTab === "supporting"
              ? "bg-[#0b3c5d] text-white"
              : "bg-gray-200"
          }`}
        >
          Supporting Staff
        </button>
      </div>

      {/* 🔥 CONTENT */}
      {loading ? (
        <p className="text-center text-gray-500">Loading...</p>
      ) : activeTab === "faculty" ? (
        filterPeople(faculty).length === 0 ? (
          <p className="text-center text-gray-500">
            No results found
          </p>
        ) : (
          renderCards(filterPeople(faculty), "faculty")
        )
      ) : filterPeople(staff).length === 0 ? (
        <p className="text-center text-gray-500">
          No results found
        </p>
      ) : (
        renderCards(filterPeople(staff), "staff")
      )}
    </div>
  );
};

export default DepartmentPeople;
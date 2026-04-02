import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDepartmentMeta } from "../../../hooks/useDepartmentMeta";

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

  const [activeTab, setActiveTab] = useState("faculty");

  // ✅ Fetch Data
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

        // 🔥 FACULTY
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
        }

        // 🔥 STAFF
        else {
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

  // ✅ Card Renderer
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
      <h1 className="text-4xl font-bold mb-12 text-center">
        People
      </h1>

      {/* 🔥 TABS */}
      <div className="flex justify-center mb-12 gap-4 flex-wrap">
        <button
          onClick={() => setActiveTab("faculty")}
          className={`px-6 py-2 rounded-full ${
            activeTab === "faculty"
              ? "bg-blue-600 text-white"
              : "bg-gray-200"
          }`}
        >
          Faculty
        </button>

        <button
          onClick={() => setActiveTab("technical")}
          className={`px-6 py-2 rounded-full ${
            activeTab === "technical"
              ? "bg-blue-600 text-white"
              : "bg-gray-200"
          }`}
        >
          Technical Staff
        </button>

        <button
          onClick={() => setActiveTab("supporting")}
          className={`px-6 py-2 rounded-full ${
            activeTab === "supporting"
              ? "bg-blue-600 text-white"
              : "bg-gray-200"
          }`}
        >
          Supporting Staff
        </button>
      </div>

      {/* 🔥 CONTENT */}
      {loading ? (
        <p className="text-center text-gray-500">
          Loading...
        </p>
      ) : activeTab === "faculty" ? (
        faculty.length === 0 ? (
          <p className="text-center text-gray-500">
            No faculty found
          </p>
        ) : (
          renderCards(faculty, "faculty")
        )
      ) : staff.length === 0 ? (
        <p className="text-center text-gray-500">
          No {activeTab} staff found
        </p>
      ) : (
        renderCards(staff, "staff")
      )}
    </div>
  );
};

export default DepartmentPeople;
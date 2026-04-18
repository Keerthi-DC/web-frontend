import React, { useEffect, useState } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import { useDepartmentMeta } from "../hooks/useDepartmentMeta";
import BietLoader from "../../../components/ui/BietLoader";

const API_URL = import.meta.env.VITE_APPSYNC_URL;
const API_KEY = import.meta.env.VITE_APPSYNC_API_KEY;

const LIST_ACHIEVEMENTS = `
query ListAchievements($deptId: ID!, $type: String, $tenantId: ID!) {
  listAchievements(deptId: $deptId, type: $type, tenantId: $tenantId) {
    items {
      achievementId
      deptId
      type
      text
    }
  }
}
`;

const DepartmentAchievements = () => {
  const { shortName } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const { getId, isReady } = useDepartmentMeta();

  const [studentAchievements, setStudentAchievements] = useState([]);
  const [facultyAchievements, setFacultyAchievements] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState(null);
  const [activeTab, setActiveTab] = useState("student");

  // ✅ FETCH FUNCTION
  const fetchAchievements = async (type, deptId) => {
    try {
      const res = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-api-key": API_KEY,
        },
        body: JSON.stringify({
          query: LIST_ACHIEVEMENTS,
          variables: {
            deptId,
            tenantId: "biet-college",
            type,
          },
        }),
      });

      const result = await res.json();
      return result.data?.listAchievements?.items || [];
    } catch (err) {
      console.error(err);
      return [];
    }
  };

  // ✅ LOAD DATA
  useEffect(() => {
    if (!shortName || !isReady) return;

    const loadData = async () => {
      const deptId = getId(shortName);
      if (!deptId) return;

      const students = await fetchAchievements("student", deptId);
      const faculty = await fetchAchievements("staff", deptId); // 🔥 IMPORTANT FIX

      setStudentAchievements(students);
      setFacultyAchievements(faculty);
      setLoading(false);
    };

    loadData();
  }, [shortName, isReady]);

  // ✅ HASH ROUTING FIX
  useEffect(() => {
    if (location.hash === "#faculty") {
      setActiveTab("faculty");
    } else {
      setActiveTab("student");
    }
  }, [location.hash]);

  if (loading) {
    return <BietLoader />;
  }

  return (
    <div className="bg-gradient-to-b from-[#f8f9fa] to-white min-h-screen font-sans text-[#1a1a1a]">
      <main className="pt-28 pb-20 px-6 md:px-12 lg:px-24 max-w-7xl mx-auto">

        {/* HERO */}
        <section className="mb-20 grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <span className="uppercase tracking-widest text-yellow-600 font-semibold text-xs">
              Achievements & Recognition
            </span>

            <h2 className="text-5xl md:text-6xl font-bold leading-tight text-[#0f172a]">
              Celebrating <span className="text-yellow-600">Excellence</span>
            </h2>

            <p className="text-gray-600 max-w-md">
              A glimpse into outstanding accomplishments of our students and faculty shaping the future.
            </p>
          </div>

          <div className="rounded-2xl overflow-hidden shadow-xl">
            <img
              src="https://images.unsplash.com/photo-1523580494863-6f3031224c94"
              className="w-full h-[320px] object-cover"
            />
          </div>
        </section>

        {/* TAB SWITCH */}
        <div className="flex justify-center mb-16">
          <div className="bg-gray-100 rounded-full p-1 flex gap-1 shadow-inner">
            {["student", "faculty"].map((tab) => (
              <button
                key={tab}
                onClick={() => {
                  setActiveTab(tab);
                  navigate(`#${tab === "student" ? "students" : "faculty"}`);
                }}
                className={`px-6 py-2 rounded-full text-sm font-semibold transition-all duration-300 ${
                  activeTab === tab
                    ? "bg-white shadow text-[#0f172a]"
                    : "text-gray-500 hover:text-black"
                }`}
              >
                {tab === "student" ? "Students" : "Faculty"}
              </button>
            ))}
          </div>
        </div>

        {/* STUDENTS */}
        {activeTab === "student" && (
          <section className="mb-24">
            <h3 className="text-3xl font-bold mb-10 text-[#0f172a]">
              Student Achievements
            </h3>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {studentAchievements.map((item, i) => (
                <div
                  key={i}
                  onClick={() => setSelected(item)}
                  className="group bg-white/70 backdrop-blur-lg p-6 rounded-xl border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer hover:-translate-y-1"
                >
                  <div className="h-1 w-10 bg-yellow-500 mb-4 rounded"></div>

                  <p className="text-gray-700 text-sm line-clamp-4">
                    {item.text}
                  </p>

                  <div className="mt-4 text-xs text-gray-400">
                    Click to view
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* FACULTY */}
        {activeTab === "faculty" && (
          <section>
            <h3 className="text-3xl font-bold mb-10 text-[#0f172a]">
              Faculty Achievements
            </h3>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {facultyAchievements.map((item, i) => (
                <div
                  key={i}
                  onClick={() => setSelected(item)}
                  className="group bg-white p-6 rounded-xl border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer hover:-translate-y-1"
                >
                  <div className="h-1 w-10 bg-yellow-500 mb-4 rounded"></div>

                  <p className="text-gray-700 text-sm italic line-clamp-4">
                    {item.text}
                  </p>

                  <div className="mt-4 text-xs text-gray-400">
                    Click to view →
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}
      </main>

      {/* MODAL */}
      {selected && (
        <div
          className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50"
          onClick={() => setSelected(null)}
        >
          <div
            className="bg-white rounded-2xl shadow-2xl max-w-lg w-full p-8 relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setSelected(null)}
              className="absolute top-4 right-4 text-gray-400 hover:text-black"
            >
              ✕
            </button>

            <h3 className="text-xl font-bold mb-4 text-[#0f172a]">
              Achievement Details
            </h3>

            <p className="text-gray-600">
              {selected.text}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default DepartmentAchievements;

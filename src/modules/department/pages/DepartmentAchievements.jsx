import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDepartmentMeta } from "../../../hooks/useDepartmentMeta";

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
  const { getId, isReady } = useDepartmentMeta();

  const [studentAchievements, setStudentAchievements] = useState([]);
  const [facultyAchievements, setFacultyAchievements] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState(null);

  // ✅ Fetch function
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
      console.log(`🔥 ${type} response:`, result);

      if (result.errors) {
        console.error(result.errors);
        return [];
      }

      return result.data?.listAchievements?.items || [];
    } catch (err) {
      console.error("FETCH ERROR:", err);
      return [];
    }
  };

  useEffect(() => {
    if (!shortName || !isReady) return;

    const loadData = async () => {
      setLoading(true);

      // ✅ Resolve deptId dynamically
      const deptId = getId(shortName);
      console.log("Resolved deptId:", deptId);

      if (!deptId) {
        setLoading(false);
        return;
      }

      const students = await fetchAchievements("student", deptId);
      const faculty = await fetchAchievements("staff", deptId);

      setStudentAchievements(students);
      setFacultyAchievements(faculty);

      setLoading(false);
    };

    loadData();
  }, [shortName, isReady]);

  // ✅ Loading
  if (loading) {
    return (
      <div className="text-center py-20 text-gray-500">
        Loading achievements...
      </div>
    );
  }

  // ✅ Card renderer
  const renderCards = (items) => {
    if (!items || items.length === 0) {
      return <p className="text-gray-400">No data available</p>;
    }

    return (
      <div className="grid md:grid-cols-3 gap-8">
        {items.map((item, i) => (
          <div
            key={i}
            onClick={() => setSelected(item)}
            className="cursor-pointer bg-white rounded-lg shadow hover:shadow-lg transition p-5"
          >
            <h3 className="font-semibold text-lg mb-2">
              Achievement #{item.achievementId}
            </h3>

            <p className="text-gray-600 text-sm line-clamp-3">
              {item.text}
            </p>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-20">
      <h1 className="text-4xl font-bold mb-16 text-center">
        Achievements
      </h1>

      {/* Students */}
      <section id="students" className="mb-24">
        <h2 className="text-2xl font-semibold mb-8">
          Student Achievements
        </h2>
        {renderCards(studentAchievements)}
      </section>

      {/* Faculty */}
      <section id="faculty">
        <h2 className="text-2xl font-semibold mb-8">
          Faculty Achievements
        </h2>
        {renderCards(facultyAchievements)}
      </section>

      {/* Modal */}
      {selected && (
        <div
          className="fixed inset-0 bg-black/50 flex items-center justify-center"
          onClick={() => setSelected(null)}
        >
          <div
            className="bg-white rounded-lg max-w-xl p-8"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="text-2xl font-bold mb-4">
              Achievement #{selected.achievementId}
            </h3>

            <p className="text-gray-700">{selected.text}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default DepartmentAchievements;
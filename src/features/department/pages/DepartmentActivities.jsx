import React, { useEffect, useState } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import { useDepartmentMeta } from "../hooks/useDepartmentMeta";

const DepartmentActivities = () => {
  const { shortName } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const { getId, isReady } = useDepartmentMeta();

  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [activeSection, setActiveSection] = useState("department");

  const query = `
  query GetActivities($deptId: ID!,$tenantId: ID!) {

    department: listDepartmentActivities(deptId: $deptId,tenantId: $tenantId) {
      items {
        deptActivityLogId
        text
        createdAt
      }
    }

    forum: listForumEvents(deptId: $deptId,tenantId:$tenantId) {
      items {
        forumEventId
        title
        description
        createdAt
      }
    }

  }
  `;

  // ✅ HASH ROUTING FIX
  useEffect(() => {
    if (location.hash === "#forum") {
      setActiveSection("forum");
    } else {
      setActiveSection("department");
    }
  }, [location.hash]);

  useEffect(() => {
    if (!shortName || !isReady) return;

    const fetchData = async () => {
      try {
        setError(null);

        const deptId = getId(shortName);
        if (!deptId) {
          setError("Department not found");
          return;
        }

        const jsonRes = await fetch(`/data/departments/${shortName}.json`);
        const json = await jsonRes.json();

        const gqlRes = await fetch(import.meta.env.VITE_APPSYNC_URL, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "x-api-key": import.meta.env.VITE_APPSYNC_API_KEY
          },
          body: JSON.stringify({
            query,
            variables: {
              deptId,
              tenantId: "biet-college"
            }
          })
        });

        const gqlData = await gqlRes.json();
        const d = gqlData.data;

        setData({
          ...json,
          activities: {
            departmentActivities: (d?.department?.items || []).map(a => ({
              name: a.text,
              description: a.text,
              date: new Date(a.createdAt).toLocaleDateString(),
              image: "https://picsum.photos/400/200?random=" + Math.random()
            })),

            forumActivities: (d?.forum?.items || []).map(f => ({
              title: f.title,
              description: f.description,
              createdAt: new Date(f.createdAt).toLocaleDateString()
            }))
          }
        });

      } catch (err) {
        console.error(err);
        setError("Something went wrong");
      }
    };

    fetchData();
  }, [shortName, isReady]);

  if (!data && !error)
    return <p className="text-center mt-10">Loading activities...</p>;

  if (error)
    return <p className="text-center text-red-500 mt-10">{error}</p>;

  const activities = data.activities || {};

  return (
    <div className="max-w-7xl mx-auto px-6 py-20">

      <h1 className="text-4xl font-bold mb-10 text-center">
        Activities
      </h1>

      {/* 🔥 TAB SWITCH */}
      <div className="flex justify-center mb-16">
        <div className="bg-gray-100 rounded-full p-1 flex gap-1 shadow-inner">

          {["department", "forum"].map((tab) => (
            <button
              key={tab}
              onClick={() => {
                setActiveSection(tab);
                navigate(`#${tab}`);
              }}
              className={`px-6 py-2 rounded-full text-sm font-semibold transition-all duration-300 ${
                activeSection === tab
                  ? "bg-white shadow text-[#0f172a]"
                  : "text-gray-500 hover:text-black"
              }`}
            >
              {tab === "department" ? "Department" : "Forum"}
            </button>
          ))}

        </div>
      </div>

      {/* 🔹 DEPARTMENT */}
      {activeSection === "department" && (
        <section className="mb-24">
          <h2 className="text-2xl font-semibold mb-8">
            Department Activities
          </h2>

          {activities.departmentActivities?.length === 0 ? (
            <p className="text-gray-400">No activities found</p>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {activities.departmentActivities.map((a, i) => (
                <div key={i} className="bg-white shadow rounded-lg overflow-hidden hover:shadow-lg transition">
                  <img src={a.image} className="w-full h-48 object-cover" />
                  <div className="p-5">
                    <h3 className="font-semibold text-lg">{a.name}</h3>
                    <p className="text-sm text-gray-500">{a.date}</p>
                    <p className="text-sm mt-2">{a.description}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      )}

      {/* 🔹 FORUM */}
      {/* 🔹 FORUM */}
{activeSection === "forum" && (
  <section className="mb-24">
    <h2 className="text-2xl font-semibold mb-8">
      Forum Activities
    </h2>

    {activities.forumActivities?.length === 0 ? (
      <p className="text-gray-400">No forum events found</p>
    ) : (
      <div className="space-y-6">

        {activities.forumActivities.map((f, i) => (
          <article
            key={i}
            className="group bg-white rounded-xl p-6 shadow-sm hover:shadow-xl transition-all duration-300"
          >
            {/* TOP */}
            <div className="flex justify-between items-start mb-4">
              <span className="px-3 py-1 rounded-full bg-blue-100 text-[#0b3c5d]text-[10px] font-bold uppercase tracking-widest">
                Forum
              </span>

              <time className="text-xs font-semibold text-[#0b3c5d] uppercase tracking-widest">
                {f.createdAt}
              </time>
            </div>

            {/* TITLE */}
            <h3 className="text-2xl font-bold text-gray-900 group-hover:text-[#0b3c5d] transition mb-3">
              {f.title}
            </h3>

            {/* DESCRIPTION */}
            <p className="text-gray-600 leading-relaxed mb-5">
              {f.description}
            </p>

            {/* ACTIONS */}
            <div className="flex items-center gap-4">
              <button className="bg-gradient-to-r from-[#0b3c5d] to-[#021726] text-white px-5 py-2 rounded-lg text-sm font-semibold hover:scale-95 transition">
                View Details
              </button>

              <button className="text-[#0b3c5d] text-sm font-semibold hover:underline">
                Archive
              </button>
            </div>
          </article>
        ))}

      </div>
    )}
  </section>
)}
    </div>
  );
};

export default DepartmentActivities;

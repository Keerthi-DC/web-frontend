import React, { useEffect, useState } from "react";
import { FaCheckCircle } from "react-icons/fa";

export default function VisionPage() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("vision");

  /* ---------- FETCH JSON ---------- */
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("/data/vision.json");
        if (!res.ok) throw new Error("Failed to fetch");
        const json = await res.json();
        setData(json);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <section className="py-12 text-center">
        <p>Loading...</p>
      </section>
    );
  }

  if (!data) return null;

  const { intro, vision, mission, qualityPolicy, swoc } = data;

  /* ---------- UI ---------- */
  return (
    <section className="p-4 m-4 bg-gray-50">

      {/* INTRO */}
      <div className="text-center mb-12">
        <h1 className="text-3xl font-bold text-gray-900 mb-3">
          {intro?.title}
        </h1>
        <p className="text-gray-600 max-w-3xl mx-auto">
          {intro?.description}
        </p>
      </div>

      {/* TABS */}
      <div className="flex justify-center gap-4 mb-10 flex-wrap">
        {["vision", "mission", "quality", "swoc"].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-5 py-2 rounded-full font-medium transition ${
              activeTab === tab
                ? "bg-blue-600 text-white"
                : "bg-white shadow text-gray-700"
            }`}
          >
            {tab.toUpperCase()}
          </button>
        ))}
      </div>

      {/* CONTENT */}
      <div className="max-w-5xl mx-auto">

        {/* VISION */}
        {activeTab === "vision" && (
          <div className="bg-white rounded-xl shadow p-8 text-center">
            <h2 className="text-2xl font-semibold mb-4">
              {vision?.title}
            </h2>
            <p className="text-gray-700 leading-relaxed">
              {vision?.content}
            </p>
          </div>
        )}

        {/* MISSION */}
        {activeTab === "mission" && (
          <div className="bg-white rounded-xl shadow p-8 text-center">
            <h2 className="text-2xl font-semibold mb-4">
              {mission?.title}
            </h2>
            <p className="text-gray-700 leading-relaxed">
              {mission?.content}
            </p>
          </div>
        )}

        {/* QUALITY POLICY */}
        {activeTab === "quality" && (
          <div className="bg-white rounded-xl shadow p-8">
            <h2 className="text-2xl font-semibold mb-6 text-center">
              {qualityPolicy?.title}
            </h2>

            <div className="grid md:grid-cols-2 gap-6">
              {qualityPolicy?.points?.map((point, idx) => (
                <div
                  key={idx}
                  className="flex items-start gap-3 bg-gray-50 p-4 rounded-lg"
                >
                  <FaCheckCircle className="text-green-600 mt-1" />
                  <p className="text-gray-700">{point}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* SWOC */}
        {activeTab === "swoc" && (
          <div>
            <h2 className="text-2xl font-semibold text-center mb-8">
              SWOC Analysis
            </h2>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">

              {/* Strengths */}
              <div className="bg-green-50 rounded-xl p-5 shadow">
                <h3 className="font-semibold text-green-700 mb-3">
                  Strengths
                </h3>
                <ul className="space-y-2 text-sm">
                  {swoc?.strengths?.map((item, i) => (
                    <li key={i}>• {item}</li>
                  ))}
                </ul>
              </div>

              {/* Weakness */}
              <div className="bg-red-50 rounded-xl p-5 shadow">
                <h3 className="font-semibold text-red-700 mb-3">
                  Weakness
                </h3>
                <ul className="space-y-2 text-sm">
                  {swoc?.weakness?.map((item, i) => (
                    <li key={i}>• {item}</li>
                  ))}
                </ul>
              </div>

              {/* Opportunities */}
              <div className="bg-blue-50 rounded-xl p-5 shadow">
                <h3 className="font-semibold text-blue-700 mb-3">
                  Opportunities
                </h3>
                <ul className="space-y-2 text-sm">
                  {swoc?.opportunities?.map((item, i) => (
                    <li key={i}>• {item}</li>
                  ))}
                </ul>
              </div>

              {/* Threats */}
              <div className="bg-yellow-50 rounded-xl p-5 shadow">
                <h3 className="font-semibold text-yellow-700 mb-3">
                  Threats
                </h3>
                <ul className="space-y-2 text-sm">
                  {swoc?.threats?.map((item, i) => (
                    <li key={i}>• {item}</li>
                  ))}
                </ul>
              </div>

            </div>
          </div>
        )}

      </div>
    </section>
  );
}
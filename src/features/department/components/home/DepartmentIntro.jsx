import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useDepartmentMeta } from "../../hooks/useDepartmentMeta";
import useDepartmentHome from "../../hooks/useDepartmentHome";
import BietLoader from "../../../../components/ui/BietLoader";

const DepartmentIntro = () => {
  const { shortName } = useParams();
  const { getId, isReady } = useDepartmentMeta();
  const deptId = isReady ? getId(shortName) : null;
  const { intro: data, loading } = useDepartmentHome(deptId);

  const [expanded, setExpanded] = useState(false);
  const [tab, setTab] = useState("vision");
  const [swotTab, setSwotTab] = useState("strengths");

  if (loading) return <BietLoader />;
  if (!data) return null;

  // About split
  const words = data.about?.intro?.split(" ") || [];
  const shortText = words.slice(0, 90).join(" ") + "...";

  const formatBullets = (text) => {
    return text
      ?.split("•")
      .filter((item) => item.trim() !== "")
      .map((item, index) => (
        <p key={index} className="mb-2">
          • {item.trim()}
        </p>
      ));
  };

  // 🔥 PERFECT SWOT SECTION
  const renderSwot = () => {
    if (!data.swot) return null;

    const currentData = data.swot[swotTab] || [];

    return (
      <div className="max-w-3xl">

        {/* INNER TABS */}
        <div className="flex gap-3 mb-8">
          {["strengths", "weaknesses", "opportunities", "threats"].map((t) => (
            <button
              key={t}
              onClick={() => setSwotTab(t)}
              className={`px-6 py-2 rounded-lg text-sm font-semibold transition-all duration-200 ${
                swotTab === t
                  ? "bg-[#0b2a4a] text-white shadow-sm"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
            >
              {t.toUpperCase()}
            </button>
          ))}
        </div>

        {/* DIVIDER LINE (IMPORTANT) */}
        <div className="border-t border-gray-200 pt-6">

          {/* HEADER */}
          <div className="mb-6">
            <h2 className="text-[24px] font-semibold text-gray-900 flex items-center gap-3">
              Departmental {swotTab.charAt(0).toUpperCase() + swotTab.slice(1)}
            </h2>
          </div>

          {/* LIST */}
          <div className="space-y-6">
            {currentData.map((item, index) => (
              <div key={index} className="flex items-start gap-4">
                {/* TEXT */}
                <div>
                  <h3 className="text-[15px] font-medium text-gray-700">
                    * {item.split(".")[0]}
                  </h3>
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>
    );
  };

  return (
    <section className="bg-[#f9fafb] py-20"> {/* 🔥 MATCHED BACKGROUND */}
      <div className="max-w-7xl mx-auto px-6">

        {/* ABOUT SECTION */}
        <div className="bg-white rounded-xl shadow-sm p-6 md:p-8 grid md:grid-cols-2 gap-8 items-center">

          <div className="w-full h-[420px]">
            <img
              src={data.hero?.image || "/assets/default-dept.jpg"}
              alt={data.hero?.title}
              className="rounded-xl w-full h-full object-cover"
            />
          </div>

          <div className="h-[420px] flex flex-col justify-center">

            <h2 className="text-xs text-blue-600 font-semibold uppercase tracking-wider">
              About the Department
            </h2>

            <h3 className="text-2xl md:text-3xl font-semibold mt-2 text-gray-900">
              {data.hero?.title}
            </h3>

            <div className="mt-4 text-gray-600 text-sm md:text-base h-[250px] overflow-y-auto pr-2">
              <p>{expanded ? data.about?.intro : shortText}</p>
            </div>

            <button
              onClick={() => setExpanded(!expanded)}
              className="w-[200px] mt-4 bg-yellow-400 hover:bg-yellow-500 text-black px-6 py-3 rounded-lg font-semibold transition"
            >
              {expanded ? "Show less" : "Read more →"}
            </button>

          </div>
        </div>

        {/* MAIN TABS SECTION */}
        <div className="mt-16 bg-white rounded-xl shadow-sm p-10">

          {/* TOP TABS */}
          <div className="flex gap-6 mb-10">
            {["vision", "mission", "swot", "peo", "pso"].map((t) => (
              <button
                key={t}
                onClick={() => setTab(t)}
                className={`text-sm font-semibold pb-2 ${
                  tab === t
                    ? "text-[#0b2a4a] border-b-2 border-[#0b2a4a]"
                    : "text-gray-500 hover:text-[#0b2a4a]"
                }`}
              >
                {t.toUpperCase()}
              </button>
            ))}
          </div>

          {/* CONTENT */}
          <div className="text-gray-700">

            {tab === "vision" && formatBullets(data.about?.vision)}
            {tab === "mission" && formatBullets(data.about?.mission)}
            {tab === "peo" && formatBullets(data.about?.peo)}
            {tab === "pso" && formatBullets(data.about?.pso)}
            {tab === "swot" && renderSwot()}

          </div>

        </div>

      </div>
    </section>
  );
};

export default DepartmentIntro;

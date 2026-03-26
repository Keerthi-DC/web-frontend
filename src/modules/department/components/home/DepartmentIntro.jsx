import React, { useState } from "react";

const DepartmentIntro = ({ data }) => {
  if (!data) return null;

  const [expanded, setExpanded] = useState(false);
  const [tab, setTab] = useState("vision");
  const [swotTab, setSwotTab] = useState("strengths");

  // ✅ About split
  const words = data.about.intro?.split(" ") || [];
  const shortText = words.slice(0, 90).join(" ") + "...";

  // ✅ Bullet formatter
  const formatBullets = (text) => {
    return text
      ?.split("•")
      .filter(item => item.trim() !== "")
      .map((item, index) => (
        <p key={index} className="mb-2">
          • {item.trim()}
        </p>
      ));
  };

  // ✅ SWOT with INNER TABS 🔥
  const renderSwot = () => {
    if (!data.swot) return null;

    const currentData = data.swot[swotTab] || [];

    const colors = {
      strengths: "text-green-600",
      weaknesses: "text-red-500",
      opportunities: "text-blue-600",
      threats: "text-yellow-600"
    };

    return (
      <div>
        {/* INNER TABS */}
        <div className="flex flex-wrap gap-3 mb-4">
          {["strengths", "weaknesses", "opportunities", "threats"].map(t => (
            <button
              key={t}
              onClick={() => setSwotTab(t)}
              className={`px-4 py-2 rounded text-sm font-medium transition ${
                swotTab === t
                  ? "bg-blue-400 text-white"
                  : "bg-gray-100 hover:bg-gray-200"
              }`}
            >
              {t.toUpperCase()}
            </button>
          ))}
        </div>

        {/* CONTENT */}
        <div className="bg-gray-100 p-5 rounded-md shadow-sm text-sm">
          <b className={colors[swotTab]}>
            {swotTab.toUpperCase()}:
          </b>

          <ul className="mt-2 list-disc pl-5">
            {currentData.map((item, index) => (
              <li key={index} className="mb-1">
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
    );
  };

  return (
    <section className="bg-gray-200 py-20">
      <div className="max-w-7xl mx-auto px-6">

        {/* ================== DIV 1 (ABOUT + IMAGE) ================== */}
        <div className="grid md:grid-cols-2 gap-10 items-center">

          {/* LEFT: ABOUT */}
          <div className="h-[420px] flex flex-col">

            <div>
              <h2 className="text-sm text-yellow-500 font-semibold tracking-wide">
                About the Department
              </h2>

              <h3 className="text-3xl font-bold mt-2">
                {data.hero.title}
              </h3>

              {/* SCROLLABLE TEXT */}
              <div className="mt-6 text-gray-700 leading-relaxed h-[250px] overflow-y-auto pr-2">
                <p>
                  {expanded ? data.about.intro : shortText}
                </p>
              </div>

              {/* BUTTON JUST BELOW TEXT */}
              <button
                onClick={() => setExpanded(!expanded)}
                className="bg-yellow-400 text-black px-6 py-2 rounded font-semibold mt-4 w-fit"
              >
                {expanded ? "Show less" : "Read more →"}
              </button>
            </div>

          </div>

          {/* RIGHT: IMAGE */}
          <div className="h-[420px] flex items-center justify-center">
            <img
              src={data.hero.image}
              alt={data.hero.title}
              className="rounded-lg shadow-lg w-full h-full object-cover"
            />
          </div>

        </div>

        {/* ================== DIV 2 (FULL WIDTH TABS) ================== */}
        <div className="mt-16 bg-white rounded-lg shadow p-8">

          {/* Tabs */}
          <div className="flex flex-wrap gap-3 mb-6">
            {["vision", "mission", "swot","peo", "pso"].map(t => (
              <button
                key={t}
                onClick={() => setTab(t)}
                className={`px-5 py-2 rounded font-medium transition ${
                  tab === t
                    ? "bg-blue-600 text-white"
                    : "bg-gray-100 hover:bg-gray-200"
                }`}
              >
                {t.toUpperCase()}
              </button>
            ))}
          </div>

          {/* Content */}
          <div className="text-gray-700 leading-relaxed">

            {tab === "vision" && formatBullets(data.about.vision)}

            {tab === "mission" && formatBullets(data.about.mission)}

            {tab === "peo" && formatBullets(data.about.peo)}

            {tab === "pso" && formatBullets(data.about.pso)}

            {tab === "swot" && renderSwot()}

          </div>

        </div>

      </div>
    </section>
  );
};

export default DepartmentIntro;
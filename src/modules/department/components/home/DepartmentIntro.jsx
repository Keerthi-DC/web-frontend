import React, { useState } from "react";

const DepartmentIntro = ({ data }) => {
  if (!data) return null;

  const [expanded, setExpanded] = useState(false);
  const [tab, setTab] = useState("vision");

  // ✅ About: limit to 20 words
  const words = data.about.intro?.split(" ") || [];
  const shortText = words.slice(0, 20).join(" ") + "...";

  // ✅ Convert bullet string → lines
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

  // ✅ Improved SWOT UI
  const renderSwot = () => {
    if (!data.swot) return null;

    const boxStyle =
      "bg-gray-100 p-3 rounded-md shadow-sm";

    return (
      <div className="grid gap-3 text-sm">
        <div className={boxStyle}>
          <b className="text-green-600">Strengths:</b>
          <p>{data.swot.strengths?.join(", ")}</p>
        </div>

        <div className={boxStyle}>
          <b className="text-red-500">Weaknesses:</b>
          <p>{data.swot.weaknesses?.join(", ")}</p>
        </div>

        <div className={boxStyle}>
          <b className="text-blue-600">Opportunities:</b>
          <p>{data.swot.opportunities?.join(", ")}</p>
        </div>

        <div className={boxStyle}>
          <b className="text-yellow-600">Threats:</b>
          <p>{data.swot.threats?.join(", ")}</p>
        </div>
      </div>
    );
  };

  return (
    <section className="bg-gray-200 relative py-20">
      <div className="max-w-7xl mx-auto px-6">

        <div className="md:grid md:grid-cols-2 gap-10 items-center">

          {/* LEFT SIDE */}
          <div>

            <h2 className="text-sm text-yellow-400 font-semibold tracking-wide">
              About the Department
            </h2>

            <h3 className="text-3xl font-bold mt-2">
              {data.hero.title}
            </h3>

            {/* ✅ About text (20 words toggle) */}
            <div className="mt-6 text-gray-700 leading-relaxed">
              <p>
                {expanded ? data.about.intro : shortText}
              </p>
            </div>

            <button
              onClick={() => setExpanded(!expanded)}
              className="bg-yellow-400 text-black px-6 py-3 rounded font-semibold mt-6"
            >
              {expanded ? "Show less" : "Read more →"}
            </button>

            {/* 🔥 TOGGLE CARD */}
            <div className="mt-10 bg-white rounded-lg shadow p-6">

              {/* Tabs */}
              <div className="flex gap-4 mb-4">
                {["vision", "mission", "swot"].map(t => (
                  <button
                    key={t}
                    onClick={() => setTab(t)}
                    className={`px-4 py-2 rounded font-medium ${
                      tab === t
                        ? "bg-blue-600 text-white"
                        : "bg-gray-100"
                    }`}
                  >
                    {t.toUpperCase()}
                  </button>
                ))}
              </div>

              {/* Content */}
              <div className="text-gray-700">

                {tab === "vision" && formatBullets(data.about.vision)}

                {tab === "mission" && formatBullets(data.about.mission)}

                {tab === "swot" && renderSwot()}

              </div>

            </div>

          </div>

          {/* RIGHT IMAGE */}
          <div>
            <img
              src={data.hero.image}
              alt={data.hero.title}
              className="rounded-lg shadow-lg w-full object-cover"
            />
          </div>

        </div>

      </div>
    </section>
  );
};

export default DepartmentIntro;
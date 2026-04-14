import React, { useEffect, useState } from "react";

const iconMap = {
  "boys-hostel": "home",
  "ladies-hostel": "female",
  "ladies-rest-room": "meeting_room",
  "canteen": "restaurant",
  "dispensary": "medical_services",
  "guest-house": "apartment",
  "red-cross": "emergency",
  "ncc": "military_tech",
  "nss": "volunteer_activism",
  "internet": "wifi",
  "elearning": "computer",
  "language-lab": "record_voice_over"
};

const Facilities = () => {
  const [data, setData] = useState(null);
  const [activeId, setActiveId] = useState(null);

  useEffect(() => {
    fetch("/data/facilities.json")
      .then((res) => res.json())
      .then((json) => {
        setData(json);
        setActiveId(json.sidebar[0].id);
      });
  }, []);

  if (!data) return <div className="p-10">Loading...</div>;

  const selected = data.content[activeId];

  // 🔥 SECTION RENDER
  const renderSection = (section, i) => {
    switch (section.type) {

      // ✅ HERO IMAGE (FIXED)
      case "image":
        return (
          <div key={i} className="mb-12">
            <div className="rounded-3xl overflow-hidden aspect-[21/10] shadow-xl border border-gray-200">
              <img
                src={section.images[0]}
                alt=""
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        );

      // ✅ PARAGRAPH CARD (LIKE 1ST UI)
      case "paragraph":
        return (
          <div key={i} className="bg-gray-100 p-6 rounded-2xl mb-8">
            <p className="text-gray-600 text-lg leading-relaxed">
              {section.text}
            </p>
          </div>
        );

      case "heading":
        return (
          <h3 key={i} className="text-3xl italic mb-6 text-gray-800">
            {section.text}
          </h3>
        );

      // ✅ LIST (AMENITIES STYLE)
      case "list":
        return (
          <div key={i} className="space-y-3 mb-10">
            {section.items.map((item, idx) => (
              <div
                key={idx}
                className="flex items-center gap-4 p-4 bg-gray-100 rounded-full hover:bg-gray-200 transition"
              >
                <span className="material-symbols-outlined text-gray-600">
                  check
                </span>
                <span className="text-gray-700 font-medium">{item}</span>
              </div>
            ))}
          </div>
        );

      // ✅ TABLE (CLEAN DESIGN)
      case "table":
        return (
          <div key={i} className="mb-14">
            {section.title && (
              <h3 className="text-3xl italic mb-8">{section.title}</h3>
            )}

            <div className="rounded-3xl overflow-hidden border border-gray-200">
              <table className="w-full text-sm">
                <thead className="bg-gray-100">
                  <tr>
                    {section.columns.map((col, idx) => (
                      <th key={idx} className="p-4 text-left font-semibold">
                        {col}
                      </th>
                    ))}
                  </tr>
                </thead>

                <tbody>
                  {section.rows.map((row, idx) => (
                    <tr
                      key={idx}
                      className="border-t hover:bg-gray-50 transition"
                    >
                      {row.map((cell, j) => (
                        <td key={j} className="p-4">
                          {cell}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        );

      // ✅ INFO CARDS (1984, BLOCKS, etc.)
      case "info":
        return (
          <div key={i} className="grid grid-cols-2 gap-6 mb-14">
            {section.data.map((item, idx) => (
              <div
                key={idx}
                className="bg-gray-100 p-6 rounded-2xl shadow-sm"
              >
                <div className="text-3xl font-bold text-black">
                  {item.value}
                </div>
                <div className="text-xs uppercase text-gray-500 mt-1">
                  {item.label}
                </div>
              </div>
            ))}
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="flex min-h-screen bg-white">

      {/* 🔹 SIDEBAR */}
      <aside className="w-64 bg-gray-50 fixed h-full border-r border-gray-200">
        <div className="p-6 text-lg font-bold text-gray-800">
          Facilities
        </div>

        <div className="px-2">
          {data.sidebar.map((item) => (
            <div
              key={item.id}
              onClick={() => setActiveId(item.id)}
              className={`flex items-center gap-3 px-4 py-3 cursor-pointer rounded-lg mb-1 transition ${
                activeId === item.id
                  ? "bg-blue-100 text-blue-600 font-semibold"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              <span className="material-symbols-outlined">
                {iconMap[item.id]}
              </span>
              {item.title}
            </div>
          ))}
        </div>
      </aside>

      {/* 🔹 MAIN CONTENT */}
      <div className="ml-64 w-full px-12 py-10 max-w-5xl">

        {/* TITLE */}
        <h2 className="text-5xl italic mb-12 text-gray-800">
          {selected.title}
        </h2>

        {/* SECTIONS */}
        {selected.sections.map((sec, i) => renderSection(sec, i))}

      </div>
    </div>
  );
};

export default Facilities;
import React, { useEffect, useState } from "react";

const InstituteIntroSection = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch("/data/instituteIntro.json")
      .then((res) => res.json())
      .then((json) => setData(json))
      .catch((err) => console.error("Error loading intro data:", err));
  }, []);

  if (!data) return null;

  // fallback icons (if not provided in JSON)
  const iconMap = ["visibility", "architecture", "auto_awesome"];

  return (
    <section className="py-24 px-12 md:px-24 bg-[#f8f9fa]">

      {/* ================= TOP SECTION ================= */}
      <div className="flex flex-col md:flex-row gap-16 mb-24 items-center">

        {/* LEFT TEXT */}
        <div className="md:w-1/2">
          <h2 className="text-4xl md:text-5xl font-bold text-[#001c40] leading-tight mb-8">
            {data.title}
          </h2>

          <p className="text-lg text-gray-600 mb-10 leading-relaxed italic">
            {data.details?.[0]}
          </p>

          <button className="px-8 py-3 border-2 border-[#001c40] text-[#001c40] text-xs font-bold uppercase tracking-widest rounded-lg hover:bg-[#001c40] hover:text-white transition-all">
            {data.buttonText || "Our Legacy"}
          </button>
        </div>

        {/* RIGHT IMAGES */}
        <div className="md:w-1/2 grid grid-cols-2 gap-4">

          <img
            src={data.image}
            alt="intro1"
            className="w-full h-80 object-cover rounded-2xl"
          />

          <img
            src={data.image2 || data.image}
            alt="intro2"
            className="w-full h-80 object-cover rounded-2xl mt-12"
          />

        </div>
      </div>

      {/* ================= CARDS SECTION ================= */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

        {data.subAbout?.map((item, index) => (
          <div
            key={index}
            className="bg-[#f3f4f5] p-10 rounded-2xl hover:-translate-y-2 transition-all group"
          >
            {/* ICON */}
            <span className="material-symbols-outlined text-4xl text-yellow-400 mb-6 block group-hover:scale-110 transition-transform">
              {item.icon || iconMap[index]}
            </span>

            {/* TITLE */}
            <h3 className="text-xl font-bold text-[#001c40] mb-4">
              {item.title}
            </h3>

            {/* DESCRIPTION */}
            <p className="text-gray-600 leading-relaxed">
              {item.detail}
            </p>
          </div>
        ))}

      </div>
    </section>
  );
};

export default InstituteIntroSection;
 import React, { useState, useEffect } from "react";

  const InstituteIntroSection = () => {
    const [data, setData] = useState(null);
    const [expanded, setExpanded] = useState(false);

    useEffect(() => {
      fetch("/data/instituteIntro.json")
        .then((res) => res.json())
        .then((json) => setData(json))
        .catch((err) => console.error("Error loading intro data:", err));
    }, []);

    if (!data) return null;

    const previewText = data.details.slice(0, 2);

    return (
      <section className="relative py-20 institute-intro-section">
        {/* Back‑ground gradient (slow flowing) */}
        <div className="absolute inset-0 -z-10 bg-gradient" />

        {/* Optional orb background */}
        <div className="absolute inset-0 -z-20 opacity-15 flex justify-center items-center">
          <div className="orb" />
        </div>

        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-10 items-center">
          {/* Text block */}
          <div className="animate-slide-left">
            <p className="text-sm tracking-wide text-gray-500 mb-2">
              {data.subtitle}
            </p>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              {data.title}
            </h2>

            {(expanded ? data.details : previewText).map((p, i) => (
              <p key={i} className="text-gray-600 mb-4 leading-relaxed">
                {p}
              </p>
            ))}

            <button
              onClick={() => setExpanded(!expanded)}
              className=" bg-yellow-400 text-black px-6 py-3 rounded font-semibold hero-btn"
            >
              {expanded ? "Show less" : "Read more →"}
            </button>
          </div>

          {/* Institute image */}
          <div className="animate-float-img">
            <img
              src={data.image}
              alt="Institute"
              className="rounded-lg shadow-lg w-full object-cover"
            />
          </div>
        </div>

        {/* Sub‑about cards (breathing glow) */}
        <div className="grid md:grid-cols-3 gap-8 mt-12 border-t pt-10">
          {data.subAbout.map((item, index) => (
            <div
              key={index}
              className="group card-item animate-breathe"
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              <h3 className="text-lg font-semibold text-gray-900 group-hover:text-blue-600 transition">
                → {item.title}
              </h3>
              <p className="text-sm text-gray-600 mt-2 leading-relaxed">
                {item.detail}
              </p>
              <button className=" bg-yellow-400 text-black px-6 py-3 rounded font-semibold hero-btn">
                Read more
              </button>
            </div>
          ))}
        </div>
      </section>
    );
  };

  export default InstituteIntroSection;
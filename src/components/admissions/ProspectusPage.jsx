import React, { useEffect, useState } from "react";

export default function ProspectusPage() {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch("/data/prospectus.json")
      .then((res) => res.json())
      .then((json) => setData(json.prospectus))
      .catch((err) => console.error("Error:", err));
  }, []);

  if (!data) {
    return (
      <div className="py-20 text-center text-gray-500">
        Loading...
      </div>
    );
  }

  return (
    <section className="bg-[#f5f6f8] py-20 px-6">
      <div className="max-w-6xl mx-auto">
        
        {/* Badge */}
        <span className="inline-block bg-[#e6ebf5] text-[#1e3a8a] text-xs font-semibold px-4 py-1 rounded-full mb-6 tracking-wide">
          ACADEMIC SESSION 2025-26
        </span>

        {/* Main Title */}
        <h1 className="text-5xl font-bold text-[#0b2c5e] leading-tight mb-6">
          BIET Prospectus <br /> 2025-26
        </h1>

        {/* Description */}
        <p className="text-gray-600 max-w-2xl mb-10 text-lg">
          {data.description}
        </p>

        {/* Buttons */}
        <div className="flex flex-wrap gap-4">
          
          {/* Download Button */}
          <a
            href={data.pdf}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 bg-[#0b2c5e] text-white px-6 py-3 rounded-lg shadow-md hover:bg-[#082347] transition"
          >
            {/* Download Icon */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                d="M8 16L12 20L16 16M12 7V13"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>

            Download Prospectus (PDF)
          </a>

          {/* Requirements Button */}
          <button className="bg-gray-200 text-gray-800 px-6 py-3 rounded-lg hover:bg-gray-300 transition">
            View Requirements
          </button>
        </div>
      </div>

      {/* OPTIONAL: Preview Pages Section */}
      <div className="max-w-6xl mx-auto mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {data.pages.map((src, index) => (
          <img
            key={index}
            src={src}
            alt={`page ${index + 1}`}
            className="rounded-lg shadow-md"
          />
        ))}
      </div>
    </section>
  );
}
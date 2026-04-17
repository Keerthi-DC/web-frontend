import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const AlumniSection = () => {
  const [alumni, setAlumni] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("/data/alumni.json")
      .then((r) => r.json())
      .then(setAlumni)
      .catch(console.error);
  }, []);

  if (!alumni.length) return null;

  const first4 = alumni.slice(0, 4);

  return (
    <section className="py-24 px-12 md:px-24 bg-[#f8f9fa]">

      <div className="flex flex-col md:flex-row gap-12 items-center">

        {/* LEFT TEXT */}
        <div className="md:w-1/3">
          <h2 className="text-4xl font-bold text-[#001c40] mb-6">
            Alumni Excellence
          </h2>

          <p className="text-lg text-gray-600 mb-8 leading-relaxed">
            Our alumni are global leaders, innovators, and changemakers shaping the future across every industry.
          </p>

          <button
            onClick={() => navigate("/alumni")}
            className="flex items-center gap-3 text-[#001c40] font-bold hover:text-yellow-500 transition-colors group"
          >
            Join the Network →
          </button>
        </div>

        {/* RIGHT IMAGE GRID */}
        <div className="md:w-2/3 grid grid-cols-4 gap-4 h-96">

          {first4.map((a, index) => (
            <img
              key={index}
              src={a.image}
              alt={a.name}
              className={`h-full w-full object-cover rounded-2xl ${
                index % 2 !== 0 ? "mt-8" : ""
              }`}
            />
          ))}

        </div>

      </div>

    </section>
  );
};

export default AlumniSection;
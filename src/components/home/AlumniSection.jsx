import React, { useEffect, useState } from "react";
import SectionContainer from "../common/SectionContainer";
import SectionTitle from "../common/SectionTitle";
import { Link } from "react-router-dom";

const AlumniSection = () => {
  const [alumni, setAlumni] = useState([]);

  useEffect(() => {
    fetch("/data/alumni.json")
      .then((r) => r.json())
      .then(setAlumni)
      .catch(console.error);
  }, []);

  if (!alumni.length) return null;

  const first4 = alumni.slice(0, 4);

  return (
    <div className="bg-gray-700 text-white py-20">
      <h2 className="text-2xl text-center font-bold mb-8 shake-text">Alumni</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {first4.map((a) => (
          <div
            key={a.id}
            className="rounded overflow-hidden shadow-lg transform transition duration-300 hover:scale-105">
            <img
              src={a.image}
              alt={a.name}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h3 className="text-lg font-semibold">{a.name}</h3>
              <p className="text-sm font-medium text-gray-700">{a.company}</p>
              <span className="text-xs text-gray-500">{a.position}</span>
            </div>
          </div>
        ))}
      </div>
      <div className="text-center mt-8">
       <Link
            to="/alumni"
            className="bg-yellow-400 text-black px-8 py-3 rounded-md font-semibold hero-btn"
          >
            View More
          </Link>
      </div>
    </div>
  );
};

export default AlumniSection;

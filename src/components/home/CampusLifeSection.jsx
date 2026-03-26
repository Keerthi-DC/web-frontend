import React, { useEffect, useState } from "react";
import SectionContainer from "../common/SectionContainer";
import SectionTitle from "../common/SectionTitle";
import ReadMoreButton from "../common/ReadMoreButton";

// Helper component for individual campus life cards
const CampusCard = ({ campus, route }) => (
  <div className="group relative rounded overflow-hidden shadow-lg transform transition duration-300 hover:scale-105 m-5 p-2">
    <img
      src={campus.image}
      alt={campus.title}
      className="w-full h-48 md:h-64 object-cover"
    />
    {/* Overlay for zoom effect */}
    <div className="absolute inset-0 bg-black opacity-30 transition-opacity duration-300 group-hover:opacity-20"></div>
    <div className="p-4">
      <h3 className="text-xl font-semibold text-white relative z-10">{campus.title}</h3>
      <ReadMoreButton to={route} />
    </div>
  </div>
);

const CampusLifeSection = () => {
  const [campus, setCampus] = useState([]);

  // Fetch campus life data
  useEffect(() => {
    fetch("/data/campusLife.json")
      .then((res) => res.json())
      .then(setCampus)
      .catch(console.error);
  }, []);

  if (!campus.length) return null;

  const getRoute = (name) => `/${name.toLowerCase().replace(/\s+/g, "-")}`;

  return (
    <div className="bg-gray-800  py-16">
      <div  className="shake-text text-3xl text-white font-bold text-center mb-10">Campus Life</div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Row 1 – Large card then small card */}
        <div className="md:col-span-2">
          <CampusCard campus={campus[0]} route={getRoute(campus[0].name)} />
        </div>
        <div className="md:col-span-1">
          <CampusCard campus={campus[1]} route={getRoute(campus[1].name)} />
        </div>
        {/* Row 2 – Three equal cards */}
        {campus.slice(2, 5).map((c) => (
          <CampusCard key={c.id} campus={c} route={getRoute(c.name)} />
        ))}
      </div>
    </div>
  );
};

export default CampusLifeSection;

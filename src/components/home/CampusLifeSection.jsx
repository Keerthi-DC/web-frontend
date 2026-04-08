import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const CampusLifeSection = () => {
  const [campus, setCampus] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("/data/campusLife.json")
      .then((res) => res.json())
      .then(setCampus)
      .catch(console.error);
  }, []);

  if (!campus.length) return null;

  const getRoute = (name) =>
    `/${name.toLowerCase().replace(/\s+/g, "-")}`;

  return (
    <section className="py-24 px-12 md:px-24 bg-white">

      {/* HEADER */}
      <h2 className="text-4xl font-bold text-[#001c40] mb-16 text-center">
        Campus Life
      </h2>

      {/* GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">

        {campus.slice(0, 5).map((item, index) => (
          <div
            key={index}
            onClick={() => navigate(getRoute(item.name))}
            className="relative rounded-3xl overflow-hidden h-96 group cursor-pointer"
          >
            {/* IMAGE */}
            <img
              src={item.image}
              alt={item.title}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
            />

            {/* OVERLAY */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>

            {/* TEXT */}
            <p className="absolute bottom-6 left-6 text-white font-bold">
              {item.title}
            </p>
          </div>
        ))}

      </div>

    </section>
  );
};

export default CampusLifeSection;
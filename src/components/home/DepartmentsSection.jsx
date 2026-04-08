import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const DepartmentsSection = () => {
  const [departments, setDepartments] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("/data/departments.json")
      .then((res) => res.json())
      .then((data) => setDepartments(data)) // show ALL
      .catch((err) => console.error(err));
  }, []);

  if (!departments.length) return null;

  return (
    <section className="py-24 px-12 md:px-24 bg-[#001c40] text-white rounded-[3rem]">

      {/* HEADER */}
      <div className="text-center mb-16">
        <h3 className="text-4xl font-bold mb-4">
          Specialized Departments
        </h3>

        <p className="text-white/60 text-sm max-w-xl mx-auto">
          Explore our diverse academic departments shaping future innovators.
        </p>
      </div>

      {/* GRID (ALL DEPARTMENTS) */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">

        {departments.map((dep, index) => (
          <div
            key={index}
            className="bg-white/10 backdrop-blur-md p-6 rounded-2xl hover:scale-105 transition-all text-center"
          >
            {/* SHORT */}
            <h5 className="font-bold text-yellow-400 mb-2 text-lg">
              {dep.short || dep.name.slice(0, 2).toUpperCase()}
            </h5>

            {/* FULL */}
            <p className="text-xs text-white/70">
              {dep.name}
            </p>
          </div>
        ))}

      </div>

      {/* BUTTON */}
      <div className="mt-16 text-center">
        <button
          onClick={() => navigate("/departments")}
          className="bg-yellow-400 text-black px-8 py-3 rounded-lg font-bold uppercase tracking-widest hover:scale-105 transition-all"
        >
          View All Departments →
        </button>
      </div>

    </section>
  );
};

export default DepartmentsSection;
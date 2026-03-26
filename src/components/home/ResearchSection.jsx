import React, { useEffect, useState } from "react";
import SectionContainer from "../common/SectionContainer";
import SectionTitle from "../common/SectionTitle";
import ReadMoreButton from "../common/ReadMoreButton";

// -----------
// Research Statistics (static data)
// -----------
const researchStats = [
  { label: "Publications", value: "120+" },
  { label: "Patents", value: "45+" },
  { label: "Research Labs", value: "6" },
  { label: "Research Grants", value: "$2.5M" },
];

// -----------
// Helper card for labs (horizontal scroll)
// -----------
const LabCard = ({ lab }) => (
  <div className="min-w-[280px] max-w-xs flex flex-col bg-white rounded-lg shadow-lg transform transition hover:scale-105 hover:shadow-2xl cursor-pointer space-y-4 p-4">
    <img src={lab.image} alt={lab.title} className="w-full h-48 object-cover rounded" />
    <div className="text-lg font-semibold">{lab.title}</div>
    <p className="text-sm text-gray-600">{lab.description}</p>
    <ReadMoreButton to="/research" />
  </div>
);

const ResearchSection = () => {
  const [labs, setLabs] = useState([]);

  useEffect(() => {
    fetch("/data/research.json")
      .then((r) => r.json())
      .then(setLabs)
      .catch(console.error);
  }, []);

  return (
    <SectionContainer>
      <h2 className="text-2xl text-center font-bold mb-8 shake-text">Research & Innovation</h2>

      {/* Statistics Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-5 text-center my-8">
        {researchStats.map((s, i) => (
          <div key={i} className="p-5 border rounded-lg bg-gray-50">
            <div className="text-3xl font-bold text-indigo-600">{s.value}</div>
            <div className="mt-2 text-sm text-gray-700">{s.label}</div>
          </div>
        ))}
      </div>

      {/* Labs Horizontal Scroll */}
     
    </SectionContainer>
  );
};

export default ResearchSection;

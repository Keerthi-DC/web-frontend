import React, { useEffect, useState } from "react";
import PageContainer from "../components/ui/PageContainer";
import SectionTitle from "../components/ui/SectionTitle";

const AlumniPage = () => {
  const [alumni, setAlumni] = useState([]);

  useEffect(() => {
    fetch("/data/alumni.json")
      .then((r) => r.json())
      .then(setAlumni)
      .catch(console.error);
  }, []);

  if (!alumni.length) return null;

  return (
    <PageContainer>
      <SectionTitle>Alumni</SectionTitle>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {alumni.map((a) => (
          <div
            key={a.id}
            className="rounded overflow-hidden shadow-lg transition duration-300 hover:scale-105">
            <img
              src={a.image}
              alt={a.name}
              className="w-full h-64 object-cover"
            />
            <div className="p-4">
              <h3 className="text-lg font-semibold">{a.name}</h3>
              <p className="text-sm text-gray-700">{a.batch}</p>
              <p className="text-sm font-medium text-gray-600">{a.company}</p>
              <p className="text-sm text-gray-600">{a.position}</p>
              <p className="mt-2 text-sm text-gray-500">{a.message}</p>
            </div>
          </div>
        ))}
      </div>
    </PageContainer>
  );
};

export default AlumniPage;

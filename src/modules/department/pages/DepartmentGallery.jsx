import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
const DepartmentGallery = () => {
  const { deptId } = useParams();
  const [data, setData] = useState(null);
  useEffect(() => {
    fetch(`/data/departments/${deptId}.json`)
      .then(res => res.json())
      .then(json => setData(json));
  }, [deptId]);
  if (!data) return null;
  const gallery = data.gallery || [];
  return (
    <div className="max-w-7xl mx-auto px-6 py-16">
      <h1 className="text-3xl font-bold mb-10">Gallery</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {gallery.map((g, i) => (
          <div key={i} className="relative group rounded-lg overflow-hidden shadow-lg">
            <img src={g.image} alt={g.title} className="w-full h-64 object-cover" />
            <div className="absolute inset-0 flex items-center justify-center">
              <h3 className="text-white text-xl font-semibold drop-shadow-lg">{g.title}</h3>
            </div>
            <div className="absolute inset-0 bg-black/70 opacity-0 group-hover:opacity-100 transition flex items-center justify-center text-center p-6">
              <p className="text-white text-sm">{g.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
export default DepartmentGallery;

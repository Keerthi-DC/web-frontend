import React, { useEffect, useState } from "react";

const GalleryPage = () => {
  const [gallery, setGallery] = useState([]);

  useEffect(() => {
    fetch("/data/gallery.json")
      .then((r) => r.json())
      .then(setGallery)
      .catch(console.error);
  }, []);

  if (!gallery.length) return null;

  return (
    <div className="bg-gray-100 py-20">
      <h2> title="Gallery" </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mx-4">
        {gallery.map((item) => (
          <div key={item.id} className="relative rounded overflow-hidden shadow-lg group transition duration-300">
            <img
              src={item.image}
              alt={item.title}
              className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
            />
            <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-30 transition-opacity"></div>
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
              <span className="text-white text-lg font-semibold">{item.title}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GalleryPage;

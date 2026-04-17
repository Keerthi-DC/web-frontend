import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const GallerySection = () => {
  const [gallery, setGallery] = useState([]);

  useEffect(() => {
    fetch("/data/gallery.json")
      .then((r) => r.json())
      .then(setGallery)
      .catch(console.error);
  }, []);

  if (!gallery.length) return null;

  const firstSix = gallery.slice(0, 6);

  return (
    <section className="py-24 px-12 md:px-24 bg-[#f8f9fa]">

      {/* HEADER */}
      <h2 className="text-4xl font-bold text-[#001c40] mb-16 text-center">
        Gallery
      </h2>

      {/* GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">

        {firstSix.map((item, index) => (
          <div
            key={index}
            className="relative rounded-2xl overflow-hidden group"
          >
            {/* IMAGE */}
            <img
              src={item.image}
              alt={item.title}
              className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
            />

            {/* OPTIONAL OVERLAY */}
            <div className="absolute inset-0 bg-black/10 group-hover:bg-black/20 transition-all"></div>
          </div>
        ))}

      </div>

      {/* BUTTON */}
      <div className="mt-16 text-center">
        <Link
          to="/gallery"
          className="bg-yellow-400 text-black px-8 py-3 rounded-lg font-bold uppercase tracking-widest hover:scale-105 transition-all"
        >
          View Gallery →
        </Link>
      </div>

    </section>
  );
};

export default GallerySection;
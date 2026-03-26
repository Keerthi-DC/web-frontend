import React, { useEffect, useState } from "react";
import SectionContainer from "../common/SectionContainer";
import SectionTitle from "../common/SectionTitle";
import ReadMoreButton from "../common/ReadMoreButton";
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
    <SectionContainer className="bg-gray-200 py-16">
      <h2 className="text-2xl text-center font-bold mb-8 shake-text">Gallery</h2>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {firstSix.map((item) => (
          <div
            key={item.id}
            className="group relative rounded overflow-hidden shadow-lg transform transition duration-300 hover:scale-105"
          >
            <img
              src={item.image}
              alt={item.title}
              className="w-full h-48 object-cover"
            />
          </div>
        ))}
      </div>
      <div className="text-center mt-8">
        <Link
            to="/gallery"
            className="bg-yellow-400 text-black px-8 py-3 rounded-md font-semibold hero-btn"
          >
            View More
          </Link>
      </div>
    </SectionContainer>
  );
};

export default GallerySection;

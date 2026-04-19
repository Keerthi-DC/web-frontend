import { theme } from "../../../../components/ui/theme";
// src/modules/department/components/home/GalleryPreview.jsx
import React from 'react';
import { useNavigate, useParams } from "react-router-dom";
const GalleryPreview = ({ data }) => {
  const navigate = useNavigate();
  const { shortName } = useParams();
  if (!data || !Array.isArray(data) || data.length === 0) return null;
  return (
    <section className="py-12 bg-gray-50" role="region" aria-label="Gallery">
      <div className="max-w-7xl mx-auto px-4" role="region">
        <h2 className="text-2xl font-semibold mb-6 text-center">Gallery</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {data.map((img, idx) => (
            <div key={idx} className="overflow-hidden rounded-lg">
              <img src={img.image} alt={img.title} className="w-full h-48 object-cover" />
            </div>
          ))}
        </div>
      </div>
      {/* Read More Button */}
        <div className="flex justify-center mt-12">

          <button
            onClick={() => navigate(`/departments/${shortName || "cse"}/gallery`)}
             className={`${theme.colors.accentBg} text-black px-6 py-3 rounded font-semibold hero-btn`}
          >
            Read More →
          </button>

        </div>
    </section>
  );
};

export default GalleryPreview;

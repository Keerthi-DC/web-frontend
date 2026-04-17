import React from "react";

const Card = ({ children, onClick, image, title, subtitle, tags }) => {
  return (
    <div
      onClick={onClick}
      className="group bg-white rounded-2xl shadow-md hover:shadow-xl hover:-translate-y-2 transition-all duration-300 cursor-pointer overflow-hidden"
    >
      {/* IMAGE */}
      {image && (
        <div className="relative overflow-hidden">
          <img
            src={image}
            alt={title}
            className="w-full h-52 object-cover transform group-hover:scale-110 transition duration-500"
          />

          {/* TAGS */}
          {tags && (
            <div className="absolute top-3 left-3 flex gap-2 flex-wrap">
              {tags.map((tag) => (
                <span
                  key={tag}
                  className="text-xs px-3 py-1 rounded-full bg-[#0B3C6D] text-white shadow-sm"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>
      )}

      {/* CONTENT */}
      <div className="p-5 text-center">
        {title && <h3 className="text-lg font-semibold mb-2">{title}</h3>}
        {subtitle && (
          <p className="text-sm text-gray-500 mb-3">{subtitle}</p>
        )}

        {children}
      </div>
    </div>
  );
};

export default Card;

import React from "react";

const FacultyCard = ({ faculty, onClick }) => {
  const image = faculty.profileImage || `https://i.pravatar.cc/150`;

  return (
    <div
      onClick={onClick}
      className="w-[220px] bg-white shadow rounded-lg p-6 text-center hover:shadow-lg cursor-pointer flex-shrink-0"
    >
      <div className="w-24 h-24 mx-auto mb-4 rounded-full overflow-hidden bg-gray-100">
        <img
          src={image}
          alt={faculty.name || "Faculty"}
          className="w-full h-full object-contain"
        />
      </div>

      <h3 className="font-semibold">{faculty.name || "Faculty"}</h3>
      <p className="text-sm text-gray-500">{faculty.designation || "Faculty"}</p>
    </div>
  );
};

export default FacultyCard;

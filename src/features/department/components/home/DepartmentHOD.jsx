import React from "react";
import { useParams } from "react-router-dom";
import { useDepartmentMeta } from "../../hooks/useDepartmentMeta";
import useDepartmentHome from "../../hooks/useDepartmentHome";

const DepartmentHOD = () => {
  const { shortName } = useParams();
  const { getId, isReady } = useDepartmentMeta();
  const deptId = isReady ? getId(shortName) : null;
  const { hod: data, loading } = useDepartmentHome(deptId);

  if (loading || !data) {
    return (
      <div className="text-center py-20 text-lg font-semibold">
        Loading HOD...
      </div>
    );
  }

  return (
    <div className="py-16 bg-gray-50">
      <h2 className="text-3xl font-bold mb-12 text-center">
        Head of Department
      </h2>
      <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center gap-10">
        {/* LEFT SIDE - TEXT */}
        <div className="flex-1 text-center md:text-left">
          <h2 className="text-3xl font-bold mb-4">
            {data.name}
          </h2>

          <p className="text-gray-600 leading-relaxed">
            {data.message}
          </p>
        </div>

        {/* RIGHT SIDE - IMAGE */}
        <div className="flex-1 flex justify-center">
          <img
            src={data.imageUrl || "/default-avatar.png"}
            alt={data.name}
            className="w-52 h-52 object-cover rounded-full shadow-lg"
          />
        </div>

      </div>

    </div>
  );
};

export default DepartmentHOD;

import { theme } from "../../../components/ui/theme";
import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useDepartmentMeta } from "../hooks/useDepartmentMeta";
import BietLoader from "../../../components/ui/BietLoader";

import useAlumni from "../hooks/useDepartmentAlumni";

const DepartmentAlumni = () => {
  const { shortName } = useParams();
  const { getId, isReady } = useDepartmentMeta();

  const [selected, setSelected] = useState(null);

  const deptId = isReady ? getId(shortName) : null;
  const { alumni, loading } = useAlumni(deptId);

  if (loading || !isReady) {
    return <BietLoader />;
  }



  return (
    <div className="relative max-w-7xl mx-auto px-6 py-16">
      <h1 className="text-3xl font-bold mb-10">Alumni</h1>

      {/* TABLE */}
      <div className="overflow-x-auto bg-white shadow rounded-lg">
        <table className="w-full text-left">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-4">Photo</th>
              <th className="p-4">Name</th>
              <th className="p-4">Designation</th>
              <th className="p-4">Company</th>
              <th className="p-4">Batch</th>
              <th className="p-4 text-center">Action</th>
            </tr>
          </thead>

          <tbody>
            {alumni.map((a, i) => {
              const image =
                a.image ||
                `https://loremflickr.com/150/150/headshot,portrait?random=${(i % 70) + 1}`;

              return (
                <tr key={i} className="border-t hover:bg-gray-50">
                  <td className="p-4">
                    <img
                      src={image}
                      className="w-12 h-12 rounded-full object-cover"
                      alt={a.name}
                    />
                  </td>

                  <td className="p-4 font-medium">{a.name}</td>
                  <td className="p-4">{a.designation}</td>
                  <td className="p-4">{a.company}</td>
                  <td className="p-4">{a.batch}</td>

                  <td className="p-4 text-center">
                    <button
                      onClick={() => setSelected(a)}
                      className={`${theme.colors.primaryBg} text-white px-4 py-2 rounded`}
                    >
                      View
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* 🔥 SIDE DRAWER CARD */}
      <div
        className={`fixed top-0 right-0 h-full w-[400px] bg-white shadow-2xl transform transition-transform duration-300 z-50 ${
          selected ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {selected && (
          <div className="flex flex-col h-full">
            {/* HEADER */}
            <div className="p-6 border-b flex justify-between items-center">
              <h2 className="text-lg font-semibold">Alumni Details</h2>
              <button onClick={() => setSelected(null)}>✕</button>
            </div>

            {/* CONTENT (SCROLLABLE) */}
            <div className="p-6 overflow-y-auto flex-1">
              <div className="text-center">
                <img
                  src={
                    selected.image ||
                    `https://loremflickr.com/150/150/headshot,portrait?random=373`
                  }
                  className="w-24 h-24 rounded-full mx-auto mb-4"
                  alt={selected.name}
                />

                <h2 className="text-xl font-bold">
                  {selected.name}
                </h2>
                <p className="text-gray-500">
                  {selected.designation}
                </p>
              </div>

              <div className="mt-6 space-y-3 text-sm">
                <p><b>Company:</b> {selected.company}</p>
                <p><b>Details:</b> {selected.location}</p>
                <p><b>Batch:</b> {selected.batch}</p>
                <p><b>Email:</b> {selected.email}</p>
                <p><b>Department:</b> {selected.department}</p>

                {selected.linkedin && (
                  <a
                    href={selected.linkedin}
                    target="_blank"
                    rel="noreferrer"
                    className="block mt-4 text-[#0b3c5d]"
                  >
                    View LinkedIn
                  </a>
                )}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* 🔥 BACKDROP */}
      {selected && (
        <div
          className="fixed inset-0 bg-black/30 z-40"
          onClick={() => setSelected(null)}
        />
      )}
    </div>
  );
};

export default DepartmentAlumni;

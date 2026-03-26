import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
const DepartmentAlumni = () => {
  const { deptId } = useParams();
  const [data, setData] = useState(null);
  const [selected, setSelected] = useState(null);
  useEffect(() => {
    fetch(`/data/departments/${deptId}.json`)
      .then(res => res.json())
      .then(json => setData(json));
  }, [deptId]);
  if (!data) return null;
  const alumni = data.alumni || [];
  return (
    <div className="max-w-7xl mx-auto px-6 py-16">
      <h1 className="text-3xl font-bold mb-10">Alumni</h1>
      <div className="overflow-x-auto bg-white shadow rounded-lg">
        <table className="w-full text-left">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-4">Photo</th>
              <th className="p-4">Name</th>
              <th className="p-4">Designation</th>
              <th className="p-4">Education</th>
              <th className="p-4">Experience</th>
              <th className="p-4">LinkedIn</th>
              <th className="p-4 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {alumni.map((a, i) => (
              <tr key={i} className="border-t hover:bg-gray-50">
                <td className="p-4">
                  <img src={a.photo} className="w-12 h-12 rounded-full object-cover" alt={a.name} />
                </td>
                <td className="p-4 font-medium">{a.name}</td>
                <td className="p-4">{a.designation}</td>
                <td className="p-4">{a.education}</td>
                <td className="p-4">{a.experience}</td>
                <td className="p-4">
                  <a href={a.linkedin} target="_blank" className="text-blue-600">LinkedIn</a>
                </td>
                <td className="p-4 text-center">
                  <button onClick={() => setSelected(a)} className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700">Read More</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {selected && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
          <div className="bg-white rounded-lg shadow-lg p-8 w-[500px] relative">
            <button onClick={() => setSelected(null)} className="absolute top-3 right-3 text-gray-500">✕</button>
            <div className="text-center">
              <img src={selected.photo} className="w-24 h-24 rounded-full mx-auto mb-4" alt={selected.name} />
              <h2 className="text-xl font-semibold">{selected.name}</h2>
              <p className="text-gray-500">{selected.designation}</p>
            </div>
            <div className="mt-6 space-y-2">
              <p><b>Company :</b> {selected.company}</p>
              <p><b>Location :</b> {selected.location}</p>
              <p><b>Education :</b> {selected.education}</p>
              <p><b>Experience :</b> {selected.experience}</p>
              <p><b>About :</b> {selected.bio}</p>
              <a href={selected.linkedin} target="_blank" className="text-blue-600 block mt-3">View LinkedIn Profile</a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
export default DepartmentAlumni;

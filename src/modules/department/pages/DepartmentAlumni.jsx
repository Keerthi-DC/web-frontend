import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDepartmentMeta } from "../../../hooks/useDepartmentMeta";

const API_URL = import.meta.env.VITE_APPSYNC_URL;
const API_KEY = import.meta.env.VITE_APPSYNC_API_KEY;

// ✅ Alumni Query
const LIST_ALUMNI = `
  query ListAlumni($search: String, $batch: String, $deptId: ID,$tenantId: ID) {
    listAlumni(search: $search, batch: $batch, deptId: $deptId, tenantId: $tenantId) {
      items {
        alumniId
        name
        batch
        department
        company
        designation
        location
        email
        linkedin
        image
        createdAt
      }
      nextToken
    }
  }
`;

const DepartmentAlumni = () => {
  const { shortName } = useParams();
  const { getId, isReady } = useDepartmentMeta();

  const [alumni, setAlumni] = useState([]);
  const [selected, setSelected] = useState(null);
  const [loading, setLoading] = useState(true);

  // ✅ Fetch Alumni from GraphQL
  useEffect(() => {
    if (!shortName || !isReady) return;

    const fetchAlumni = async () => {
      try {
        setLoading(true);

        const deptId = getId(shortName);
        if (!deptId) return;

        const res = await fetch(API_URL, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "x-api-key": API_KEY,
          },
          body: JSON.stringify({
            query: LIST_ALUMNI,
            variables: {
              tenantId: "biet-college",
              deptId,
              search: "",
              batch: "",
            },
          }),
        });

        const result = await res.json();

        const alumniList =
          result?.data?.listAlumni?.items || [];

        setAlumni(alumniList);
      } catch (err) {
        console.error("ALUMNI FETCH ERROR:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchAlumni();
  }, [shortName, isReady]);

  if (loading) {
    return (
      <p className="text-center mt-20 text-gray-500">
        Loading Alumni...
      </p>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-6 py-16">
      <h1 className="text-3xl font-bold mb-10">
        Alumni
      </h1>

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
              <th className="p-4">LinkedIn</th>
              <th className="p-4 text-center">Actions</th>
            </tr>
          </thead>

          <tbody>
            {alumni.map((a, i) => {
              const image =
                a.image ||
                `https://i.pravatar.cc/150?img=${(i % 70) + 1}`;

              return (
                <tr
                  key={a.alumniId || i}
                  className="border-t hover:bg-gray-50"
                >
                  <td className="p-4">
                    <img
                      src={image}
                      className="w-12 h-12 rounded-full object-cover"
                      alt={a.name}
                    />
                  </td>

                  <td className="p-4 font-medium">
                    {a.name}
                  </td>

                  <td className="p-4">
                    {a.designation}
                  </td>

                  <td className="p-4">
                    {a.company}
                  </td>

                  <td className="p-4">
                    {a.batch}
                  </td>

                  <td className="p-4">
                    {a.linkedin && (
                      <a
                        href={a.linkedin}
                        target="_blank"
                        rel="noreferrer"
                        className="text-blue-600"
                      >
                        LinkedIn
                      </a>
                    )}
                  </td>

                  <td className="p-4 text-center">
                    <button
                      onClick={() => setSelected(a)}
                      className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                    >
                      Read More
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* MODAL */}
      {selected && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
          <div className="bg-white rounded-lg shadow-lg p-8 w-[500px] relative">
            <button
              onClick={() => setSelected(null)}
              className="absolute top-3 right-3 text-gray-500"
            >
              ✕
            </button>

            <div className="text-center">
              <img
                src={
                  selected.image ||
                  `https://i.pravatar.cc/150`
                }
                className="w-24 h-24 rounded-full mx-auto mb-4"
                alt={selected.name}
              />

              <h2 className="text-xl font-semibold">
                {selected.name}
              </h2>

              <p className="text-gray-500">
                {selected.designation}
              </p>
            </div>

            <div className="mt-6 space-y-2">
              <p>
                <b>Company :</b> {selected.company}
              </p>

              <p>
                <b>Location :</b> {selected.location}
              </p>

              <p>
                <b>Batch :</b> {selected.batch}
              </p>

              <p>
                <b>Email :</b> {selected.email}
              </p>

              <a
                href={selected.linkedin}
                target="_blank"
                rel="noreferrer"
                className="text-blue-600 block mt-3"
              >
                View LinkedIn Profile
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DepartmentAlumni;
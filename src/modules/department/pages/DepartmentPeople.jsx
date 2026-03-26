import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDepartmentMeta } from "../../../hooks/useDepartmentMeta";

const API_URL = import.meta.env.VITE_APPSYNC_URL;
const API_KEY = import.meta.env.VITE_APPSYNC_API_KEY;

const LIST_FACULTY = `
  query ListFaculty(
    $deptId: ID,
    $designation: String,
    $status: String,
    $search: String,
    $tenantId: ID
  ) {
    listFaculty(
      deptId: $deptId,
      designation: $designation,
      status: $status,
      search: $search,
      tenantId: $tenantId
    ) {
      items {
        facultyId
        name
        designation
        deptId
        department
        profileImage
        cvUrl
        status
        createdAt
      }
      nextToken
    }
  }
`;

const DepartmentPeople = () => {
  const { shortName } = useParams();
  const { getId, isReady } = useDepartmentMeta();

  const [data, setData] = useState(null);
  const [faculty, setFaculty] = useState([]);
  const [loadingFaculty, setLoadingFaculty] = useState(true);

  // ✅ Fetch JSON (staff + students)
  useEffect(() => {
    if (!shortName) return;

    fetch(`/data/departments/cse.json`)
      .then((res) => res.json())
      .then((d) => setData(d))
      .catch((err) => console.error("JSON ERROR:", err));
  }, [shortName]);

  // ✅ Fetch Faculty from API
  useEffect(() => {
    if (!shortName || !isReady) return;

    const fetchFaculty = async () => {
      try {
        setLoadingFaculty(true);

        const deptId = getId(shortName);
        console.log("Resolved deptId:", deptId);

        if (!deptId) return;

        const res = await fetch(API_URL, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "x-api-key": API_KEY,
          },
          body: JSON.stringify({
            query: LIST_FACULTY,
            variables: {
              tenantId: "biet-college",
              deptId, // ✅ FIXED
            },
          }),
        });

        const result = await res.json();
        console.log("FACULTY API:", result);

        setFaculty(result?.data?.listFaculty?.items || []);
      } catch (err) {
        console.error("FACULTY FETCH ERROR:", err);
      } finally {
        setLoadingFaculty(false);
      }
    };

    fetchFaculty();
  }, [shortName, isReady]);

  if (!data)
    return <div className="text-center py-20">Loading people…</div>;

  const people = data.people;

  // ✅ Card renderer
  const renderCards = (list, type = "json") => (
    <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-8">
      {list.map((p, i) => {
        const isFaculty = type === "faculty";

        const name = p.name;
        const image = isFaculty
          ? p.profileImage ||
            `https://i.pravatar.cc/150?img=${(i % 70) + 1}`
          : p.photo;

        const designation = p.designation;

        return (
          <div
            key={i}
            className="bg-white shadow rounded-lg p-6 text-center hover:shadow-lg transition"
          >
            <img
              src={image}
              alt={name}
              className="w-24 h-24 rounded-full mx-auto mb-4 object-cover"
            />

            <h3 className="font-semibold">{name}</h3>
            <p className="text-sm text-gray-500">{designation}</p>
          </div>
        );
      })}
    </div>
  );

  return (
    <div className="max-w-7xl mx-auto px-6 py-20">
      <h1 className="text-4xl font-bold mb-16 text-center">
        People
      </h1>

      {/* Faculty */}
      <section id="faculty" className="mb-24 scroll-mt-32">
        <h2 className="text-2xl font-semibold mb-8">
          Faculty
        </h2>

        {loadingFaculty ? (
          <p className="text-gray-500">Loading faculty...</p>
        ) : faculty.length === 0 ? (
          <p className="text-gray-500">No faculty found</p>
        ) : (
          renderCards(faculty, "faculty")
        )}
      </section>

      {/* Staff */}
      <section id="staff" className="mb-24 scroll-mt-32">
        <h2 className="text-2xl font-semibold mb-8">
          Staff
        </h2>

        {renderCards(people.staff)}
      </section>

      {/* Students */}
      <section id="students" className="scroll-mt-32">
        <h2 className="text-2xl font-semibold mb-8">
          Students
        </h2>

        {renderCards(people.students)}
      </section>
    </div>
  );
};

export default DepartmentPeople;
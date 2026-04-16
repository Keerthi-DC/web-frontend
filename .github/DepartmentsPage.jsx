import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const DepartmentsPage = () => {

  const [departments, setDepartments] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {

    const fetchDepartments = async () => {

      try {

        const response = await fetch(import.meta.env.VITE_APPSYNC_URL, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "x-api-key": import.meta.env.VITE_APPSYNC_API_KEY
          },
          body: JSON.stringify({
            query: "query ListDepartments { listDepartments { items { departmentId name shortName imageUrl } } }"
          })
        });

        const result = await response.json();

        if (result.errors) {
          console.error("GraphQL Errors:", result.errors);
        }

        const data = result?.data?.listDepartments?.items || [];

        setDepartments(data);

      } catch (error) {

        console.error("Error fetching departments:", error);

      } finally {

        setLoading(false);

      }

    };

    fetchDepartments();

  }, []);

  if (loading) {
    return (
      <div className="text-center py-20 text-lg font-semibold">
        Loading Departments...
      </div>
    );
  }

  if (departments.length === 0) {
    return (
      <div className="text-center py-20 text-lg font-semibold">
        No Departments Found
      </div>
    );
  }

  return (

    <div className="max-w-7xl mx-auto px-4 py-16">

      <h1 className="text-3xl font-bold text-center mb-12 shake-text">
        All Departments
      </h1>

      <div className="grid md:grid-cols-3 sm:grid-cols-2 gap-8">

        {departments.map((dep) => (

          <div
            key={dep.departmentId}
            className="bg-white rounded-xl shadow-lg hover:-translate-y-2 transition duration-300"
          >

            <div className="overflow-hidden rounded-t-xl">

              <img
                src={dep.imageUrl}
                alt={dep.name}
                className="w-full h-52 object-cover hover:scale-110 transition duration-500"
              />

            </div>

            <div className="p-4 text-center">

              <h3 className="text-lg font-semibold mb-3">
                {dep.name}
              </h3>

              <button
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
                onClick={() =>  navigate(`/departments/${dep.shortName}`, {
    state: { deptId: dep.departmentId }
  })}
              >
                Visit Site
              </button>

            </div>

          </div>

        ))}

      </div>

    </div>

  );

};

export default DepartmentsPage;
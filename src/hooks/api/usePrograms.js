import { useEffect, useState } from "react";
import { graphqlRequest } from "../../services/graphql"; // adjust path

const mockData = [
  {
    id: 1,
    name: "B.E",
    courses: [
      "Civil Engineering",
      "Computer Science & Engineering",
      "Electronics & Communication Engineering",
      "Electrical & Electronics Engineering",
      "Mechanical Engineering",
      "Information Science & Engineering",
    ],
  },
  // keep rest SAME
];

const usePrograms = () => {
  const [programs, setPrograms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const query = `
    query ListPrograms {
      listPrograms {
        id
        name
        courses
      }
    }
  `;

  const fetchPrograms = async () => {
    try {
      const res = await graphqlRequest(query);

      if (res?.data?.listPrograms) {
        setPrograms(res.data.listPrograms);
      } else {
        setPrograms(mockData); // fallback
      }
    } catch (err) {
      setError(err);
      setPrograms(mockData); // fallback
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPrograms();
  }, []);

  return {
    programs,
    loading,
    error,
    refetch: fetchPrograms,
    isEmpty: programs.length === 0,
  };
};

export default usePrograms;
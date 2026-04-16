import { useEffect, useState } from "react";
import { graphqlRequest } from "../../services/graphql"; // adjust path

const mockData = [
  {
    id: 1,
    name: "Ananya Sharma",
    company: "Google",
    package: "₹24 LPA",
    image: "https://picsum.photos/seed/all/200/200",
  },
  // keep rest SAME
];

const usePlacements = () => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const query = `
    query ListPlacements {
      listPlacements {
        id
        name
        company
        package
        image
      }
    }
  `;

  const fetchPlacements = async () => {
    try {
      const res = await graphqlRequest(query);

      if (res?.data?.listPlacements) {
        setStudents(res.data.listPlacements);
      } else {
        setStudents(mockData); // fallback
      }
    } catch (err) {
      setError(err);
      setStudents(mockData); // fallback
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPlacements();
  }, []);

  return {
    students,
    loading,
    error,
    refetch: fetchPlacements,
    isEmpty: students.length === 0,
  };
};

export default usePlacements;
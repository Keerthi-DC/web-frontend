import { useEffect, useState } from "react";
import { graphqlRequest } from "../../services/graphql"; // adjust path

const mockData = [
  {
    id: 1,
    name: "Amit R. Gupta",
    image: "https://picsum.photos/seed/amit/200/200",
    company: "Google",
    position: "Senior Product Manager",
    batch: "2012",
    message:
      "The college prepared me to tackle complex product challenges and foster innovation in a dynamic environment.",
  },
  // keep ALL your mock data SAME
];

const useAlumni = () => {
  const [alumni, setAlumni] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const query = `
    query ListAlumni {
      listAlumni {
        id
        name
        image
        company
        position
        batch
        message
      }
    }
  `;

  const fetchAlumni = async () => {
    try {
      const res = await graphqlRequest(query);

      if (res?.data?.listAlumni) {
        setAlumni(res.data.listAlumni);
      } else {
        setAlumni(mockData); // fallback
      }
    } catch (err) {
      setError(err);
      setAlumni(mockData); // fallback
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAlumni();
  }, []);

  return { alumni, loading, error, refetch: fetchAlumni };
};

export default useAlumni;
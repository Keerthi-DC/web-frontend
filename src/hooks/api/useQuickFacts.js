import { useEffect, useState } from "react";
import { graphqlRequest } from "../../services/graphql"; // adjust path

const mockData = [
  {
    title: "Years of Excellence",
    value: 75,
    description:
      "Decades of academic excellence in engineering and technology education",
    image: "https://picsum.photos/600/400?random=501",
  },
  // keep rest SAME
];

const useQuickFacts = () => {
  const [facts, setFacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const query = `
    query ListQuickFacts {
      listQuickFacts {
        title
        value
        description
        image
      }
    }
  `;

  const fetchFacts = async () => {
    try {
      const res = await graphqlRequest(query);

      if (res?.data?.listQuickFacts) {
        setFacts(res.data.listQuickFacts);
      } else {
        setFacts(mockData); // fallback
      }
    } catch (err) {
      setError(err);
      setFacts(mockData); // fallback
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFacts();
  }, []);

  return {
    facts,
    loading,
    error,
    refetch: fetchFacts,
    isEmpty: facts.length === 0,
  };
};

export default useQuickFacts;
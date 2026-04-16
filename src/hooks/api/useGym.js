import { useEffect, useState } from "react";
import { graphqlRequest } from "../../services/graphql"; // adjust path

const mockData = {
  title: "Gym",
  images: [
    "https://picsum.photos/600/400?random=201",
    "https://picsum.photos/600/400?random=202",
    "https://picsum.photos/600/400?random=203",
  ],
};

const useGym = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const query = `
    query GetGym {
      getGym {
        title
        images
      }
    }
  `;

  const fetchGym = async () => {
    try {
      const res = await graphqlRequest(query);

      if (res?.data?.getGym) {
        setData(res.data.getGym);
      } else {
        setData(mockData); // fallback
      }
    } catch (err) {
      setError(err);
      setData(mockData); // fallback
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchGym();
  }, []);

  return {
    data,
    loading,
    error,
    refetch: fetchGym,
    isEmpty: !data,
  };
};

export default useGym;
import { useEffect, useState } from "react";
import { graphqlRequest } from "../../services/graphql"; // adjust path

const mockData = {
  title: "Green Campus",
  description: "Eco-friendly initiatives",
  images: ["/images/g1.jpg", "/images/g2.jpg"],
};

const useGreenCampus = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const query = `
    query GetGreenCampus {
      getGreenCampus {
        title
        description
        images
      }
    }
  `;

  const fetchGreenCampus = async () => {
    try {
      const res = await graphqlRequest(query);

      if (res?.data?.getGreenCampus) {
        setData(res.data.getGreenCampus);
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
    fetchGreenCampus();
  }, []);

  return {
    data,
    loading,
    error,
    refetch: fetchGreenCampus,
    isEmpty: !data,
  };
};

export default useGreenCampus;
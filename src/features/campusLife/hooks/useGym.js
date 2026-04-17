import { useEffect, useState } from "react";
import { graphqlRequest } from "../../../services/graphql"; // adjust path
import { GET_GYM } from "../graphql/queries";

const mockData = {
  title: "Gym",
  images: [
    "/images/gym1.jpg",
    "/images/gym2.jpg",
    "/images/gym3.jpg"
  ]
};

const useGym = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const query = GET_GYM;

  const fetchGym = async () => {
    try {
      const res = await graphqlRequest(query);

      if (res?.data?.getGym) {
        setData(res.data.getGym);
      } else {
        // No hook-level fallback; pages should provide mockData
        setData(mockData);
      }
    } catch (err) {
      setError(err);
      setData(mockData);
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
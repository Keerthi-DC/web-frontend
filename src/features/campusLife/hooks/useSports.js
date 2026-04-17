import { useEffect, useState } from "react";
import { graphqlRequest } from "../../../services/graphql"; // adjust path
import { GET_SPORTS } from "../graphql/queries";

const mockData = {
  title: "Sports",
  reports: [
    { title: "Sports 2023-24", pdf: "/pdfs/s1.pdf" },
    { title: "Sports 2022-23", pdf: "/pdfs/s2.pdf" }
  ]
};

const useSports = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const query = GET_SPORTS;

  const fetchSports = async () => {
    try {
      const res = await graphqlRequest(query);

      if (res?.data?.getSports) {
        setData(res.data.getSports);
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
    fetchSports();
  }, []);

  return {
    data,
    loading,
    error,
    refetch: fetchSports,
    isEmpty: !data,
  };
};

export default useSports;
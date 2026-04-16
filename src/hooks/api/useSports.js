import { useEffect, useState } from "react";
import { graphqlRequest } from "../../services/graphql"; // adjust path

const mockData = {
  title: "Sports",
  reports: [
    { title: "Sports 2023-24", pdf: "/pdfs/s1.pdf" },
    { title: "Sports 2022-23", pdf: "/pdfs/s2.pdf" },
  ],
};

const useSports = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const query = `
    query GetSports {
      getSports {
        title
        reports {
          title
          pdf
        }
      }
    }
  `;

  const fetchSports = async () => {
    try {
      const res = await graphqlRequest(query);

      if (res?.data?.getSports) {
        setData(res.data.getSports);
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
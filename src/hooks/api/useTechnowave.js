import { useEffect, useState } from "react";
import { graphqlRequest } from "../../services/graphql"; // adjust path

const mockData = {
  title: "Technowave",
  items: [
    {
      title: "ECE Newsletter",
      pdf: "/pdfs/ece.pdf",
    },
  ],
};

const useTechnowave = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const query = `
    query GetTechnowave {
      getTechnowave {
        title
        items {
          title
          pdf
        }
      }
    }
  `;

  const fetchTechnowave = async () => {
    try {
      const res = await graphqlRequest(query);

      if (res?.data?.getTechnowave) {
        setData(res.data.getTechnowave);
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
    fetchTechnowave();
  }, []);

  return {
    data,
    loading,
    error,
    refetch: fetchTechnowave,
    isEmpty: !data,
  };
};

export default useTechnowave;
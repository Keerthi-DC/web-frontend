import { useEffect, useState } from "react";
import { graphqlRequest } from "../../services/graphql"; // adjust path

const mockData = {
  title: "Student Academic Council",
  description: "Develops leadership and communication skills.",
  members: [
    { name: "Prof. Y Yuvashankarappa", role: "Director" },
    { name: "Dr. H B Aravind", role: "Principal" },
  ],
};

const useSAC = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const query = `
    query GetSAC {
      getSAC {
        title
        description
        members {
          name
          role
        }
      }
    }
  `;

  const fetchSAC = async () => {
    try {
      const res = await graphqlRequest(query);

      if (res?.data?.getSAC) {
        setData(res.data.getSAC);
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
    fetchSAC();
  }, []);

  return {
    data,
    loading,
    error,
    refetch: fetchSAC,
    isEmpty: !data,
  };
};

export default useSAC;
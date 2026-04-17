import { useEffect, useState } from "react";
import { graphqlRequest } from "../../../services/graphql"; // adjust path
import { GET_SAC } from "../graphql/queries";

const mockData = {
  title: "Student Academic Council",
  description: "Develops leadership and communication skills.",
  members: [
    { name: "Prof. Y Yuvashankarappa", role: "Director" },
    { name: "Dr. H B Aravind", role: "Principal" }
  ]
};

const useSAC = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const query = GET_SAC;

  const fetchSAC = async () => {
    try {
      const res = await graphqlRequest(query);

      if (res?.data?.getSAC) {
        setData(res.data.getSAC);
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
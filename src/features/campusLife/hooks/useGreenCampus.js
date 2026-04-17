import { useEffect, useState } from "react";
import { graphqlRequest } from "../../../services/graphql"; // adjust path
import { GET_GREEN_CAMPUS } from "../graphql/queries";

const mockData = {
  title: "Green Campus",
  description: "Eco-friendly initiatives",
  images: ["/images/g1.jpg", "/images/g2.jpg"]
};

const useGreenCampus = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const query = GET_GREEN_CAMPUS;

  const fetchGreenCampus = async () => {
    try {
      const res = await graphqlRequest(query);

      if (res?.data?.getGreenCampus) {
        setData(res.data.getGreenCampus);
      } else {
        // Pages should provide mockData; hook returns null when absent
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
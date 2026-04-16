import { useEffect, useState } from "react";
import { graphqlRequest } from "../../services/graphql"; // adjust path

const mockData = {
  sidebar: [
    { id: "boys-hostel", title: "BOYS HOSTEL" },
    { id: "ladies-hostel", title: "LADIES HOSTEL" },
    // keep ALL your data SAME
  ],
  content: {
    // keep ALL your content SAME
  },
};

const useFacilities = () => {
  const [data, setData] = useState(null);
  const [activeId, setActiveId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const query = `
    query GetFacilities {
      getFacilities {
        sidebar {
          id
          title
        }
        content
      }
    }
  `;

  const fetchFacilities = async () => {
    try {
      const res = await graphqlRequest(query);

      if (res?.data?.getFacilities) {
        setData(res.data.getFacilities);
        setActiveId(res.data.getFacilities.sidebar?.[0]?.id);
      } else {
        setData(mockData);
        setActiveId(mockData.sidebar[0].id);
      }
    } catch (err) {
      setError(err);
      setData(mockData);
      setActiveId(mockData.sidebar[0].id);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFacilities();
  }, []);

  return {
    data,
    activeId,
    setActiveId,
    loading,
    error,
    refetch: fetchFacilities,
  };
};

export default useFacilities;
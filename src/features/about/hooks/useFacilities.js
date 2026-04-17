import { useState } from "react";
import { graphqlRequest } from "../../../services/graphql"; // correct relative path to src/services/graphql.js

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

export const useFacilities = () => {
  // start with local mock data so pages render immediately without network
  const [data, setData] = useState(mockData);
  const [activeId, setActiveId] = useState(mockData.sidebar?.[0]?.id || null);
  const [loading, setLoading] = useState(false);
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
    setLoading(true);
    try {
      const res = await graphqlRequest(query);

      if (res?.data?.getFacilities) {
        setData(res.data.getFacilities);
        setActiveId(res.data.getFacilities.sidebar?.[0]?.id);
      }
    } catch (err) {
      console.error(err);
      setError("Failed to load facilities");
      // keep mock data as fallback
    } finally {
      setLoading(false);
    }
  };

  // do not auto-fetch on mount; use `refetch()` to attempt a network load

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
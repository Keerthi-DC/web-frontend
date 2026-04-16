import { useEffect, useState } from "react";
import { graphqlRequest } from "../../services/graphql"; // adjust path

const mockData = [
  {
    id: 1,
    name: "Green Campus",
    image: "https://picsum.photos/600/400?random=1",
    title: "Green Campus Initiative",
    description:
      "Our campus promotes sustainability with green spaces, eco-friendly infrastructure, and energy conservation initiatives.",
    facilities: [
      "Solar powered buildings",
      "Rainwater harvesting",
      "Green gardens",
    ],
    activities: [
      "Tree plantation drives",
      "Eco awareness programs",
    ],
    achievements: ["Green campus award"],
  },
  // keep ALL your data SAME
];

const useCampusLife = () => {
  const [campus, setCampus] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const query = `
    query ListCampusLife {
      listCampusLife {
        id
        name
        image
        title
        description
        facilities
        activities
        achievements
      }
    }
  `;

  const fetchCampus = async () => {
    try {
      const res = await graphqlRequest(query);

      if (res?.data?.listCampusLife) {
        setCampus(res.data.listCampusLife);
      } else {
        setCampus(mockData); // fallback
      }
    } catch (err) {
      setError(err);
      setCampus(mockData); // fallback
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCampus();
  }, []);

  return {
    campus,
    loading,
    error,
    refetch: fetchCampus,
    isEmpty: campus.length === 0,
  };
};

export default useCampusLife;
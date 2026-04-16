import { useEffect, useState } from "react";
import { graphqlRequest } from "../../services/graphql"; // adjust path

const mockData = [
  {
    id: 1,
    image: "https://picsum.photos/600/400?random=101",
    title: "Green Campus",
    category: "Campus",
    description:
      "Sustainable green spaces and eco-friendly infrastructure.",
  },
  // keep ALL your data SAME
];

const useGallery = () => {
  const [gallery, setGallery] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const query = `
    query ListGallery {
      listGallery {
        id
        image
        title
        category
        description
      }
    }
  `;

  const fetchGallery = async () => {
    try {
      const res = await graphqlRequest(query);

      if (res?.data?.listGallery) {
        setGallery(res.data.listGallery);
      } else {
        setGallery(mockData); // fallback
      }
    } catch (err) {
      setError(err);
      setGallery(mockData); // fallback
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchGallery();
  }, []);

  return { gallery, loading, error, refetch: fetchGallery };
};

export default useGallery;
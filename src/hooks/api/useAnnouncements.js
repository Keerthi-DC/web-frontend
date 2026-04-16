import { useEffect, useState } from "react";
import { graphqlRequest } from "../../services/graphql"; // adjust path

const mockData = [
  {
    text: "Admissions open for 2025 batch. Apply before July 30.",
  },
  {
    text: "BIET ranked among top engineering colleges in Karnataka.",
  },
  {
    text: "Campus placements begin from August with 150+ recruiters.",
  },
  {
    text: "International conference on AI & Robotics next month.",
  },
];

const useAnnouncements = () => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const query = `
    query ListAnnouncements {
      listAnnouncements {
        text
      }
    }
  `;

  const fetchAnnouncements = async () => {
    try {
      const res = await graphqlRequest(query);

      if (res?.data?.listAnnouncements) {
        setMessages(res.data.listAnnouncements);
      } else {
        setMessages(mockData); // fallback
      }
    } catch (err) {
      setError(err);
      setMessages(mockData); // fallback
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAnnouncements();
  }, []);

  return {
    messages,
    loading,
    error,
    refetch: fetchAnnouncements,
    isEmpty: messages.length === 0,
  };
};

export default useAnnouncements;
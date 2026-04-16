import { useEffect, useState } from "react";
import { graphqlRequest } from "../../services/graphql"; // adjust path

const mockData = [
  {
    id: 1,
    title: "Guest Lecture on AI & Machine Learning",
    description:
      "An expert session on latest trends in AI and ML for CSE students.",
    date: "2026-04-05",
    time: "10:00 AM",
    venue: "Seminar Hall A",
  },
  // keep rest SAME
];

const useNotifications = () => {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const query = `
    query ListNotifications {
      listNotifications {
        id
        title
        description
        date
        time
        venue
      }
    }
  `;

  const fetchNotifications = async () => {
    try {
      const res = await graphqlRequest(query);

      if (res?.data?.listNotifications) {
        setNotifications(res.data.listNotifications);
      } else {
        setNotifications(mockData);
      }
    } catch (err) {
      setError(err);
      setNotifications(mockData);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNotifications();
  }, []);

  return {
    notifications,
    loading,
    error,
    refetch: fetchNotifications,
    isEmpty: notifications.length === 0,
  };
};

export default useNotifications;
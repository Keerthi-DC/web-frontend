import { useEffect, useState } from "react";
import { graphqlRequest } from "../../../services/graphql"; // adjust path
import { LIST_NOTIFICATIONS } from "../graphql/queries";
const mockData = [
  {
    id: 1,
    title: "Guest Lecture on AI & Machine Learning",
    description: "An expert session on latest trends in AI and ML for CSE students.",
    date: "2026-04-05",
    time: "10:00 AM",
    venue: "Seminar Hall A"
  },
  {
    id: 2,
    title: "Campus Placement Drive - Infosys",
    description: "Final year students are eligible. Bring resume and ID card.",
    date: "2026-04-08",
    time: "09:00 AM",
    venue: "Main Auditorium"
  },
  {
    id: 3,
    title: "Internal Exam Schedule Released",
    description: "Check the detailed timetable for CIE-2 exams.",
    date: "2026-04-02",
    time: "02:00 PM",
    venue: "Online Portal"
  },
  {
    id: 4,
    title: "Cultural Fest - Registrations Open",
    description: "Register now for dance, music, and drama events.",
    date: "2026-04-10",
    time: "11:30 AM",
    venue: "Student Activity Center"
  }
];

const useNotifications = () => {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const query = LIST_NOTIFICATIONS;

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
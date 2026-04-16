import { useEffect, useState } from "react";
import { graphqlRequest } from "../../services/graphql"; // adjust path

const mockNews = [
  {
    id: 1,
    date: "2026-03-01",
    title: "New Research Center Opens",
    image: "https://picsum.photos/seed/1/800/500",
    details:
      "The institute inaugurated its R&D center with advanced labs.",
  },
  {
    id: 2,
    date: "2026-02-20",
    title: "Alumni Meetup 2026",
    image: "https://picsum.photos/seed/2/800/500",
    details:
      "Annual alumni meetup with collaboration discussions.",
  },
];

const useNews = () => {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const query = `
    query ListNews {
      listNews {
        id
        title
        date
        image
        details
      }
    }
  `;

  const fetchNews = async () => {
    try {
      const res = await graphqlRequest(query);

      if (res?.data?.listNews) {
        setNews(res.data.listNews);
      } else {
        // ✅ fallback
        setNews(mockNews);
      }
    } catch (err) {
      // ✅ fallback + error tracking
      setError(err);
      setNews(mockNews);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNews();
  }, []);

  return { news, loading, error, refetch: fetchNews };
};

export default useNews;
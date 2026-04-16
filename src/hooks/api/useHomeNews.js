import { useEffect, useState } from "react";
import { graphqlRequest } from "../../services/graphql";

const mockData = [
  {
    id: 1,
    date: "2026-03-01",
    title: "New Research Center Opens",
    image: "https://picsum.photos/seed/1/800/500",
    details:
      "The institute today inaugurated its state-of-the-art research & development center.",
  },
  // keep rest SAME
];

const useNews = () => {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const query = `
    query ListNews {
      listNews {
        id
        date
        title
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
        setNews(mockData);
      }
    } catch (err) {
      setError(err);
      setNews(mockData);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNews();
  }, []);

  return {
    news,
    loading,
    error,
    refetch: fetchNews,
    isEmpty: news.length === 0,
  };
};

export default useNews;
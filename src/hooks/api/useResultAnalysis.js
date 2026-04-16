import { useEffect, useState, useMemo } from "react";
import { graphqlRequest } from "../../services/graphql"; // adjust path

const mockData = [
  {
    id: 1,
    title: "Quarterly Performance Review",
    date: "2026-01-15",
    summary:
      "Overall improvement in student grades, with a 7% rise in pass rates.",
    image: "https://picsum.photos/400/250?random=601",
  },
  // keep rest SAME
];

const useResultAnalysis = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [activeTab, setActiveTab] = useState("even");

  const query = `
    query ListResultAnalysis {
      listResultAnalysis {
        id
        title
        date
        summary
        image
      }
    }
  `;

  const fetchResultAnalysis = async () => {
    try {
      const res = await graphqlRequest(query);

      if (res?.data?.listResultAnalysis) {
        setData(res.data.listResultAnalysis);
      } else {
        setData(mockData); // fallback
      }
    } catch (err) {
      setError(err);
      setData(mockData); // fallback
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchResultAnalysis();
  }, []);

  // ✅ KEEP YOUR LOGIC (this is GOOD)

  const isEvenSemester = (title) => {
    const match = title.match(/(\d+)/);
    return match && parseInt(match[1], 10) % 2 === 0;
  };

  const filtered = useMemo(() => {
    return data.filter((item) =>
      activeTab === "even"
        ? isEvenSemester(item.title)
        : !isEvenSemester(item.title)
    );
  }, [data, activeTab]);

  return {
    data,
    loading,
    error,
    refetch: fetchResultAnalysis,

    activeTab,
    setActiveTab,
    filtered,
  };
};

export default useResultAnalysis;
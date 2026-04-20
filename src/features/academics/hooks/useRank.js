import { useEffect, useState, useMemo } from "react";
import { graphqlRequest } from "../../../services/graphql";
import { LIST_RESULT_ANALYSIS } from "../graphql/queries";

/* MOCK */
const mockData = [
  {
    id: 1,
    title: "Sem 2 Result",
    date: "2026-01-15",
    summary: "Improved performance",
    image: "https://loremflickr.com/400/400/college,university?random=941",
  },
];

const useResultAnalysis = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [activeTab, setActiveTab] = useState("even");

  const fetchResultAnalysis = async () => {
    try {
      const res = await graphqlRequest(LIST_RESULT_ANALYSIS);

      const result = res?.data?.listResultAnalysis;

      setData(result?.length ? result : mockData);
    } catch (err) {
      console.warn("Result fallback used");
      setData(mockData);
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchResultAnalysis();
  }, []);

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
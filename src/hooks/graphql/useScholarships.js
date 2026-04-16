import { useEffect, useState, useMemo } from "react";
import { graphqlRequest } from "../../services/graphql";

const useScholarships = () => {
  const [data, setData] = useState([]);
  const [activeType, setActiveType] = useState("ALL");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadScholarships = async () => {
      try {
        setLoading(true);

        const res = await graphqlRequest(`
          query {
            listScholarships(tenantId: "biet-college") {
              scholarshipId
              type
              name
              description
              amount
              eligibility
              order
            }
          }
        `);

        const items = res?.listScholarships || [];

        const sorted = [...items].sort(
          (a, b) => (a.order ?? 0) - (b.order ?? 0)
        );

        setData(sorted);
      } catch (err) {
        console.error(err);
        setData([]);
      } finally {
        setLoading(false);
      }
    };

    loadScholarships();
  }, []);

  // ✅ categories
  const categories = useMemo(() => {
    return ["ALL", ...new Set(data.map((s) => s.type))];
  }, [data]);

  // ✅ filtered data
  const filtered = useMemo(() => {
    return activeType === "ALL"
      ? data
      : data.filter((s) => s.type === activeType);
  }, [data, activeType]);

  return {
    loading,
    data,
    filtered,
    categories,
    activeType,
    setActiveType,
  };
};

export default useScholarships;
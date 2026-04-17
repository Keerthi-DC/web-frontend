import { useEffect, useState } from "react";
import { graphqlRequest } from "../../../services/graphql";

const useDepartmentResults = (deptId) => {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!deptId) {
      setLoading(false);
      return;
    }

    const fetchResults = async () => {
      try {
        setLoading(true);

        const res = await graphqlRequest(
          `
          query ($deptId: ID!, $tenantId: ID!) {
            listResultAnalyses(
              deptId: $deptId
              tenantId: $tenantId
            ) {
              items {
                title
                semester
                batch
                pdfUrl
                graphImageUrl
              }
            }
          }
          `,
          {
            deptId,
            tenantId: "biet-college",
          }
        );

        setResults(res?.data?.listResultAnalyses?.items || []);
      } catch (err) {
        console.error("Results fetch error:", err);
        setError(err.toString());
        setResults([]);
      } finally {
        setLoading(false);
      }
    };

    fetchResults();
  }, [deptId]);

  return { results, loading, error };
};

export default useDepartmentResults;

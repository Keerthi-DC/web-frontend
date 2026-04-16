import { useEffect, useState } from "react";
import { graphqlRequest } from "../../services/graphql";

const useResearch = (deptId) => {
  const [data, setData] = useState({
    patents: [],
    grants: [],
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!deptId) {
      setLoading(false);
      return;
    }

    const fetchData = async () => {
      try {
        setLoading(true);

        const queries = [
          {
            key: "patents",
            query: `
              query ($deptId: ID!, $tenantId: ID!) {
                listPatents(deptId: $deptId, tenantId: $tenantId) {
                  items { text }
                }
              }
            `,
          },
          {
            key: "grants",
            query: `
              query ($deptId: ID!, $tenantId: ID!) {
                listResearchGrants(deptId: $deptId, tenantId: $tenantId) {
                  items { text }
                }
              }
            `,
          },
        ];

        const responses = await Promise.all(
          queries.map((q) =>
            graphqlRequest(q.query, {
              deptId,
              tenantId: "biet-college",
            })
          )
        );

        const result = {
          patents: [],
          grants: [],
        };

        responses.forEach((res, index) => {
          const key = Object.keys(res || {})[0];
          result[queries[index].key] =
            res?.[key]?.items || [];
        });

        setData(result);
      } catch (err) {
        console.error("Fetch Error:", err);
        setData({ patents: [], grants: [] });
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [deptId]);

  return {
    patents: data.patents,
    grants: data.grants,
    loading,
  };
};

export default useResearch;
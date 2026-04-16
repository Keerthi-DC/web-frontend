import { useEffect, useState } from "react";
import { graphqlRequest } from "../../services/graphql";

const useProspectus = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadProspectus = async () => {
      try {
        setLoading(true);

        const res = await graphqlRequest(`
          query {
            getProspectus(tenantId: "biet-college") {
              title
              description
              fileUrl
              fileName
              uploadedAt
            }
          }
        `);

        setData(res?.getProspectus || null);
      } catch (err) {
        console.error("Error fetching prospectus:", err);
        setData(null);
      } finally {
        setLoading(false);
      }
    };

    loadProspectus();
  }, []);

  return {
    data,
    loading,
    isEmpty: !data,
  };
};

export default useProspectus;
import { useEffect, useState } from "react";
import { graphqlRequest } from "../../services/graphql";

const useFeeStructure = () => {
  const [fees, setFees] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    const loadFees = async () => {
      try {
        const res = await graphqlRequest(`
          query {
            listFeeDocuments(tenantId: "biet-college") {
              feeDocId
              title
              fileUrl
            }
          }
        `);

        if (isMounted) {
          setFees(res?.listFeeDocuments || []);
        }
      } catch (err) {
        console.error("Failed to load fee documents:", err);
        if (isMounted) setFees([]);
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    loadFees();

    return () => {
      isMounted = false;
    };
  }, []);

  return {
    fees,
    loading,
    isEmpty: fees.length === 0,
  };
};

export default useFeeStructure;
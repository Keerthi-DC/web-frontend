import { useEffect, useState } from "react";
import { graphqlRequest } from "../../../services/graphql";

const useDepartmentMaterials = (deptId) => {
  const [materials, setMaterials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!deptId) return;

    const fetchMaterials = async () => {
      try {
        setLoading(true);

        const res = await graphqlRequest(
          `
          query ($deptId: ID!, $tenantId: ID!) {
            listLearningMaterials(
              deptId: $deptId
              tenantId: $tenantId
            ) {
              items {
                title
                type
                fileUrl
                courseName
                uploadedBy
              }
            }
          }
          `,
          {
            deptId,
            tenantId: "biet-college",
          }
        );

        setMaterials(res?.data?.listLearningMaterials?.items || []);
      } catch (err) {
        console.error("Failed to load materials:", err);
        setError(err.toString());
        setMaterials([]);
      } finally {
        setLoading(false);
      }
    };

    fetchMaterials();
  }, [deptId]);

  return { materials, loading, error };
};

export default useDepartmentMaterials;

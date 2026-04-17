import { useEffect, useState } from "react";
import { graphqlRequest } from "../../../services/graphql";

const useDepartmentTeaching = (deptId) => {
  const [teaching, setTeaching] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!deptId) {
      setLoading(false);
      return;
    }

    const fetchTeaching = async () => {
      try {
        setLoading(true);

        const res = await graphqlRequest(
          `
          query ($deptId: ID!, $tenantId: ID!) {
            listInnovativeTeaching(
              deptId: $deptId
              tenantId: $tenantId
            ) {
              items {
                innovativeTeachingId
                faculties {
                  facultyId
                  facultyName
                }
                description
                imageUrls
                pdfUrl
              }
            }
          }
          `,
          {
            deptId,
            tenantId: "biet-college",
          }
        );

        setTeaching(res?.data?.listInnovativeTeaching?.items || []);
      } catch (err) {
        console.error("Teaching fetch error:", err);
        setError(err.toString());
        setTeaching([]);
      } finally {
        setLoading(false);
      }
    };

    fetchTeaching();
  }, [deptId]);

  return { teaching, loading, error };
};

export default useDepartmentTeaching;

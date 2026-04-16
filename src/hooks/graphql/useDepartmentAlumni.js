import { useEffect, useState } from "react";
import { graphqlRequest } from "../../services/graphql";

const LIST_ALUMNI = `
  query ListAlumni($search: String, $batch: String, $deptId: ID, $tenantId: ID) {
    listAlumni(search: $search, batch: $batch, deptId: $deptId, tenantId: $tenantId) {
      items {
        alumniId
        name
        batch
        department
        company
        designation
        location
        email
        linkedin
        image
        createdAt
      }
    }
  }
`;

/**
 * useAlumni Hook
 * Fetches alumni list for a department
 */
const useAlumni = (deptId) => {
  const [alumni, setAlumni] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!deptId) return;

    const fetchAlumni = async () => {
      try {
        setLoading(true);

        const res = await graphqlRequest(LIST_ALUMNI, {
          tenantId: "biet-college",
          deptId,
          search: "",
          batch: "",
        });

        setAlumni(res?.listAlumni?.items || []);
      } catch (err) {
        console.error("ALUMNI FETCH ERROR:", err);
        setAlumni([]);
      } finally {
        setLoading(false);
      }
    };

    fetchAlumni();
  }, [deptId]);

  return { alumni, loading };
};

export default useAlumni;
import { useEffect, useState } from "react";
import { graphqlRequest } from "../../services/graphql";

const LIST_COMMITTEE = `
  query ListCommitteeMembers($deptId: ID!, $committee: String, $tenantId: ID!) {
    listCommitteeMembers(deptId: $deptId, committee: $committee, tenantId: $tenantId) {
      items {
        committeeMemberId
        name
        designation
        order
      }
    }
  }
`;

/**
 * useCommittees Hook
 * Fetches DAB and PAC committee members
 */
const useCommittees = (deptId) => {
  const [dabMembers, setDabMembers] = useState([]);
  const [pacMembers, setPacMembers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!deptId) return;

    const load = async () => {
      try {
        setLoading(true);

        const [dabRes, pacRes] = await Promise.all([
          graphqlRequest(LIST_COMMITTEE, {
            deptId,
            committee: "DAB",
            tenantId: "biet-college",
          }),
          graphqlRequest(LIST_COMMITTEE, {
            deptId,
            committee: "PAC",
            tenantId: "biet-college",
          }),
        ]);

        const sortList = (list) =>
          [...list].sort((a, b) => (a.order || 0) - (b.order || 0));

        setDabMembers(
          sortList(dabRes?.listCommitteeMembers?.items || [])
        );

        setPacMembers(
          sortList(pacRes?.listCommitteeMembers?.items || [])
        );
      } catch (err) {
        console.error("Committee fetch error:", err);
        setDabMembers([]);
        setPacMembers([]);
      } finally {
        setLoading(false);
      }
    };

    load();
  }, [deptId]);

  return { dabMembers, pacMembers, loading };
};

export default useCommittees;
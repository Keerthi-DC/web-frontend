import { useQuery } from "@apollo/client";
import { LIST_COMMITTEE } from "../graphql/queries";

/**
 * useCommittees Hook
 * Fetches DAB and PAC committee members
 */
const useCommittees = (deptId) => {
  const { data: dabData, loading: dabLoading } = useQuery(LIST_COMMITTEE, {
    variables: { deptId, committee: "DAB", tenantId: "biet-college" },
    skip: !deptId,
  });

  const { data: pacData, loading: pacLoading } = useQuery(LIST_COMMITTEE, {
    variables: { deptId, committee: "PAC", tenantId: "biet-college" },
    skip: !deptId,
  });

  const dabList = dabData?.listCommitteeMembers?.items || [];
  const pacList = pacData?.listCommitteeMembers?.items || [];

  const dabMembers = [...dabList].sort((a, b) => (a.order || 0) - (b.order || 0));
  const pacMembers = [...pacList].sort((a, b) => (a.order || 0) - (b.order || 0));
  const loading = dabLoading || pacLoading;

  return { dabMembers, pacMembers, loading };
};

export default useCommittees;

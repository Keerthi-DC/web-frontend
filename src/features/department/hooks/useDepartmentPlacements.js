import { useQuery } from "@apollo/client";
import { LIST_PLACEMENTS } from "../graphql/queries";

const usePlacements = (deptId) => {
  const { data, loading, error } = useQuery(LIST_PLACEMENTS, {
    variables: {
      deptId,
      tenantId: "biet-college",
    },
    skip: !deptId, // Apollo will automatically not fetch until deptId exists
    fetchPolicy: "cache-first", // Automatically leverages Apollo's powerful caching!
  });

  const items = data?.listPlacementOverviews?.items || [];
  
  // Create sorted array safely
  const placements = [...items].sort((a, b) =>
    (b.academicYear || "").localeCompare(a.academicYear || "")
  );

  return { 
    placements, 
    loading,
    error 
  };
};

export default usePlacements;

import { useQuery } from "@apollo/client/react";
import { gql } from "@apollo/client/core";

const LIST_PLACEMENTS = gql`
  query ListPlacementOverviews($deptId: ID!, $academicYear: String, $tenantId: ID) {
    listPlacementOverviews(deptId: $deptId, academicYear: $academicYear, tenantId: $tenantId) {
      items {
        placementOverviewId
        deptId
        academicYear
        companiesVisited
        studentsInCampus
        studentsOffCampus
        highestPackage
      }
    }
  }
`;

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

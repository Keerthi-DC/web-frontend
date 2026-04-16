import { useEffect, useState } from "react";
import { graphqlRequest } from "../../services/graphql";

const LIST_PLACEMENTS = `
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
  const [latest, setLatest] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!deptId) {
      setLoading(false);
      return;
    }

    const fetchPlacements = async () => {
      try {
        setLoading(true);

        const res = await graphqlRequest(LIST_PLACEMENTS, {
          deptId,
          tenantId: "biet-college",
        });

        const items =
          res?.listPlacementOverviews?.items || [];

        if (items.length > 0) {
          const sorted = [...items].sort((a, b) =>
            (b.academicYear || "").localeCompare(a.academicYear || "")
          );

          setLatest(sorted[0]);
        } else {
          setLatest(null);
        }
      } catch (err) {
        console.error("Placement fetch error:", err);
        setLatest(null);
      } finally {
        setLoading(false);
      }
    };

    fetchPlacements();
  }, [deptId]);

  return { latest, loading };
};

export default usePlacements;
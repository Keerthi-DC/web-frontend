import { useEffect, useState } from "react";
import { graphqlRequest } from "../../services/graphql";

const LIST_ACHIEVEMENTS = `
query ListAchievements($deptId: ID!, $type: String, $tenantId: ID!) {
  listAchievements(deptId: $deptId, type: $type, tenantId: $tenantId) {
    items {
      achievementId
      deptId
      type
      text
    }
  }
}
`;

/**
 * useAchievements Hook
 * Fetches student and faculty achievements separately
 */
const useAchievements = (deptId) => {
  const [studentAchievements, setStudent] = useState([]);
  const [facultyAchievements, setFaculty] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!deptId) return;

    const load = async () => {
      try {
        setLoading(true);

        const [studentRes, facultyRes] = await Promise.all([
          graphqlRequest(LIST_ACHIEVEMENTS, {
            deptId,
            tenantId: "biet-college",
            type: "student",
          }),
          graphqlRequest(LIST_ACHIEVEMENTS, {
            deptId,
            tenantId: "biet-college",
            type: "staff",
          }),
        ]);

        setStudent(
          studentRes?.listAchievements?.items || []
        );

        setFaculty(
          facultyRes?.listAchievements?.items || []
        );
      } catch (err) {
        console.error("Failed to load achievements:", err);
        setStudent([]);
        setFaculty([]);
      } finally {
        setLoading(false);
      }
    };

    load();
  }, [deptId]);

  return { studentAchievements, facultyAchievements, loading };
};

export default useAchievements;
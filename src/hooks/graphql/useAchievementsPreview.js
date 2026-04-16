import { useEffect, useState } from "react";
import { graphqlRequest } from "../../services/graphql";

const LIST_ACHIEVEMENTS = `
query ListAchievements($deptId: ID!, $type: String, $tenantId: ID) {
  listAchievements(deptId: $deptId, type: $type, tenantId: $tenantId) {
    items {
      achievementId
      text
      type
    }
  }
}
`;

/**
 * useAchievements Hook
 * Fetches student & staff achievements and merges them
 */
const useAchievements = (deptId) => {
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!deptId) return;

    const load = async () => {
      try {
        setLoading(true);

        const studentData = await graphqlRequest(LIST_ACHIEVEMENTS, {
          deptId,
          tenantId: "biet-college",
          type: "student",
        });

        const staffData = await graphqlRequest(LIST_ACHIEVEMENTS, {
          deptId,
          tenantId: "biet-college",
          type: "staff",
        });

        const students = studentData?.listAchievements?.items || [];
        const staff = staffData?.listAchievements?.items || [];

        const combined = [...students, ...staff].map((item) => ({
          text: item.text,
          name: item.type === "student" ? "Student" : "Faculty",
          photo: "/assets/default-user.png",
        }));

        setList(combined);
      } catch (err) {
        console.error("Failed to load achievements:", err);
        setList([]);
      } finally {
        setLoading(false);
      }
    };

    load();
  }, [deptId]);

  return { list, loading };
};

export default useAchievements;
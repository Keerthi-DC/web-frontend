import { useQuery } from "@apollo/client";
import { LIST_ACHIEVEMENTS } from "../graphql/queries";

/**
 * useAchievements Hook
 * Fetches student and faculty achievements separately
 */
const useAchievements = (deptId) => {
  const { data: studentData, loading: studentLoading } = useQuery(LIST_ACHIEVEMENTS, {
    variables: { deptId, tenantId: "biet-college", type: "student" },
    skip: !deptId,
    errorPolicy: "all",
  });

  const { data: facultyData, loading: facultyLoading } = useQuery(LIST_ACHIEVEMENTS, {
    variables: { deptId, tenantId: "biet-college", type: "staff" },
    skip: !deptId,
    errorPolicy: "all",
  });

  const studentAchievements = studentData?.listAchievements?.items || [];
  const facultyAchievements = facultyData?.listAchievements?.items || [];
  const loading = studentLoading || facultyLoading;

  return { studentAchievements, facultyAchievements, loading };
};

export default useAchievements;

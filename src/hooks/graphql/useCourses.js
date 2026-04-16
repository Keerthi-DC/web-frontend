import { useEffect, useState } from "react";
import { graphqlRequest } from "../../services/graphql";

/**
 * useCourses Hook
 * Fetches department courses and derives filter options
 */
const useCourses = (deptId) => {
  const [courses, setCourses] = useState([]);
  const [filters, setFilters] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!deptId) return;

    const fetchCourses = async () => {
      try {
        setLoading(true);

        const res = await graphqlRequest(
          `
          query ($deptId: ID!, $tenantId: ID!) {
            listDeptCourses(deptId: $deptId, tenantId: $tenantId) {
              items {
                code
                name
                semester
                credits
                type
                programType
                program
                batch
              }
            }
          }
          `,
          {
            deptId,
            tenantId: "biet-college",
          }
        );

        const items = res?.listDeptCourses?.items || [];
        setCourses(items);

        const unique = (key) =>
          [...new Set(items.map((c) => c[key]).filter(Boolean))];

        setFilters({
          programTypes: unique("programType"),
          batches: unique("batch"),
          types: unique("type"),
          semesters: unique("semester"),
          programs: unique("program"),
        });
      } catch (err) {
        console.error("Failed to load courses:", err);
        setError(err.toString());
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, [deptId]);

  return { courses, filters, loading, error };
};

export default useCourses;
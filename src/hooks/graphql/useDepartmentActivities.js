import { useEffect, useState } from "react";
import { graphqlRequest } from "../../services/graphql";

const QUERY = `
query GetActivities($deptId: ID!,$tenantId: ID!) {
  department: listDepartmentActivities(deptId: $deptId,tenantId: $tenantId) {
    items {
      deptActivityLogId
      text
      createdAt
    }
  }

  forum: listForumEvents(deptId: $deptId,tenantId:$tenantId) {
    items {
      forumEventId
      title
      description
      createdAt
    }
  }
}
`;

const useActivities = (deptId) => {
  const [data, setData] = useState({
    departmentActivities: [],
    forumActivities: [],
  });
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!deptId) return;

    const load = async () => {
      try {
        setError(null);

        const result = await graphqlRequest(QUERY, {
          deptId,
          tenantId: "biet-college",
        });

        const transformed = {
          departmentActivities: (result?.department?.items || []).map((a) => ({
            name: a.text,
            description: a.text,
            date: new Date(a.createdAt).toLocaleDateString(),
            image:
              "https://picsum.photos/400/200?random=" + Math.random(),
          })),

          forumActivities: (result?.forum?.items || []).map((f) => ({
            title: f.title,
            description: f.description,
            createdAt: new Date(f.createdAt).toLocaleDateString(),
          })),
        };

        setData(transformed);
      } catch (err) {
        console.error(err);
        setError("Failed to load activities");
      }
    };

    load();
  }, [deptId]);

  return { data, error };
};

export default useActivities;
import { useState, useEffect } from 'react';

// useDepartmentMeta – converts shortName → departmentId
export const useDepartmentMeta = () => {
  const [deptMap, setDeptMap] = useState(new Map());

  useEffect(() => {
    const fetchDepartments = async () => {
      try {
        const res = await fetch(import.meta.env.VITE_APPSYNC_URL, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'x-api-key': import.meta.env.VITE_APPSYNC_API_KEY
          },
          body: JSON.stringify({
            query: `
              query ListDepartments {
                listDepartments(tenantId: "biet-college") {
                  items {
                    departmentId
                    shortName
                  }
                }
              }
            `
          })
        });

        const result = await res.json();

        if (result.errors) {
          console.error("GraphQL Errors:", result.errors);
          return;
        }

        const items = result?.data?.listDepartments?.items || [];

        const map = new Map(
          items.map(d => [d.shortName, d.departmentId])
        );

        setDeptMap(map);

      } catch (e) {
        console.error('Failed to load department list', e);
      }
    };

    fetchDepartments();
  }, []);

  const getId = (shortName) => deptMap.get(shortName) || null;
  const isReady = deptMap.size > 0;

  return { getId, isReady };
};

import { useQuery, gql } from '@apollo/client';

const LIST_DEPARTMENTS_QUERY = gql`
  query ListDepartments {
    listDepartments(tenantId: "biet-college") {
      items {
        departmentId
        shortName
        name
      }
    }
  }
`;

// useDepartmentMeta – converts shortName → departmentId
export const useDepartmentMeta = () => {
  const { data, loading, error } = useQuery(LIST_DEPARTMENTS_QUERY, {
    fetchPolicy: 'cache-first',
  });

  const items = data?.listDepartments?.items || [];
  
  const map = new Map(
    items.map(d => [d.shortName, { id: d.departmentId, name: d.name }])
  );

  const getId = (shortName) => map.get(shortName)?.id || null;
  const getName = (shortName) => map.get(shortName)?.name || null;
  const isReady = !loading && !error && items.length > 0;

  return { getId, getName, isReady, loading, error };
};

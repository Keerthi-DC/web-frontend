export const LIST_NEWS =
`
  query ListNews(
    $deptId: ID!
    $tenantId: ID!
  ) {
    listNews(department: $deptId, tenantId: $tenantId) {
      id
      title
      pdf
    }
  }
`;

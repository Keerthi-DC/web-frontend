export const LIST_ACHIEVEMENTS =
`
  query ListAchievements(
    $deptId: ID!
    $tenantId: ID!
  ) {
    listAchievements(department: $deptId, tenantId: $tenantId) {
      student
      staff
      // add other fields if needed
    }
  }
`;

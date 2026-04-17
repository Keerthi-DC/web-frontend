export const LIST_PLACEMENTS =
`
  query ListPlacements(
    $deptId: ID!
    $tenantId: ID!
  ) {
    listPlacements(department: $deptId, tenantId: $tenantId) {
      overview
      highestPackage
      averagePackage
      placementRate
      topRecruiters
      statistics {
        year
        placed
      }
    }
  }
`;

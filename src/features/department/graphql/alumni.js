export const LIST_ALUMNI =
`
  query ListAlumni(
    $deptId: ID!
    $tenantId: ID!
  ) {
    listAlumni(department: $deptId, tenantId: $tenantId) {
      photo
      name
      designation
      education
      experience
      linkedin
    }
  }
`;

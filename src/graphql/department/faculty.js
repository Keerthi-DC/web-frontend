export const LIST_FACULTY = `
  query ListFaculty($deptId: String!) {
    listFaculty(department: $deptId, tenantId: "biet-college") {
      items {
        firstName
        lastName
        profileImage
        designation
      }
    }
  }
`;

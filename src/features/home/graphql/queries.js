export const LIST_HOME_DEPARTMENTS = `
  query ListDepartments {
    listDepartments(tenantId: "biet-college") {
      items {
        departmentId
        name
        shortName
      }
    }
  }
`;

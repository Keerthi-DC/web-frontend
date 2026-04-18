import { gql } from '@apollo/client';

export const LIST_FACULTY = gql`
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

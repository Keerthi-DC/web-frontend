import { gql } from '@apollo/client';

export const LIST_ALUMNI = gql`
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

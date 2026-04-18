import { gql } from '@apollo/client';

export const LIST_ACHIEVEMENTS = gql`
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

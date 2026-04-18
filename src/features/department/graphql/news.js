import { gql } from '@apollo/client';

export const LIST_NEWS = gql`
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

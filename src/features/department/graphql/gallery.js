import { gql } from '@apollo/client';

export const LIST_GALLERY = gql`
  query ListGallery(
    $deptId: ID!
    $tenantId: ID!
  ) {
    listGallery(department: $deptId, tenantId: $tenantId) {
      image
      title
      description
    }
  }
`;

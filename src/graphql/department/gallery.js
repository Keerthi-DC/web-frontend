export const LIST_GALLERY =
`
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

export const LIST_ACCREDITATION_RECORDS = `
  query ListAccreditationRecords(
    $type: String!
    $section: String
    $sub_section: String
    $sub_sub_section: String
    $department: String
    $tenantId: ID
  ) {
    listAccreditationRecords(
      type: $type
      section: $section
      sub_section: $sub_section
      sub_sub_section: $sub_sub_section
      department: $department
      tenantId: $tenantId
    ) {
      items {
        title
        file_url
        year
        description
        order
        sub_section
        department
      }
    }
  }
`;
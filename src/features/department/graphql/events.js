export const LIST_EVENTS = `
  query ListEvents(
    $department: String
    $status: String
    $approvalStatus: String
    $limit: Int
    $tenantId: ID!
  ) {
    listEvents(
      department: $department
      status: $status
      approvalStatus: $approvalStatus
      limit: $limit
      tenantId: $tenantId
    ) {
      items {
        eventId
        title
        date
        time
        venue
        pinned
        department
        status
        approvalStatus
      }
    }
  }
`;

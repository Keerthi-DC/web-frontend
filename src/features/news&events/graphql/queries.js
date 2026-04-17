export const LIST_NEWS = `
  query ListNews {
    listNews {
      id
      title
      date
      image
      details
    }
  }
`;

export const LIST_EVENTS = `
  query ListEvents {
    listEvents {
      id
      title
      image
      detail
      venue
      time
      scope
      department
    }
  }
`;

export const LIST_NOTIFICATIONS = `
  query ListNotifications {
    listNotifications {
      id
      title
      description
      date
      time
      venue
    }
  }
`;

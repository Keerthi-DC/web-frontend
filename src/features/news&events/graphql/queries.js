import { gql } from '@apollo/client';

export const LIST_NEWS = gql`
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

export const LIST_EVENTS = gql`
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

export const LIST_NOTIFICATIONS = gql`
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

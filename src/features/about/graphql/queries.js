import { gql } from '@apollo/client';

export const GET_OVERVIEW = gql`
  query GetOverview {
    getOverview {
      hero {
        label
        title
        subtitle
        image
      }
      growth {
        title
        items {
          icon
          title
          description
        }
      }
      leadership {
        role
        name
        quote
        description
        image
      }
      anthem {
        title
        lines
      }
      governingCouncil {
        name
        role
        image
      }
      davangere {
        title
        description
        image
      }
    }
  }
`;

export const GET_COMMITTEES = gql`
  query GetCommittees {
    getCommittees {
      title
      sections {
        title
        committees {
          title
          type
          members
          headers
          rows
        }
      }
    }
  }
`;

export const GET_FACILITIES = gql`
  query GetFacilities {
    getFacilities {
      sidebar {
        id
        title
      }
      content
    }
  }
`;

export const GET_VISION = gql`
  query GetVision {
    getVision {
      intro { title description }
      vision { title content }
      mission { title content }
      qualityPolicy { title points }
      swot {
        strengths
        weakness
        opportunities
        threats
      }
    }
  }
`;
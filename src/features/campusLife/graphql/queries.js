import { gql } from '@apollo/client';

// Centralized GraphQL queries for campusLife
export const GET_FACILITIES = gql`
  query GetFacilities {
    getFacilities {
      sidebar { id title }
      content
    }
  }
`;

export const GET_GYM = gql`
  query GetGym {
    getGym {
      title
      images
    }
  }
`;

export const GET_TECHNOWAVE = gql`
  query GetTechnowave {
    getTechnowave {
      title
      items { title pdf }
    }
  }
`;

export const GET_SPORTS = gql`
  query GetSports {
    getSports {
      title
      reports { title pdf }
    }
  }
`;

export const GET_SAC = gql`
  query GetSAC {
    getSAC {
      title
      description
      members { name role }
    }
  }
`;

export const GET_GREEN_CAMPUS = gql`
  query GetGreenCampus {
    getGreenCampus {
      title
      description
      images
    }
  }
`;

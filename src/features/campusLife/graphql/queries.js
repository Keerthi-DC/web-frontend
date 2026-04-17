// Centralized GraphQL queries for campusLife
export const GET_FACILITIES = `
  query GetFacilities {
    getFacilities {
      sidebar { id title }
      content
    }
  }
`;

export const GET_GYM = `
  query GetGym {
    getGym {
      title
      images
    }
  }
`;

export const GET_TECHNOWAVE = `
  query GetTechnowave {
    getTechnowave {
      title
      items { title pdf }
    }
  }
`;

export const GET_SPORTS = `
  query GetSports {
    getSports {
      title
      reports { title pdf }
    }
  }
`;

export const GET_SAC = `
  query GetSAC {
    getSAC {
      title
      description
      members { name role }
    }
  }
`;

export const GET_GREEN_CAMPUS = `
  query GetGreenCampus {
    getGreenCampus {
      title
      description
      images
    }
  }
`;

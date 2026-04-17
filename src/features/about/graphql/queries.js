export const GET_OVERVIEW = `
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

export const GET_COMMITTEES = `
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

export const GET_FACILITIES = `
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

export const GET_VISION = `
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
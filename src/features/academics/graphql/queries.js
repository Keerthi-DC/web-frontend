import { gql } from '@apollo/client';

// features/academics/graphql/query.js

export const LIST_DEPARTMENTS = gql`
  query ListDepartments($tenantId: ID!) {
    listDepartments(tenantId: $tenantId) {
      items {
        departmentId
        name
        shortName
        imageUrl
        hod
        programTypes
      }
    }
  }
`;

export const LIST_ACADEMIC_CALENDAR = gql`
  query ListAcademicCalendar {
    listAcademicCalendar {
      id
      title
      year
      semester
      version
      category
      pdf
    }
  }
`;

export const LIST_RESULT_ANALYSIS = gql`
  query ListResultAnalysis {
    listResultAnalysis {
      id
      title
      date
      summary
      image
    }
  }
`;

export const LIST_SYLLABUS = gql`
  query ListSyllabus {
    listSyllabus {
      id
      department
      program
      semester
      regulation
      year
      document
    }
  }
`;
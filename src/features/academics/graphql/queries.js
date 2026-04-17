// features/academics/graphql/query.js

export const LIST_DEPARTMENTS = `
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

export const LIST_ACADEMIC_CALENDAR = `
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

export const LIST_RESULT_ANALYSIS = `
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

export const LIST_SYLLABUS = `
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
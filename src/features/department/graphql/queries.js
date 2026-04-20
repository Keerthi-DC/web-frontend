import { gql } from "@apollo/client";

export const LIST_ALUMNI = gql`
  query ListAlumni($search: String, $batch: String, $department: String) {
    listAlumni(search: $search, batch: $batch, department: $department) {
      items {
        alumniId
        name
        batch
        department
        company
        designation
        location
        email
        linkedin
        image
        createdAt
      }
    }
  }
`;

export const LIST_FACULTY = gql`
  query ListFaculty($deptId: ID, $tenantId: ID) {
    listFaculty(deptId: $deptId, tenantId: $tenantId) {
      items {
        facultyId
        name
        designation
        profileImage
        cvUrl
        status
      }
    }
  }
`;

export const LIST_STAFF = gql`
  query ListDeptStaff(
    $deptId: ID!
    $staffType: String
    $limit: Int
    $tenantId: String
  ) {
    listDeptStaff(
      deptId: $deptId
      staffType: $staffType
      limit: $limit
      tenantId: $tenantId
    ) {
      items {
        deptStaffId
        name
        designation
        staffType
        imageUrl
      }
    }
  }
`;

export const GET_DEPARTMENT_RESEARCH = gql`
  query GetDepartmentResearch($deptId: ID!, $tenantId: ID!) {
    listPublicationProfiles(deptId: $deptId, tenantId: $tenantId) { items { facultyId googleScholarLink irinsLink } }
    listResearchGrants(deptId: $deptId, tenantId: $tenantId) { items { text } }
    listPatents(deptId: $deptId, tenantId: $tenantId) { items { text } }
    listFacultyResearchSummaries(deptId: $deptId, tenantId: $tenantId) { items { facultyId researchArea guideName guideDesignation university yearOfRegistration yearOfDegreeAwarded researchStatus } }
    listPhdGuides(deptId: $deptId, tenantId: $tenantId) { items { facultyName university recognizedYear scholarsGuided ongoingScholars } }
    listPhdScholars(deptId: $deptId, tenantId: $tenantId) { items { scholarName thesisTitle institution department yearOfRegistration status } }
    listFaculty(deptId: $deptId, tenantId: $tenantId) { items { facultyId name } }
  }
`;

export const GET_RESEARCH_PREVIEW = gql`
  query GetResearchPreview($deptId: ID!, $tenantId: ID!) {
    listPatents(deptId: $deptId, tenantId: $tenantId) { items { text } }
    listResearchGrants(deptId: $deptId, tenantId: $tenantId) { items { text } }
  }
`;

export const LIST_PLACEMENTS = gql`
  query ListPlacementOverviews($deptId: ID!, $academicYear: String, $tenantId: ID) {
    listPlacementOverviews(deptId: $deptId, academicYear: $academicYear, tenantId: $tenantId) {
      items {
        placementOverviewId
        deptId
        academicYear
        companiesVisited
        studentsInCampus
        studentsOffCampus
        highestPackage
      }
    }
  }
`;

export const LIST_ACHIEVEMENTS = gql`
  query ListAchievements($deptId: ID!, $type: String, $tenantId: ID!) {
    listAchievements(deptId: $deptId, type: $type, tenantId: $tenantId) {
      items {
        achievementId
        deptId
        type
        text
      }
    }
  }
`;

export const LIST_COMMITTEE = gql`
  query ListCommitteeMembers($deptId: ID!, $committee: String, $tenantId: ID!) {
    listCommitteeMembers(deptId: $deptId, committee: $committee, tenantId: $tenantId) {
      items {
        committeeMemberId
        name
        designation
        order
      }
    }
  }
`;

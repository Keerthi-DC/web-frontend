export const LIST_RESEARCH =
`
  query ListResearch(
    $deptId: ID!
    $tenantId: ID!
  ) {
    listResearch(department: $deptId, tenantId: $tenantId) {
      publications {
        items {
          title
          authors
          journal
          year
          type
          doi
        }
      }
      profiles {
        items {
          facultyId
          googleScholarLink
          irinsLink
        }
      }
      grants {
        items {
          text
        }
      }
      patents {
        items {
          text
        }
      }
      summaries {
        items {
          researchArea
          guideName
          guideDesignation
          university
          yearOfRegistration
          yearOfDegreeAwarded
          researchStatus
        }
      }
      guides {
        items {
          facultyName
          university
          recognizedYear
          scholarsGuided
          ongoingScholars
        }
      }
      scholars {
        items {
          scholarName
          thesisTitle
          institution
          department
          yearOfRegistration
          status
        }
      }
    }
  }
`;

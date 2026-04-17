// Centralized GraphQL queries for admissions feature
export const GET_ADMISSIONS_OVERVIEW = `
  query GetAdmissionsOverview($tenantId: ID!) {
    getAdmissionsOverview (tenantId: $tenantId) {
      headline
      subheadline
      description
      highlights
      imageUrl
      bannerUrl
      updatedAt
    }
  }
`;

export const LIST_ADMISSIONS_PROGRAMS = `
  query ListAdmissionsPrograms($tenantId: ID!) {
    listAdmissionsPrograms(tenantId: $tenantId) {
      programId
      name
      duration
      level
      order
    }
  }
`;

export const LIST_ELIGIBILITY_ENTRIES = `
  query ListEligibilityEntries($tenantId: ID!) {
    listEligibilityEntries(tenantId: $tenantId) {
      entryId
      title
      description
      order
    }
  }
`;

export const LIST_ADMISSION_STEPS = `
  query ListAdmissionSteps($tenantId: ID!) {
    listAdmissionSteps(tenantId: $tenantId) {
      stepId
      title
      description
      order
    }
  }
`;

export const LIST_IMPORTANT_DATES = `
  query ListImportantDates($tenantId: ID!) {
    listImportantDates(tenantId: $tenantId) {
      dateId
      event
      date
    }
  }
`;

export const GET_PROSPECTUS = `
  query GetProspectus($tenantId: ID!) {
    getProspectus(tenantId: $tenantId) {
      title
      fileUrl
      fileName
      description
      uploadedAt
    }
  }
`;

export const LIST_FEE_DOCUMENTS = `
  query ListFeeDocuments($tenantId: ID!) {
    listFeeDocuments(tenantId: $tenantId) {
      feeDocId
      title
      fileUrl
    }
  }
`;

export const LIST_SCHOLARSHIPS = `
  query ListScholarships($tenantId: ID!) {
    listScholarships(tenantId: $tenantId) {
      scholarshipId
      type
      name
      description
      amount
      eligibility
      order
    }
  }
`;

export const GET_WHY_ENQUIRE = `
  query GetWhyEnquire($tenantId: ID!) {
    getWhyEnquire(tenantId: $tenantId) {
      title
      points
    }
  }
`;

export const LIST_ENQUIRY_CATEGORIES = `
  query ListEnquiryCategories($tenantId: ID!) {
    listEnquiryCategories(tenantId: $tenantId) {
      categoryId
      title
      description
    }
  }
`;

export const SUBMIT_ENQUIRY_MUTATION = `
  mutation SubmitEnquiry($input: EnquirySubmitInput!) {
    submitAdmissionsEnquiry(input: $input)
  }
`;

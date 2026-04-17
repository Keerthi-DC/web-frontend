import { useQuery } from "@apollo/client/react";
import { gql } from "@apollo/client/core";

const TENANT_ID = "biet-college";

const BASE_DATA_QUERY = gql`
  query GetTimetableBaseData($deptId: ID!, $tenantId: ID) {
    listDeptBatches(deptId: $deptId, tenantId: $tenantId) {
      items { name }
    }
    listDeptSections(deptId: $deptId, tenantId: $tenantId) {
      items {
        deptSectionId
        name
        semester
        batchName
      }
    }
  }
`;

const SLOTS_QUERY = gql`
  query GetTimetableSlots($deptId: ID!, $sectionId: ID!, $tenantId: ID) {
    listDeptSlots(
      deptId: $deptId
      sectionId: $sectionId
      tenantId: $tenantId
    ) {
      items {
        day
        period
        courseCode
        courseName
        type
      }
    }
  }
`;

const useDepartmentTimetable = (deptId, selectedSectionId) => {
  const { data: baseData } = useQuery(BASE_DATA_QUERY, {
    variables: { deptId, tenantId: TENANT_ID },
    skip: !deptId,
    fetchPolicy: "cache-first",
  });

  const { data: slotsData, loading: slotsLoading } = useQuery(SLOTS_QUERY, {
    variables: { deptId, sectionId: selectedSectionId, tenantId: TENANT_ID },
    skip: !deptId || !selectedSectionId,
    fetchPolicy: "cache-first",
  });

  const uniqueBatches = [
    ...new Set(
      (baseData?.listDeptBatches?.items || []).map((b) => b.name)
    ),
  ];

  const sections = baseData?.listDeptSections?.items || [];
  const slots = slotsData?.listDeptSlots?.items || [];

  return { batches: uniqueBatches, sections, slots, loading: slotsLoading };
};

export default useDepartmentTimetable;

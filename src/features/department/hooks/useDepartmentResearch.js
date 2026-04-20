import { useQuery } from "@apollo/client";
import { GET_DEPARTMENT_RESEARCH } from "../graphql/queries";
import { useMemo } from "react";

const useDepartmentResearch = (deptId) => {
  const { data: apolloData, loading, error } = useQuery(GET_DEPARTMENT_RESEARCH, {
    variables: { deptId, tenantId: "biet-college" },
    skip: !deptId,
    errorPolicy: "all",
  });

  const data = useMemo(() => {
    if (!apolloData) return {
      publications: [],
      profiles: [],
      grants: [],
      patents: [],
      summaries: [],
      guides: [],
      scholars: [],
    };

    const facultyMap = {};
    (apolloData.listFaculty?.items || []).forEach(f => {
      facultyMap[f.facultyId] = f.name;
    });

    const summaries = (apolloData.listFacultyResearchSummaries?.items || []).map(s => ({
      ...s,
      facultyName: facultyMap[s.facultyId] || "-"
    }));

    const profiles = (apolloData.listPublicationProfiles?.items || []).map(p => ({
      ...p,
      facultyName: facultyMap[p.facultyId] || "-"
    }));

    return {
      publications: [],
      profiles,
      grants: apolloData.listResearchGrants?.items || [],
      patents: apolloData.listPatents?.items || [],
      summaries,
      guides: apolloData.listPhdGuides?.items || [],
      scholars: apolloData.listPhdScholars?.items || []
    };
  }, [apolloData]);

  if (error) {
    console.error("Research fetch error:", error);
  }

  return { data, loading };
};

export default useDepartmentResearch;

import { useEffect, useState } from "react";
import { graphqlRequest } from "../../services/graphql";

const useDepartmentResearch = (deptId) => {
  const [data, setData] = useState({
    publications: [],
    profiles: [],
    grants: [],
    patents: [],
    summaries: [],
    guides: [],
    scholars: [],
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!deptId) {
      setLoading(false);
      return;
    }

    const fetchData = async () => {
      try {
        setLoading(true);

        const queries = [
          {
            key: "profiles",
            query: `query ($deptId: ID!, $tenantId: ID!) {
              listPublicationProfiles(deptId: $deptId, tenantId: $tenantId) {
                items { facultyId googleScholarLink irinsLink }
              }
            }`,
          },
          {
            key: "grants",
            query: `query ($deptId: ID!, $tenantId: ID!) {
              listResearchGrants(deptId: $deptId, tenantId: $tenantId) {
                items { text }
              }
            }`,
          },
          {
            key: "patents",
            query: `query ($deptId: ID!, $tenantId: ID!) {
              listPatents(deptId: $deptId, tenantId: $tenantId) {
                items { text }
              }
            }`,
          },
          {
            key: "summaries",
            query: `query ($deptId: ID!, $tenantId: ID!) {
              listFacultyResearchSummaries(deptId: $deptId, tenantId: $tenantId) {
                items {
                  facultyId researchArea guideName guideDesignation university
                  yearOfRegistration yearOfDegreeAwarded researchStatus
                }
              }
            }`,
          },
          {
            key: "guides",
            query: `query ($deptId: ID!, $tenantId: ID!) {
              listPhdGuides(deptId: $deptId, tenantId: $tenantId) {
                items { facultyName university recognizedYear scholarsGuided ongoingScholars }
              }
            }`,
          },
          {
            key: "scholars",
            query: `query ($deptId: ID!, $tenantId: ID!) {
              listPhdScholars(deptId: $deptId, tenantId: $tenantId) {
                items {
                  scholarName thesisTitle institution department
                  yearOfRegistration status
                }
              }
            }`,
          },
          {
            key: "faculty",
            query: `query ($deptId: ID!, $tenantId: ID!) {
              listFaculty(deptId: $deptId, tenantId: $tenantId) {
                items { facultyId name }
              }
            }`,
          },
        ];

        const responses = await Promise.all(
          queries.map((q) =>
            graphqlRequest(q.query, {
              deptId,
              tenantId: "biet-college",
            })
          )
        );

        const results = {};
        responses.forEach((res, index) => {
          const key = Object.keys(res || {})[0];
          results[queries[index].key] =
            res?.[key]?.items || [];
        });

        // map faculty names
        const facultyMap = {};
        (results.faculty || []).forEach((f) => {
          facultyMap[f.facultyId] = f.name;
        });

        results.summaries = (results.summaries || []).map((s) => ({
          ...s,
          facultyName: facultyMap[s.facultyId] || "-",
        }));

        results.profiles = (results.profiles || []).map((p) => ({
          ...p,
          facultyName: facultyMap[p.facultyId] || "-",
        }));

        setData(results);
      } catch (err) {
        console.error("Research fetch error:", err);
        setData({
          publications: [],
          profiles: [],
          grants: [],
          patents: [],
          summaries: [],
          guides: [],
          scholars: [],
        });
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [deptId]);

  return { data, loading };
};

export default useDepartmentResearch;
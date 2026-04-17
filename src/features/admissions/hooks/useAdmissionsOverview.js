import { useEffect, useState } from "react";
import { graphqlRequest } from "../../services/graphql";

/**
 * useAdmissionsOverview Hook
 * Fetches all admissions-related data in parallel
 */
const useAdmissionsOverview = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        const [
          overviewRes,
          programsRes,
          eligibilityRes,
          stepsRes,
          datesRes,
          prospectusRes,
          feeDocsRes,
        ] = await Promise.all([
          graphqlRequest(`
            query {
              getAdmissionsOverview (tenantId: "biet-college") {
                headline subheadline description highlights imageUrl bannerUrl updatedAt
              }
            }
          `),

          graphqlRequest(`
            query {
              listAdmissionsPrograms(tenantId: "biet-college") {
                programId name duration level order
              }
            }
          `),

          graphqlRequest(`
            query {
              listEligibilityEntries(tenantId: "biet-college") {
                entryId title description order
              }
            }
          `),

          graphqlRequest(`
            query {
              listAdmissionSteps(tenantId: "biet-college") {
                stepId title description order
              }
            }
          `),

          graphqlRequest(`
            query {
              listImportantDates(tenantId: "biet-college") {
                dateId event date
              }
            }
          `),

          graphqlRequest(`
            query {
              getProspectus(tenantId: "biet-college") {
                title fileUrl
              }
            }
          `),

          graphqlRequest(`
            query {
              listFeeDocuments(tenantId: "biet-college") {
                feeDocId title fileUrl
              }
            }
          `),
        ]);

        setData({
          overview: overviewRes?.getAdmissionsOverview,

          programs: (programsRes?.listAdmissionsPrograms || []).sort(
            (a, b) => a.order - b.order
          ),

          eligibility: (eligibilityRes?.listEligibilityEntries || []).sort(
            (a, b) => a.order - b.order
          ),

          process: (stepsRes?.listAdmissionSteps || []).sort(
            (a, b) => a.order - b.order
          ),

          dates: datesRes?.listImportantDates || [],

          downloads: [
            ...(prospectusRes?.getProspectus
              ? [prospectusRes.getProspectus]
              : []),
            ...(feeDocsRes?.listFeeDocuments || []),
          ],
        });
      } catch (err) {
        console.error("Error loading data:", err);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  return { data, loading };
};

export default useAdmissionsOverview;
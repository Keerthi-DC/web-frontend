import { useEffect, useState } from 'react';
import { graphqlRequest } from '../../../services/graphql';
import {
  GET_ADMISSIONS_OVERVIEW,
  LIST_ADMISSIONS_PROGRAMS,
  LIST_ELIGIBILITY_ENTRIES,
  LIST_ADMISSION_STEPS,
  LIST_IMPORTANT_DATES,
  GET_PROSPECTUS,
  LIST_FEE_DOCUMENTS,
} from '../graphql/queries';

const TENANT = undefined; // graphqlRequest injects tenantId by default

export default function useOverview() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let mounted = true;

    const load = async () => {
      try {
        const [overviewRes, programsRes, eligibilityRes, stepsRes, datesRes, prospectusRes, feeDocsRes] = await Promise.all([
          graphqlRequest(GET_ADMISSIONS_OVERVIEW),
          graphqlRequest(LIST_ADMISSIONS_PROGRAMS),
          graphqlRequest(LIST_ELIGIBILITY_ENTRIES),
          graphqlRequest(LIST_ADMISSION_STEPS),
          graphqlRequest(LIST_IMPORTANT_DATES),
          graphqlRequest(GET_PROSPECTUS),
          graphqlRequest(LIST_FEE_DOCUMENTS),
        ]);

        if (!mounted) return;

        setData({
          overview: overviewRes?.data?.getAdmissionsOverview,
          programs: (programsRes?.data?.listAdmissionsPrograms || []).sort((a, b) => (a.order || 0) - (b.order || 0)),
          eligibility: (eligibilityRes?.data?.listEligibilityEntries || []).sort((a, b) => (a.order || 0) - (b.order || 0)),
          process: (stepsRes?.data?.listAdmissionSteps || []).sort((a, b) => (a.order || 0) - (b.order || 0)),
          dates: datesRes?.data?.listImportantDates || [],
          downloads: [
            ...(prospectusRes?.data?.getProspectus ? [prospectusRes.data.getProspectus] : []),
            ...(feeDocsRes?.data?.listFeeDocuments || []),
          ],
        });
      } catch (err) {
        console.error(err);
        if (mounted) setError(err);
      } finally {
        if (mounted) setLoading(false);
      }
    };

    load();

    return () => {
      mounted = false;
    };
  }, []);

  return { data, loading, error };
}

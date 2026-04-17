import { useEffect, useState } from 'react';
import { graphqlRequest } from '../../../services/graphql';
import { GET_WHY_ENQUIRE, LIST_ENQUIRY_CATEGORIES, SUBMIT_ENQUIRY_MUTATION } from '../graphql/queries';

const TENANT = undefined;

const useEnquiry = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    let mounted = true;

    const fetchData = async () => {
      try {
        setLoading(true);

        const [whyRes, categoryRes] = await Promise.all([
          graphqlRequest(GET_WHY_ENQUIRE),
          graphqlRequest(LIST_ENQUIRY_CATEGORIES),
        ]);

        if (!mounted) return;

        setData({
          whyEnquire: whyRes?.data?.getWhyEnquire || { points: [] },
          enquiryTypes: categoryRes?.data?.listEnquiryCategories || [],
        });
      } catch (err) {
        console.error(err);
        if (mounted) setError(err);
        if (mounted) setData(null);
      } finally {
        if (mounted) setLoading(false);
      }
    };

    fetchData();

    return () => {
      mounted = false;
    };
  }, []);

  // submit function
  const submitEnquiry = async (formData) => {
    try {
      setSubmitting(true);

      const finalProgram = formData.program === 'Other' ? formData.otherValue : formData.program;

      const input = {
        ...formData,
        program: finalProgram,
        tenantId: 'biet-college',
        email: formData.email?.trim()?.toLowerCase(),
      };

      const res = await graphqlRequest(SUBMIT_ENQUIRY_MUTATION, { input });
      return res?.data?.submitAdmissionsEnquiry;
    } catch (err) {
      console.error('Submit error:', err);
      return null;
    } finally {
      setSubmitting(false);
    }
  };

  return {
    loading,
    data,
    submitting,
    error,
    submitEnquiry,
  };
};

export default useEnquiry;
import { useEffect, useState } from "react";
import { graphqlRequest } from "../../services/graphql";

const useEnquiry = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        const [whyRes, categoryRes] = await Promise.all([
          graphqlRequest(`
            query {
              getWhyEnquire(tenantId: "biet-college") {
                title
                points
              }
            }
          `),

          graphqlRequest(`
            query {
              listEnquiryCategories(tenantId: "biet-college") {
                categoryId
                title
                description
              }
            }
          `),
        ]);

        setData({
          whyEnquire: whyRes?.getWhyEnquire || { points: [] },
          enquiryTypes: categoryRes?.listEnquiryCategories || [],
        });
      } catch (err) {
        console.error(err);
        setData(null);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // ✅ submit function
  const submitEnquiry = async (formData, otherValue) => {
    try {
      setSubmitting(true);

      const finalProgram =
        formData.program === "Other" ? otherValue : formData.program;

      const res = await graphqlRequest(
        `
        mutation SubmitEnquiry($input: EnquirySubmitInput!) {
          submitAdmissionsEnquiry(input: $input)
        }
        `,
        {
          input: {
            ...formData,
            program: finalProgram,
            tenantId: "biet-college",
            email: formData.email.trim().toLowerCase(),
          },
        }
      );

      return res?.submitAdmissionsEnquiry;
    } catch (err) {
      console.error("Submit error:", err);
      return null;
    } finally {
      setSubmitting(false);
    }
  };

  return {
    loading,
    data,
    submitting,
    submitEnquiry,
  };
};

export default useEnquiry;
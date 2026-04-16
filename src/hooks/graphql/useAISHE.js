import { useEffect, useState, useMemo } from "react";
import { graphqlRequest } from "../../services/graphql";

const QUERY = `
  query ListAccreditationRecords(
    $type: String!
    $section: String
    $sub_section: String
    $sub_sub_section: String
    $department: String
    $tenantId: ID
  ) {
    listAccreditationRecords(
      type: $type
      section: $section
      sub_section: $sub_section
      sub_sub_section: $sub_sub_section
      department: $department
      tenantId: $tenantId
    ) {
      items {
        title
        file_url
        year
        order
      }
    }
  }
`;

/**
 * useAISHE Hook
 * Fetches AISHE accreditation data and sorts it
 */
const useAISHE = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        const res = await graphqlRequest(QUERY, {
          tenantId: "biet-college",
          type: "AISHE",
        });

        const items = res?.listAccreditationRecords?.items || [];
        setData(items);
      } catch (err) {
        console.error("Failed to load AISHE data:", err);
        setData([]);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  const sortedData = useMemo(() => {
    return [...data].sort((a, b) => {
      if (b.year && a.year) return b.year - a.year;
      return (a.order || 0) - (b.order || 0);
    });
  }, [data]);

  return {
    loading,
    data: sortedData,
  };
};

export default useAISHE;
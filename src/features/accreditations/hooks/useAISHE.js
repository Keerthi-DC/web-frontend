import { useEffect, useState, useMemo } from "react";
import { graphqlRequest } from "../../../services/graphql";
import { LIST_ACCREDITATION_RECORDS } from "../graphql/queries";

const useAISHE = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        const res = await graphqlRequest(
          LIST_ACCREDITATION_RECORDS,
          { tenantId: "biet-college", type: "AISHE" }
        );

        const items = res?.data?.listAccreditationRecords?.items || [];

        setData(items);
      } catch (err) {
        console.error(err);
        setError(err);
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

  return { loading, error, data: sortedData };
};

export default useAISHE;
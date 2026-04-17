import { useEffect, useState } from 'react';
import { graphqlRequest } from '../../../services/graphql';
import { LIST_FEE_DOCUMENTS } from '../graphql/queries';

const TENANT = undefined;

export default function useFeeDocuments() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let mounted = true;

    const load = async () => {
      try {
  const res = await graphqlRequest(LIST_FEE_DOCUMENTS);
        if (!mounted) return;
        setData(res?.data?.listFeeDocuments || []);
      } catch (err) {
        console.error(err);
        if (mounted) setError(err);
        if (mounted) setData([]);
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

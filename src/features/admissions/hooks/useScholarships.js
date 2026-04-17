import { useEffect, useState, useMemo } from 'react';
import { graphqlRequest } from '../../../services/graphql';
import { LIST_SCHOLARSHIPS } from '../graphql/queries';

const TENANT = undefined;

export default function useScholarships() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let mounted = true;

    const load = async () => {
      try {
  const res = await graphqlRequest(LIST_SCHOLARSHIPS);
        if (!mounted) return;
        const list = res?.data?.listScholarships || [];
        setData(list);
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

  const sorted = useMemo(() => {
    return [...data].sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
  }, [data]);

  return { data: sorted, loading, error };
}
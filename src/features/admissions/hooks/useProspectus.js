import { useEffect, useState } from 'react';
import { graphqlRequest } from '../../../services/graphql';
import { GET_PROSPECTUS } from '../graphql/queries';

const TENANT = undefined;

export default function useProspectus() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let mounted = true;

    const load = async () => {
      try {
  const res = await graphqlRequest(GET_PROSPECTUS);
        if (!mounted) return;
        setData(res?.data?.getProspectus || null);
      } catch (err) {
        console.error(err);
        if (mounted) setError(err);
        if (mounted) setData(null);
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
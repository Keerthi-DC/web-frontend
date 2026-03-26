import { useState, useEffect } from 'react';

export const useDepartment = (deptId) => {
  const [dept, setDept] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;
    const fetchJson = async () => {
      setLoading(true);
      try {
        const res = await fetch(`/data/departments/${deptId}.json`, { signal });
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const json = await res.json();
        setDept(json);
      } catch (e) {
        if (e.name !== 'AbortError') setError(e);
      } finally {
        setLoading(false);
      }
    };
    fetchJson();
    return () => controller.abort();
  }, [deptId]);

  return { dept, loading, error };
};

import { useState, useEffect } from 'react';
import { API_URL, API_KEY } from '../services/api';
import { print } from "graphql";

export const useAppSync = (query, variables = {}) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch(API_URL, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'x-api-key': API_KEY,
          },
          body: JSON.stringify({ 
            query: typeof query === "string" ? query : print(query), 
            variables 
          }),
          signal,
        });
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const json = await res.json();
        setData(json?.data ?? null);
      } catch (e) {
        if (e.name !== 'AbortError') setError(e);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
    return () => controller.abort();
  }, [query, JSON.stringify(variables)]);

  return { data, loading, error };
};

import { useState, useEffect } from "react";
import { graphqlRequest } from "../../../services/graphql";
import { LIST_HOME_DEPARTMENTS } from "../graphql/queries";

export const useHomeDepartments = () => {
  const [departments, setDepartments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDepartments = async () => {
      try {
        setLoading(true);
        const res = await graphqlRequest(LIST_HOME_DEPARTMENTS);
        const items = res?.data?.listDepartments?.items || [];
        setDepartments(items);
      } catch (err) {
        console.error("Fetch error:", err);
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchDepartments();
  }, []);

  return { departments, loading, error };
};

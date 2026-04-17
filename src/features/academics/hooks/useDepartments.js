import { useEffect, useState, useMemo } from "react";
import { graphqlRequest } from "../../../services/graphql";
import { LIST_DEPARTMENTS } from "../graphql/queries";

const typeMap = {
  all: null,
  ug: "UG",
  pg: "PG",
  research: "RESEARCH",
};

const useDepartments = () => {
  const [departments, setDepartments] = useState([]);
  const [activeType, setActiveType] = useState("ug");
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchDepartments = async () => {
    try {
      setLoading(true);

      const res = await graphqlRequest(LIST_DEPARTMENTS, {
        tenantId: "biet-college",
      });

      const items = res?.data?.listDepartments?.items || [];
      setDepartments(items);
    } catch (err) {
      console.error("Departments error:", err);
      setError(err);
      setDepartments([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDepartments();
  }, []);

const filteredDepartments = useMemo(() => {
  return departments.filter((dep) => {
    const selectedType = typeMap[activeType];

    const types = dep.programTypes || [];

    // ✅ normalize properly (handles string + array + case)
    const normalizedTypes = Array.isArray(types)
      ? types.map((t) => t.toUpperCase())
      : [String(types).toUpperCase()];

    // ✅ STRICT FILTER (your requirement)
    const matchesType =
      !selectedType || normalizedTypes.includes(selectedType);

    const matchesSearch = dep.name
      ?.toLowerCase()
      .includes(searchTerm.toLowerCase());

    return matchesType && matchesSearch;
  });
}, [departments, activeType, searchTerm]);

  return {
    departments,
    filteredDepartments,
    activeType,
    setActiveType,
    searchTerm,
    setSearchTerm,
    loading,
    error,
    refetch: fetchDepartments,
  };
};

export default useDepartments;
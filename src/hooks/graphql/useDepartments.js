import { useEffect, useState, useMemo } from "react";
import { graphqlRequest } from "../../services/graphql";

const LIST_DEPARTMENTS_QUERY = `
  query ListDepartments($tenantId: ID!) {
    listDepartments(tenantId: $tenantId) {
      items {
        departmentId
        name
        shortName
        imageUrl
        hod
        programTypes
      }
    }
  }
`;

const typeMap = {
  all: null,
  ug: "UG",
  pg: "PG",
  research: "RESEARCH",
};

const useDepartments = () => {
  const [departments, setDepartments] = useState([]);
  const [activeType, setActiveType] = useState("ug"); // 🔥 keep lowercase for UI
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDepartments = async () => {
      try {
        setLoading(true);

        const res = await graphqlRequest(LIST_DEPARTMENTS_QUERY);

        const items = res?.data?.listDepartments?.items || [];
        setDepartments(items);
      } catch (err) {
        console.error("Fetch error:", err);
        setError(err);
        setDepartments([]);
      } finally {
        setLoading(false);
      }
    };

    fetchDepartments();
  }, []);

  // ✅ FILTER LOGIC (FIXED)
  const filteredDepartments = useMemo(() => {
    return departments.filter((dep) => {
      // 🔹 TYPE FILTER
      const selectedType = typeMap[activeType];

      const matchesType =
        !selectedType ||
        dep.programTypes?.includes(selectedType);

      // 🔹 SEARCH FILTER
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
  };
};

export default useDepartments;
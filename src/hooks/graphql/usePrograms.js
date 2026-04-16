import { useEffect, useState, useMemo } from "react";
import { graphqlRequest } from "../../services/graphql";

const QUERY = `
  query {
    listDepartments {
      items {
        departmentId
        name
        shortName
        description
        programTypes
      }
    }
  }
`;

const durationMap = {
  UG: "4 Years",
  PG: "2 Years",
  RESEARCH: "3-5 Years",
};

const usePrograms = () => {
  const [departments, setDepartments] = useState([]);
  const [activeTab, setActiveTab] = useState("all");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPrograms = async () => {
      try {
        setLoading(true);

        const res = await graphqlRequest(QUERY);

        setDepartments(res?.listDepartments?.items || []);
      } catch (err) {
        console.error(err);
        setDepartments([]);
      } finally {
        setLoading(false);
      }
    };

    fetchPrograms();
  }, []);

  // ✅ transform departments → programs
  const programs = useMemo(() => {
    const result = [];

    departments.forEach((dep) => {
      dep.programTypes?.forEach((type) => {
        result.push({
          id: dep.departmentId + type,
          name: dep.name,
          type,
          description: dep.description,
          duration: durationMap[type],
        });
      });
    });

    return result;
  }, [departments]);

  // ✅ filter
  const filteredPrograms = useMemo(() => {
    return activeTab === "all"
      ? programs
      : programs.filter(
          (p) => p.type === activeTab.toUpperCase()
        );
  }, [programs, activeTab]);

  return {
    loading,
    departments,
    programs,
    filteredPrograms,
    activeTab,
    setActiveTab,
  };
};

export default usePrograms;
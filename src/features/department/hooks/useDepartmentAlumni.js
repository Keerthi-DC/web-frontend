import { useQuery } from "@apollo/client";
import { LIST_ALUMNI } from "../graphql/queries";

/**
 * useAlumni Hook
 * Fetches alumni list for a department
 */
const useAlumni = (deptId) => {
  const { data, loading, error } = useQuery(LIST_ALUMNI, {
    variables: { 
      department: deptId,
      search: "",
      batch: ""
    },
    skip: !deptId,
  });

  const alumni = data?.listAlumni?.items || [];

  if (error) {
    console.error("ALUMNI FETCH ERROR:", error);
  }

  return { alumni, loading };
};

export default useAlumni;

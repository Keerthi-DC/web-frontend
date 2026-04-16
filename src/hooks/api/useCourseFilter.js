import { useMemo } from "react";

const useCourseFilter = (courses, filters) => {
  return useMemo(() => {
    let temp = [...courses];

    if (filters.search) {
      temp = temp.filter(
        (c) =>
          c.name?.toLowerCase().includes(filters.search.toLowerCase()) ||
          c.code?.toLowerCase().includes(filters.search.toLowerCase())
      );
    }

    if (filters.programType)
      temp = temp.filter((c) => c.programType === filters.programType);

    if (filters.batch)
      temp = temp.filter((c) => c.batch === filters.batch);

    if (filters.type)
      temp = temp.filter((c) => c.type === filters.type);

    if (filters.semester)
      temp = temp.filter(
        (c) => String(c.semester) === String(filters.semester)
      );

    if (filters.program)
      temp = temp.filter((c) => c.program === filters.program);

    return temp;
  }, [courses, filters]);
};

export default useCourseFilter;
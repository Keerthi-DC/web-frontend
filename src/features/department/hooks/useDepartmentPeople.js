import { useQuery } from "@apollo/client";
import { LIST_FACULTY, LIST_STAFF } from "../graphql/queries";

const useDepartmentPeople = (deptId, activeTab) => {
  const { data: facultyData, loading: facultyLoading } = useQuery(LIST_FACULTY, {
    variables: {
      tenantId: "biet-college",
      deptId,
    },
    skip: !deptId,
  });

  const { data: staffData, loading: staffLoading } = useQuery(LIST_STAFF, {
    variables: {
      deptId,
      staffType: activeTab === "technical" ? "technical" : "supporting",
      limit: 100,
      tenantId: "biet-college",
    },
    skip: !deptId || activeTab === "faculty",
  });

  const facultyList = facultyData?.listFaculty?.items || [];
  const staffList = staffData?.listDeptStaff?.items || [];

  const faculty = facultyList.filter((f) => f.status === "active");
  const staff = staffList;
  const loading = facultyLoading || staffLoading;

  return { faculty, staff, loading };
};

export default useDepartmentPeople;

import { useEffect, useState } from "react";
import { graphqlRequest } from "../../services/graphql";

const LIST_FACULTY = `
  query ($deptId: ID, $tenantId: ID) {
    listFaculty(deptId: $deptId, tenantId: $tenantId) {
      items {
        facultyId
        name
        designation
        profileImage
        cvUrl
        status
      }
    }
  }
`;

const LIST_STAFF = `
  query ($deptId: ID!, $staffType: String, $limit: Int, $tenantId: String) {
    listDeptStaff(deptId: $deptId, staffType: $staffType, limit: $limit, tenantId: $tenantId) {
      items {
        deptStaffId
        name
        designation
        staffType
        imageUrl
      }
    }
  }
`;

const useDepartmentPeople = (deptId, activeTab) => {
  const [faculty, setFaculty] = useState([]);
  const [staff, setStaff] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!deptId) {
      setLoading(false);
      return;
    }

    const fetchData = async () => {
      try {
        setLoading(true);

        let staffType = null;
        if (activeTab === "technical") staffType = "technical";
        if (activeTab === "supporting") staffType = "supporting";

        if (activeTab === "faculty") {
          const res = await graphqlRequest(LIST_FACULTY, {
            deptId,
            tenantId: "biet-college",
          });

          const list = res?.listFaculty?.items || [];
          setFaculty(list.filter((f) => f.status === "active"));
          setStaff([]);
        } else {
          const res = await graphqlRequest(LIST_STAFF, {
            deptId,
            staffType,
            limit: 100,
            tenantId: "biet-college",
          });

          setStaff(res?.listDeptStaff?.items || []);
          setFaculty([]);
        }
      } catch (err) {
        console.error("FETCH ERROR:", err);
        setFaculty([]);
        setStaff([]);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [deptId, activeTab]);

  return { faculty, staff, loading };
};

export default useDepartmentPeople;
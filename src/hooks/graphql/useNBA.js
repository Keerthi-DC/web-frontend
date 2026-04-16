import { useEffect, useState } from "react";
import { graphqlRequest } from "../../services/graphql";

const QUERY = `
  query ListAccreditationRecords(
    $type: String!
    $section: String
    $sub_section: String
    $sub_sub_section: String
    $department: String
    $tenantId: ID
  ) {
    listAccreditationRecords(
      type: $type
      section: $section
      sub_section: $sub_section
      sub_sub_section: $sub_sub_section
      department: $department
      tenantId: $tenantId
    ) {
      items {
        title
        file_url
        sub_section
        department
      }
    }
  }
`;

const fetchAccreditation = async (variables) => {
  try {
    const res = await graphqlRequest(QUERY, {
      tenantId: "biet-college",
      ...variables,
    });

    return res?.listAccreditationRecords?.items || [];
  } catch (err) {
    console.error("NBA fetch error:", err);
    return [];
  }
};

const useNBA = () => {
  const [data, setData] = useState(null);
  const [activeTab, setActiveTab] = useState("Accreditation Details");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);

        // 🔥 Parallel fetch
        const accreditationPromise = fetchAccreditation({
          type: "NBA",
          section: "Accreditation Details",
        });

        const instituteSections = [
          "General",
          "Course Files",
          "First Year Time Table",
          "First Year Faculty List",
          "Governing Bodies",
          "Others",
        ];

        const institutePromises = instituteSections.map(async (sec) => ({
          section: sec,
          data: await fetchAccreditation({
            type: "NBA",
            section: "Institute Level",
            sub_section: sec,
          }),
        }));

        const departments = [
          "Information Science & Engineering",
          "Bio-Technology Engineering",
          "Chemical Engineering",
          "Textile Technology",
        ];

        const deptPromises = departments.map(async (dept) => {
          const [faculty, placement] = await Promise.all([
            fetchAccreditation({
              type: "NBA",
              section: "Department Level",
              sub_section: "Faculty List",
              department: dept,
            }),
            fetchAccreditation({
              type: "NBA",
              section: "Department Level",
              sub_section: "Placement List",
              department: dept,
            }),
          ]);

          return { name: dept, faculty, placement };
        });

        // 🔥 resolve all
        const accreditation = await accreditationPromise;
        const instituteResults = await Promise.all(institutePromises);
        const deptData = await Promise.all(deptPromises);

        const instituteData = {};
        instituteResults.forEach((item) => {
          instituteData[item.section] = item.data;
        });

        setData({
          accreditation,
          instituteData,
          deptData,
        });
      } catch (err) {
        console.error(err);
        setData(null);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  return {
    loading,
    data,
    activeTab,
    setActiveTab,
  };
};

export default useNBA;
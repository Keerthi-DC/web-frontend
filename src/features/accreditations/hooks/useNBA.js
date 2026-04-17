import { useEffect, useState } from "react";
import { graphqlRequest } from "../../../services/graphql";
import { LIST_ACCREDITATION_RECORDS } from "../graphql/queries";

/**
 * 🔥 IMPORTANT: match your old working behavior
 * graphqlRequest already returns `data`
 */
const fetchData = async (variables) => {
  const res = await graphqlRequest(
    LIST_ACCREDITATION_RECORDS,
    {
      tenantId: "biet-college",
      ...variables,
    }
  );

  // graphqlRequest returns the parsed response (with a `data` property)
  return res?.data?.listAccreditationRecords?.items || [];
};

const useNBA = () => {
  const [data, setData] = useState(null);
  const [activeTab, setActiveTab] = useState("Accreditation Details");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const load = async () => {
      try {
        setLoading(true);

        // ✅ ACCREDITATION
        const accreditation = await fetchData({
          type: "NBA",
          section: "Accreditation Details",
        });

        // ✅ INSTITUTE LEVEL
        const instituteSections = [
          "General",
          "Course Files",
          "First Year Time Table",
          "First Year Faculty List",
          "Governing Bodies",
          "Others",
        ];

        const instituteData = {};

        for (let sec of instituteSections) {
          instituteData[sec] = await fetchData({
            type: "NBA",
            section: "Institute Level",
            sub_section: sec,
          });
        }

        // ✅ DEPARTMENT LEVEL
        const departments = [
          "Information Science & Engineering",
          "Bio-Technology Engineering",
          "Chemical Engineering",
          "Textile Technology",
        ];

        const deptData = [];

        for (let dept of departments) {
          const faculty = await fetchData({
            type: "NBA",
            section: "Department Level",
            sub_section: "Faculty List",
            department: dept,
          });

          const placement = await fetchData({
            type: "NBA",
            section: "Department Level",
            sub_section: "Placement List",
            department: dept,
          });

          deptData.push({
            name: dept,
            faculty,
            placement,
          });
        }

        setData({
          accreditation,
          instituteData,
          deptData,
        });

      } catch (err) {
        console.error("NBA ERROR:", err);
        setError(err);
        setData(null);
      } finally {
        setLoading(false);
      }
    };

    load();
  }, []);

  return { loading, error, data, activeTab, setActiveTab };
};

export default useNBA;
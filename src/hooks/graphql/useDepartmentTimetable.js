import { useEffect, useState } from "react";
import { graphqlRequest } from "../../services/graphql";

const TENANT_ID = "biet-college";

const useDepartmentTimetable = (deptId, selectedSectionId) => {
  const [batches, setBatches] = useState([]);
  const [sections, setSections] = useState([]);
  const [slots, setSlots] = useState([]);
  const [loading, setLoading] = useState(false);

  // ✅ FETCH BASE DATA
  useEffect(() => {
    if (!deptId) return;

    const fetchBaseData = async () => {
      try {
        const [batchRes, sectionRes] = await Promise.all([
          graphqlRequest(
            `
            query ($deptId: ID!, $tenantId: ID) {
              listDeptBatches(deptId: $deptId, tenantId: $tenantId) {
                items { name }
              }
            }
          `,
            { deptId, tenantId: TENANT_ID }
          ),

          graphqlRequest(
            `
            query ($deptId: ID!, $tenantId: ID) {
              listDeptSections(deptId: $deptId, tenantId: $tenantId) {
                items {
                  deptSectionId
                  name
                  semester
                  batchName
                }
              }
            }
          `,
            { deptId, tenantId: TENANT_ID }
          ),
        ]);

        const uniqueBatches = [
          ...new Set(
            (batchRes?.listDeptBatches?.items || []).map((b) => b.name)
          ),
        ];

        setBatches(uniqueBatches);
        setSections(sectionRes?.listDeptSections?.items || []);
      } catch (err) {
        console.error("Error fetching base data:", err);
        setBatches([]);
        setSections([]);
      }
    };

    fetchBaseData();
  }, [deptId]);

  // ✅ FETCH SLOTS
  useEffect(() => {
    if (!selectedSectionId) {
      setSlots([]);
      return;
    }

    if (!deptId) return;

    const fetchSlots = async () => {
      try {
        setLoading(true);

        const res = await graphqlRequest(
          `
          query ($deptId: ID!, $sectionId: ID!, $tenantId: ID) {
            listDeptSlots(
              deptId: $deptId
              sectionId: $sectionId
              tenantId: $tenantId
            ) {
              items {
                day
                period
                courseCode
                courseName
                type
              }
            }
          }
        `,
          {
            deptId,
            sectionId: selectedSectionId,
            tenantId: TENANT_ID,
          }
        );

        setSlots(res?.listDeptSlots?.items || []);
      } catch (err) {
        console.error("Error fetching slots:", err);
        setSlots([]);
      } finally {
        setLoading(false);
      }
    };

    fetchSlots();
  }, [deptId, selectedSectionId]);

  return { batches, sections, slots, loading };
};

export default useDepartmentTimetable;
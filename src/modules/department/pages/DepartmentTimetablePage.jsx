import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDepartmentMeta } from "../../../hooks/useDepartmentMeta";

const DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const PERIODS = [1, 2, 3, 4, 5, 6, 7];

const TYPE_CELL = {
  theory: "bg-blue-50 text-blue-800 border border-blue-200",
  lab: "bg-emerald-50 text-emerald-800 border border-emerald-200",
  elective: "bg-amber-50 text-amber-800 border border-amber-200",
};

export default function TimetablePage() {
  const { shortName } = useParams();
  const { getId } = useDepartmentMeta();

  const deptId = getId(shortName);
  const TENANT_ID = "biet-college";

  // ================= STATE =================
  const [batches, setBatches] = useState([]);
  const [semesters, setSemesters] = useState([]);
  const [sections, setSections] = useState([]);
  const [slots, setSlots] = useState([]);

  const [selectedBatch, setSelectedBatch] = useState("");
  const [selectedSemester, setSelectedSemester] = useState("");
  const [selectedSectionId, setSelectedSectionId] = useState("");

  const [loading, setLoading] = useState(false);

  // ================= FETCH BATCHES =================
  useEffect(() => {
    if (!deptId) return;

    const fetchBatches = async () => {
      try {
        console.log("🚀 FETCH BATCHES");

        const res = await fetch(import.meta.env.VITE_APPSYNC_URL, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "x-api-key": import.meta.env.VITE_APPSYNC_API_KEY,
          },
          body: JSON.stringify({
            query: `
              query ($deptId: ID!, $tenantId: ID) {
                listDeptBatches(deptId: $deptId, tenantId: $tenantId) {
                  items { name }
                }
              }
            `,
            variables: { deptId, tenantId: TENANT_ID },
          }),
        });

        const json = await res.json();
        console.log("✅ BATCHES:", json);

        setBatches(json?.data?.listDeptBatches?.items || []);
      } catch (err) {
        console.error("❌ Batch fetch error:", err);
      }
    };

    fetchBatches();
  }, [deptId]);

  // ================= FETCH SEMESTERS =================
  useEffect(() => {
    if (!deptId || !selectedBatch) {
      setSemesters([]);
      return;
    }

    const fetchSemesters = async () => {
      try {
        console.log("🚀 FETCH SEMESTERS");

        const res = await fetch(import.meta.env.VITE_APPSYNC_URL, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "x-api-key": import.meta.env.VITE_APPSYNC_API_KEY,
          },
          body: JSON.stringify({
            query: `
              query ($deptId: ID!, $batchName: String!, $tenantId: ID) {
                listDeptSections(
                  deptId: $deptId
                  batchName: $batchName
                  tenantId: $tenantId
                ) {
                  items { semester }
                }
              }
            `,
            variables: {
              deptId,
              batchName: selectedBatch,
              tenantId: TENANT_ID,
            },
          }),
        });

        const json = await res.json();
        const items = json?.data?.listDeptSections?.items || [];

        const uniqueSems = [...new Set(items.map(i => i.semester))];

        console.log("🎯 SEMESTERS:", uniqueSems);

        setSemesters(uniqueSems);
      } catch (err) {
        console.error("❌ Semester fetch error:", err);
      }
    };

    fetchSemesters();
  }, [deptId, selectedBatch]);

  // ================= FETCH SECTIONS =================
  useEffect(() => {
    if (!deptId || !selectedBatch || !selectedSemester) {
      setSections([]);
      setSelectedSectionId("");
      return;
    }

    const fetchSections = async () => {
      try {
        console.log("🚀 FETCH SECTIONS");

        const res = await fetch(import.meta.env.VITE_APPSYNC_URL, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "x-api-key": import.meta.env.VITE_APPSYNC_API_KEY,
          },
          body: JSON.stringify({
            query: `
              query ($deptId: ID!, $semester: Int!, $batchName: String!, $tenantId: ID) {
                listDeptSections(
                  deptId: $deptId
                  semester: $semester
                  batchName: $batchName
                  tenantId: $tenantId
                ) {
                  items {
                    deptSectionId
                    name
                  }
                }
              }
            `,
            variables: {
              deptId,
              semester: Number(selectedSemester),
              batchName: selectedBatch,
              tenantId: TENANT_ID,
            },
          }),
        });

        const json = await res.json();
        console.log("✅ SECTIONS:", json);

        setSections(json?.data?.listDeptSections?.items || []);
        setSelectedSectionId("");
      } catch (err) {
        console.error("❌ Section fetch error:", err);
      }
    };

    fetchSections();
  }, [deptId, selectedBatch, selectedSemester]);

  // ================= FETCH TIMETABLE (SMART FALLBACK) =================
  useEffect(() => {
    if (!deptId || !selectedSectionId) {
      setSlots([]);
      return;
    }

    const fetchTimetable = async () => {
      try {
        setLoading(true);

        console.log("🚀 PRIMARY QUERY");

        // PRIMARY
        let res = await fetch(import.meta.env.VITE_APPSYNC_URL, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "x-api-key": import.meta.env.VITE_APPSYNC_API_KEY,
          },
          body: JSON.stringify({
            query: `
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
                    sectionId
                  }
                }
              }
            `,
            variables: {
              deptId,
              sectionId: selectedSectionId,
              tenantId: TENANT_ID,
            },
          }),
        });

        let json = await res.json();
        let items = json?.data?.listDeptSlots?.items || [];

        console.log("PRIMARY RESULT:", items);

        // FALLBACK
        if (!items.length) {
          console.warn("⚠️ FALLBACK TRIGGERED");

          res = await fetch(import.meta.env.VITE_APPSYNC_URL, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "x-api-key": import.meta.env.VITE_APPSYNC_API_KEY,
            },
            body: JSON.stringify({
              query: `
                query ($deptId: ID!, $tenantId: ID) {
                  listDeptSlots(
                    deptId: $deptId
                    tenantId: $tenantId
                  ) {
                    items {
                      day
                      period
                      courseCode
                      courseName
                      type
                      sectionId
                    }
                  }
                }
              `,
              variables: {
                deptId,
                tenantId: TENANT_ID,
              },
            }),
          });

          json = await res.json();
          const allSlots = json?.data?.listDeptSlots?.items || [];

          console.log("ALL SLOTS:", allSlots);

          // try match
          items = allSlots.filter(s => s.sectionId === selectedSectionId);

          // final fallback
          if (!items.length) {
            console.warn("⚠️ Showing ALL slots");
            items = allSlots;
          }
        }

        setSlots(items);
      } catch (err) {
        console.error("❌ Timetable fetch error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchTimetable();
  }, [deptId, selectedSectionId]);

  // ================= GET SLOT =================
  const getSlot = (day, period) =>
    slots.find(
      (s) =>
        s.day === day &&
        Number(s.period) === Number(period)
    );

  // ================= UI =================
  return (
    <div className="px-6 py-8 space-y-6">

      <h2 className="text-3xl font-bold text-[#003178]">
        📅 Timetable
      </h2>

      <div className="flex gap-3 flex-wrap">

        <select
          value={selectedBatch}
          onChange={(e) => {
            setSelectedBatch(e.target.value);
            setSelectedSemester("");
            setSelectedSectionId("");
          }}
          className="border px-3 py-2 rounded"
        >
          <option value="">Batch</option>
          {batches.map((b, i) => (
            <option key={i} value={b.name}>{b.name}</option>
          ))}
        </select>

        <select
          value={selectedSemester}
          onChange={(e) => {
            setSelectedSemester(e.target.value);
            setSelectedSectionId("");
          }}
          className="border px-3 py-2 rounded"
          disabled={!semesters.length}
        >
          <option value="">Semester</option>
          {semesters.map((s) => (
            <option key={s} value={s}>Sem {s}</option>
          ))}
        </select>

        <select
          value={selectedSectionId}
          onChange={(e) => setSelectedSectionId(e.target.value)}
          className="border px-3 py-2 rounded"
          disabled={!sections.length}
        >
          <option value="">Section</option>
          {sections.map((s) => (
            <option key={s.deptSectionId} value={s.deptSectionId}>
              {s.name}
            </option>
          ))}
        </select>

      </div>

      {loading && <div className="text-center py-10">Loading...</div>}

      {!slots.length && !loading && (
        <div className="text-center py-10 text-red-500">
          No timetable data found ⚠️
        </div>
      )}

      <div className="grid grid-cols-7 bg-gray-100 text-center text-sm font-semibold">
        <div>Period</div>
        {DAYS.map(d => <div key={d}>{d}</div>)}
      </div>

      {PERIODS.map(period => (
        <div key={period} className="grid grid-cols-7 border-t text-sm">
          <div className="p-2 text-center font-semibold">{period}</div>
          {DAYS.map(day => {
            const slot = getSlot(day, period);
            return (
              <div key={day} className="p-2 border-l min-h-[70px]">
                {slot && (
                  <div className={`p-2 rounded ${TYPE_CELL[slot.type]}`}>
                    <p className="font-bold text-xs">{slot.courseCode}</p>
                    <p className="text-xs">{slot.courseName}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      ))}

    </div>
  );
}
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

  const [batches, setBatches] = useState([]);
  const [sections, setSections] = useState([]);
  const [allSlots, setAllSlots] = useState([]);

  const [selectedBatch, setSelectedBatch] = useState("");
  const [selectedSemester, setSelectedSemester] = useState("");
  const [selectedSectionId, setSelectedSectionId] = useState("");

  const [loading, setLoading] = useState(false);

  // ================= FETCH BATCHES =================
  useEffect(() => {
    if (!deptId) return;

    const fetchBatches = async () => {
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
      setBatches(json?.data?.listDeptBatches?.items || []);
    };

    fetchBatches();
  }, [deptId]);

  // ================= FETCH SECTIONS =================
  useEffect(() => {
    if (!deptId) return;

    const fetchSections = async () => {
      const res = await fetch(import.meta.env.VITE_APPSYNC_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-api-key": import.meta.env.VITE_APPSYNC_API_KEY,
        },
        body: JSON.stringify({
          query: `
            query ($deptId: ID!, $tenantId: ID) {
              listDeptSections(
                deptId: $deptId
                tenantId: $tenantId
              ) {
                items {
                  deptSectionId
                  name
                  semester
                  batchName
                }
              }
            }
          `,
          variables: { deptId, tenantId: TENANT_ID },
        }),
      });

      const json = await res.json();
      setSections(json?.data?.listDeptSections?.items || []);
    };

    fetchSections();
  }, [deptId]);

  // ================= FETCH SLOTS =================
  useEffect(() => {
    if (!deptId || sections.length === 0) return;

    const fetchAllSlots = async () => {
      try {
        setLoading(true);

        let allData = [];

        for (const sec of sections) {
          const res = await fetch(import.meta.env.VITE_APPSYNC_URL, {
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
                sectionId: sec.name, // 🔥 FIXED HERE
                tenantId: TENANT_ID,
              },
            }),
          });

          const json = await res.json();
          const items = json?.data?.listDeptSlots?.items || [];

          allData = [...allData, ...items];
        }

        setAllSlots(allData);
      } catch (err) {
        console.error("Slot fetch error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchAllSlots();
  }, [deptId, sections]);

  // ================= DERIVED =================
  const semesters = [
    ...new Set(
      sections
        .filter(s => !selectedBatch || s.batchName === selectedBatch)
        .map(s => Number(s.semester))
    ),
  ].sort((a, b) => a - b);

  const filteredSections = sections.filter(s => {
    if (selectedBatch && s.batchName !== selectedBatch) return false;
    if (selectedSemester && Number(s.semester) !== Number(selectedSemester)) return false;
    return true;
  });

  // 🔥 FIXED FILTER
  const slots = allSlots.filter(slot => {
    const section = sections.find(
      s => s.name === slot.sectionId // 🔥 FIXED HERE
    );

    if (!section) return false;

    if (selectedBatch && section.batchName !== selectedBatch) return false;
    if (selectedSemester && Number(section.semester) !== Number(selectedSemester)) return false;

    if (selectedSectionId) {
      const selectedSection = sections.find(
        s => s.deptSectionId === selectedSectionId
      );
      if (!selectedSection || slot.sectionId !== selectedSection.name) {
        return false;
      }
    }

    return true;
  });

  const getSlot = (day, period) =>
    slots.find(s => s.day === day && Number(s.period) === Number(period));

  // ================= UI =================
  return (
    <div className="px-6 py-8 space-y-6">

      <h2 className="text-3xl font-bold text-[#003178]">📅 Timetable</h2>

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
          disabled={!filteredSections.length}
        >
          <option value="">Section</option>
          {filteredSections.map((s) => (
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

      {slots.length > 0 && (
        <>
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
        </>
      )}

    </div>
  );
}
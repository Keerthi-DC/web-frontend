import { theme } from "../../../components/ui/theme";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDepartmentMeta } from "../hooks/useDepartmentMeta";
import BietLoader from "../../../components/ui/BietLoader";

const DAYS = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const PERIODS = [1, 2, 3, 4, 5, 6, 7];

const TYPE_CELL = {
  theory: "bg-blue-100 ${theme.colors.primaryText} border border-blue-200",
  lab: "bg-green-100 text-green-900 border border-green-200",
  elective: "bg-yellow-100 text-yellow-900 border border-yellow-200",
};

export default function TimetablePage() {
  const { shortName } = useParams();
  const { getId } = useDepartmentMeta();

  const deptId = getId(shortName);
  const TENANT_ID = "biet-college";

  const [batches, setBatches] = useState([]);
  const [sections, setSections] = useState([]);
  const [slots, setSlots] = useState([]);

  const [selectedBatch, setSelectedBatch] = useState("");
  const [selectedSemester, setSelectedSemester] = useState("");
  const [selectedSectionId, setSelectedSectionId] = useState("");

  const [loading, setLoading] = useState(false);

  // 🔧 Normalize day (IMPORTANT FIX)
  const normalizeDay = (d) => d?.toLowerCase().slice(0, 3);

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

      const unique = [
        ...new Set(json?.data?.listDeptBatches?.items.map(b => b.name)),
      ];

      setBatches(unique);
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
    if (!deptId || !selectedSectionId) return;

    const fetchSlots = async () => {
      try {
        setLoading(true);

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
              sectionId: selectedSectionId,
              tenantId: TENANT_ID,
            },
          }),
        });

        const json = await res.json();
        console.log("🎯 Slots:", json);

        setSlots(json?.data?.listDeptSlots?.items || []);
      } catch (err) {
        console.error("❌ Slot fetch error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchSlots();
  }, [deptId, selectedSectionId]);

  // ================= DERIVED =================
  const semesters = [
    ...new Set(
      sections
        .filter(s => !selectedBatch || s.batchName === selectedBatch)
        .map(s => Number(s.semester))
    ),
  ];

  const filteredSections = sections.filter(s => {
    if (selectedBatch && s.batchName !== selectedBatch) return false;
    if (selectedSemester && Number(s.semester) !== Number(selectedSemester)) return false;
    return true;
  });

  // ================= SLOT MATCH =================
  const getSlot = (day, period) =>
    slots.find(
      (s) =>
        normalizeDay(s.day) === normalizeDay(day) &&
        Number(s.period) === Number(period)
    );

  // ================= UI =================
  return (
    <div className="px-6 py-8 space-y-6">

      {/* HEADER */}
      <h2 className="text-3xl font-bold text-[#003178] flex items-center gap-2">
        📅 Timetable
      </h2>

      {/* FILTERS */}
      <div className="flex gap-3 flex-wrap">

        <select
          value={selectedBatch}
          onChange={(e) => {
            setSelectedBatch(e.target.value);
            setSelectedSemester("");
            setSelectedSectionId("");
            setSlots([]);
          }}
          className="border px-3 py-2 rounded-lg shadow-sm"
        >
          <option value="">Batch</option>
          {batches.map((b, i) => (
            <option key={i} value={b}>{b}</option>
          ))}
        </select>

        <select
          value={selectedSemester}
          onChange={(e) => {
            setSelectedSemester(e.target.value);
            setSelectedSectionId("");
            setSlots([]);
          }}
          className="border px-3 py-2 rounded-lg shadow-sm"
        >
          <option value="">Semester</option>
          {semesters.map((s) => (
            <option key={s} value={s}>Sem {s}</option>
          ))}
        </select>

        <select
          value={selectedSectionId}
          onChange={(e) => setSelectedSectionId(e.target.value)}
          className="border px-3 py-2 rounded-lg shadow-sm"
        >
          <option value="">Section</option>
          {filteredSections.map((s) => (
            <option key={s.deptSectionId} value={s.deptSectionId}>
              {s.name}
            </option>
          ))}
        </select>

      </div>

      {/* STATES */}
      {!selectedSectionId && (
        <div className="text-center py-10 text-gray-500">
          Please select Batch, Semester and Section 👆
        </div>
      )}

      {loading && <BietLoader />}

      {!slots.length && selectedSectionId && !loading && (
        <div className="text-center py-10 text-red-500">
          No timetable found ⚠️
        </div>
      )}

      {/* PREMIUM TABLE */}
      {slots.length > 0 && (
        <div className="overflow-x-auto rounded-xl shadow-lg border">

          {/* HEADER */}
          <div className="grid grid-cols-8 bg-gradient-to-r from-[#0a2f6b] to-[#003178] text-white font-semibold text-sm">
            <div className="p-3 text-center border-r">Day</div>
            {PERIODS.map(p => (
              <div key={p} className="p-3 text-center border-r">P{p}</div>
            ))}
          </div>

          {/* BODY */}
          {DAYS.map((day, i) => (
            <div
              key={day}
              className={`grid grid-cols-8 text-sm ${
                i % 2 === 0 ? "bg-gray-50" : "bg-white"
              }`}
            >
              <div className="p-3 font-semibold border-r">{day}</div>

              {PERIODS.map(period => {
                const slot = getSlot(day, period);

                return (
                  <div key={period} className="p-2 border-r border-t min-h-[70px] flex items-center justify-center">
                    {slot ? (
                      <div className={`w-full text-center p-2 rounded-lg shadow-sm hover:scale-105 transition ${TYPE_CELL[slot.type]}`}>
                        <p className="font-semibold text-xs">{slot.courseCode}</p>
                        <p className="text-[11px]">{slot.courseName}</p>
                      </div>
                    ) : (
                      <span className="text-gray-300 text-xs">—</span>
                    )}
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      )}

    </div>
  );
}

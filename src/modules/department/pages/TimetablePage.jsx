import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const PERIODS = [1, 2, 3, 4, 5, 6, 7];

const PERIOD_TIMES = {
  1: "8:00 – 9:00",
  2: "9:00 – 10:00",
  3: "10:30 – 11:30",
  4: "11:30 – 12:30",
  5: "2:00 – 3:00",
  6: "3:00 – 4:00",
  7: "4:00 – 5:00",
};

const BREAK_AFTER = {
  2: { label: "Break", time: "10:00 – 10:30" },
  4: { label: "Lunch", time: "12:30 – 2:00" },
};

const TYPE_CELL = {
  theory: "bg-blue-50 text-blue-800 border border-blue-200",
  lab: "bg-emerald-50 text-emerald-800 border border-emerald-200",
  elective: "bg-amber-50 text-amber-800 border border-amber-200",
};

export default function TimetablePage() {
  const { deptId } = useParams();
  const [slots, setSlots] = useState([]);
  const [loading, setLoading] = useState(true);

useEffect(() => {
  const fetchTimetable = async () => {
    try {
      const res = await fetch(import.meta.env.VITE_APPSYNC_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-api-key": import.meta.env.VITE_APPSYNC_API_KEY,
        },
        body: JSON.stringify({
  query: `
    query ($deptId: ID!, $sectionId: ID!, $tenantId: ID!) {
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
  variables: {
    deptId: "DEP001",
    sectionId: "01KMBM4V375CBX4TSC78B28J4G",
    tenantId: "biet-college"   // ✅ REQUIRED
  },
}),
      });

      const { data, errors } = await res.json();

      if (errors) {
        console.error("❌ GraphQL Error:", errors);
        return;
      }

      const items = data?.listDeptSlots?.items || [];

      console.log("🔥 DB DATA:", items);

      setSlots(items); // ❗ no dummy fallback

    } catch (err) {
      console.error("❌ Fetch error:", err);
    } finally {
      setLoading(false);
    }
  };

  fetchTimetable();
}, [deptId]);
  const getSlot = (day, period) =>
    slots.find((s) => s.day === day && Number(s.period) === period);

  if (loading) return <div className="text-center py-20">Loading...</div>;

  return (
    <div className="space-y-4 px-6 py-8">

      <h2 className="text-2xl font-semibold text-center">📅 Timetable</h2>

      <div className="rounded-xl border border-slate-200 bg-white overflow-x-auto">
        <div className="min-w-[780px]">

          {/* HEADER */}
          <div className="grid gap-px bg-slate-100" style={{ gridTemplateColumns: "100px repeat(6,1fr)" }}>
            <div className="bg-slate-50 p-3 text-xs text-center text-slate-400">Period</div>

            {DAYS.map(day => (
              <div key={day} className="bg-slate-50 p-3 text-xs text-center font-semibold text-slate-700">
                {day}
                {day === "Sat" && <span className="block text-slate-400 text-[10px]">till 12:30</span>}
              </div>
            ))}
          </div>

          {/* PERIOD ROWS */}
          {PERIODS.map(period => (
            <div key={period}>

              <div className="grid gap-px bg-slate-100" style={{ gridTemplateColumns: "100px repeat(6,1fr)" }}>
                
                {/* PERIOD LABEL */}
                <div className="bg-white flex flex-col items-center justify-center py-2">
                  <span className="text-xs font-semibold bg-slate-100 w-6 h-6 rounded-full flex items-center justify-center">
                    {period}
                  </span>
                  <span className="text-[10px] text-slate-400">{PERIOD_TIMES[period]}</span>
                </div>

                {/* CELLS */}
                {DAYS.map(day => {
                  const isSatOff = day === "Sat" && period > 4;
                  const slot = !isSatOff ? getSlot(day, period) : null;

                  return (
                    <div key={day} className="bg-white p-1.5 min-h-[70px]">

                      {isSatOff ? (
                        <div className="bg-slate-50 rounded-lg h-full flex items-center justify-center text-slate-300">
                          —
                        </div>
                      ) : slot ? (
                        <div className={`rounded-lg p-2 h-full ${TYPE_CELL[slot.type]}`}>
                          <p className="text-xs font-bold">{slot.courseCode}</p>
                          <p className="text-xs">{slot.courseName}</p>
                          <p className="text-[10px] mt-1 opacity-60 capitalize">{slot.type}</p>
                        </div>
                      ) : (
                        <div className="bg-slate-50 rounded-lg h-full"></div>
                      )}

                    </div>
                  );
                })}
              </div>

              {/* BREAK ROW */}
              {BREAK_AFTER[period] && (
                <div className="grid gap-px bg-slate-100" style={{ gridTemplateColumns: "100px repeat(6,1fr)" }}>
                  
                  <div className="bg-amber-50 text-center py-1 text-xs text-amber-700">
                    {BREAK_AFTER[period].label}
                    <div className="text-[10px] text-amber-500">
                      {BREAK_AFTER[period].time}
                    </div>
                  </div>

                  {DAYS.map(day => (
                    <div key={day} className="bg-amber-50 text-center text-[10px] text-amber-400 py-1">
                      {BREAK_AFTER[period].label}
                    </div>
                  ))}
                </div>
              )}

            </div>
          ))}
        </div>
      </div>

      {/* LEGEND */}
      <div className="flex gap-3 flex-wrap">
        <span className="text-xs text-gray-400">Legend:</span>
        {Object.entries(TYPE_CELL).map(([type, cls]) => (
          <span key={type} className={`text-xs px-2 py-1 rounded border ${cls}`}>
            {type}
          </span>
        ))}
      </div>

    </div>
  );
}
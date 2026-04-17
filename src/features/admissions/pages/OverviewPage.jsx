import React from "react";
import useOverview from "../hooks/useOverview";

const AdmissionsOverview = () => {
  const { data, loading, error } = useOverview();

  if (loading) return <div className="p-10">Loading...</div>;
  if (error) return <div className="p-10 text-red-600">Error loading admissions overview</div>;
  if (!data) return <div className="p-10">No data</div>;

  return (
    <div className="bg-background font-body text-on-background">

      {/* ================= HERO ================= */}
      <section className="relative px-6 pt-28 pb-12 overflow-hidden">

        {/* BACKGROUND IMAGE */}
        <div className="absolute inset-0 z-0">
          <img
            src={
              data?.overview?.bannerUrl ||
              data?.overview?.imageUrl ||
              "https://images.unsplash.com/photo-1562774053-701939374585"
            }
            alt="Admissions Banner"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-[#001b4b]/90 to-[#002f76]/80"></div>
        </div>

        {/* CONTENT */}
        <div className="relative z-10 rounded-3xl p-10 md:p-16 text-white max-w-4xl">
          <h2 className="text-4xl font-extrabold mb-4">
            {data?.overview?.headline}
          </h2>

          <p className="text-white/80 text-lg leading-relaxed">
            {data?.overview?.description}
          </p>
        </div>
      </section>

      {/* ================= PROGRAMS ================= */}
      <section className="px-6 space-y-4">
        <h1 className="text-sm uppercase font-bold text-[#001b4b]/60 mb-6 p-4 m-4 bg-[#001b4b]/10 rounded-lg w-max">
          Programs Offered
        </h1>

        {data.programs.map((prog) => (
          <div
            key={prog.programId}
            className="group bg-white border rounded-xl p-6 hover:bg-[#001b4b] hover:text-white transition"
          >
            <h4 className="text-2xl font-bold mb-2">
              {prog.name}
            </h4>

            <div className="flex gap-4 text-sm opacity-80">
              <span>{prog.duration}</span>
              <span>{prog.level}</span>
            </div>
          </div>
        ))}
      </section>

      {/* ================= ELIGIBILITY ================= */}
      <section className="px-6 mt-16 pb-12">
        <div className="bg-white rounded-xl p-8 border-l-4 border-[#001b4b]">
          <h3 className="text-2xl font-bold text-[#001b4b] mb-8">
            Eligibility Criteria
          </h3>

          {data.eligibility.map((item) => (
            <div key={item.entryId} className="mb-6">
              <h5 className="font-bold text-lg mb-1">
                {item.title}
              </h5>
              <p className="text-sm text-gray-600">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ================= PROCESS ================= */}
      <section className="px-6 mb-12">
        <h3 className="text-xl font-bold text-[#001b4b] mb-6">
          Admission Process
        </h3>

        {data.process.map((step, i) => (
          <div key={step.stepId} className="p-4 border rounded-lg mb-3">
            <strong>{i + 1}.</strong> {step.title}
            <p className="text-sm text-gray-600">
              {step.description}
            </p>
          </div>
        ))}
      </section>

      {/* ================= DATES ================= */}
      <section className="px-6 mb-12">
        <h3 className="text-xl font-bold text-[#001b4b] mb-6">
          Important Dates
        </h3>

        {data.dates.map((d) => (
          <div
            key={d.dateId}
            className="flex justify-between border p-4 rounded mb-2"
          >
            <span>{d.event}</span>
            <span className="font-semibold">{d.date}</span>
          </div>
        ))}
      </section>

      {/* ================= DOWNLOADS ================= */}
      <section className="px-6 mb-24">
        <h3 className="text-xl font-bold text-[#001b4b] mb-6">
          Resources
        </h3>

        <div className="flex gap-4 flex-wrap">
          {data.downloads.map((doc, i) => (
            <a
              key={i}
              href={doc.fileUrl}
              className="bg-[#001b4b] text-white px-6 py-3 rounded-lg"
            >
              {doc.title}
            </a>
          ))}
        </div>
      </section>

    </div>
  );
};

export default AdmissionsOverview;

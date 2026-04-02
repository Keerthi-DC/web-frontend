import React, { useEffect, useState } from "react";

const AdmissionsOverview = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch("/data/admissionOverview.json")
      .then((res) => res.json())
      .then((res) => setData(res.overview))
      .catch((err) => console.error("JSON Error:", err));
  }, []);

  if (!data) return <div className="p-10">Loading...</div>;

  return (
    <div className="bg-background font-body text-on-background">

      {/* HERO */}
      <section className="hero-bg px-6 pt-28 pb-12">
        <div className="rounded-3xl bg-gradient-to-br from-[#001b4b] to-[#002f76] p-10 md:p-16 text-white">
          <h2 className="font-headline text-4xl font-extrabold text-white tracking-tight mb-4">
            {data.introduction.title}
          </h2>
          <p className="text-white/80 text-lg leading-relaxed">
            {data.introduction.description}
          </p>
        </div>
      </section>

      {/* TABS */}
      <section className="px-6 -mt-6 mb-8 overflow-x-auto no-scrollbar relative z-10">
        <div className="flex gap-2 min-w-max">

          {/* ACTIVE TAB */}
          <div className="bg-[#001b4b] text-white rounded-full px-5 py-2.5 text-sm font-semibold flex items-center gap-2 shadow-lg">
            <span className="material-symbols-outlined text-sm">info</span>
            Admissions Overview
          </div>

          {/* DYNAMIC TABS */}
          {data.programs.map((prog) => (
            <div
              key={prog.id}
              className="bg-white text-[#001b4b] border border-slate-200 rounded-full px-5 py-2.5 text-sm font-semibold flex items-center gap-2 shadow-sm"
            >
              <span className="material-symbols-outlined text-sm">
                {prog.icon}
              </span>
              {prog.name.split("(")[0]}
            </div>
          ))}
        </div>
      </section>

      {/* PROGRAMS */}
      <section className="px-6 space-y-4">
        <h3 className="font-headline text-sm uppercase tracking-widest font-bold text-[#001b4b]/60 mb-6 ml-1 flex items-center gap-2">
          <div className="h-px w-8 bg-[#001b4b]/20"></div>
          Programs Offered
        </h3>

        {data.programs.map((prog) => (
          <div
            key={prog.id}
            className="group relative overflow-hidden bg-surface-container-lowest border border-slate-100 rounded-xl p-6 transition-all duration-300 hover:bg-[#001b4b] hover:text-white shadow-sm hover:shadow-xl"
          >
            <div className="flex justify-between items-start mb-4">

              {/* ICON (FIXED) */}
              <div className="p-3 rounded-full bg-blue-50 group-hover:bg-white/10 transition-colors">
                <span className="material-symbols-outlined text-[#001b4b] group-hover:text-white">
                  {prog.icon}
                </span>
              </div>

              {/* CATEGORY */}
              <span className="text-xs font-bold tracking-tighter uppercase px-3 py-1 bg-surface-container-high group-hover:bg-white/10 rounded-full">
                {prog.category}
              </span>
            </div>

            {/* TITLE */}
            <h4 className="font-headline text-2xl font-bold mb-4">
              {prog.name}
            </h4>

            {/* DETAILS */}
            <div className="flex gap-4 items-center opacity-80">
              <div className="flex items-center gap-1.5 text-sm">
                <span className="material-symbols-outlined text-base">
                  schedule
                </span>
                {prog.duration}
              </div>

              <div className="flex items-center gap-1.5 text-sm">
                <span className="material-symbols-outlined text-base">
                  work_history
                </span>
                {prog.mode}
              </div>
            </div>
          </div>
        ))}
      </section>

      {/* ELIGIBILITY */}
      <section className="px-6 mt-16 pb-12">
        <div className="bg-surface-container-low rounded-xl p-8 border-l-4 border-[#001b4b]">
          <h3 className="font-headline text-2xl font-bold text-[#001b4b] mb-8">
            Eligibility Criteria
          </h3>

          <div className="space-y-8">
            {data.eligibility.map((item, index) => (
              <div key={index} className="flex gap-6 items-start">
                <div className="flex-shrink-0 w-12 h-12 flex items-center justify-center bg-white rounded-xl shadow-sm">
                  <span className="material-symbols-outlined text-[#001b4b]">
                    {item.icon}
                  </span>
                </div>

                <div>
                  <h5 className="font-headline font-bold text-lg mb-1 text-[#001b4b]">
                    {item.title}
                  </h5>
                  <p className="text-on-surface-variant text-sm leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PROCESS */}
      <section className="px-6 mb-12">
        <h3 className="font-headline text-xl font-bold text-[#001b4b]mb-6">
          Admission Process
        </h3>

        <div className="space-y-4">
          {data.process.map((step) => (
            <div
              key={step.step}
              className="bg-surface-container-lowest border border-slate-100 rounded-lg p-4 shadow-sm flex gap-4"
            >
              <div className="font-bold text-[#001b4b]">
                {step.step}
              </div>

              <div>
                <h5 className="font-semibold">{step.title}</h5>
                <p className="text-sm text-on-surface-variant">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* IMPORTANT DATES */}
      <section className="px-6 mb-12">
        <h3 className="font-headline text-xl font-bold text-[#001b4b] mb-6">
          Important Dates
        </h3>

        <div className="grid gap-4">
          {data.dates.map((d) => (
            <div
              key={d.id}
              className="flex justify-between bg-surface-container-low p-4 rounded-lg border border-slate-100"
            >
              <span>{d.title}</span>
              <span className="font-semibold">{d.date}</span>
            </div>
          ))}
        </div>
      </section>

      {/* DOWNLOADS */}
      <section className="px-6 mb-24">
  <h3 className="font-headline text-xl font-bold text-[#001b4b] mb-6">
    Resources
  </h3>

  <div className="flex gap-4 flex-wrap">
    {data.downloads.map((doc) => (
      <a
        key={doc.id}
        href={doc.link}
        className="bg-[#001b4b] text-white px-6 py-3 rounded-lg text-center font-semibold hover:opacity-90 transition"
      >
        {doc.title}
      </a>
    ))}
  </div>
</section>

      {/* CTA */}
      <div className="fixed bottom-0 left-0 w-full bg-white/95 backdrop-blur-xl px-6 py-4 flex items-center justify-between z-50 shadow-[0_-10px_30px_rgba(0,0,0,0.05)] border-t border-slate-100">
        <div className="flex flex-col">
          <span className="text-[10px] font-bold uppercase text-slate-400 tracking-wider">
            Next Intake
          </span>
          <span className="text-[#001b4b] font-bold text-sm">
            {data.cta?.intake || "Fall 2026"}
          </span>
        </div>

        <button className="luminary-gradient text-white font-headline font-bold px-10 py-4 rounded-full shadow-lg shadow-[#001b4b]/20 active:scale-95 transition-transform">
          {data.cta?.buttonText || "Apply Now"}
        </button>
      </div>
    </div>
  );
};

export default AdmissionsOverview;
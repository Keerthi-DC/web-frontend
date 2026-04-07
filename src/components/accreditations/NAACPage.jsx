import React, { useEffect, useState } from 'react';

const fetchAccreditation = async (variables) => {
  const response = await fetch(import.meta.env.VITE_APPSYNC_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": import.meta.env.VITE_APPSYNC_API_KEY,
    },
    body: JSON.stringify({
      query: `
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
            }
          }
        }
      `,
      variables: { tenantId: "biet-college", ...variables },
    }),
  });

  const result = await response.json();
  return result?.data?.listAccreditationRecords?.items || [];
};

const NAACPage = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeId, setActiveId] = useState('');

  const slugify = (text) =>
    text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');

  // 🔥 ONLY THIS PART CHANGED (data source)
  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);

        const sectionsList = [
          { title: "Accreditation Certificates", variables: { type: "NAAC", section: "Accreditation Certificates" } },
          { title: "IQAC", variables: { type: "NAAC", section: "IQAC" } },
          { title: "AQAR Reports", variables: { type: "NAAC", section: "AQAR Reports" } },
          { title: "IIQA", variables: { type: "NAAC", section: "IIQA" } },
          { title: "SSR Documents", variables: { type: "NAAC", section: "SSR Documents" } },
        ];

        const result = [];

        for (let sec of sectionsList) {
          const items = await fetchAccreditation(sec.variables);

          result.push({
            title: sec.title,
            items: items.map((i) => ({
              name: i.title,
              file: i.file_url,
            })),
          });
        }

        setData({ sections: result });
        setActiveId(slugify(result[0].title));

      } catch (e) {
        console.error(e);
        setError(e);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  // ❌ UI NOT TOUCHED BELOW

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen text-on-surface">
        Loading...
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen text-error">
        Failed to load data
      </div>
    );
  }

  const { sections } = data;
  const ids = sections.map((sec) => slugify(sec.title));

  const activeSection = sections.find(
    (sec, idx) => ids[idx] === activeId
  );

  return (
    <div className="bg-surface text-on-surface min-h-screen px-6 py-10">
      <div className="max-w-6xl mx-auto grid md:grid-cols-[280px_1fr] gap-10">

        {/* ================= SIDEBAR ================= */}
        <aside className="sticky top-24 h-fit">
          <div className="bg-surface-container rounded-2xl p-3 shadow-sm border border-outline-variant/10">

            <p className="text-xs font-bold text-surface-tint px-3 mb-3">
              NAAC Sections
            </p>

            <nav className="space-y-1">
              {sections.map((sec, idx) => {
                const id = ids[idx];
                const active = activeId === id;

                return (
                  <button
                    key={id}
                    onClick={() => setActiveId(id)}
                    className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200
                      
                      ${active
                        ? 'bg-primary-container text-white shadow-md'
                        : 'text-on-surface-variant hover:bg-surface-container-high'
                      }
                    `}
                  >
                    <span className="truncate">{sec.title}</span>

                    <span
                      className={`material-symbols-outlined text-sm transition ${
                        active ? 'opacity-100' : 'opacity-40'
                      }`}
                    >
                      chevron_right
                    </span>
                  </button>
                );
              })}
            </nav>
          </div>
        </aside>

        {/* ================= MAIN ================= */}
        <main>

          {/* HERO */}
          <section className="mb-10">
            <span className="inline-block bg-tertiary-container text-on-tertiary-container text-[10px] px-3 py-1 rounded-full font-bold tracking-widest uppercase mb-3">
              Quality Assurance
            </span>

            <h1 className="text-4xl font-extrabold font-headline text-primary tracking-tight">
              Excellence through Accreditation
            </h1>

            <p className="text-on-surface-variant mt-4 max-w-2xl text-sm leading-relaxed">
              Our institution has undergone rigorous evaluation by NAAC,
              ensuring high standards of academic excellence and continuous improvement.
            </p>
          </section>

          {/* ACTIVE SECTION */}
          {activeSection && (
            <section className="animate-fadeIn">
              <h2 className="text-2xl font-bold font-headline text-primary mb-6">
                {activeSection.title}
              </h2>

              <div className="grid md:grid-cols-2 gap-6">
                {activeSection.items.map((item, i) => (
                  <div
                    key={i}
                    className="bg-surface-container-lowest border border-outline-variant/10 rounded-2xl p-5 shadow-sm hover:shadow-md transition-all"
                  >
                    <div className="flex justify-between items-start mb-4">
                      <h3 className="text-sm font-semibold text-primary leading-snug">
                        {item.name}
                      </h3>

                      <span className="material-symbols-outlined text-surface-tint text-lg">
                        description
                      </span>
                    </div>

                    <button
                      onClick={() => window.open(item.file, '_blank')}
                      className="flex items-center justify-center gap-2 px-4 py-2 rounded-xl 
                                 bg-blue-950 text-white text-sm font-semibold
                                 hover:bg-blue-900 hover:shadow-md"
                    >
                      View
                      <span className="material-symbols-outlined text-base">
                        arrow_forward
                      </span>
                    </button>

                  </div>
                ))}
              </div>
            </section>
          )}

        </main>
      </div>
    </div>
  );
};

export default NAACPage;
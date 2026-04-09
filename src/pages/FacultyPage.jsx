import React, { useEffect, useState } from "react";

const API_ENDPOINT = import.meta.env.VITE_APPSYNC_URL;
const API_KEY = import.meta.env.VITE_APPSYNC_API_KEY;

const LIST_FACULTY_QUERY = `
query ListFaculty($tenantId: ID) {
  listFaculty(tenantId: $tenantId) {
    items {
      facultyId
      name
      designation
      profileImage
      cvUrl
    }
  }
}
`;

export default function FacultyPage() {
  const [faculty, setFaculty] = useState([]);
  const [view, setView] = useState("hierarchy");

  const tenantId = "biet-college";

  useEffect(() => {
    fetch(API_ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": API_KEY,
      },
      body: JSON.stringify({
        query: LIST_FACULTY_QUERY,
        variables: { tenantId },
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        setFaculty(data?.data?.listFaculty?.items || []);
      });
  }, []);

  // ================= GROUPING =================
  const principal = faculty.find((f) =>
    f.designation?.toLowerCase().includes("principal")
  );

  const hods = faculty.filter((f) =>
    f.designation?.toLowerCase().includes("hod")
  );

  const associate = faculty.filter((f) =>
    f.designation?.toLowerCase().includes("associate")
  );

  const assistant = faculty.filter(
    (f) =>
      !f.designation?.toLowerCase().includes("principal") &&
      !f.designation?.toLowerCase().includes("hod") &&
      !f.designation?.toLowerCase().includes("associate")
  );

  // ================= HIERARCHY VIEW =================
  const HierarchyView = () => (
    <div className="space-y-16">
      
      {/* PRINCIPAL */}
      <section>
        <div className="flex justify-center">
          <div className="w-full max-w-md bg-surface-container-lowest p-8 rounded-[1.5rem] shadow-[0px_12px_32px_rgba(0,10,30,0.08)] flex flex-col items-center text-center border border-outline-variant/5">
            
            <div className="relative mb-6">
              <div className="absolute inset-0 bg-primary/5 rounded-full scale-110 blur-xl"></div>

              <img
                src={principal?.profileImage}
                className="relative w-32 h-32 rounded-full object-cover border-4 border-white shadow-md"
              />
            </div>

            <span className="px-4 py-1.5 bg-primary-container text-on-primary-container rounded-full text-xs font-bold uppercase mb-3">
              Institutional Head
            </span>

            <h4 className="text-xl font-bold text-on-surface mb-1">
              {principal?.name}
            </h4>

            <p className="text-on-surface-variant text-sm">
              {principal?.designation}
            </p>

            <a
              href={principal?.cvUrl}
              className="text-xs font-bold text-primary mt-3 hover:underline"
            >
              VIEW LEADERSHIP PROFILE
            </a>
          </div>
        </div>

        {/* LINE */}
        <div className="w-[1px] h-12 bg-outline-variant mx-auto"></div>
      </section>

      {/* HOD */}
      <section>
        <div className="flex justify-center">
          {hods.map((hod) => (
            <div
              key={hod.facultyId}
              className="bg-surface-container-low p-6 rounded-xl border border-outline-variant/15 flex flex-col items-center w-64 shadow-sm"
            >
              <img
                src={hod.profileImage}
                className="w-20 h-20 rounded-full object-cover mb-3 border-2 border-white"
              />
              <h3 className="font-bold text-primary">{hod.name}</h3>
              <p className="text-xs uppercase text-on-surface-variant">
                Head of Department
              </p>
            </div>
          ))}
        </div>

        <div className="w-[1px] h-12 bg-outline-variant mx-auto"></div>
      </section>

      {/* ASSOCIATES */}
      <section>
        <div className="flex justify-center gap-10 flex-wrap">
          {associate.map((f) => (
            <div
              key={f.facultyId}
              className="bg-surface-container-lowest p-4 rounded-xl border border-outline-variant/10 w-52 shadow-sm"
            >
              <div className="flex items-center gap-3">
                <img
                  src={f.profileImage}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div>
                  <h4 className="text-sm font-bold">{f.name}</h4>
                  <p className="text-[10px] uppercase">
                    Assoc. Professor
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="w-[1px] h-10 bg-outline-variant/50 mx-auto mt-4"></div>
      </section>

      {/* ASSISTANTS */}
      <section>
        <div className="flex justify-center gap-6 flex-wrap">
          {assistant.map((f) => (
            <div
              key={f.facultyId}
              className="bg-white p-3 rounded-lg border border-outline-variant/5 w-40 text-center"
            >
              <h5 className="text-xs font-bold">{f.name}</h5>
              <p className="text-[9px] text-on-surface-variant">
                Asst. Professor
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8">

  {/* CARD 1 */}
  <div className="group bg-surface-container-high p-8 rounded-2xl transition-all duration-300 hover:bg-primary-container">
    <h3 className="text-xl font-bold mb-2 group-hover:text-white">
      Structural Integrity
    </h3>
    <p className="text-sm text-on-surface-variant group-hover:text-white/90">
      Our hierarchy ensures rigorous academic supervision and
      mentorship across all research domains.
    </p>
  </div>

  {/* CARD 2 */}
  <div className="group bg-surface-container-high p-8 rounded-2xl transition-all duration-300 hover:bg-primary-container">
    <h3 className="text-xl font-bold mb-2 group-hover:text-white">
      Faculty Strength
    </h3>
    <p className="text-sm text-on-surface-variant group-hover:text-white/90">
      Over 45 distinguished PhD holders across Computer
      Science, Data Science, and AI research wings.
    </p>
  </div>

  {/* CARD 3 */}
  <div className="group bg-surface-container-high p-8 rounded-2xl transition-all duration-300 hover:bg-primary-container">
    <h3 className="text-xl font-bold mb-2 group-hover:text-white">
      Accreditations
    </h3>
    <p className="text-sm text-on-surface-variant group-hover:text-white/90">
      Tier-1 Institutional ranking with faculty citations
      exceeding 5,000+ annually in global journals.
    </p>
  </div>

</section>
    </div>
  );

const GridView = () => (
  <div className="space-y-16">

    {/* PRINCIPAL */}
    {principal && (
      <section>
        <div className="mb-8 flex items-center gap-4">
          <div className="h-px flex-1 bg-gradient-to-r from-transparent to-outline-variant/30"></div>
          <h3 className="text-xs uppercase tracking-widest">Principal</h3>
          <div className="h-px flex-1 bg-gradient-to-l from-transparent to-outline-variant/30"></div>
        </div>

        <div className="flex justify-center">
          <div className="w-full max-w-md bg-surface-container-lowest p-8 rounded-[1.5rem] shadow flex flex-col items-center text-center">
            <img
              src={principal.profileImage}
              className="w-28 h-28 rounded-full object-cover mb-4"
            />
            <h4 className="text-xl font-bold">{principal.name}</h4>
            <p className="text-sm">{principal.designation}</p>
          </div>
        </div>
      </section>
    )}

    {/* HOD */}
    <section>
      <div className="mb-6 text-xs uppercase">Head of Department</div>
      <div className="space-y-4">
        {hods.map((f) => (
          <div
            key={f.facultyId}
            className="flex items-center gap-4 bg-surface-container-lowest p-4 rounded-xl"
          >
            <img
              src={f.profileImage}
              className="w-16 h-16 rounded-full object-cover"
            />
            <div>
              <h4 className="font-bold">{f.name}</h4>
              <p className="text-xs">{f.designation}</p>
            </div>
          </div>
        ))}
      </div>
    </section>

    {/* ASSOCIATE */}
    <section>
      <div className="mb-6 text-xs uppercase">Associate Professors</div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {associate.map((f) => (
          <div
            key={f.facultyId}
            className="flex items-center gap-3 bg-surface-container-lowest p-4 rounded-xl"
          >
            <img
              src={f.profileImage}
              className="w-12 h-12 rounded-full object-cover"
            />
            <div>
              <h4 className="font-bold">{f.name}</h4>
              <p className="text-xs">{f.designation}</p>
            </div>
          </div>
        ))}
      </div>
    </section>

    {/* ASSISTANT */}
    <section>
      <div className="mb-6 text-xs uppercase">Assistant Professors</div>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {assistant.map((f) => (
          <div
            key={f.facultyId}
            className="bg-surface-container-lowest p-4 rounded-xl text-center"
          >
            <img
              src={f.profileImage}
              className="w-14 h-14 rounded-full mx-auto mb-2 object-cover"
            />
            <h4 className="text-sm font-bold">{f.name}</h4>
            <p className="text-xs">{f.designation}</p>
          </div>
        ))}
      </div>
    </section>

  </div>
);

  return (
    <div className="bg-surface min-h-screen px-6 md:px-12 py-10">
      
      {/* TITLE + TOGGLE */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-12 gap-6">
        
        <div>
          <h2 className="text-4xl font-extrabold text-primary">
            Faculty Hierarchy
          </h2>
          <p className="text-on-surface-variant mt-2">
            An overview of the institutional leadership and academic
            structure of the Department.
          </p>
        </div>

        {/* TOGGLE */}
        <div className="flex p-1.5 bg-surface-container-high rounded-full shadow-inner">
          <button
            onClick={() => setView("grid")}
            className={`px-6 py-2 rounded-full text-sm font-semibold ${
              view === "grid"
                ? "bg-primary text-white shadow-lg"
                : "text-on-surface-variant"
            }`}
          >
            Grid
          </button>

          <button
            onClick={() => setView("hierarchy")}
            className={`px-6 py-2 rounded-full text-sm font-semibold ${
              view === "hierarchy"
                ? "bg-primary text-white shadow-lg"
                : "text-on-surface-variant"
            }`}
          >
            Hierarchy
          </button>
        </div>
      </div>

      {/* VIEW */}
      {view === "hierarchy" ? <HierarchyView /> : <GridView />}
    </div>
  );
}
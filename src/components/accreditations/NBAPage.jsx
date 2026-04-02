import React, { useEffect, useState } from 'react';

const NBAPage = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('/data/nba.json')
      .then((r) => r.json())
      .then((d) => {
        setData(d);
        setLoading(false);
      })
      .catch((e) => {
        console.error(e);
        setError(e);
        setLoading(false);
      });
  }, []);

  if (loading) return <div className="h-screen flex justify-center items-center">Loading...</div>;
  if (error) return <div className="h-screen flex justify-center items-center">Error</div>;

  const { overview, resources, departments, documents } = data;

  const open = (url) => window.open(url, '_blank');

  return (
    <div className="max-w-7xl mx-auto px-6 py-10 space-y-16">

      {/* ================= HERO ================= */}
      <section className="relative rounded-3xl overflow-hidden shadow-2xl">
        <div className="absolute inset-0 opacity-20 bg-[url('/patterns/grid.svg')]"></div>

        <div className="relative bg-gradient-to-br from-[#0b2d5c] via-[#123d7a] to-[#1e3a8a] p-12 text-white">
          <span className="bg-green-400/20 text-green-300 px-4 py-1 rounded-full text-xs font-bold mb-4 inline-block">
            QUALITY ASSURANCE
          </span>

          <h1 className="text-5xl font-extrabold mb-4">NBA Accreditation</h1>

          <p className="text-lg text-gray-200 max-w-2xl">
            {overview?.description}
          </p>
        </div>
      </section>

      {/* ================= OVERVIEW ================= */}
      <section className="grid md:grid-cols-3 gap-6">

        {/* LEFT CARD */}
        <div className="md:col-span-2 bg-gray-50 rounded-3xl p-8 shadow-sm">
          <h2 className="text-2xl font-bold mb-4">Institute Overview</h2>

          <p className="text-gray-600 mb-6">
            {overview?.description}
          </p>

          <div className="flex gap-4">
            <button className="bg-[#0b2d5c] text-white px-5 py-2 rounded-xl flex items-center gap-2 hover:scale-95 transition">
              📄 View NIRF Reports
            </button>

            <button className="bg-green-400 text-black px-5 py-2 rounded-xl flex items-center gap-2 hover:scale-95 transition">
              ▶ Campus Tour
            </button>
          </div>
        </div>

        {/* RIGHT CARD */}
        <div className="bg-[#0b2d5c] text-white rounded-3xl p-8 flex flex-col justify-center items-center text-center">
          <div className="w-16 h-16 bg-green-400 text-black rounded-full flex items-center justify-center mb-4 text-2xl">
            ✔
          </div>

          <h2 className="text-3xl font-bold">9 Departments</h2>
          <p className="text-sm text-gray-300 uppercase tracking-wide">
            Currently NBA Accredited
          </p>
        </div>

      </section>

      {/* ================= RESOURCES ================= */}
      <section>
        <div className="flex items-center gap-3 mb-8">
          <div className="h-1 w-10 bg-green-500"></div>
          <h2 className="text-2xl font-bold">Institute Level Resources</h2>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {resources.map((res, i) => (
            <div
              key={i}
              className="bg-white p-6 rounded-2xl border hover:shadow-lg transition group"
            >
              <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center mb-4">
                📄
              </div>

              <h3 className="font-bold text-lg mb-2">{res.title}</h3>

              <p className="text-sm text-gray-500 mb-4">
                {res.type.toUpperCase()}
              </p>

              <div className="flex justify-between items-center">
                <span className="text-xs text-green-600 font-semibold">
                  {res.type === 'video' ? 'VIDEO' : res.type.toUpperCase()}
                </span>

                <button
                  onClick={() => open(res.file)}
                  className="text-blue-600 font-medium flex items-center gap-1 group-hover:gap-2 transition"
                >
                  {res.type === 'video' ? 'Watch' : 'Download'} →
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ================= TABLE ================= */}
      <section>
        <div className="flex items-center gap-3 mb-8">
          <div className="h-1 w-10 bg-green-500"></div>
          <h2 className="text-2xl font-bold">Departmental Progress</h2>
        </div>

        <div className="bg-gray-50 rounded-3xl p-2">
          <table className="w-full bg-white rounded-2xl overflow-hidden">
            <thead className="bg-gray-100 text-sm uppercase text-gray-500">
              <tr>
                <th className="p-4 text-left">Department Name</th>
                <th className="p-4 text-left">Current Status</th>
                <th className="p-4 text-left">Validity</th>
                <th className="p-4 text-right">SAR Report</th>
              </tr>
            </thead>

            <tbody>
              {departments.map((dept, i) => (
                <tr key={i} className="border-t hover:bg-gray-50 transition">
                  <td className="p-4 font-medium">{dept.name}</td>

                  <td className="p-4">
                    <span className={`px-3 py-1 rounded-full text-xs ${
                      dept.status === 'accredited'
                        ? 'bg-green-100 text-green-700'
                        : 'bg-gray-200 text-gray-600'
                    }`}>
                      {dept.status === 'accredited' ? 'Accredited' : 'Pending'}
                    </span>
                  </td>

                  <td className="p-4">{dept.validity}</td>

                  <td className="p-4 text-right">
                    <button
                      onClick={() => open(dept.file)}
                      className="text-blue-600 hover:underline"
                    >
                      Download
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* ================= DOCUMENTS ================= */}
      <section>
        <div className="flex items-center gap-3 mb-8">
          <div className="h-1 w-10 bg-green-500"></div>
          <h2 className="text-2xl font-bold">Accreditation Documents</h2>
        </div>

        <div className="grid md:grid-cols-4 gap-4">
          {documents.map((doc, i) => (
            <div
              key={i}
              className="bg-white p-4 rounded-xl border flex items-center gap-3 hover:shadow-md transition"
            >
              📄
              <div>
                <h3 className="text-sm font-semibold">{doc.title}</h3>
                <p className="text-xs text-gray-500">{doc.subtitle}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
};

export default NBAPage;
import React, { useEffect, useState } from 'react';
import { FaCheckCircle } from 'react-icons/fa';

export default function AboutOverviewPage() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const res = await fetch('/data/overview.json'); // make sure file name is correct
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const json = await res.json();
        setData(json);
      } catch (e) {
        console.error(e);
        setError('Failed to load about data');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <section className="py-12 text-center">
        <p>Loading about information…</p>
      </section>
    );
  }

  if (error || !data) {
    return (
      <section className="p-12 text-center text-red-600">
        <p>{error ?? 'No about data found'}</p>
      </section>
    );
  }

  // ✅ Correct destructuring based on YOUR JSON
  const {
    hero,
    about,
    growth,
    leadership,
    anthem,
    governingCouncil,
    davangere,
  } = data;

  return (
    <section className="p-4 m-4 bg-gray-50">

      {/* HERO */}
      <div
        className="relative h-350 md:h-96 flex items-center justify-center text-center px-4"
        style={{
          backgroundImage: `url(${hero?.image})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="absolute inset-0 rounded-3xl  bg-gradient-to-br from-[#001b4b]/80 to-[#002f76]/80" />
        <div className="relative z-10 text-white">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            {hero?.title}
          </h1>
          <h2 className="text-xl md:text-2xl text-blue-100">
            {hero?.subtitle}
          </h2>
        </div>
      </div>

      {/* ABOUT */}
      <div className="container mx-auto py-16 px-4 text-gray-800 text-center">
        <h3 className="text-2xl font-semibold mb-4">
          {about?.title}
        </h3>
        <p className="max-w-3xl mx-auto leading-relaxed">
          {about?.description}
        </p>
      </div>

      {/* GROWTH */}
      <div className="container mx-auto py-16 px-4">
        <h3 className="text-2xl font-semibold mb-6 text-center">
          {growth?.title}
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {growth?.points?.map((p, idx) => (
            <div
              key={idx}
              className="bg-white rounded-xl shadow p-6 flex items-start space-x-4"
            >
              <FaCheckCircle className="text-green-600 mt-1" />
              <p className="text-gray-700">{p}</p>
            </div>
          ))}
        </div>
      </div>

      {/* LEADERSHIP */}
      <div className="container mx-auto py-16 px-4 bg-white text-center">
        <h3 className="text-2xl font-semibold mb-4">
          {leadership?.title}
        </h3>

        <h4 className="text-xl font-bold text-blue-700 mb-2">
          {leadership?.highlight}
        </h4>

        <p className="max-w-3xl mx-auto text-gray-700">
          {leadership?.description}
        </p>
      </div>

      {/* ANTHEM */}
      <div className="container mx-auto py-16 px-4 text-center">
        <h3 className="text-2xl font-semibold mb-6">
          {anthem?.title}
        </h3>

        <div className="max-w-3xl mx-auto text-gray-800 space-y-3">
          {anthem?.lines?.map((line, idx) => (
            <p key={idx}>{line}</p>
          ))}
        </div>
      </div>

      {/* GOVERNING COUNCIL */}
      <div className="container mx-auto py-16 px-4">
        <h3 className="text-2xl font-semibold mb-6 text-center">
          Governing Council
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {governingCouncil?.map((member, idx) => (
            <div
              key={idx}
              className="bg-white rounded-xl shadow p-6 text-center hover:shadow-lg transition"
            >
              <img
                src={member?.image}
                alt={member?.name}
                className="w-32 h-32 mx-auto rounded-full object-cover mb-4"
              />
              <h4 className="font-semibold text-gray-800">
                {member?.name}
              </h4>
              <p className="text-sm text-gray-600">
                {member?.role}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* DAVANGERE */}
      <div className="container mx-auto py-16 px-4 flex flex-col md:flex-row items-center gap-8">
        <img
          src="https://source.unsplash.com/600x400/?city,india"
          alt="Davangere"
          className="md:w-1/2 rounded-xl shadow"
        />

        <div className="md:w-1/2">
          <h3 className="text-2xl font-semibold mb-4">
            {davangere?.title}
          </h3>
          <p className="text-gray-700 leading-relaxed">
            {davangere?.description}
          </p>
        </div>
      </div>

    </section>
  );
}
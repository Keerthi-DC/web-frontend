
  import React, { useEffect, useState } from 'react';
  import {
    FaPhone,
    FaClock,
    FaEnvelope,
    FaCheckCircle,
    FaRegUser,
    FaHome,
    FaPhoneAlt,
  } from 'react-icons/fa';

  export default function EnquiryPage() {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    /* ---------- Fetch JSON ---------- */
    useEffect(() => {
      const fetchData = async () => {
        try {
          setLoading(true);
          const res = await fetch('/data/enquiry.json');
          if (!res.ok) throw new Error(`HTTP ${res.status}`);
          const json = await res.json();
          setData(json);
        } catch (e) {
          console.error(e);
          setError('Failed to load enquiry data');
        } finally {
          setLoading(false);
        }
      };
      fetchData();
    }, []);

    if (loading) {
      return (
        <section className="py-12 text-center">
          <p>Loading enquiry information…</p>
        </section>
      );
    }

    if (error || !data) {
      return (
        <section className="py-12 text-center text-red-600">
          {error ?? 'No enquiry data found'}
        </section>
      );
    }

    const { hero, whyEnquire, enquiryTypes, supportInfo, contacts } = data;

    /* ------------- Helper Icons ------------- */
    const iconFor = (title) => {
      if (!title) return null;
      const lookup = {
        Phone: <FaPhone className="w-5 h-5 text-indigo-600 mr-2" />,
        'Office Hours': <FaClock className="w-5 h-5 text-indigo-600 mr-2" />,
        Email: <FaEnvelope className="w-5 h-5 text-indigo-600 mr-2" />,
        'Profile Card': <FaRegUser className="w-7 h-7 text-indigo-600 mb-2" />,
        'Home Office': <FaHome className="w-7 h-7 text-indigo-600 mb-2" />,
      };
      return lookup[title] ?? null;
    };

    /* ---------- Render ---------- */
    return (
      <section className="p-12 bg-gray-50">
        {/* HERO */}
        <div className="p-4 m-4 flex flex-col items-center justify-center text-center rounded-3xl bg-gradient-to-br from-[#001b4b] to-[#002f76]
    md:p-16 text-white shadow-xl">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 tracking-wide">
            {hero.title}
          </h1>
          <h2 className="text-xl md:text-2xl font-medium mb-4 text-blue-100">
            {hero.subtitle}
          </h2>
          <p className="max-w-3xl text-blue-200 leading-relaxed">
            {hero.description}
          </p>
        </div>

        {/* WHY ENQUIRE */}
        <div className="container mx-auto mt-16 px-4">
          <h3 className="text-2xl font-semibold text-gray-900 mb-4">
            {whyEnquire.title}
          </h3>
          <ul className="space-y-2 text-gray-700">
            {whyEnquire.points?.map((p, idx) => (
              <li key={idx} className="flex items-center gap-2">
                <FaCheckCircle className="w-4 h-4 text-green-600 flex-shrink-0" />
                {p}
              </li>
            ))}
          </ul>
        </div>

        {/* ENQUIRY TYPES */}
        <div className="container mx-auto mt-16 px-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {enquiryTypes?.map((card, idx) => (
              <div
                key={idx}
                className="bg-white rounded-xl shadow hover:shadow-lg transition-transform transform hover:scale-105 p-6"
              >
                <h4 className="text-lg font-semibold text-gray-800 mb-2">
                  {card.title}
                </h4>
                <p className="text-gray-600">{card.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* SUPPORT INFO */}
        <div className="container mx-auto mt-16 px-4">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {supportInfo?.map((info, idx) => (
              <div
                key={idx}
                className="bg-white rounded-xl shadow p-6 flex items-start space-x-4"
              >
                {iconFor(info.title)}
                <div>
                  <h5 className="text-sm font-medium text-gray-700 mb-1">
                    {info.title}
                  </h5>
                  <p className="text-gray-600">{info.content}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CONTACTS */}
        <div className="container mx-auto mt-16 px-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {contacts?.map((c, idx) => (
              <div
                key={idx}
                className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition"
              >
                <div className="flex items-center mb-2">
                  {iconFor('Profile Card')}
                  <h4 className="text-lg font-semibold text-gray-800 ml-2">
                    {c.name}
                  </h4>
                </div>
                <p className="text-sm text-gray-600">{c.designation}</p>
                {c.email && (
                  <a
                    href={`mailto:${c.email}`}
                    className="text-sm text-indigo-600 hover:underline block"
                  >
                    {c.email}
                  </a>
                )}
                {c.phone && (
                  <a
                    href={`tel:${c.phone}`}
                    className="text-sm text-indigo-600 hover:underline block"
                  >
                    {c.phone}
                  </a>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }
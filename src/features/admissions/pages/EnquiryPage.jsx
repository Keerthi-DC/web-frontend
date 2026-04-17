import React, { useState } from "react";
import useEnquiry from "../hooks/useEnquiry";

export default function EnquiryPage() {
  const { data, loading, error, submitEnquiry, submitting } = useEnquiry() || {};

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    program: "",
    message: "",
  });

  const [isOther, setIsOther] = useState(false);
  const [otherValue, setOtherValue] = useState("");

  /* ---------- HANDLERS ---------- */
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const payload = { ...formData, otherValue };
      const ok = await submitEnquiry(payload);

      if (ok) {
        alert('Submitted ✅');
        setFormData({ name: '', email: '', phone: '', program: '', message: '' });
        setOtherValue('');
        setIsOther(false);
      } else {
        alert('Failed ❌');
      }
    } catch (err) {
      console.error(err);
      alert('Failed ❌');
    }
  };

  if (loading) return <div className="p-10 text-center">Loading...</div>;
  if (error) return <div className="p-10 text-center text-red-500">Failed to load enquiry data</div>;

  const { whyEnquire, enquiryTypes } = data || {};

  return (
    <main className="pt-16 pb-24 bg-surface font-body text-on-surface">

      {/* HERO */}
      <section className="relative h-[353px] flex items-center px-6 overflow-hidden bg-primary">
        <div className="absolute inset-0 z-0">
          <img
            className="w-full h-full object-cover opacity-40"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuBdfpuTpGHGnK-wnRmE3tuTYOhN8MNYPvWhbQknwzbnjdefkzPZ3eztTAFgo12dK8kXDZxzQyZSnPZkqd17bJ44bdQs65XPzdU-VrrmgXyPSPqPQu4vYol64dPt8V843xAeXAlrHVAUyX5dhkSMIgHmJ9jvPltl7OpQWmwXv8qdDba7xSnkXQsrUCaAp7ARvEj5gEH2aAwSauOQJbzcni2SjApF0sVnasoDEqqlF5LXz_QgWShj_h9atRGZ8q9psPj4OBh-3a5gY_ws"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/60 to-transparent"></div>
        </div>

        <div className="relative z-10 w-full">
          <h2 className="text-4xl font-extrabold text-white">
            Admissions Enquiry
          </h2>
          <p className="text-secondary-fixed mt-2 text-lg">
            Get in touch with us
          </p>
        </div>
      </section>

      {/* WHY ENQUIRE */}
      <section className="px-6 py-12 bg-surface">
        <h3 className="text-2xl font-bold text-primary mb-8">
          Why Enquire With Us?
        </h3>

        {whyEnquire.points?.map((p, i) => (
          <div key={i} className="mb-3">• {p}</div>
        ))}
      </section>

      {/* ENQUIRY TYPES */}
      <section className="px-6 py-12 bg-surface-container-low">
        <h3 className="text-2xl font-bold text-primary mb-8">
          Enquiry Categories
        </h3>

        <div className="grid grid-cols-2 gap-4">
          {enquiryTypes.map((e) => (
            <div key={e.categoryId} className="p-5 bg-white rounded-xl">
              <h4 className="font-bold">{e.title}</h4>
              <p className="text-sm">{e.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* FORM */}
      <section className="px-6 py-12 bg-surface">
        <div className="bg-white p-8 rounded-2xl shadow">
          <h3 className="text-2xl font-bold mb-4">Connect with us</h3>

          <form onSubmit={handleSubmit} className="space-y-6">

            <input
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Full Name"
              className="w-full p-3 border-b"
              required
            />

            <input
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Email"
              className="w-full p-3 border-b"
              required
            />

            <input
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="Phone"
              className="w-full p-3 border-b"
              required
            />

            {/* 🔥 DROPDOWN */}
           <select
              name="program"
              value={formData.program}
              onChange={(e) => {
                handleChange(e);

                if (e.target.value === "Other") {
                  setIsOther(true);
                } else {
                  setIsOther(false);
                  setOtherValue("");
                }
              }}
              className={`w-full p-3 border-b ${
                formData.program === "" ? "text-gray-400" : "text-black"
              }`}
              required
            >
              <option value="" disabled hidden>
                Select Enquiry Type
              </option>

              {enquiryTypes.map((cat) => (
                <option key={cat.categoryId} value={cat.title}>
                  {cat.title}
                </option>
              ))}
            </select>

            {/* ✅ SHOW ONLY IF OTHER */}
            {isOther && (
              <input
                type="text"
                placeholder="Please specify"
                value={otherValue}
                onChange={(e) => setOtherValue(e.target.value)}
                className="w-full p-3 border-b"
                required
              />
            )}

            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder="Your Message"
              className="w-full p-3 border-b"
              required
            />

            <button
              type="submit"
              disabled={submitting}
              className="w-full py-4 bg-[#002f76] text-white rounded-xl"
            >
              {submitting ? "Submitting..." : "Submit Enquiry"}
            </button>

          </form>
        </div>
      </section>
    </main>
  );
}
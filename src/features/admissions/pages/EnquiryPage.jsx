import React from "react";
import FormInput from "../../../components/ui/FormInput";
import FormSelect from "../../../components/ui/FormSelect";
import FormTextarea from "../../../components/ui/FormTextarea";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import toast from "react-hot-toast";
import { motion } from "framer-motion";
import DOMPurify from "dompurify";
import useEnquiry from "../hooks/useEnquiry";
import BietLoader from "../../../components/ui/BietLoader";

// ✅ STRICT VALIDATION SCHEMA
const enquirySchema = z
  .object({
    name: z.string().min(2, "Name must be at least 2 characters"),
    email: z.string().email("Please enter a valid email address"),
    phone: z.string().regex(/^[0-9]{10}$/, "Phone number must be exactly 10 digits"),
    program: z.string().min(1, "Please select an enquiry category"),
    otherValue: z.string().optional(),
    message: z
      .string()
      .min(10, "Message must be at least 10 characters")
      .max(1000, "Message must not exceed 1000 characters"),
  })
  .refine(
    (data) => {
      if (data.program === "Other") {
        return !!data.otherValue && data.otherValue.trim().length > 0;
      }
      return true;
    },
    {
      message: "Please specify your enquiry type",
      path: ["otherValue"],
    }
  );

export default function EnquiryPage() {
  const { data, loading, error, submitEnquiry, submitting } = useEnquiry() || {};

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(enquirySchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      program: "",
      otherValue: "",
      message: "",
    },
  });

  const selectedProgram = watch("program");
  const isOther = selectedProgram === "Other";

  /* ---------- SUBMIT HANDLER ---------- */
  const onSubmit = async (formData) => {
    try {
      // 🔒 SANITIZE INPUT TO PREVENT XSS
      const cleanMessage = DOMPurify.sanitize(formData.message);

      const payload = {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        program: formData.program,
        otherValue: isOther ? formData.otherValue : "",
        message: cleanMessage,
      };

      const ok = await submitEnquiry(payload);

      if (ok) {
        toast.success("Enquiry submitted successfully! We will contact you soon.");
        reset(); // Clear form
      } else {
        toast.error("Failed to submit enquiry. Please try again later.");
      }
    } catch (err) {
      console.error(err);
      toast.error("An unexpected error occurred. Please try again.");
    }
  };

  if (loading) return <BietLoader />;
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
            alt="Admissions"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/60 to-transparent"></div>
        </div>

        <div className="relative z-10 w-full">
          <h2 className="text-4xl font-extrabold text-white">Admissions Enquiry</h2>
          <p className="text-secondary-fixed mt-2 text-lg">Get in touch with us</p>
        </div>
      </section>

      {/* WHY ENQUIRE */}
      <section className="px-6 py-12 bg-surface">
        <h3 className="text-2xl font-bold text-primary mb-8">Why Enquire With Us?</h3>

        {whyEnquire?.points?.map((p, i) => (
          <div key={i} className="mb-3">
            • {p}
          </div>
        ))}
      </section>

      {/* ENQUIRY TYPES */}
      <section className="px-6 py-12 bg-surface-container-low">
        <h3 className="text-2xl font-bold text-primary mb-8">Enquiry Categories</h3>

        <div className="grid grid-cols-2 gap-4">
          {enquiryTypes?.map((e) => (
            <div key={e.categoryId} className="p-5 bg-white rounded-xl shadow-sm border border-gray-100">
              <h4 className="font-bold text-gray-800">{e.title}</h4>
              <p className="text-sm text-gray-600 mt-1">{e.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* FORM */}
      <section className="px-6 py-12 bg-surface">
        <div className="bg-white p-8 rounded-2xl shadow max-w-3xl mx-auto">
          <h3 className="text-2xl font-bold mb-6 text-gray-800">Connect with us</h3>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            <FormInput
              {...register("name")}
              placeholder="Full Name"
              error={errors.name}
            />

            <FormInput
              {...register("email")}
              placeholder="Email Address"
              error={errors.email}
            />

            <FormInput
              {...register("phone")}
              placeholder="Phone Number (10 digits)"
              error={errors.phone}
            />

            <FormSelect
              {...register("program")}
              error={errors.program}
              defaultOption="Select Enquiry Type"
              options={(enquiryTypes || []).map(cat => ({
                value: cat.title,
                label: cat.title
              }))}
              className={!selectedProgram ? "text-gray-400" : "text-gray-900"}
            />

            {isOther && (
              <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }}>
                <FormInput
                  {...register("otherValue")}
                  placeholder="Please specify your enquiry type"
                  error={errors.otherValue}
                />
              </motion.div>
            )}

            <FormTextarea
              {...register("message")}
              placeholder="Your Message"
              rows={4}
              error={errors.message}
            />

            <button
              type="submit"
              disabled={submitting}
              className={`w-full py-4 text-white rounded-xl font-semibold transition-all ${
                submitting
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-blue-800 hover:bg-blue-900 shadow-md hover:shadow-lg"
              }`}
            >
              {submitting ? "Submitting..." : "Submit Enquiry"}
            </button>
          </form>
        </div>
      </section>
    </main>
  );
}

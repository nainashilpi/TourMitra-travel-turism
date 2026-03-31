"use client";

import { useState } from "react";

export default function JoinFormSection() {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    businessType: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <section id="join-form" className="py-28 px-6 bg-gradient-to-r from-slate-900 via-blue-950 ">
      <div className="max-w-5xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">
          {/* Left content */}
          <div>
            <span className="inline-block text-xs font-bold tracking-[0.2em] uppercase text-amber-600 mb-4">
              Get Started
            </span>
            <h2
              className="text-4xl md:text-5xl font-bold text-[#cdd1da] mb-6 leading-tight"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              Ready to grow with{" "}
              <span className="text-amber-500">TripMitra?</span>
            </h2>
            <p className="text-[#6b7280] text-lg leading-relaxed mb-8">
              Fill out the form and our partnership team will reach out within 24 hours.
              No commitment required.
            </p>

            {/* Testimonial */}
            <div className="bg-white rounded-2xl p-6 border border-[#f0ece4]" style={{ boxShadow: "0 2px 16px rgba(0,0,0,0.06)" }}>
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-amber-100 flex items-center justify-center text-xl flex-shrink-0">
                  🏨
                </div>
                <div>
                  <p className="text-[#374151] text-sm italic leading-relaxed mb-3">
                    "Joining TripMitra doubled our occupancy in 3 months. The dashboard is incredibly intuitive and the support team is always available."
                  </p>
                  <div>
                    <div className="font-bold text-[#0f1629] text-sm">Ravi Sharma</div>
                    <div className="text-[#9ca3af] text-xs">Owner, The Himalayan Lodge, Manali</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="bg-white rounded-3xl p-8 md:p-10 border border-[#f0ece4]" style={{ boxShadow: "0 4px 30px rgba(0,0,0,0.08)" }}>
            {submitted ? (
              <div className="flex flex-col items-center justify-center h-full py-12 text-center">
                <div className="w-16 h-16 rounded-full bg-emerald-100 flex items-center justify-center text-3xl mb-5">
                  ✅
                </div>
                <h3 className="text-2xl font-bold text-[#0f1629] mb-3" style={{ fontFamily: "'Playfair Display', serif" }}>
                  Application Received!
                </h3>
                <p className="text-[#6b7280] text-sm max-w-xs">
                  Our team will review your application and get back to you within 24 hours.
                </p>
                <button
                  onClick={() => { setSubmitted(false); setForm({ name: "", email: "", businessType: "", message: "" }); }}
                  className="mt-6 text-amber-600 text-sm font-semibold hover:underline"
                >
                  Submit another application
                </button>
              </div>
            ) : (
              <>
                <h3 className="text-xl font-bold text-[#0f1629] mb-6">
                  Partner Application
                </h3>
                <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                  {/* Name */}
                  <div>
                    <label className="block text-xs font-bold text-[#374151] tracking-wide mb-2 uppercase">
                      Full Name
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Priya Mehta"
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      className="w-full px-4 py-3.5 rounded-xl border border-[#e5e7eb] text-[#374151] text-sm focus:outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-100 transition-all placeholder:text-[#d1d5db]"
                    />
                  </div>

                  {/* Email */}
                  <div>
                    <label className="block text-xs font-bold text-[#374151] tracking-wide mb-2 uppercase">
                      Business Email
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="priya@hotel.com"
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      className="w-full px-4 py-3.5 rounded-xl border border-[#e5e7eb] text-[#374151] text-sm focus:outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-100 transition-all placeholder:text-[#d1d5db]"
                    />
                  </div>

                  {/* Business Type */}
                  <div>
                    <label className="block text-xs font-bold text-[#374151] tracking-wide mb-2 uppercase">
                      Business Type
                    </label>
                    <div className="relative">
                      <select
                        required
                        value={form.businessType}
                        onChange={(e) => setForm({ ...form, businessType: e.target.value })}
                        className="w-full px-4 py-3.5 rounded-xl border border-[#e5e7eb] text-[#374151] text-sm focus:outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-100 transition-all appearance-none bg-white"
                      >
                        <option value="" disabled>Select your business type</option>
                        <option>Hotel / Resort</option>
                        <option>Hostel / Guesthouse</option>
                        <option>Travel Agency</option>
                        <option>Tour Operator</option>
                        <option>Affiliate / Influencer</option>
                        <option>Other</option>
                      </select>
                      <svg className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#9ca3af] pointer-events-none" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                        <path d="M6 9l6 6 6-6" />
                      </svg>
                    </div>
                  </div>

                  {/* Message */}
                  <div>
                    <label className="block text-xs font-bold text-[#374151] tracking-wide mb-2 uppercase">
                      Tell Us About Your Business
                    </label>
                    <textarea
                      rows={4}
                      placeholder="Briefly describe your business, location, and what you're hoping to achieve..."
                      value={form.message}
                      onChange={(e) => setForm({ ...form, message: e.target.value })}
                      className="w-full px-4 py-3.5 rounded-xl border border-[#e5e7eb] text-[#374151] text-sm focus:outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-100 transition-all resize-none placeholder:text-[#d1d5db]"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-4 rounded-2xl bg-[#0f1629] text-white font-bold text-sm hover:bg-amber-500 transition-all duration-300 hover:shadow-lg mt-1"
                  >
                    Submit Application →
                  </button>

                  <p className="text-center text-xs text-[#9ca3af]">
                    By submitting, you agree to our{" "}
                    <a href="#" className="text-amber-500 hover:underline">Partner Terms</a>
                  </p>
                </form>
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
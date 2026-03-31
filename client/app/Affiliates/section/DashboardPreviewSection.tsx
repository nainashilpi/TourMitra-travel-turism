"use client";

import { useState } from "react";

const bookings = [
  { guest: "Aanya Kapoor", hotel: "Sea Breeze Resort", date: "28 Mar 2025", amount: "₹8,400", status: "Confirmed" },
  { guest: "Rahul Nair", hotel: "Mountain Dew Villa", date: "29 Mar 2025", amount: "₹15,200", status: "Confirmed" },
  { guest: "Simran Patel", hotel: "The Heritage Inn", date: "30 Mar 2025", amount: "₹6,800", status: "Pending" },
  { guest: "Arjun Mehta", hotel: "Desert Camp Jaisalmer", date: "31 Mar 2025", amount: "₹22,500", status: "Confirmed" },
  { guest: "Kavya Singh", hotel: "Backwaters Retreat", date: "01 Apr 2025", amount: "₹11,000", status: "Cancelled" },
];

const navItems = [
  { icon: "📊", label: "Overview", active: true },
  { icon: "📅", label: "Bookings" },
  { icon: "💰", label: "Revenue" },
  { icon: "📈", label: "Analytics" },
  { icon: "⭐", label: "Reviews" },
  { icon: "⚙️", label: "Settings" },
];

export default function DashboardPreviewSection() {
  const [activeNav, setActiveNav] = useState(0);

  return (
    <section className="py-28 px-6 bg-white">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="inline-block text-xs font-bold tracking-[0.2em] uppercase text-amber-600 mb-4">
            Dashboard Preview
          </span>
          <h2
            className="text-4xl md:text-5xl font-bold text-[#0f1629] mb-5"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Your partner <span className="text-amber-500">command centre</span>
          </h2>
          <p className="text-[#6b7280] text-lg max-w-xl mx-auto">
            A beautiful, intuitive dashboard to track bookings, revenue, and growth in real time.
          </p>
        </div>

        {/* Dashboard mock */}
        <div
          className="rounded-3xl overflow-hidden border border-[#e5e7eb]"
          style={{ boxShadow: "0 20px 80px rgba(0,0,0,0.12)" }}
        >
          {/* Browser bar */}
          <div className="bg-[#f1f5f9] border-b border-[#e2e8f0] px-5 py-3 flex items-center gap-3">
            <div className="flex gap-1.5">
              <div className="w-3 h-3 rounded-full bg-red-400" />
              <div className="w-3 h-3 rounded-full bg-amber-400" />
              <div className="w-3 h-3 rounded-full bg-green-400" />
            </div>
            <div className="flex-1 flex justify-center">
              <div className="bg-white rounded-md px-4 py-1 text-xs text-[#9ca3af] flex items-center gap-2 w-64 border border-[#e2e8f0]">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#9ca3af" strokeWidth="2">
                  <rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>
                </svg>
                partners.tripmitra.in/dashboard
              </div>
            </div>
          </div>

          {/* Dashboard body */}
          <div className="flex bg-[#f8fafc] min-h-[520px]">
            {/* Sidebar */}
            <aside className="w-56 bg-[#0f1629] flex flex-col py-6 px-4 flex-shrink-0 hidden sm:flex">
              {/* Logo */}
              <div className="flex items-center gap-2 mb-8 px-2">
                <div className="w-7 h-7 rounded-lg bg-amber-400 flex items-center justify-center">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#0f1629" strokeWidth="2.5">
                    <circle cx="12" cy="12" r="10"/><path d="M2 12h20"/>
                  </svg>
                </div>
                <span className="text-white font-bold text-sm">TripMitra</span>
              </div>

              {/* Nav */}
              <nav className="flex flex-col gap-1 flex-1">
                {navItems.map((item, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveNav(i)}
                    className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 text-left ${
                      activeNav === i
                        ? "bg-amber-400/20 text-amber-400"
                        : "text-white/50 hover:text-white/80 hover:bg-white/5"
                    }`}
                  >
                    <span>{item.icon}</span>
                    {item.label}
                    {activeNav === i && (
                      <span className="ml-auto w-1.5 h-1.5 rounded-full bg-amber-400" />
                    )}
                  </button>
                ))}
              </nav>

              {/* User */}
              <div className="flex items-center gap-2 px-3 pt-4 border-t border-white/10">
                <div className="w-8 h-8 rounded-full bg-amber-400/30 flex items-center justify-center text-sm">
                  👤
                </div>
                <div>
                  <div className="text-white text-xs font-semibold">Ravi Sharma</div>
                  <div className="text-white/40 text-xs">Hotel Partner</div>
                </div>
              </div>
            </aside>

            {/* Main */}
            <main className="flex-1 p-6 overflow-auto">
              {/* Top row */}
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-[#0f1629] font-bold text-lg">Good morning, Ravi! 👋</h3>
                  <p className="text-[#9ca3af] text-xs mt-0.5">Tuesday, 31 March 2025</p>
                </div>
                <button className="px-4 py-2 rounded-xl bg-amber-400 text-[#0f1629] font-bold text-xs hover:bg-amber-300 transition-colors">
                  + New Listing
                </button>
              </div>

              {/* Stats cards */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                {[
                  { label: "Total Bookings", value: "1,284", delta: "+12%", icon: "📅", color: "bg-blue-50 text-blue-600" },
                  { label: "Monthly Revenue", value: "₹3.2L", delta: "+8%", icon: "💰", color: "bg-emerald-50 text-emerald-600" },
                  { label: "Link Clicks", value: "48.5K", delta: "+22%", icon: "🔗", color: "bg-violet-50 text-violet-600" },
                  { label: "Avg Rating", value: "4.87★", delta: "+0.3", icon: "⭐", color: "bg-amber-50 text-amber-600" },
                ].map((s) => (
                  <div
                    key={s.label}
                    className="bg-white rounded-2xl p-4 border border-[#f0f0f0]"
                    style={{ boxShadow: "0 1px 6px rgba(0,0,0,0.05)" }}
                  >
                    <div className="flex items-center justify-between mb-3">
                      <span className={`w-8 h-8 rounded-xl flex items-center justify-center text-base ${s.color}`}>
                        {s.icon}
                      </span>
                      <span className="text-xs font-bold text-emerald-500 bg-emerald-50 px-2 py-0.5 rounded-full">
                        {s.delta}
                      </span>
                    </div>
                    <div className="text-xl font-bold text-[#0f1629]">{s.value}</div>
                    <div className="text-[#9ca3af] text-xs mt-0.5">{s.label}</div>
                  </div>
                ))}
              </div>

              {/* Bookings table */}
              <div className="bg-white rounded-2xl border border-[#f0f0f0] overflow-hidden" style={{ boxShadow: "0 1px 6px rgba(0,0,0,0.05)" }}>
                <div className="flex items-center justify-between px-5 py-4 border-b border-[#f0f0f0]">
                  <h4 className="font-bold text-[#0f1629] text-sm">Recent Bookings</h4>
                  <a href="#" className="text-amber-500 text-xs font-semibold hover:underline">View All →</a>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-sm">
                    <thead>
                      <tr className="bg-[#f8fafc]">
                        {["Guest", "Property", "Date", "Amount", "Status"].map((h) => (
                          <th key={h} className="px-5 py-3 text-[#9ca3af] font-semibold text-xs uppercase tracking-wide">
                            {h}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {bookings.map((b, i) => (
                        <tr
                          key={i}
                          className="border-t border-[#f0f0f0] hover:bg-[#fafafa] transition-colors"
                        >
                          <td className="px-5 py-3 font-medium text-[#374151]">{b.guest}</td>
                          <td className="px-5 py-3 text-[#6b7280]">{b.hotel}</td>
                          <td className="px-5 py-3 text-[#6b7280]">{b.date}</td>
                          <td className="px-5 py-3 font-bold text-[#0f1629]">{b.amount}</td>
                          <td className="px-5 py-3">
                            <span
                              className={`px-2.5 py-1 rounded-full text-xs font-bold ${
                                b.status === "Confirmed"
                                  ? "bg-emerald-100 text-emerald-700"
                                  : b.status === "Pending"
                                  ? "bg-amber-100 text-amber-700"
                                  : "bg-red-100 text-red-600"
                              }`}
                            >
                              {b.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </main>
          </div>
        </div>

        <p className="text-center text-[#9ca3af] text-xs mt-5">
          ↑ Static preview only — real dashboard available after onboarding
        </p>
      </div>
    </section>
  );
}
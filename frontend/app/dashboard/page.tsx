"use client";

import { useState } from "react";
import {
    MdFlight, MdDashboard, MdMap, MdSettings, MdLogout,
    MdAutoAwesome, MdNotifications, MdExplore,
    MdSmartToy, MdPeople, MdCalendarMonth, MdLocationOn, MdFlag, MdAttachMoney
} from "react-icons/md";

const navItems = [
    { icon: MdDashboard, label: "Dashboard", active: true },
    { icon: MdMap, label: "My Trips" },
    { icon: MdSettings, label: "Settings" },
];

export default function DashboardPage() {
    const [form, setForm] = useState({
        startCity: "", destination: "", dateFrom: "", dateTo: "", people: 1, budget: "",
    });
    const [chatOpen, setChatOpen] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleLogout = async () => {
        await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/logout`, { method: "POST", credentials: "include" });
        window.location.href = "/login";
    };

    return (
        <div className="flex h-screen w-full text-slate-100 overflow-hidden relative"
            style={{ background: "radial-gradient(ellipse at 15% 0%, rgba(99,102,241,0.18) 0%, transparent 55%), radial-gradient(ellipse at 85% 100%, rgba(14,165,233,0.14) 0%, transparent 55%), #07090f" }}>

            {/* Ambient blobs */}
            <div className="pointer-events-none fixed top-[-15%] left-[-8%] w-[550px] h-[550px] rounded-full blur-[130px]" style={{ background: "rgba(99,102,241,0.12)" }} />
            <div className="pointer-events-none fixed bottom-[-15%] right-[-8%] w-[500px] h-[500px] rounded-full blur-[110px]" style={{ background: "rgba(14,165,233,0.1)" }} />
            <div className="pointer-events-none fixed top-[35%] left-[35%] w-[350px] h-[350px] rounded-full blur-[90px]" style={{ background: "rgba(139,92,246,0.06)" }} />

            {/* Sidebar */}
            <aside className="w-64 border-r border-white/[0.06] flex flex-col shrink-0 relative z-10"
                style={{ background: "rgba(255,255,255,0.025)", backdropFilter: "blur(24px)" }}>

                <div className="p-6 flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center shadow-lg"
                        style={{ background: "linear-gradient(135deg, #6366f1, #0ea5e9)" }}>
                        <MdFlight size={22} className="text-white" />
                    </div>
                    <div>
                        <h1 className="text-xl font-extrabold tracking-tight text-white">RoamIO</h1>
                        <p className="text-[10px] uppercase tracking-widest text-slate-500 font-bold">Next-Gen Travel</p>
                    </div>
                </div>

                <nav className="flex-1 px-4 py-4 space-y-1">
                    {navItems.map(({ icon: Icon, label, active }) => (
                        <a key={label} href="#"
                            className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all text-sm font-semibold ${active
                                ? "text-white border border-white/10"
                                : "text-slate-500 hover:text-slate-300 hover:border hover:border-white/5"}`}
                            style={active ? { background: "rgba(255,255,255,0.07)" } : {}}>
                            <Icon size={20} />
                            {label}
                        </a>
                    ))}
                </nav>

                <div className="p-4 space-y-2">
                    <div className="rounded-2xl p-4 border border-white/10"
                        style={{ background: "linear-gradient(135deg, rgba(99,102,241,0.15), rgba(14,165,233,0.08))" }}>
                        <p className="text-xs font-bold text-slate-200 mb-1">Upgrade to Elite</p>
                        <p className="text-[10px] text-slate-400 mb-3">Unlock unlimited AI routes & concierge.</p>
                        <button className="w-full py-2 text-white text-xs font-bold rounded-lg hover:brightness-110 transition-all"
                            style={{ background: "linear-gradient(135deg, #6366f1, #0ea5e9)" }}>
                            Upgrade Now
                        </button>
                    </div>
                    <button onClick={handleLogout}
                        className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-slate-500 hover:bg-red-500/10 hover:text-red-400 transition-all text-sm font-semibold">
                        <MdLogout size={20} /> Logout
                    </button>
                </div>
            </aside>

            {/* Main */}
            <main className="flex-1 flex flex-col overflow-y-auto relative z-10">
                {/* Topbar */}
                <header className="h-16 flex items-center justify-end px-8 border-b border-white/[0.06] sticky top-0 z-10 shrink-0"
                    style={{ background: "rgba(255,255,255,0.02)", backdropFilter: "blur(24px)" }}>
                    <div className="flex items-center gap-4">
                        <button className="w-10 h-10 rounded-xl border border-white/10 flex items-center justify-center text-slate-400 hover:text-slate-200 transition-colors relative"
                            style={{ background: "rgba(255,255,255,0.04)" }}>
                            <MdNotifications size={20} />
                            <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2" style={{ borderColor: "#07090f" }}></span>
                        </button>
                        <button className="w-10 h-10 rounded-xl border border-white/10 flex items-center justify-center text-slate-400 hover:text-slate-200 transition-colors"
                            style={{ background: "rgba(255,255,255,0.04)" }}>
                            <MdExplore size={20} />
                        </button>
                        <div className="h-8 w-px bg-white/10"></div>
                        <div className="flex items-center gap-3 cursor-pointer">
                            <div className="text-right hidden sm:block">
                                <p className="text-sm font-bold leading-none">Explorer</p>
                                <p className="text-[10px] text-slate-500 font-bold">Free Tier</p>
                            </div>
                            <div className="w-10 h-10 rounded-xl border border-white/10 flex items-center justify-center text-slate-300 font-bold text-sm"
                                style={{ background: "rgba(255,255,255,0.06)" }}>
                                R
                            </div>
                        </div>
                    </div>
                </header>

                <div className="p-8 space-y-8">
                    {/* Stats */}
                    <section className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {[
                            { icon: MdExplore, label: "Countries Visited", value: "0" },
                            { icon: MdFlight, label: "Miles Flown", value: "0" },
                            { icon: MdMap, label: "Active Trips", value: "0" },
                            { icon: MdAttachMoney, label: "AI Savings", value: "₹0" },
                        ].map(({ icon: Icon, label, value }) => (
                            <div key={label} className="border border-white/[0.07] p-5 rounded-2xl flex items-center gap-4 hover:border-white/15 transition-all"
                                style={{ background: "rgba(255,255,255,0.04)", backdropFilter: "blur(16px)" }}>
                                <div className="w-12 h-12 rounded-xl flex items-center justify-center text-slate-400 shrink-0"
                                    style={{ background: "rgba(255,255,255,0.06)" }}>
                                    <Icon size={24} />
                                </div>
                                <div>
                                    <p className="text-2xl font-black">{value}</p>
                                    <p className="text-[10px] uppercase font-bold text-slate-500 tracking-wider">{label}</p>
                                </div>
                            </div>
                        ))}
                    </section>

                    {/* Trip Planner */}
                    <section>
                        <div className="flex items-center gap-3 mb-6">
                            <MdAutoAwesome className="text-indigo-400" size={28} />
                            <div>
                                <h2 className="text-2xl font-black tracking-tight">Plan Your Trip</h2>
                                <p className="text-slate-500 text-sm">Tell RoamIO where you want to go and let AI do the rest.</p>
                            </div>
                        </div>

                        <div className="relative border border-white/[0.07] rounded-3xl p-8 overflow-hidden"
                            style={{ background: "linear-gradient(135deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.02) 100%)", backdropFilter: "blur(24px)" }}>
                            {/* inner glow */}
                            <div className="absolute inset-0 pointer-events-none rounded-3xl"
                                style={{ background: "radial-gradient(ellipse at 0% 0%, rgba(99,102,241,0.1), transparent 60%)" }} />

                            <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
                                <div className="space-y-2">
                                    <label className="text-xs font-bold uppercase tracking-widest text-slate-500 flex items-center gap-2">
                                        <MdLocationOn size={14} className="text-slate-400" /> From
                                    </label>
                                    <input name="startCity" value={form.startCity} onChange={handleChange}
                                        className="w-full h-12 border border-white/10 rounded-xl px-4 text-sm outline-none transition-all placeholder:text-slate-600 text-slate-200 focus:border-indigo-500/50"
                                        style={{ background: "rgba(255,255,255,0.05)" }}
                                        placeholder="e.g. Mumbai, Delhi, Bangalore" />
                                </div>

                                <div className="space-y-2">
                                    <label className="text-xs font-bold uppercase tracking-widest text-slate-500 flex items-center gap-2">
                                        <MdFlag size={14} className="text-slate-400" /> Destination
                                    </label>
                                    <input name="destination" value={form.destination} onChange={handleChange}
                                        className="w-full h-12 border border-white/10 rounded-xl px-4 text-sm outline-none transition-all placeholder:text-slate-600 text-slate-200 focus:border-indigo-500/50"
                                        style={{ background: "rgba(255,255,255,0.05)" }}
                                        placeholder="e.g. Goa, Manali, Tokyo" />
                                </div>

                                <div className="space-y-2">
                                    <label className="text-xs font-bold uppercase tracking-widest text-slate-500 flex items-center gap-2">
                                        <MdCalendarMonth size={14} className="text-slate-400" /> Travel Dates
                                    </label>
                                    <div className="flex gap-3">
                                        <input name="dateFrom" value={form.dateFrom} onChange={handleChange} type="date"
                                            className="flex-1 h-12 border border-white/10 rounded-xl px-4 text-sm outline-none transition-all text-slate-300 [color-scheme:dark] focus:border-indigo-500/50"
                                            style={{ background: "rgba(255,255,255,0.05)" }} />
                                        <input name="dateTo" value={form.dateTo} onChange={handleChange} type="date"
                                            className="flex-1 h-12 border border-white/10 rounded-xl px-4 text-sm outline-none transition-all text-slate-300 [color-scheme:dark] focus:border-indigo-500/50"
                                            style={{ background: "rgba(255,255,255,0.05)" }} />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-xs font-bold uppercase tracking-widest text-slate-500 flex items-center gap-2">
                                        <MdPeople size={14} className="text-slate-400" /> Travellers & Budget
                                    </label>
                                    <div className="flex gap-3">
                                        <div className="relative flex-1">
                                            <MdPeople className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" size={16} />
                                            <input name="people" value={form.people} onChange={handleChange} type="number" min={1} max={20}
                                                className="w-full h-12 border border-white/10 rounded-xl pl-9 pr-4 text-sm outline-none transition-all placeholder:text-slate-600 text-slate-200 focus:border-indigo-500/50"
                                                style={{ background: "rgba(255,255,255,0.05)" }}
                                                placeholder="People" />
                                        </div>
                                        <div className="relative flex-1">
                                            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 text-sm font-bold">₹</span>
                                            <input name="budget" value={form.budget} onChange={handleChange} type="number"
                                                className="w-full h-12 border border-white/10 rounded-xl pl-7 pr-4 text-sm outline-none transition-all placeholder:text-slate-600 text-slate-200 focus:border-indigo-500/50"
                                                style={{ background: "rgba(255,255,255,0.05)" }}
                                                placeholder="Budget" />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <button className="relative z-10 w-full h-14 font-bold rounded-xl transition-all flex items-center justify-center gap-3 text-base text-white hover:brightness-110 active:scale-[0.99]"
                                style={{ background: "linear-gradient(135deg, #6366f1, #0ea5e9)", boxShadow: "0 0 30px rgba(99,102,241,0.3)" }}>
                                <MdAutoAwesome size={22} />
                                Generate AI Itinerary
                            </button>
                        </div>
                    </section>

                    {/* Recent Plans */}
                    <section className="pb-12">
                        <h3 className="text-xl font-black mb-4">Recent Plans</h3>
                        <div className="border border-white/[0.07] rounded-2xl p-8 text-center"
                            style={{ background: "rgba(255,255,255,0.03)", backdropFilter: "blur(16px)" }}>
                            <MdMap size={40} className="text-slate-700 mx-auto mb-3" />
                            <p className="text-slate-500 text-sm font-medium">No trips planned yet.</p>
                            <p className="text-slate-600 text-xs mt-1">Use the planner above to generate your first AI itinerary.</p>
                        </div>
                    </section>
                </div>
            </main>

            {/* AI Chat FAB */}
            <div className="fixed bottom-8 right-8 z-50">
                <button onClick={() => setChatOpen(o => !o)}
                    className="w-16 h-16 rounded-2xl text-white flex items-center justify-center hover:scale-110 transition-all"
                    style={{ background: "linear-gradient(135deg, #6366f1, #0ea5e9)", boxShadow: "0 0 30px rgba(99,102,241,0.4)" }}>
                    <MdSmartToy size={30} />
                </button>
                {chatOpen && (
                    <div className="absolute bottom-20 right-0 w-80 border border-white/10 p-4 rounded-2xl shadow-2xl"
                        style={{ background: "rgba(10,14,30,0.9)", backdropFilter: "blur(24px)" }}>
                        <div className="flex items-center gap-2 mb-3 border-b border-white/10 pb-2">
                            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                            <p className="text-[10px] font-bold uppercase text-slate-400">RoamIO Assistant Online</p>
                        </div>
                        <p className="text-sm font-medium mb-3">"Hi! I can help you plan your perfect trip. Fill in the planner above or ask me anything!"</p>
                        <div className="flex gap-2">
                            <button className="flex-1 py-1.5 text-white text-[10px] font-bold rounded-lg"
                                style={{ background: "linear-gradient(135deg, rgba(99,102,241,0.4), rgba(14,165,233,0.3))", border: "1px solid rgba(99,102,241,0.3)" }}>
                                Plan a trip
                            </button>
                            <button onClick={() => setChatOpen(false)} className="flex-1 py-1.5 bg-white/5 text-slate-400 text-[10px] font-bold rounded-lg border border-white/10">Close</button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

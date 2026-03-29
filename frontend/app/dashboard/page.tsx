"use client";

import { useState } from "react";

type Flight = {
  airline: string; flight_number: string; departure_airport: string;
  departure_time: string; arrival_airport: string; arrival_time: string;
  duration: string; stops: number; price: string; travel_class: string;
};
type Hotel = {
  name: string; rating: number; reviews: number; price: string;
  amenities: string[]; image: string; link: string;
};
type Place = { name: string; rating: number; address: string; image: string; };
type ItineraryDay = { day: number; title: string; plan: string; places: Place[]; meals: string; };
type TripData = {
  destination: string; duration: string; summary: string;
  flights: Flight[]; hotels: Hotel[]; places: Place[];
  weather: { summary: string; temperature: string; advice: string; };
  itinerary: ItineraryDay[];
};

const airlineColor: Record<string, string> = {
  indigo: "bg-blue-600/20 text-blue-400",
  "akasa air": "bg-orange-600/20 text-orange-400",
  "air india": "bg-red-600/20 text-red-400",
  spicejet: "bg-red-500/20 text-red-300",
};
function getAirlineColor(airline: string) {
  return airlineColor[airline.toLowerCase()] ?? "bg-slate-600/20 text-slate-300";
}

const DAY_ICONS = ["flight_land", "museum", "park", "auto_awesome", "flight_takeoff"];

export default function DashboardPage() {
  const [form, setForm] = useState({
    startCity: "", destination: "", dateFrom: "", dateTo: "", people: 1, budget: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [trip, setTrip] = useState<TripData | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    if (!form.startCity || !form.destination || !form.dateFrom || !form.dateTo) {
      setError("Please fill in all required fields."); return;
    }
    setError(""); setLoading(true); setTrip(null);
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/chat`, {
        method: "POST", credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          startCity: form.startCity, destination: form.destination,
          dateFrom: form.dateFrom, dateTo: form.dateTo,
          people: Number(form.people), budget: Number(form.budget) || 0,
        }),
      });
      const json = await res.json();
      if (json.success) setTrip(json.data);
      else setError(json.message ?? "Something went wrong.");
    } catch {
      setError("Failed to reach server. Is the backend running?");
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/logout`, { method: "POST", credentials: "include" });
    window.location.href = "/login";
  };

  return (
    <div className="flex min-h-screen" style={{ background: "#060a0c", color: "#f1f5f9", fontFamily: "Inter, sans-serif" }}>

      {/* ── Sidebar ── */}
      <aside className="fixed left-0 top-0 h-screen w-64 flex flex-col px-6 py-8 z-50"
        style={{ background: "rgba(10,17,20,0.9)", backdropFilter: "blur(16px)", borderRight: "1px solid rgba(255,255,255,0.05)", boxShadow: "0 0 20px rgba(37,192,244,0.07)" }}>

        <div className="mb-10">
          <span className="text-2xl font-black italic tracking-tighter" style={{ color: "#25c0f4" }}>RoamIO</span>
        </div>

        <nav className="flex-1 space-y-1">
          {[
            { icon: "explore", label: "Expeditions", active: true },
            { icon: "flight", label: "Flight Deck" },
            { icon: "hotel", label: "Habitats" },
            { icon: "wb_cloudy", label: "Atmosphere" },
            { icon: "event_note", label: "Logbook" },
          ].map(({ icon, label, active }) => (
            <a key={label} href="#"
              className="flex items-center gap-4 px-4 py-3 rounded-lg text-sm font-semibold transition-all"
              style={active
                ? { background: "rgba(37,192,244,0.1)", color: "#25c0f4", borderRight: "2px solid #25c0f4" }
                : { color: "#94a3b8" }}>
              <span className="material-symbols-outlined text-xl">{icon}</span>
              <span className="uppercase tracking-widest text-xs">{label}</span>
            </a>
          ))}
        </nav>

        <div className="pt-6 border-t space-y-1" style={{ borderColor: "rgba(255,255,255,0.05)" }}>
          <a href="#" className="flex items-center gap-3 px-4 py-2 text-xs text-slate-400 hover:text-slate-100 transition-colors">
            <span className="material-symbols-outlined text-lg">settings</span> Settings
          </a>
          <button onClick={handleLogout} className="flex items-center gap-3 px-4 py-2 text-xs text-slate-400 hover:text-red-400 transition-colors w-full">
            <span className="material-symbols-outlined text-lg">logout</span> Logout
          </button>
        </div>
      </aside>

      {/* ── Main ── */}
      <main className="ml-64 flex-1">

        {/* ── Planner Form ── */}
        <div className="px-12 pt-10 pb-8">
          <div className="mb-6">
            <p className="text-xs font-black uppercase tracking-[0.2em] mb-1" style={{ color: "#25c0f4" }}>AI Trip Planner</p>
            <h1 className="text-3xl font-black tracking-tight">Where are you headed?</h1>
          </div>

          <div className="rounded-2xl p-6 grid grid-cols-2 md:grid-cols-3 gap-4"
            style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.05)" }}>

            {[
              { name: "startCity", label: "From", placeholder: "e.g. Pune", icon: "flight_takeoff" },
              { name: "destination", label: "To", placeholder: "e.g. Bangalore", icon: "flight_land" },
            ].map(({ name, label, placeholder, icon }) => (
              <div key={name} className="space-y-1">
                <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 flex items-center gap-1">
                  <span className="material-symbols-outlined text-sm">{icon}</span>{label}
                </label>
                <input name={name} value={(form as Record<string, string | number>)[name] as string}
                  onChange={handleChange} placeholder={placeholder}
                  className="w-full h-11 rounded-xl px-4 text-sm outline-none text-slate-200 placeholder:text-slate-600"
                  style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)" }} />
              </div>
            ))}

            <div className="space-y-1">
              <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 flex items-center gap-1">
                <span className="material-symbols-outlined text-sm">calendar_month</span>Dates
              </label>
              <div className="flex gap-2">
                <input name="dateFrom" value={form.dateFrom} onChange={handleChange} type="date"
                  className="flex-1 h-11 rounded-xl px-3 text-sm outline-none text-slate-300 [color-scheme:dark]"
                  style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)" }} />
                <input name="dateTo" value={form.dateTo} onChange={handleChange} type="date"
                  className="flex-1 h-11 rounded-xl px-3 text-sm outline-none text-slate-300 [color-scheme:dark]"
                  style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)" }} />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 flex items-center gap-1">
                <span className="material-symbols-outlined text-sm">group</span>People
              </label>
              <input name="people" value={form.people} onChange={handleChange} type="number" min={1}
                className="w-full h-11 rounded-xl px-4 text-sm outline-none text-slate-200"
                style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)" }} />
            </div>

            <div className="space-y-1">
              <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 flex items-center gap-1">
                <span className="material-symbols-outlined text-sm">currency_rupee</span>Budget
              </label>
              <input name="budget" value={form.budget} onChange={handleChange} type="number"
                placeholder="e.g. 25000"
                className="w-full h-11 rounded-xl px-4 text-sm outline-none text-slate-200 placeholder:text-slate-600"
                style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)" }} />
            </div>

            <div className="flex items-end">
              <button onClick={handleSubmit} disabled={loading}
                className="w-full h-11 rounded-xl text-sm font-black uppercase tracking-widest transition-all hover:brightness-110 active:scale-95 disabled:opacity-50 flex items-center justify-center gap-2"
                style={{ background: "#25c0f4", color: "#060a0c" }}>
                {loading
                  ? <><span className="material-symbols-outlined text-lg animate-spin">progress_activity</span>Planning...</>
                  : <><span className="material-symbols-outlined text-lg">auto_awesome</span>Generate</>}
              </button>
            </div>
          </div>

          {error && (
            <p className="mt-3 text-sm text-red-400 flex items-center gap-2">
              <span className="material-symbols-outlined text-base">error</span>{error}
            </p>
          )}
        </div>

        {/* ── Empty State ── */}
        {!trip && !loading && (
          <div className="px-12 pb-16 flex flex-col items-center justify-center py-20 text-center">
            <span className="material-symbols-outlined text-6xl mb-4" style={{ color: "rgba(37,192,244,0.2)" }}>travel_explore</span>
            <p className="text-slate-500 font-bold text-lg">No expedition planned yet.</p>
            <p className="text-slate-600 text-sm mt-1">Fill in the planner above and hit Generate.</p>
          </div>
        )}

        {/* ── Loading Skeleton ── */}
        {loading && (
          <div className="px-12 pb-16 space-y-4">
            {[400, 200, 200].map((h, i) => (
              <div key={i} className="rounded-2xl animate-pulse" style={{ height: h, background: "rgba(255,255,255,0.03)" }} />
            ))}
          </div>
        )}

        {/* ── Results ── */}
        {trip && (
          <div className="px-12 pb-16 space-y-8">

            {/* Header */}
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-black tracking-tight">{form.startCity} ➔ {trip.destination}</h2>
                <p className="text-xs text-slate-500 mt-1 uppercase tracking-widest">{trip.duration}</p>
              </div>
              <button className="px-6 py-2 rounded-lg text-xs font-black uppercase tracking-widest transition-all hover:scale-105 active:scale-95"
                style={{ background: "#25c0f4", color: "#060a0c" }}>
                Finalize Trip
              </button>
            </div>

            {/* Hero + Weather */}
            <section className="relative h-80 rounded-3xl overflow-hidden group"
              style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.05)" }}>
              <div className="absolute inset-0" style={{ background: "linear-gradient(135deg, rgba(37,192,244,0.08) 0%, transparent 60%)" }} />
              <div className="relative h-full flex flex-col justify-end p-10 max-w-2xl">
                <div className="flex items-center gap-2 mb-3">
                  <span className="w-2 h-2 rounded-full animate-pulse" style={{ background: "#25c0f4", boxShadow: "0 0 8px #25c0f4" }} />
                  <span className="text-[10px] font-black uppercase tracking-[0.2em]" style={{ color: "#25c0f4" }}>AI Optimized Expedition</span>
                </div>
                <h3 className="text-3xl font-black mb-3 leading-tight">
                  Your Journey to <span className="italic" style={{ color: "#25c0f4" }}>{trip.destination}</span>
                </h3>
                <p className="text-slate-400 text-sm leading-relaxed max-w-xl">{trip.summary}</p>
              </div>

              {/* Weather widget */}
              <div className="absolute top-8 right-8 p-5 rounded-2xl w-60"
                style={{ background: "rgba(255,255,255,0.04)", backdropFilter: "blur(12px)", border: "1px solid rgba(255,255,255,0.07)" }}>
                <div className="flex items-center justify-between mb-1">
                  <span className="material-symbols-outlined text-3xl" style={{ color: "#25c0f4" }}>wb_cloudy</span>
                  <span className="text-2xl font-black">{trip.weather.temperature.split(" ")[0]}</span>
                </div>
                <p className="text-[11px] font-black uppercase tracking-widest text-slate-400 capitalize">{trip.weather.summary}</p>
                <div className="mt-3 pt-3" style={{ borderTop: "1px solid rgba(255,255,255,0.05)" }}>
                  <p className="text-[10px] italic" style={{ color: "#25c0f4" }}>{trip.weather.advice}</p>
                </div>
              </div>
            </section>

            {/* Bento grid */}
            <div className="grid grid-cols-12 gap-6">

              {/* Left col — Flights + Hotels + Places */}
              <div className="col-span-8 space-y-8">

                {/* Flights */}
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-black uppercase tracking-tighter">Flight Deck Status</h3>
                    <span className="text-[10px] text-slate-500 uppercase tracking-widest">Prices in INR</span>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    {trip.flights.map((f, i) => (
                      <div key={i} className="p-5 rounded-2xl hover:scale-[1.02] transition-transform cursor-pointer"
                        style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.05)" }}>
                        <div className="flex justify-between items-start mb-4">
                          <span className={`px-2 py-1 rounded text-[10px] font-black ${getAirlineColor(f.airline)}`}>
                            {f.airline.toUpperCase()}
                          </span>
                          <div className="text-right">
                            <p className="text-[10px] text-slate-500 uppercase">From</p>
                            <p className="text-lg font-black">{f.price}</p>
                          </div>
                        </div>
                        <div className="space-y-2">
                          <div className="flex items-center justify-between text-xs text-slate-300">
                            <span className="font-bold">{f.departure_time.split(" ")[1]}</span>
                            <div className="flex items-center gap-1 text-slate-600">
                              <div className="h-px w-8" style={{ background: "rgba(255,255,255,0.1)" }} />
                              <span className="material-symbols-outlined text-sm">flight</span>
                              <div className="h-px w-8" style={{ background: "rgba(255,255,255,0.1)" }} />
                            </div>
                            <span className="font-bold">{f.arrival_time.split(" ")[1]}</span>
                          </div>
                          <div className="h-px" style={{ background: "rgba(255,255,255,0.05)" }} />
                          <div className="flex items-center justify-between text-[11px] text-slate-400">
                            <span>{f.flight_number}</span>
                            <span>{f.duration}</span>
                            <span style={{ color: f.stops === 0 ? "#25c0f4" : "#ffc281" }}>
                              {f.stops === 0 ? "Direct" : `${f.stops} stop`}
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Hotels */}
                <div>
                  <h3 className="text-lg font-black uppercase tracking-tighter mb-4">Habitats & Sanctuaries</h3>
                  <div className="grid grid-cols-3 gap-4">
                    {trip.hotels.slice(0, 3).map((h, i) => (
                      <a key={i} href={h.link} target="_blank" rel="noopener noreferrer" className="group cursor-pointer block">
                        <div className="relative h-44 rounded-2xl overflow-hidden mb-3">
                          <img src={h.image} alt={h.name}
                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                          <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(6,10,12,0.7), transparent)" }} />
                          <div className="absolute top-2 right-2 flex items-center gap-1 px-2 py-1 rounded-lg"
                            style={{ background: "rgba(255,255,255,0.08)", backdropFilter: "blur(8px)", border: "1px solid rgba(255,255,255,0.08)" }}>
                            <span className="material-symbols-outlined text-yellow-400 text-xs" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                            <span className="text-[10px] font-black">{h.rating}</span>
                          </div>
                        </div>
                        <p className="font-black text-xs uppercase tracking-tight truncate">{h.name}</p>
                        <p className="text-xs text-slate-400 mt-0.5">{h.price}/nt</p>
                      </a>
                    ))}
                  </div>
                </div>

                {/* Places */}
                <div>
                  <h3 className="text-lg font-black uppercase tracking-tighter mb-4">Iconic Landmarks</h3>
                  <div className="grid grid-cols-4 gap-4">
                    {trip.places.map((p, i) => (
                      <div key={i} className="group relative h-64 rounded-2xl overflow-hidden cursor-pointer">
                        <img src={p.image} alt={p.name}
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                        <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(6,10,12,0.85) 0%, transparent 50%)" }} />
                        <div className="absolute bottom-4 left-4 right-4">
                          <div className="flex items-center gap-1 mb-1">
                            <span className="material-symbols-outlined text-yellow-400 text-xs" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                            <span className="text-[10px] font-black text-yellow-400">{p.rating}</span>
                          </div>
                          <h4 className="text-sm font-black leading-tight">{p.name}</h4>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

              </div>

              {/* Right col — Timeline */}
              <div className="col-span-4 rounded-3xl p-7 sticky top-6 self-start overflow-y-auto"
                style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.05)", maxHeight: "calc(100vh - 120px)" }}>
                <h3 className="text-lg font-black uppercase tracking-tighter mb-7 flex items-center gap-2">
                  <span className="material-symbols-outlined" style={{ color: "#25c0f4" }}>route</span>
                  Timeline
                </h3>

                <div className="relative space-y-8">
                  <div className="absolute left-[11px] top-2 bottom-2 w-px" style={{ background: "rgba(255,255,255,0.06)" }} />

                  {trip.itinerary.map((day, i) => (
                    <div key={i} className="relative pl-9">
                      <div className="absolute left-0 top-1 w-6 h-6 rounded-full flex items-center justify-center text-xs"
                        style={i === 0
                          ? { background: "#25c0f4", boxShadow: "0 0 12px rgba(37,192,244,0.4)", color: "#060a0c" }
                          : { background: "#1a262b", border: "1px solid rgba(255,255,255,0.1)", color: "#94a3b8" }}>
                        <span className="material-symbols-outlined text-sm">{DAY_ICONS[i] ?? "place"}</span>
                      </div>
                      <p className="text-[10px] font-black uppercase tracking-[0.2em] mb-0.5"
                        style={{ color: i === 0 ? "#25c0f4" : "#64748b" }}>
                        Day {day.day}
                      </p>
                      <h4 className="font-bold text-sm text-slate-100">{day.title}</h4>
                      <p className="text-xs text-slate-500 mt-1 leading-relaxed">{day.plan}</p>
                      {day.places.length > 0 && (
                        <div className="mt-2 flex flex-wrap gap-1">
                          {day.places.map((pl, j) => (
                            <span key={j} className="text-[10px] px-2 py-0.5 rounded-full font-semibold"
                              style={{ background: "rgba(37,192,244,0.08)", color: "#25c0f4", border: "1px solid rgba(37,192,244,0.15)" }}>
                              {pl.name}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>

                <button className="w-full mt-8 py-3 rounded-2xl text-xs font-black uppercase tracking-widest transition-all hover:text-[#25c0f4]"
                  style={{ border: "1px solid rgba(255,255,255,0.08)", background: "rgba(255,255,255,0.03)" }}>
                  Download Full Itinerary
                </button>
              </div>

            </div>
          </div>
        )}
      </main>
    </div>
  );
}

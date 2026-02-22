import { MdUpdate, MdDiversity3, MdVerifiedUser } from "react-icons/md";
import HowItWorks from "@/components/HowItWorks";
import Navbar from "@/components/Navbar";
import Image from "next/image";
import { MdLocationPin, MdEvent,MdAutoAwesome } from "react-icons/md";
import Footer from "@/components/Footer";


export default function Home() {
  return (
    <div className="bg-background-light dark:bg-background-dark text-slate-900 dark:text-slate-100 overflow-x-hidden">
      <Navbar />

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center pt-20 px-4">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background-dark/50 to-background-dark z-10"></div>
          <Image alt="Exotic tropical beach" fill className="object-cover opacity-40 blur-xs" src="https://images.pexels.com/photos/2662116/pexels-photo-2662116.jpeg" />
          <div className="absolute inset-0 hero-gradient"></div>
        </div>
        <div className="relative z-20 max-w-5xl w-full text-center space-y-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-green-800/75  border border-green-500  text-xs font-bold uppercase tracking-widest mb-4">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-500 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
            </span>
            Next-Gen Travel Engine Active
          </div>
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter leading-[0.9] text-black">
            Your <span className="text-blue-500">AI</span>-Powered <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-700 via-blue-500 to-indigo-600">Journey Starts Here</span>
          </h1>
          <p className="text-white font-medium text-lg md:text-xl max-w-2xl mx-auto  leading-relaxed">
            Experience the future of travel with hyper-personalized itineraries designed by artificial intelligence. No stress, just pure exploration.
          </p>
          <div className="max-w-2xl mx-auto pt-6">
            <div className="glass p-2 rounded-2xl flex flex-col md:flex-row items-center gap-2 border border-blue-500/30 shadow-2xl">
              <div className="flex items-center flex-1 w-full px-4">
                <span className="text-blue-400 m-2"><MdLocationPin size={30}/></span>
                <input className="bg-transparent border-none focus:outline-none   text-white placeholder-slate-300 w-full text-lg py-3" placeholder="Location" type="text" />
              </div>
              <div className="h-8 w-px bg-slate-700 hidden md:block"></div>
              <div className="flex items-center flex-1 w-full px-4">
                <span className="text-blue-400 m-2"><MdEvent size={30}/></span>
                <input className="bg-transparent border-none focus:outline-none text-white placeholder-slate-300 w-full text-lg py-3" placeholder="Add dates" type="text" />
              </div>
              <button className="w-full md:w-auto bg-[#0bafe6] text-black font-bold px-4 py-1 rounded-xl flex items-center justify-center gap-2 hover:scale-[1.02] active:scale-95 transition-all">
                <span>Let&apos;s Go</span>
                <span className="text-black m-2 font-extrabold"><MdAutoAwesome size={30}/></span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* How it Works */}
    <HowItWorks/>

      {/* Popular Trips */}

      {/* Why Choose */}
      <section className="py-24 px-4 overflow-hidden bg-linear-to-r from-balck via-zinc-900 to-blue-900">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="relative">
            <div className="absolute -top-10 -left-10 w-40 h-40 bg-blue-500/20 rounded-full blur-[80px]"></div>
            <div className="relative glass rounded-[2.5rem] p-4 border border-white/10">
              <Image alt="Airplane wing" width={800} height={500} className="rounded-4xl w-full h-125 object-cover" src="https://images.pexels.com/photos/1280383/pexels-photo-1280383.jpeg" />
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full pointer-events-none p-10 flex flex-col justify-between">
                <div className="glass px-4 py-2 rounded-lg border border-blue-500/50 self-start animate-pulse">
                  <span className="text-[10px] text-blue-500 font-bold uppercase block">Route Optimization</span>
                  <span className="text-white font-mono text-sm">ETA: 0.002s</span>
                </div>
                <div className="glass px-4 py-2 rounded-lg border border-blue-500/50 self-end">
                  <span className="text-[10px] text-blue-500 font-bold uppercase block">Weather Analysis</span>
                  <span className="text-white font-mono text-sm">STABLE: 99.4%</span>
                </div>
              </div>
            </div>
          </div>
          <div className="space-y-10">
            <div>
              <h2 className="text-blue-500 font-bold uppercase tracking-widest text-sm mb-4">The Advantage</h2>
              <h3 className="text-4xl md:text-5xl font-black text-white leading-tight">Why Choose Our AI?</h3>
            </div>
            <div className="space-y-8">
              {[
                { Icon: MdUpdate, title: "24/7 Real-time Updates", desc: "Your itinerary adapts instantly to flight delays, weather changes, or new opportunities as you travel." },
                { Icon: MdDiversity3, title: "Hyper-Personalized Itineraries", desc: "We analyze millions of data points to find the hidden gems that match your exact interests and pace." },
                { Icon: MdVerifiedUser, title: "Zero Planning Stress", desc: "Forget spending weeks on forums and booking sites. Our AI does the heavy lifting in seconds." }
              ].map((item, i) => (
                <div key={i} className="flex gap-6">
                  <div className="flex-shrink-0 w-12 h-12 bg-blue-500/10 rounded-full flex items-center justify-center">
                    <item.Icon className="text-blue-500" size={24} />
                  </div>
                  <div>
                    <h5 className="text-xl font-bold mb-2">{item.title}</h5>
                    <p className="text-slate-400">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
            <button className="bg-blue-500/10 border border-blue-500/30 text-blue-500 px-8 py-4 rounded-xl font-bold hover:bg-blue-500 hover:text-black cursor-pointer transition-all">
              Start Your Free Trial
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer/>
    </div>
  );
}

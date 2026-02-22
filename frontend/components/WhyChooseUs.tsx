
import { MdUpdate, MdDiversity3, MdVerifiedUser } from "react-icons/md";
import Image from 'next/image';
const WhyChooseUs = () => {
  return (
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
                      <div className="shrink-0 w-12 h-12 bg-blue-500/10 rounded-full flex items-center justify-center">
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
  )
}

export default WhyChooseUs

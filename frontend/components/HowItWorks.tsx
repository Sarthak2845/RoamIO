
const HowItWorks = () => {
    return (
        <section className="py-24 px-4 relative overflow-hidden">
            <div className="max-w-7xl mx-auto">
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
                    <div className="space-y-4">
                        <h2 className="text-blue-500 font-bold uppercase tracking-widest text-sm">The Process</h2>
                        <h3 className="text-4xl md:text-5xl font-black text-white">Plan your trip in seconds</h3>
                    </div>
                    <p className="text-slate-400 max-w-md">Our AI handles the complex logistics so you can focus on the memories. Simple, smart, and seamless.</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div className="glass-card p-8 rounded-2xl group">
                        <div className="w-14 h-14 bg-blue-500/10 rounded-xl flex items-center justify-center mb-6 group-hover:bg-blue-500/20 transition-colors">
                            <span className="material-symbols-outlined text-blue-500 text-3xl">psychology</span>
                        </div>
                        <h4 className="text-xl font-bold mb-4">Input Preferences</h4>
                        <p className="text-slate-400 leading-relaxed">Tell us your vibe, budget, and must-sees. Our AI listens to your unique travel style.</p>
                    </div>
                    <div className="glass-card p-8 rounded-2xl group">
                        <div className="w-14 h-14 bg-blue-500/10 rounded-xl flex items-center justify-center mb-6 group-hover:bg-blue-500/20 transition-colors">
                            <span className="material-symbols-outlined text-blue-500 text-3xl">auto_mode</span>
                        </div>
                        <h4 className="text-xl font-bold mb-4">AI Generates Itinerary</h4>
                        <p className="text-slate-400 leading-relaxed">Our engine crafts a custom plan in real-time, optimizing routes and booking times instantly.</p>
                    </div>
                    <div className="glass-card p-8 rounded-2xl group">
                        <div className="w-14 h-14 bg-blue-500/10 rounded-xl flex items-center justify-center mb-6 group-hover:bg-blue-500/20 transition-colors">
                            <span className="material-symbols-outlined text-blue-500 text-3xl">ads_click</span>
                        </div>
                        <h4 className="text-xl font-bold mb-4">Book with One Click</h4>
                        <p className="text-slate-400 leading-relaxed">Secure your flights, stays, and activities with a single tap. Everything synced and ready.</p>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default HowItWorks

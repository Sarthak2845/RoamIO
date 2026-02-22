import { MdExplore, MdShare, MdForum, MdMail } from "react-icons/md";

const Footer = () => {
    return (
        <footer className="py-16 px-4 border-t border-white/5 bg-background-dark">
            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
                <div className="space-y-6">
                    <div className="flex items-center gap-2">
                        <div className="bg-blue-500 p-1.5 rounded-lg flex items-center justify-center">
                            <MdExplore className="text-background-dark" size={24} />
                        </div>
                        <span className="text-xl font-extrabold tracking-tight">Roam<span className="text-blue-500">IO</span></span>
                    </div>
                    <p className="text-slate-500 text-sm leading-relaxed">
                        Redefining the way humans explore the world through the power of intelligent automation.
                    </p>
                </div>
                <div>
                    <h6 className="font-bold mb-6">Company</h6>
                    <ul className="space-y-4 text-sm text-slate-500">
                        <li><a className="hover:text-blue-500 transition-colors" href="#">About Us</a></li>
                        <li><a className="hover:text-blue-500 transition-colors" href="#">Careers</a></li>
                        <li><a className="hover:text-blue-500 transition-colors" href="#">Press</a></li>
                        <li><a className="hover:text-blue-500 transition-colors" href="#">Privacy Policy</a></li>
                    </ul>
                </div>
                <div>
                    <h6 className="font-bold mb-6">Product</h6>
                    <ul className="space-y-4 text-sm text-slate-500">
                        <li><a className="hover:text-blue-500 transition-colors" href="#">AI Planner</a></li>
                        <li><a className="hover:text-blue-500 transition-colors" href="#">Integrations</a></li>
                        <li><a className="hover:text-blue-500 transition-colors" href="#">Group Travel</a></li>
                        <li><a className="hover:text-blue-500 transition-colors" href="#">Mobile App</a></li>
                    </ul>
                </div>
                <div>
                    <h6 className="font-bold mb-6">Connect</h6>
                    <div className="flex gap-4 mb-6">
                        <a className="w-10 h-10 rounded-full glass flex items-center justify-center hover:bg-blue-500/20 hover:text-blue-500 transition-all" href="#">
                            <MdShare size={20} />
                        </a>
                        <a className="w-10 h-10 rounded-full glass flex items-center justify-center hover:bg-blue-500/20 hover:text-blue-500 transition-all" href="#">
                            <MdForum size={20} />
                        </a>
                        <a className="w-10 h-10 rounded-full glass flex items-center justify-center hover:bg-blue-500/20 hover:text-blue-500 transition-all" href="#">
                            <MdMail size={20} />
                        </a>
                    </div>
                    <p className="text-xs text-slate-600">© {new Date().getFullYear()} RoamIO Technologies. All rights reserved.</p>
                </div>
            </div>
        </footer>
    )
}

export default Footer

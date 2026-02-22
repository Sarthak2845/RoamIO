import Link from 'next/link'
import React from 'react'
import { MdExplore } from 'react-icons/md'
import Icon from './Icon'
const Navbar = () => {
    return (
        <header className="fixed top-0 w-full z-50 px-4 py-4 md:px-10">
            <nav className="max-w-7xl mx-auto glass rounded-2xl px-6 py-3 flex items-center justify-between">
                <Icon/>
                <div className="hidden md:flex items-center gap-10">
                    <a className="text-sm font-medium hover:text-primary transition-colors" href="">Technology</a>
                    <a className="text-sm font-medium hover:text-primary transition-colors" href="#">Explore</a>
                    <a className="text-sm font-medium hover:text-primary transition-colors" href="#">AI Planner</a>
                    <a className="text-sm font-medium hover:text-primary transition-colors" href="#">Community</a>
                </div>
                <div className="flex items-center gap-4">
                    <Link href="/login">
                        <button className="text-sm font-medium hover:text-primary transition-colors cursor-pointer">
                            Sign In
                        </button>
                    </Link>
                    <Link href="/signup">
                        <button className="bg-[#0bafe6] hover:bg-blue-400/90 text-black px-5 py-2 rounded-lg text-sm font-bold transition-all glow-shadow cursor-pointer">
                            Get Started
                        </button>
                    </Link>
                </div>
            </nav>
        </header>
    )
}

export default Navbar

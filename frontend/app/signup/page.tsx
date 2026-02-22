"use client";

import { MdPerson, MdMail, MdLock, MdVisibility, MdArrowForward, MdRocketLaunch } from "react-icons/md";
import { FaGoogle, FaApple } from "react-icons/fa";
import Image from "next/image";
import Icon from "@/components/Icon";

export default function SignupPage() {
  return (
    <div className="relative flex min-h-screen w-full overflow-hidden bg-slate-50 dark:bg-slate-950">
      {/* Left Side: Visual */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden group">
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950/80 via-transparent to-transparent z-10"></div>
        <Image
          alt="Futuristic city"
          fill
          className="object-cover transition-transform duration-1000 group-hover:scale-105 brightness-75"
          src="https://images.pexels.com/photos/2662116/pexels-photo-2662116.jpeg"
        />
        <div className="relative z-20 flex flex-col justify-between p-16 h-full">
          <Icon/>
          <div className="max-w-md">
            <h1 className="text-5xl font-black leading-tight text-white mb-6">
              The Next Frontier <br />
              <span className="text-blue-500 underline decoration-blue-500/30">of Exploration.</span>
            </h1>
            <p className="text-slate-300 text-lg leading-relaxed">
              Experience seamless global travel powered by our advanced AI navigation engine.
            </p>
          </div>
          <div className="flex gap-4">
            <div className="backdrop-blur-md bg-slate-900/60 border border-blue-500/10 px-4 py-2 rounded-lg text-sm text-slate-300 flex items-center gap-2">
              <span className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></span>
              SYSTEM ACTIVE
            </div>
          </div>
        </div>
      </div>

      {/* Right Side: Signup Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 sm:p-12 relative">
        {/* Mobile Background */}
        <div className="lg:hidden absolute inset-0 opacity-20">
          <Image
            alt="Background"
            fill
            className="object-cover brightness-10"
            src="https://images.pexels.com/photos/2662116/pexels-photo-2662116.jpeg"
          />
        </div>

        <div className="w-full max-w-[480px] z-10">
          <div className="backdrop-blur-md bg-slate-900/60 border border-blue-500/10 p-8 sm:p-10 rounded-xl shadow-2xl">
            <div className="mb-10 text-center lg:text-left">
              <h2 className="text-3xl font-bold text-slate-100 mb-2">Create Account</h2>
              <p className="text-slate-400">Join 50,000+ pioneers exploring the world.</p>
            </div>

            <form className="space-y-5">
              {/* Full Name */}
              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-medium text-slate-300 px-1">Full Name</label>
                <div className="relative flex items-center">
                  <MdPerson className="absolute left-4 text-slate-500" size={20} />
                  <input
                    className="w-full pl-12 pr-4 py-3.5 bg-slate-950/50 border border-slate-700 focus:border-blue-500 focus:ring-1 focus:ring-blue-500/20 rounded-lg text-slate-100 placeholder:text-slate-600 transition-all outline-none"
                    placeholder="John Doe"
                    type="text"
                  />
                </div>
              </div>

              {/* Email */}
              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-medium text-slate-300 px-1">Email Address</label>
                <div className="relative flex items-center">
                  <MdMail className="absolute left-4 text-slate-500" size={20} />
                  <input
                    className="w-full pl-12 pr-4 py-3.5 bg-slate-950/50 border border-slate-700 focus:border-blue-500 focus:ring-1 focus:ring-blue-500/20 rounded-lg text-slate-100 placeholder:text-slate-600 transition-all outline-none"
                    placeholder="pioneer@roamio.io"
                    type="email"
                  />
                </div>
              </div>

              {/* Password */}
              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-medium text-slate-300 px-1">Password</label>
                <div className="relative flex items-center">
                  <MdLock className="absolute left-4 text-slate-500" size={20} />
                  <input
                    className="w-full pl-12 pr-12 py-3.5 bg-slate-950/50 border border-slate-700 focus:border-blue-500 focus:ring-1 focus:ring-blue-500/20 rounded-lg text-slate-100 placeholder:text-slate-600 transition-all outline-none"
                    placeholder="••••••••"
                    type="password"
                  />
                  <button className="absolute right-4 text-slate-500 hover:text-slate-300 transition-colors" type="button">
                    <MdVisibility size={20} />
                  </button>
                </div>
              </div>

              {/* Submit Button */}
              <button
                className="w-full bg-blue-500 hover:bg-blue-600 text-black font-bold py-4 rounded-lg shadow-[0_0_15px_rgba(59,130,246,0.4)] hover:shadow-[0_0_25px_rgba(59,130,246,0.6)] transition-all flex items-center justify-center gap-2 mt-4"
                type="submit"
              >
                <span>CREATE ACCOUNT</span>
                <MdArrowForward size={20} />
              </button>
            </form>


            {/* Login Link */}
            <p className="mt-8 text-center text-sm text-slate-500">
              Already have an account?
              <a className="text-blue-500 hover:text-blue-400 font-semibold transition-colors ml-1" href="/login">
                Log in
              </a>
            </p>
          </div>

          {/* Terms */}
          <p className="mt-6 text-center text-xs text-slate-600 px-8">
            By joining, you agree to RoamIO&apos;s{" "}
            <a className="underline hover:text-slate-400" href="#">
              Terms of Service
            </a>{" "}
            and{" "}
            <a className="underline hover:text-slate-400" href="#">
              Privacy Policy
            </a>
            .
          </p>
        </div>
      </div>
    </div>
  );
}

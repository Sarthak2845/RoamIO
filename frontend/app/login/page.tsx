"use client";

import { MdVisibility, MdBolt, MdMoreHoriz } from "react-icons/md";
import { FaGithub } from "react-icons/fa";
import Image from "next/image";
import { MdExplore } from 'react-icons/md'
import Icon from "@/components/Icon";
import { useState } from "react";
import axios from "axios";
type Login = {
  email: string,
  password: string
}
export default function LoginPage() {
  const [formData, setFormData] = useState<Login>({
    email: "",
    password: ""
  })
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const API = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:8000/api";
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    
    try {
      const response = await axios.post(`${API}/auth/login`, {
        email: formData.email,
        password: formData.password
      })
      if (response.data.success) {
        window.location.href = "/dashboard"
      } else {
        setError(response.data.error || "Login failed")
      }

    } catch (err: any) {
      console.error('Login error:', err.response?.data);
      setError(err.response?.data?.error || "Something went wrong. Please try again.");
    }
    finally {
      setLoading(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };
  return (
    <div className="bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 min-h-screen flex flex-col">
      {/* Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-blue-500/10 blur-[120px]"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-blue-500/5 blur-[100px]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(37,192,244,0.15)_0%,transparent_70%)]"></div>
      </div>

      {/* Header */}
      <header className="relative z-10 flex items-center justify-between px-6 py-6 lg:px-12">
        <Icon />
      </header>

      {/* Main Content */}
      <main className="relative z-10 flex-1 flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-110">
          {/* Heading */}
          <div className="text-center mb-10">
            <h1 className="text-3xl font-black tracking-tight mb-2 text-slate-900 dark:text-white">Welcome back, Operator.</h1>
            <p className="text-slate-500 dark:text-slate-400">Authenticate to RoamIO to continue.</p>
          </div>

          {/* Login Card */}
          <div className="backdrop-blur-[20px] bg-slate-900/70 border border-blue-500/10 rounded-2xl p-8 shadow-2xl">
            <form className="space-y-6" onSubmit={handleSubmit}>
              {error && (
                <div className="bg-red-500/10 border border-red-500/50 text-red-500 px-4 py-3 rounded-lg text-sm">
                  {error}
                </div>
              )}
              {/* Email */}
              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700 dark:text-slate-300 ml-1">Email Address</label>
                <input
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full h-14 bg-white/5 dark:bg-black/20 border border-slate-200 dark:border-white/10 rounded-xl px-4 text-base focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 outline-none transition-all placeholder:text-slate-500"
                  placeholder="name@company.com"
                  type="email"
                />
              </div>

              {/* Password */}
              <div className="space-y-2">
                <div className="flex justify-between items-center ml-1">
                  <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">Password</label>
                  <a className="text-xs font-bold text-blue-500 hover:underline" href="#">Forgot Password?</a>
                </div>
                <div className="relative">
                  <input
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                    className="w-full h-14 bg-white/5 dark:bg-black/20 border border-slate-200 dark:border-white/10 rounded-xl px-4 pr-12 text-base focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 outline-none transition-all placeholder:text-slate-500"
                    placeholder="••••••••"
                    type={showPassword ? "text" : "password"}
                  />
                  <button onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 hover:text-blue-500 transition-colors" type="button">
                    <MdVisibility size={20} />
                  </button>
                </div>
              </div>

              {/* Login Button */}
              <button disabled={loading} className="w-full h-14 bg-blue-500 disabled:bg-blue-500/50 disabled:cursor-not-allowed text-black font-bold rounded-xl cursor-pointer hover:shadow-[0_0_20px_rgba(37,192,244,0.4)] hover:brightness-110 active:scale-[0.98] transition-all flex items-center justify-center gap-2" type="submit">
                <span>{loading ? "LOGGING IN..." : "Initialize Session"}</span>
                <MdBolt size={20} />
              </button>

            </form>
          </div>

          {/* Signup Link */}
          <p className="mt-8 text-center text-sm text-slate-500 dark:text-slate-400">
            Don&apos;t have an account?
            <a className="font-bold text-blue-500 hover:underline ml-1" href="/signup">Request Access</a>
          </p>
        </div>
      </main>


    </div>
  );
}

'use client'

import { useState } from 'react'
import { cn } from "@/lib/utils"
import { CalendarDays, Mail, Lock, ArrowRight } from "lucide-react"
import Link from 'next/link'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Add login logic here
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-grey-50 to-burgundy-50 relative overflow-hidden">
      {/* Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute w-[500px] h-[500px] bg-burgundy-100/20 rounded-full blur-3xl -top-48 -right-48 animate-float" />
        <div className="absolute w-[300px] h-[300px] bg-burgundy-200/10 rounded-full blur-2xl bottom-0 left-1/4 animate-float-delayed" />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 py-16 flex flex-col items-center justify-center min-h-screen">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 mb-12 animate-slide-up">
          <CalendarDays className="w-8 h-8 text-burgundy-600" />
          <span className="font-noto text-2xl text-burgundy-700">Challenge</span>
        </Link>

        {/* Login Form */}
        <div className="w-full max-w-md bg-white/30 backdrop-blur-sm rounded-3xl p-8 animate-scale-in">
          <h2 className="text-2xl font-noto-display text-burgundy-700 text-center mb-8">
            Welcome Back
          </h2>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label className="text-sm text-grey-600 font-medium">Email</label>
              <div className="relative">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 bg-white/50 rounded-xl pl-11 focus:outline-none focus:ring-2 focus:ring-burgundy-300"
                  placeholder="Enter your email"
                />
                <Mail className="w-5 h-5 text-grey-400 absolute left-4 top-1/2 -translate-y-1/2" />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm text-grey-600 font-medium">Password</label>
              <div className="relative">
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3 bg-white/50 rounded-xl pl-11 focus:outline-none focus:ring-2 focus:ring-burgundy-300"
                  placeholder="Enter your password"
                />
                <Lock className="w-5 h-5 text-grey-400 absolute left-4 top-1/2 -translate-y-1/2" />
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-burgundy-600 text-white py-3 rounded-xl font-noto hover:bg-burgundy-700 transition-colors"
            >
              Sign In
            </button>
          </form>

          <div className="mt-6 text-center">
            <Link 
              href="/signup" 
              className="text-burgundy-600 hover:text-burgundy-700 text-sm font-medium"
            >
              Don't have an account? Sign up
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
} 
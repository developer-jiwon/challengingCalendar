'use client'

import { useState } from 'react'
import { cn } from "@/lib/utils"
import { ArrowRight, CalendarDays, Target, Sparkles, Trophy } from "lucide-react"
import Link from 'next/link'

export default function LandingPage() {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <div className="h-screen bg-gradient-to-br from-grey-50 via-burgundy-50/30 to-grey-50 relative overflow-hidden">
      {/* Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        {/* Adjusted for better mobile appearance */}
        <div className="absolute w-[400px] sm:w-[800px] h-[400px] sm:h-[800px] bg-gradient-to-r from-burgundy-100/30 to-burgundy-200/30 rounded-full blur-3xl -top-48 -right-48 animate-float" />
        <div className="absolute w-[300px] sm:w-[600px] h-[300px] sm:h-[600px] bg-gradient-to-l from-burgundy-200/20 to-burgundy-100/20 rounded-full blur-2xl -bottom-32 -left-16 sm:-bottom-64 sm:-left-32 animate-float-delayed" />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.05)_1px,transparent_1px)] bg-[size:32px_32px] sm:bg-[size:64px_64px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,black,transparent)]" />
      </div>

      <div className="h-full flex flex-col">
        {/* Top Section */}
        <div className="flex-1 flex flex-col items-center justify-center pt-6 sm:pt-12">
          {/* Logo - Responsive sizing */}
          <div className="relative mb-4 sm:mb-6 animate-slide-up">
            <div className="absolute inset-0 bg-burgundy-100/20 blur-2xl rounded-full scale-150 animate-pulse-subtle" />
            <div className="relative flex items-center gap-2 sm:gap-3 bg-white/30 backdrop-blur-sm px-4 sm:px-5 py-2 rounded-2xl">
              <CalendarDays className="w-7 h-7 sm:w-8 sm:h-8 md:w-10 md:h-10 text-burgundy-600" />
              <span className="font-noto text-xl sm:text-2xl md:text-3xl text-burgundy-700">Challenge</span>
            </div>
          </div>

          {/* Main Text - Responsive typography */}
          <h1 className="text-2xl sm:text-3xl md:text-6xl font-noto-display text-center mb-3 sm:mb-4 px-4 animate-slide-up"
              style={{ animationDelay: '0.1s' }}>
            <span className="bg-gradient-to-r from-burgundy-700 to-burgundy-500 text-transparent bg-clip-text">
              Transform Your Life
            </span>
          </h1>

          <p className="text-sm sm:text-base md:text-lg text-grey-600 text-center max-w-xl mb-6 animate-slide-up leading-relaxed px-4"
             style={{ animationDelay: '0.2s' }}>
            Join our transformative challenge program and build lasting habits.
          </p>

          {/* Features Grid - More compact on mobile */}
          <div className="w-full max-w-4xl mx-auto px-3 mb-6 sm:mb-12">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-4">
              {features.map((feature, index) => (
                <div 
                  key={feature.title}
                  className={cn(
                    "group bg-white/10 backdrop-blur-sm rounded-lg sm:rounded-xl transition-all duration-500",
                    "border border-white/20 hover:border-burgundy-200/50",
                    "animate-slide-up hover:-translate-y-1 hover:bg-white/20",
                    "flex sm:flex-col items-center p-3 sm:p-6",
                    "text-left sm:text-center"
                  )}
                  style={{ animationDelay: `${0.1 + index * 0.1}s` }}
                >
                  <div className="w-8 h-8 sm:w-12 sm:h-12 bg-burgundy-50 rounded-lg sm:rounded-xl flex items-center justify-center sm:mb-4 shrink-0 group-hover:scale-110 transition-transform duration-500">
                    <feature.icon className="w-4 h-4 sm:w-6 sm:h-6 text-burgundy-600" />
                  </div>
                  <div className="ml-3 sm:ml-0">
                    <h3 className="font-noto text-burgundy-700 text-sm sm:text-lg mb-0.5 sm:mb-2">{feature.title}</h3>
                    <p className="text-grey-600 text-xs sm:text-sm leading-tight sm:leading-normal">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Section with CTA Button - Responsive sizing */}
        <div className="w-full pb-8 sm:pb-12 px-4">
          <Link 
            href="/calendar"
            className="group relative mx-auto block max-w-[280px] sm:max-w-md"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            <div className="relative z-10">
              <button
                className={cn(
                  "w-full bg-burgundy-600 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-xl",
                  "font-noto text-base sm:text-lg flex items-center justify-center gap-2 sm:gap-3",
                  "transition-all duration-500",
                  "hover:shadow-[0_0_30px_rgba(157,45,89,0.3)] hover:-translate-y-1",
                  "animate-slide-up",
                )}
                style={{ animationDelay: '0.3s' }}
              >
                Start Your Challenge
                <ArrowRight className={cn(
                  "w-4 h-4 sm:w-5 sm:h-5 transition-transform duration-500",
                  isHovered ? "translate-x-2" : ""
                )} />
              </button>
            </div>
            <div className="absolute inset-0 bg-burgundy-500 rounded-xl blur-xl opacity-30 group-hover:opacity-60 transition-all duration-500 group-hover:scale-110" />
          </Link>
        </div>
      </div>
    </div>
  )
}

const features = [
  {
    icon: Target,
    title: "Flexible Goals",
    description: "Choose from 21, 66, or 90-day challenges."
  },
  {
    icon: Sparkles,
    title: "Daily Progress",
    description: "Track achievements with our intuitive system."
  },
  {
    icon: Trophy,
    title: "Stay Motivated",
    description: "Celebrate milestones as you build habits."
  }
]


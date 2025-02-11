'use client'

import { useState } from 'react'
import { cn } from "@/lib/utils"
import { ArrowRight, CalendarDays } from "lucide-react"
import Link from 'next/link'

export default function LandingPage() {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <div className="min-h-screen bg-gradient-to-br from-grey-50 to-burgundy-50 relative overflow-hidden">
      {/* Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute w-[500px] h-[500px] bg-burgundy-100/20 rounded-full blur-3xl -top-48 -right-48 animate-float" />
        <div className="absolute w-[300px] h-[300px] bg-burgundy-200/10 rounded-full blur-2xl bottom-0 left-1/4 animate-float-delayed" />
        <div className="absolute top-1/4 left-1/3 w-2 h-2 bg-white rounded-full animate-sparkle" />
        <div className="absolute top-2/3 right-1/4 w-1 h-1 bg-white rounded-full animate-sparkle-delayed" />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 py-16 flex flex-col items-center justify-center min-h-screen">
        {/* Logo */}
        <div className="flex items-center gap-3 mb-8 animate-slide-up">
          <CalendarDays className="w-10 h-10 text-burgundy-600" />
          <span className="font-noto text-3xl text-burgundy-700">Challenge</span>
        </div>

        {/* Main Text */}
        <h1 className="text-4xl md:text-6xl font-noto-display text-burgundy-700 text-center mb-6 animate-slide-up" style={{ animationDelay: '0.1s' }}>
          Transform Your Life,<br />One Day at a Time
        </h1>
        <p className="text-grey-600 text-center max-w-xl mb-12 animate-slide-up" style={{ animationDelay: '0.2s' }}>
          Join our 21, 66, or 90-day challenge and build lasting habits that will change your life. Start your journey today.
        </p>

        {/* CTA Button */}
        <Link 
          href="/calendar"
          className="group relative"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <div className="relative z-10">
            <button
              className={cn(
                "bg-burgundy-600 text-white px-8 py-4 rounded-full",
                "font-noto text-lg flex items-center gap-3",
                "transition-transform duration-300",
                "hover:shadow-lg hover:-translate-y-0.5",
                "animate-slide-up",
              )}
              style={{ animationDelay: '0.3s' }}
            >
              Start Your Challenge
              <ArrowRight className={cn(
                "w-5 h-5 transition-transform duration-300",
                isHovered ? "translate-x-1" : ""
              )} />
            </button>
          </div>
          {/* Button effects */}
          <div className="absolute inset-0 bg-burgundy-500 rounded-full blur opacity-50 group-hover:opacity-75 transition-opacity" />
        </Link>

        {/* Features */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-24 max-w-4xl w-full">
          {features.map((feature, index) => (
            <div 
              key={feature.title}
              className="bg-white/30 backdrop-blur-sm rounded-2xl p-6 animate-slide-up"
              style={{ animationDelay: `${0.4 + index * 0.1}s` }}
            >
              <feature.icon className="w-8 h-8 text-burgundy-600 mb-4" />
              <h3 className="font-noto text-burgundy-700 text-lg mb-2">{feature.title}</h3>
              <p className="text-grey-600 text-sm">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

const features = [
  {
    icon: CalendarDays,
    title: "Flexible Challenges",
    description: "Choose from 21, 66, or 90-day challenges to match your goals and commitment level."
  },
  {
    icon: CalendarDays,
    title: "Track Progress",
    description: "Monitor your daily achievements and build momentum with our intuitive tracking system."
  },
  {
    icon: CalendarDays,
    title: "Stay Motivated",
    description: "Get daily reminders and celebrate your milestones as you build lasting habits."
  }
]


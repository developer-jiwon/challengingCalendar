"use client"

import { useState, useEffect } from "react"
import { cn } from "@/lib/utils"
import { ActivityCard } from "./ActivityCard"
import { Navigation } from "./Navigation"
import { CalendarGrid } from "./CalendarGrid"
import { activities } from "@/lib/activities"

export default function ChallengeCalendar() {
  const [completed, setCompleted] = useState<number[]>([])
  const [selectedDay, setSelectedDay] = useState<number | null>(null)
  const [isNavExpanded, setIsNavExpanded] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkIfMobile = () => setIsMobile(window.innerWidth < 768)
    checkIfMobile()
    window.addEventListener("resize", checkIfMobile)
    return () => window.removeEventListener("resize", checkIfMobile)
  }, [])

  const toggleDay = (day: number | null) => {
    if (day === null) return
    setCompleted((prev) => (prev.includes(day) ? prev.filter((d) => d !== day) : [...prev, day]))
    setSelectedDay(day)
  }

  return (
    <div className="flex flex-col min-h-screen w-full relative">
      <Navigation isNavExpanded={isNavExpanded} setIsNavExpanded={setIsNavExpanded} isMobile={isMobile} />

      {/* Content */}
      <div
        className={cn(
          "flex-1 p-4 sm:p-8 flex flex-col items-center justify-center transition-all duration-300",
          isMobile ? (isNavExpanded ? "mt-16" : "mt-0") : isNavExpanded ? "ml-40" : "ml-0"
        )}
      >
        <div className="w-full max-w-4xl mx-auto">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-center mb-8 text-burgundy-700">
            2025 FEB
          </h1>

          <CalendarGrid completed={completed} toggleDay={toggleDay} />
        </div>

        {/* Activity Card */}
        {selectedDay && activities[selectedDay] && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <ActivityCard
              date={selectedDay}
              keyword={activities[selectedDay].keyword}
              activity={activities[selectedDay].activity}
              onClose={() => setSelectedDay(null)}
            />
          </div>
        )}
      </div>
    </div>
  )
}


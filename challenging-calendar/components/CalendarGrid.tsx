'use client'

import { cn } from "@/lib/utils"
import { activities } from "@/lib/activities"

interface CalendarGridProps {
  completed: number[]
  toggleDay: (day: number | null) => void
}

export function CalendarGrid({ completed, toggleDay }: CalendarGridProps) {
  const getDaysInMonth = () => {
    const year = 2025
    const month = 1 // 0-based, so 1 is February
    const firstDay = new Date(year, month, 1).getDay()
    const totalDays = new Date(year, month + 1, 0).getDate()

    const days = Array(35).fill(null)
    for (let i = 0; i < totalDays; i++) {
      days[i + firstDay] = i + 1
    }

    return days
  }

  return (
    <div className="w-full max-w-4xl mx-auto">
      {/* Week days header */}
      <div className="grid grid-cols-7 gap-2 md:gap-4 mb-2">
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
          <div
            key={day}
            className="text-center text-burgundy-600 font-bold bg-white py-2 rounded-md shadow-sm text-sm"
          >
            {day}
          </div>
        ))}
      </div>

      {/* Calendar grid */}
      <div className="grid grid-cols-7 gap-2 md:gap-4">
        {getDaysInMonth().map((day, index) => (
          <div
            key={index}
            className={cn(
              "aspect-square relative group",
              day ? "cursor-pointer" : "pointer-events-none"
            )}
          >
            {day && (
              <button
                onClick={() => toggleDay(day)}
                className={cn(
                  "w-full h-full rounded-full flex items-center justify-center text-sm font-bold transition-all",
                  "hover:bg-burgundy-100 focus:outline-none focus:ring-2 focus:ring-burgundy-300",
                  completed.includes(day)
                    ? "bg-burgundy-600 text-white"
                    : "bg-grey-100 text-burgundy-700"
                )}
              >
                {day}
                {activities[day]?.keyword && (
                  <span className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-burgundy-600 text-white text-xs rounded-full">
                    {activities[day].keyword}
                  </span>
                )}
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}


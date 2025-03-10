'use client'

import { cn } from "@/lib/utils"

interface CalendarGridProps {
  completed: number[]
  toggleDay: (day: number | null) => void
  startDay: number
  endDay: number
}

export function CalendarGrid({ completed, toggleDay, startDay, endDay }: CalendarGridProps) {
  const getDays = () => {
    const days = Array(30).fill(null)
    
    for (let i = 0; i < (endDay - startDay + 1); i++) {
      days[i] = startDay + i
    }

    return days
  }

  return (
    <div className="w-full max-w-2xl mx-auto">
      {/* Grid */}
      <div className="grid grid-rows-6 grid-cols-5 gap-0">
        {getDays().map((day, index) => (
          <div
            key={index}
            className={cn(
              "aspect-square relative flex items-center justify-center p-0.5",
              day ? "cursor-pointer" : "pointer-events-none"
            )}
          >
            {day && (
              <button
                onClick={() => toggleDay(day)}
                className={cn(
                  "w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center text-sm font-noto",
                  "focus:outline-none focus:ring-2 focus:ring-burgundy-300",
                  completed.includes(day)
                    ? "bg-burgundy-600 text-white"
                    : "bg-grey-100 text-burgundy-700"
                )}
              >
                {day}
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}


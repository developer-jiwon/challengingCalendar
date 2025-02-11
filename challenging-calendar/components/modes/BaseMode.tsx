'use client'

import { cn } from "@/lib/utils"

interface BaseModeProps {
  days: number[]
  completed: number[]
  toggleDay: (day: number | null) => void
  currentPage?: number
}

export function BaseMode({ days, completed, toggleDay, currentPage = 1 }: BaseModeProps) {
  return (
    <div className="flex justify-center">
      <div className="w-[340px] md:w-[580px] lg:w-[660px] px-4 md:px-0">
        <div className="grid grid-rows-5 grid-cols-5">
          {days.map((day, index) => (
            <div
              key={index}
              className="p-2 md:p-3 lg:p-4 flex items-center justify-center"
            >
              <button
                onClick={() => toggleDay(day)}
                className={cn(
                  "w-11 h-11 md:w-16 md:h-16 lg:w-20 lg:h-20 rounded-full",
                  "flex items-center justify-center",
                  "text-sm md:text-lg lg:text-xl font-noto-display",
                  "transition-all duration-200 hover:scale-105",
                  "focus:outline-none focus:ring-1 focus:ring-burgundy-300",
                  completed.includes(day)
                    ? "bg-burgundy-600 text-white"
                    : "bg-grey-100 text-burgundy-700 hover:bg-grey-50"
                )}
              >
                {day}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
} 
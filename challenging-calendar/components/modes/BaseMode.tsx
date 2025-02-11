'use client'

import { cn } from "@/lib/utils"

interface BaseModeProps {
  days: number[]
  completed: number[]
  toggleDay: (day: number | null) => void
  currentPage?: number
}

interface Evidence {
  text: string
  attachments: Array<{
    type: 'image' | 'link'
    url: string
  }>
}

export function BaseMode({ days, completed, toggleDay, currentPage = 1 }: BaseModeProps) {
  const handleSave = (evidenceString: string) => {
    if (selectedDay) {
      try {
        const evidenceData = JSON.parse(evidenceString) as Evidence
        const newEvidence = {
          ...evidence,
          [selectedDay]: evidenceString // Store the full JSON string
        }
        setEvidence(newEvidence)
        localStorage.setItem('mediumModeEvidence', JSON.stringify(newEvidence))
        setSelectedDay(null)
      } catch (error) {
        console.error('Failed to parse evidence:', error)
      }
    }
  }

  return (
    <div className="flex justify-center animate-scale-in">
      <div className="w-[340px] md:w-[580px] lg:w-[660px] px-4 md:px-0 relative">
        {/* Enhanced background card effect */}
        <div className="absolute inset-0 bg-white/30 backdrop-blur-sm rounded-3xl">
          {/* Add subtle border gradient */}
          <div className="absolute inset-0 rounded-3xl border border-white/50 bg-gradient-to-br from-white/5 to-burgundy-50/5" />
          {/* Add corner accents */}
          <div className="absolute -top-1 -left-1 w-4 h-4 border-t-2 border-l-2 border-burgundy-200 rounded-tl-xl" />
          <div className="absolute -bottom-1 -right-1 w-4 h-4 border-b-2 border-r-2 border-burgundy-200 rounded-br-xl" />
        </div>
        
        <div className="grid grid-rows-5 grid-cols-5 relative p-4">
          {days.map((day, index) => (
            <div
              key={index}
              className="p-2 md:p-3 lg:p-4 flex items-center justify-center"
              style={{
                animation: `slide-up 0.2s ease-out ${index * 0.02}s both`
              }}
            >
              <button
                onClick={() => toggleDay(day)}
                className={cn(
                  "w-11 h-11 md:w-16 md:h-16 lg:w-20 lg:h-20 rounded-full",
                  "flex items-center justify-center",
                  "text-sm md:text-lg lg:text-xl font-noto-display",
                  "transition-all duration-300",
                  "hover:scale-105 active:scale-95",
                  "focus:outline-none focus:ring-2 focus:ring-burgundy-300",
                  "relative group",
                  completed.includes(day)
                    ? "bg-burgundy-600 text-white shadow-lg animate-bounce-subtle"
                    : "bg-white/80 text-burgundy-700 hover:bg-white shadow-md hover:shadow-lg"
                )}
              >
                {day}
                {/* Enhanced hover effect */}
                <div className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="absolute inset-0 bg-burgundy-200/20 rounded-full blur-md animate-pulse" />
                  {/* Add sparkle on hover */}
                  <div className="absolute top-0 right-0 w-1 h-1 bg-white rounded-full animate-sparkle" />
                </div>
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
} 
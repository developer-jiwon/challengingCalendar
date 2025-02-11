"use client"

import { useState } from "react"
import { cn } from "@/lib/utils"
import { EasyMode } from "./modes/EasyMode"
import { MediumMode } from "./modes/MediumMode"
import { HardMode } from "./modes/HardMode"
import { Navigation } from "./Navigation"

type Difficulty = "easy" | "medium" | "hard"

interface CompletedDays {
  easy: number[]
  medium: number[]
  hard: number[]
}

export default function ChallengeCalendar() {
  const [completed, setCompleted] = useState<CompletedDays>({
    easy: [],
    medium: [],
    hard: []
  })
  const [difficulty, setDifficulty] = useState<Difficulty>("easy")
  const [currentPage, setCurrentPage] = useState(1)

  const difficultyDays = {
    easy: 21,
    medium: 66,
    hard: 90
  }

  const toggleDay = (day: number | null) => {
    if (day === null) return
    setCompleted(prev => ({
      ...prev,
      [difficulty]: prev[difficulty].includes(day)
        ? prev[difficulty].filter(d => d !== day)
        : [...prev[difficulty], day]
    }))
  }

  const totalPages = Math.ceil(difficultyDays[difficulty] / 30)

  const renderMode = () => {
    switch (difficulty) {
      case "easy":
        return <EasyMode completed={completed.easy} toggleDay={toggleDay} />
      case "medium":
        return <MediumMode completed={completed.medium} toggleDay={toggleDay} currentPage={currentPage} />
      case "hard":
        return <HardMode completed={completed.hard} toggleDay={toggleDay} currentPage={currentPage} />
    }
  }

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage)
  }

  return (
    <div className="flex min-h-screen w-full relative font-lora">
      <Navigation difficulty={difficulty} />
      
      <main className="w-full">
        <div className="min-h-screen w-full flex flex-col items-center justify-center">
          <div className="flex flex-col items-center w-full max-w-[1400px] mx-auto px-4 md:px-16">
            <div className="flex justify-center mb-12 md:mb-16">
              <div className="inline-flex gap-3 md:gap-4 bg-white/30 backdrop-blur-[2px] p-1.5 md:p-2 rounded-full">
                <button
                  onClick={() => {
                    setDifficulty("easy")
                    setCurrentPage(1)
                  }}
                  className={cn(
                    "relative py-2 px-4 sm:px-5 rounded-full transition-all duration-500",
                    "font-medium text-xs sm:text-sm whitespace-nowrap",
                    "group flex items-center gap-1.5 sm:gap-2",
                    difficulty === "easy"
                      ? "bg-white text-burgundy-600 shadow-md"
                      : "text-grey-600 hover:bg-white/50"
                  )}
                >
                  <span className="font-noto">Easy</span>
                  <span className={cn(
                    "text-[10px] px-1.5 py-0.5 rounded-full transition-colors",
                    difficulty === "easy"
                      ? "bg-burgundy-50 text-burgundy-600"
                      : "bg-grey-100 text-grey-500"
                  )}>
                    21
                  </span>
                  {difficulty === "easy" && (
                    <div className="absolute inset-0 -z-10 rounded-full animate-pulse-subtle">
                      <div className="absolute inset-0 bg-white blur-sm" />
                    </div>
                  )}
                </button>

                <button
                  onClick={() => {
                    setDifficulty("medium")
                    setCurrentPage(1)
                  }}
                  className={cn(
                    "relative py-2 px-4 sm:px-5 rounded-full transition-all duration-500",
                    "font-medium text-xs sm:text-sm whitespace-nowrap",
                    "group flex items-center gap-1.5 sm:gap-2",
                    difficulty === "medium"
                      ? "bg-white text-burgundy-600 shadow-md"
                      : "text-grey-600 hover:bg-white/50"
                  )}
                >
                  <span className="font-noto">Medium</span>
                  <span className={cn(
                    "text-[10px] px-1.5 py-0.5 rounded-full transition-colors",
                    difficulty === "medium"
                      ? "bg-burgundy-50 text-burgundy-600"
                      : "bg-grey-100 text-grey-500"
                  )}>
                    66
                  </span>
                  {difficulty === "medium" && (
                    <div className="absolute inset-0 -z-10 rounded-full animate-pulse-subtle">
                      <div className="absolute inset-0 bg-white blur-sm" />
                    </div>
                  )}
                </button>

                <button
                  onClick={() => {
                    setDifficulty("hard")
                    setCurrentPage(1)
                  }}
                  className={cn(
                    "relative py-2 px-4 sm:px-5 rounded-full transition-all duration-500",
                    "font-medium text-xs sm:text-sm whitespace-nowrap",
                    "group flex items-center gap-1.5 sm:gap-2",
                    difficulty === "hard"
                      ? "bg-white text-burgundy-600 shadow-md"
                      : "text-grey-600 hover:bg-white/50"
                  )}
                >
                  <span className="font-noto">Hard</span>
                  <span className={cn(
                    "text-[10px] px-1.5 py-0.5 rounded-full transition-colors",
                    difficulty === "hard"
                      ? "bg-burgundy-50 text-burgundy-600"
                      : "bg-grey-100 text-grey-500"
                  )}>
                    90
                  </span>
                  {difficulty === "hard" && (
                    <div className="absolute inset-0 -z-10 rounded-full animate-pulse-subtle">
                      <div className="absolute inset-0 bg-white blur-sm" />
                    </div>
                  )}
                </button>
              </div>
            </div>

            {renderMode()}

            {difficulty !== "easy" && totalPages > 1 && (
              <div className="flex justify-center mt-4">
                <div className="flex gap-2">
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                    <button
                      key={page}
                      onClick={() => handlePageChange(page)}
                      className={cn(
                        "w-8 h-8 rounded-full font-noto",
                        currentPage === page
                          ? "bg-burgundy-600 text-white"
                          : "bg-grey-100 text-burgundy-700 hover:bg-burgundy-100"
                      )}
                    >
                      {page}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  )
}


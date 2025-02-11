'use client'

import { cn } from "@/lib/utils"
import { useState, useEffect } from "react"
import { BaseMode } from "./BaseMode"
import { ChallengeDetail } from "@/components/ChallengeDetail"

interface HardModeProps {
  completed: number[]
  toggleDay: (day: number | null) => void
  currentPage: number
}

interface Evidence {
  [key: number]: string
}

export function HardMode({ completed, toggleDay, currentPage }: HardModeProps) {
  const [selectedDay, setSelectedDay] = useState<number | null>(null)
  const [evidence, setEvidence] = useState<Evidence>({})
  
  const startDay = (currentPage - 1) * 30 + 1
  const days = Array(30).fill(null).map((_, i) => startDay + i).filter(day => day <= 90)

  const handleDayClick = (day: number | null) => {
    if (!day) return
    if (completed.includes(day)) {
      toggleDay(day)
    } else {
      setSelectedDay(day)
    }
  }

  const handleClose = () => {
    setSelectedDay(null)
  }

  const handleSave = (dayEvidence: string) => {
    if (selectedDay) {
      const newEvidence = {
        ...evidence,
        [selectedDay]: dayEvidence
      }
      setEvidence(newEvidence)
      localStorage.setItem('hardModeEvidence', JSON.stringify(newEvidence))
    }
  }

  // Load saved evidence from localStorage on mount
  useEffect(() => {
    const savedEvidence = localStorage.getItem('hardModeEvidence')
    if (savedEvidence) {
      setEvidence(JSON.parse(savedEvidence))
    }
  }, [])

  return (
    <>
      <BaseMode 
        days={days}
        completed={completed}
        toggleDay={handleDayClick}
        currentPage={currentPage}
      />

      {selectedDay && challenges[selectedDay] && (
        <ChallengeDetail
          day={selectedDay}
          title={challenges[selectedDay].title}
          description={challenges[selectedDay].description}
          onClose={handleClose}
          onSave={handleSave}
          savedEvidence={evidence[selectedDay]}
        />
      )}
    </>
  )
}

// Define challenges for hard mode
const challenges: Record<number, Challenge> = {
  1: {
    title: "Hard Challenge Day 1",
    description: {
      en: "Complete your first hard challenge",
      ko: "첫 번째 어려운 도전 과제를 완료하세요."
    }
  },
  // ... add more challenges as needed
  90: {
    title: "Final Challenge",
    description: {
      en: "Complete your 90-day journey",
      ko: "90일간의 여정을 완료하세요."
    }
  }
}

// Add all days in between (2-89) with similar format
for (let i = 2; i <= 89; i++) {
  challenges[i] = {
    title: `Day ${i} Challenge`,
    description: {
      en: `Complete your day ${i} hard challenge`,
      ko: `${i}일차 어려운 도전 과제를 완료하세요.`
    }
  }
} 
'use client'

import { cn } from "@/lib/utils"
import { useState, useEffect } from "react"
import { BaseMode } from "./BaseMode"
import { ChallengeDetail } from "@/components/ChallengeDetail"

interface MediumModeProps {
  completed: number[]
  toggleDay: (day: number | null) => void
  currentPage: number
}

interface Evidence {
  [key: number]: string
}

interface Challenge {
  title: string
  description: {
    en: string
    ko: string
  }
}

export function MediumMode({ completed, toggleDay, currentPage }: MediumModeProps) {
  const [selectedDay, setSelectedDay] = useState<number | null>(null)
  const [evidence, setEvidence] = useState<Evidence>({})
  
  useEffect(() => {
    const savedEvidence = localStorage.getItem('mediumModeEvidence')
    if (savedEvidence) {
      setEvidence(JSON.parse(savedEvidence))
    }
  }, [])

  const startDay = (currentPage - 1) * 30 + 1
  const days = Array(30).fill(null).map((_, i) => startDay + i).filter(day => day <= 66)

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
      localStorage.setItem('mediumModeEvidence', JSON.stringify(newEvidence))
    }
  }

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

const challenges: Record<number, Challenge> = {
  1: {
    title: "Medium Challenge Day 1",
    description: {
      en: "Complete your first medium challenge",
      ko: "첫 번째 중급 도전 과제를 완료하세요."
    }
  },
  66: {
    title: "Final Medium Challenge",
    description: {
      en: "Complete your 66-day journey",
      ko: "66일간의 여정을 완료하세요."
    }
  }
}

// Add all days in between (2-65) with similar format
for (let i = 2; i <= 65; i++) {
  challenges[i] = {
    title: `Day ${i} Challenge`,
    description: {
      en: `Complete your day ${i} medium challenge`,
      ko: `${i}일차 중급 도전 과제를 완료하세요.`
    }
  }
} 
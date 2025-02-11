'use client'

import { cn } from "@/lib/utils"
import { useState } from "react"
import { BaseMode } from "./BaseMode"
import { ChallengeDetail } from "@/components/ChallengeDetail"

interface MediumModeProps {
  completed: number[]
  toggleDay: (day: number | null) => void
  currentPage: number
}

export function MediumMode({ completed, toggleDay, currentPage }: MediumModeProps) {
  const [selectedDay, setSelectedDay] = useState<number | null>(null)
  const [evidence, setEvidence] = useState<Evidence>({})
  
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

  const handleSave = (evidence: Evidence) => {
    setEvidence(evidence)
    setSelectedDay(null)
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
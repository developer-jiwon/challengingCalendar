'use client'

import { useState, useEffect } from "react"
import { cn } from "@/lib/utils"
import { ChallengeDetail } from "../ChallengeDetail"
import { BaseMode } from "./BaseMode"
import { Challenge, easyModeActivities } from "@/lib/activities"

interface EasyModeProps {
  completed: number[]
  toggleDay: (day: number | null) => void
}

interface Evidence {
  [key: number]: string
}

export function EasyMode({ completed, toggleDay }: EasyModeProps) {
  const [selectedDay, setSelectedDay] = useState<number | null>(null)
  const [evidence, setEvidence] = useState<Evidence>({})
  const days = Array(30).fill(null).map((_, i) => i + 1)

  // Load saved evidence from localStorage on mount
  useEffect(() => {
    const savedEvidence = localStorage.getItem('easyModeEvidence')
    if (savedEvidence) {
      setEvidence(JSON.parse(savedEvidence))
    }
  }, [])

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
      localStorage.setItem('easyModeEvidence', JSON.stringify(newEvidence))
    }
  }

  // Add this console log to debug
  console.log('Selected day activity:', selectedDay && easyModeActivities[selectedDay])

  return (
    <>
      <BaseMode 
        days={days}
        completed={completed}
        toggleDay={handleDayClick}
      />

      {selectedDay && easyModeActivities[selectedDay] && (
        <ChallengeDetail
          day={selectedDay}
          title={easyModeActivities[selectedDay].title}
          description={easyModeActivities[selectedDay].description}
          onClose={handleClose}
          onSave={handleSave}
          savedEvidence={evidence[selectedDay]}
        />
      )}
    </>
  )
} 
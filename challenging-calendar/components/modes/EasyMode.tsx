'use client'

import { useState, useEffect } from "react"
import { cn } from "@/lib/utils"
import { ChallengeDetail } from "../ChallengeDetail"
import { BaseMode } from "./BaseMode"
import { Challenge, activities, Category } from "@/lib/activities"

interface EasyModeProps {
  category: Category
  completed: number[]
  toggleDay: (day: number | null) => void
}

interface Evidence {
  [key: number]: string
}

export function EasyMode({ category, completed, toggleDay }: EasyModeProps) {
  const [selectedDay, setSelectedDay] = useState<number | null>(null)
  const [evidence, setEvidence] = useState<Evidence>({})
  const days = Array(30).fill(null).map((_, i) => i + 1)

  // Load saved evidence from localStorage on mount
  useEffect(() => {
    const savedEvidence = localStorage.getItem(`${category}EasyModeEvidence`)
    if (savedEvidence) {
      setEvidence(JSON.parse(savedEvidence))
    }
  }, [category])

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
      localStorage.setItem(`${category}EasyModeEvidence`, JSON.stringify(newEvidence))
    }
  }

  // Get activities for the current category
  const categoryActivities = activities[category].easy

  // Add this console log to debug
  console.log('Selected day activity:', selectedDay && categoryActivities[selectedDay])

  return (
    <>
      <BaseMode 
        days={days}
        completed={completed}
        toggleDay={handleDayClick}
      />

      {selectedDay && categoryActivities[selectedDay] && (
        <ChallengeDetail
          day={selectedDay}
          title={categoryActivities[selectedDay].title}
          description={categoryActivities[selectedDay].description}
          onClose={handleClose}
          onSave={handleSave}
          savedEvidence={evidence[selectedDay]}
        />
      )}
    </>
  )
} 
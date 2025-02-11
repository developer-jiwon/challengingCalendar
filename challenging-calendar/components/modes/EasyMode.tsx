'use client'

import { useState, useEffect } from "react"
import { cn } from "@/lib/utils"
import { ChallengeDetail } from "../ChallengeDetail"

interface EasyModeProps {
  completed: number[]
  toggleDay: (day: number | null) => void
}

// Define the challenge type
interface Challenge {
  title: string
  description: {
    en: string
    ko: string
  }
}

// Define challenges as a Record type with number keys
const challenges: Record<number, Challenge> = {
  1: {
    title: "Exercise",
    description: {
      en: "Take a 15-minute walk in nature",
      ko: "걷기는 노인의 청소년의 복지향상을 위한 정책을 실시할 의무를 진다. 연금·통화·금융·조세·부담금·정부기업·전매·수출입·외국인 투자·경제협력 그 밖에 대통령령 및 공적의 보상에 관하여 필요한 사항은 법률로 정한다."
    }
  },
  2: {
    title: "Meditate",
    description: {
      en: "Practice mindfulness meditation for 10 minutes",
      ko: "10분 동안 마음챙김 명상을 연습하세요."
    }
  },
  3: {
    title: "Journal",
    description: {
      en: "Write three things you're grateful for",
      ko: "감사한 일 세 가지를 적어보세요."
    }
  },
  21: {
    title: "Reflect",
    description: {
      en: "Review your progress and plan next steps",
      ko: "지금까지의 진행 상황을 검토하고 다음 단계를 계획하세요."
    }
  }
}

// Add all days in between (4-20) with similar format
for (let i = 4; i <= 20; i++) {
  challenges[i] = {
    title: `Day ${i} Challenge`,
    description: {
      en: `Complete your day ${i} challenge`,
      ko: `${i}일차 도전 과제를 완료하세요.`
    }
  }
}

interface Evidence {
  [key: number]: string
}

export function EasyMode({ completed, toggleDay }: EasyModeProps) {
  const [selectedDay, setSelectedDay] = useState<number | null>(null)
  const [evidence, setEvidence] = useState<Evidence>({})
  const days = Array(21).fill(null).map((_, i) => i + 1)

  // Load saved evidence from localStorage on mount
  useEffect(() => {
    const savedEvidence = localStorage.getItem('easyModeEvidence')
    if (savedEvidence) {
      setEvidence(JSON.parse(savedEvidence))
    }
  }, [])

  const handleDayClick = (day: number) => {
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

  return (
    <>
      <div className="w-full max-w-xl mx-auto">
        <div className="grid grid-rows-5 grid-cols-5">
          {days.map((day, index) => (
            <div
              key={index}
              className="p-2.5 flex items-center justify-center"
            >
              <button
                onClick={() => handleDayClick(day)}
                className={cn(
                  "w-11 h-11 rounded-full flex items-center justify-center text-sm font-noto",
                  "focus:outline-none focus:ring-1 focus:ring-burgundy-300",
                  completed.includes(day)
                    ? "bg-burgundy-600 text-white"
                    : "bg-grey-100 text-burgundy-700"
                )}
              >
                {day}
              </button>
            </div>
          ))}
        </div>
      </div>

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
'use client'

import { cn } from "@/lib/utils"
import { useState, useEffect } from "react"
import { CheckIcon } from "lucide-react"

interface ChallengeDetailProps {
  day: number
  title: string
  description: {
    en: string
    ko: string
  }
  onClose: () => void
  onSave: (evidence: string) => void
  savedEvidence?: string
}

export function ChallengeDetail({ 
  day, 
  title, 
  description, 
  onClose, 
  onSave,
  savedEvidence = ""
}: ChallengeDetailProps) {
  const [evidence, setEvidence] = useState(savedEvidence)
  const [showSaved, setShowSaved] = useState(false)
  const maxLength = 2000

  const handleSave = () => {
    if (!evidence.trim()) return
    onSave(evidence)
    setShowSaved(true)
    setTimeout(() => {
      setShowSaved(false)
    }, 2000)
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl w-full max-w-md overflow-hidden relative">
        {/* Header */}
        <div className="p-4 text-center border-b border-grey-100">
          <h2 className="text-xl font-noto text-burgundy-700">
            Day {day}: {title}
          </h2>
          <p className="mt-1 text-sm text-grey-600">Your challenge for today</p>
        </div>

        {/* Content */}
        <div className="p-4">
          <p className="text-center mb-2 font-noto-display">{description.en}</p>
          <p className="text-center text-grey-600 text-sm font-suit">{description.ko}</p>

          {/* Evidence Input Area */}
          <div className="mt-6 border-2 border-dashed border-grey-200 rounded-xl p-6">
            <textarea
              value={evidence}
              onChange={(e) => setEvidence(e.target.value)}
              placeholder="Write your evidence..."
              maxLength={maxLength}
              className="w-full bg-transparent outline-none text-grey-700 placeholder:text-grey-400 text-center resize-none min-h-[80px]"
            />
            <div className="text-right mt-2">
              <span className="text-xs text-grey-400">
                {evidence.length}/{maxLength}
              </span>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 bg-grey-50 flex justify-end gap-3">
          <div className="absolute left-4 bottom-4 flex items-center">
            {showSaved && (
              <div className="flex items-center gap-1.5 text-white bg-burgundy-600 py-1.5 px-3 rounded-full shadow-sm animate-fade-in-out">
                <CheckIcon className="w-4 h-4" />
                <span className="text-sm font-noto">Saved</span>
              </div>
            )}
          </div>
          <button
            onClick={handleSave}
            disabled={!evidence.trim()}
            className={cn(
              "px-6 py-2 font-noto rounded-full transition-colors",
              evidence.trim()
                ? "text-burgundy-600 hover:bg-grey-100"
                : "text-grey-400 cursor-not-allowed"
            )}
          >
            SAVE
          </button>
          <button
            onClick={onClose}
            className="px-6 py-2 bg-burgundy-600 text-white font-noto hover:bg-burgundy-700 rounded-full"
          >
            CLOSE
          </button>
        </div>
      </div>
    </div>
  )
} 
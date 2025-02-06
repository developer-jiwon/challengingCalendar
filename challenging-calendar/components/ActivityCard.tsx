'use client'

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "../../redflag/components/ui/card"
import { X } from "lucide-react"

interface ActivityCardProps {
  date: number
  keyword: string
  activity: string
  onClose: () => void
}

export function ActivityCard({ date, keyword, activity, onClose }: ActivityCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-lg p-6 max-w-md w-full mx-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold text-burgundy-700">Day {date}</h2>
        <button
          onClick={onClose}
          className="text-grey-500 hover:text-grey-700 transition-colors"
        >
          ✕
        </button>
      </div>
      <div className="space-y-4">
        <div className="bg-burgundy-50 text-burgundy-700 px-3 py-1 rounded-full inline-block font-medium">
          {keyword}
        </div>
        <p className="text-grey-700">{activity}</p>
      </div>
    </div>
  )
}


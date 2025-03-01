import easyModeData from '@/data/easy-mode-activities.js'

console.log('Loaded activities:', easyModeData)

export interface Challenge {
  title: string
  description: {
    en: string
    ko: string
  }
}

export const easyModeActivities: Record<number, Challenge> = {
  ...easyModeData,
  
  // Only generate placeholder activities for days that don't exist in the imported data
  ...Array.from({ length: 30 }, (_, i) => i + 1)
    .filter(day => !easyModeData[day] || !easyModeData[day].title)
    .reduce((acc, day) => ({
      ...acc,
      [day]: {
        title: `Day ${day}`,
        description: {
          en: `Complete your day ${day} challenge`,
          ko: `${day}일차 도전 과제를 완료하세요`
        }
      }
    }), {})
}

// Add a console log to debug
console.log('Loaded activities:', Object.keys(easyModeActivities).length, 'days')
console.log('Day 4 activity:', easyModeActivities[4])
  
  
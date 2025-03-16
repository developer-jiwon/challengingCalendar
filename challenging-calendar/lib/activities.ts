import easyModeData from '@/data/mindfulness/easy-mode-activities.js'
import introspectiveData from '@/data/introspective/easy-mode-activities.js'

console.log('Loaded mindfulness activities:', easyModeData)
console.log('Loaded introspective activities:', introspectiveData)

export interface Challenge {
  title: string
  description: {
    en: string
    ko: string
  }
}

// Define categories and difficulty levels
export type Category = 'mindfulness' | 'introspective'
export type Difficulty = 'easy' | 'medium' | 'hard'

// Add a type for the imported data
type ActivityData = Record<string, Challenge>

// Define the structure for all activities
export interface CategoryActivities {
  [category: string]: {
    [difficulty: string]: Record<number, Challenge>
  }
}

// Initialize the activities object with all categories and difficulty levels
export const activities: CategoryActivities = {
  mindfulness: {
    easy: {
      ...easyModeData as unknown as Record<number, Challenge>,
      
      // Only generate placeholder activities for days that don't exist in the imported data
      ...Array.from({ length: 30 }, (_, i) => i + 1)
        .filter(day => {
          const key = day.toString();
          return !(key in easyModeData) || !(easyModeData as ActivityData)[key]?.title;
        })
        .reduce((acc, day) => ({
          ...acc,
          [day]: {
            title: `Day ${day}`,
            description: {
              en: `Complete your day ${day} mindfulness challenge`,
              ko: `${day}일차 마음챙김 도전 과제를 완료하세요`
            }
          }
        }), {})
    },
    medium: generatePlaceholderActivities(66, 'mindfulness', 'medium'),
    hard: generatePlaceholderActivities(90, 'mindfulness', 'hard')
  },
  'introspective': {
    easy: {
      ...introspectiveData as unknown as Record<number, Challenge>,
      
      // Only generate placeholder activities for days that don't exist in the imported data
      ...Array.from({ length: 30 }, (_, i) => i + 1)
        .filter(day => {
          const key = day.toString();
          return !(key in introspectiveData) || !(introspectiveData as ActivityData)[key]?.title;
        })
        .reduce((acc, day) => ({
          ...acc,
          [day]: {
            title: `Day ${day}`,
            description: {
              en: `Complete your day ${day} introspective challenge`,
              ko: `${day}일차 자기성찰 도전 과제를 완료하세요`
            }
          }
        }), {})
    },
    medium: generatePlaceholderActivities(66, 'introspective', 'medium'),
    hard: generatePlaceholderActivities(90, 'introspective', 'hard')
  }
}

// Helper function to generate placeholder activities
function generatePlaceholderActivities(
  days: number, 
  category: string, 
  difficulty: string
): Record<number, Challenge> {
  return Array.from({ length: days }, (_, i) => i + 1)
    .reduce((acc, day) => ({
      ...acc,
      [day]: {
        title: `Day ${day}`,
        description: {
          en: `Complete your day ${day} ${category} ${difficulty} challenge`,
          ko: `${day}일차 ${getKoreanCategory(category)} ${getKoreanDifficulty(difficulty)} 도전 과제를 완료하세요`
        }
      }
    }), {})
}

// Helper functions for Korean translations
function getKoreanCategory(category: string): string {
  const translations: Record<string, string> = {
    mindfulness: '마음챙김',
    'introspective': '자기성찰'
  }
  return translations[category] || category
}

function getKoreanDifficulty(difficulty: string): string {
  const translations: Record<string, string> = {
    easy: '초급',
    medium: '중급',
    hard: '고급'
  }
  return translations[difficulty] || difficulty
}

// For backward compatibility
export const easyModeActivities = activities.mindfulness.easy

// Add console logs to debug
console.log('Loaded activities for mindfulness easy mode:', Object.keys(activities.mindfulness.easy).length, 'days')
console.log('Day 4 activity:', activities.mindfulness.easy[4])

export default activities
  
  
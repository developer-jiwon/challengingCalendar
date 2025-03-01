'use client'

import { cn } from "@/lib/utils"
import { 
  CalendarDays, 
  ChevronLeft, 
  ChevronRight,
  Settings,
  User,
  BarChart2
} from "lucide-react"
import { useState } from "react"
import { Difficulty, Category } from "@/lib/activities"

interface NavigationProps {
  difficulty: Difficulty
  category: Category
}

export function Navigation({ difficulty, category }: NavigationProps) {
  const [isExpanded, setIsExpanded] = useState(false)

  return (
    <>
      {/* Background Overlay with pointer events and transition */}
      <div 
        className={cn(
          "fixed inset-0 bg-burgundy-100/40 backdrop-blur-sm transition-all duration-300 z-40",
          isExpanded 
            ? "opacity-100 pointer-events-auto" 
            : "opacity-0 pointer-events-none"
        )}
        onClick={() => setIsExpanded(false)}
      />

      {/* Main content overlay to disable interactions */}
      <div 
        className={cn(
          "fixed inset-0 transition-all duration-300 z-30",
          isExpanded 
            ? "pointer-events-auto bg-white/10" 
            : "pointer-events-none bg-transparent"
        )}
        aria-hidden={!isExpanded}
      />

      {/* Navigation */}
      <div 
        className={cn(
          "fixed top-0 h-full bg-white border-r border-grey-100 transition-all duration-300 z-50",
          isExpanded ? "left-0" : "-left-64",
          "w-64"
        )}
      >
        {/* Toggle Button */}
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className={cn(
            "absolute w-10 h-10 bg-white border border-grey-100 rounded-full",
            "flex items-center justify-center hover:bg-grey-50 transition-all duration-300",
            "focus:outline-none focus:ring-2 focus:ring-burgundy-300",
            isExpanded 
              ? "-right-5 top-8"
              : "right-[-3.25rem] top-8"
          )}
        >
          {isExpanded ? (
            <ChevronLeft className="w-5 h-5 text-burgundy-600" />
          ) : (
            <ChevronRight className="w-5 h-5 text-burgundy-600" />
          )}
        </button>

        {/* Content */}
        <div className="p-4 h-full flex flex-col">
          {/* Logo/Title */}
          <div className={cn(
            "flex items-center gap-3 mb-8",
            isExpanded ? "px-2" : "justify-center"
          )}>
            <CalendarDays className="w-6 h-6 text-burgundy-600" />
            {isExpanded && (
              <span className="font-noto text-lg text-burgundy-700">
                Challenge
              </span>
            )}
          </div>

          {/* Navigation Items */}
          <nav className="space-y-2">
            <NavItem
              icon={BarChart2}
              label="Progress"
              isExpanded={isExpanded}
              isActive={true}
            />
            <NavItem
              icon={User}
              label="Profile"
              isExpanded={isExpanded}
            />
            <NavItem
              icon={Settings}
              label="Settings"
              isExpanded={isExpanded}
            />
          </nav>

          {/* Current Mode */}
          {isExpanded && (
            <div className="mt-auto p-3 bg-grey-50 rounded-xl">
              <p className="text-xs text-grey-500 mb-1">Current Mode</p>
              <p className="font-noto text-burgundy-700 capitalize">{difficulty} Mode</p>
              <p className="text-xs text-grey-500 mt-2 mb-1">Category</p>
              <p className="font-noto text-burgundy-700 capitalize">
                {category === 'quality-of-life' ? 'Quality of Life' : category}
              </p>
            </div>
          )}
        </div>
      </div>
    </>
  )
}

interface NavItemProps {
  icon: any
  label: string
  isExpanded: boolean
  isActive?: boolean
}

function NavItem({ icon: Icon, label, isExpanded, isActive }: NavItemProps) {
  return (
    <button
      className={cn(
        "w-full flex items-center gap-3 p-2 rounded-lg transition-colors",
        isActive 
          ? "bg-burgundy-50 text-burgundy-700" 
          : "hover:bg-grey-50 text-grey-600",
        !isExpanded && "justify-center"
      )}
    >
      <Icon className="w-5 h-5" />
      {isExpanded && (
        <span className="text-sm font-medium">{label}</span>
      )}
    </button>
  )
}


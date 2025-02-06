'use client'

import { ChevronRight, ChevronLeft, Menu } from "lucide-react"
import { Button } from "./ui/button"
import { cn } from "@/lib/utils"

const categories = ["Self-Care"]

interface NavigationProps {
  isNavExpanded: boolean
  setIsNavExpanded: (value: boolean) => void
  isMobile: boolean
}

export function Navigation({ isNavExpanded, setIsNavExpanded, isMobile }: NavigationProps) {
  return (
    <>
      {/* Navigation Toggle Button */}
      <Button
        variant="ghost"
        size="icon"
        className={cn(
          "fixed top-4 z-50 bg-burgundy-700 text-white rounded-full hover:bg-burgundy-600 hover:text-white transition-all duration-300",
          isMobile ? (isNavExpanded ? "right-4" : "left-4") : isNavExpanded ? "left-36" : "left-4"
        )}
        onClick={() => setIsNavExpanded(!isNavExpanded)}
      >
        {isMobile ? (
          isNavExpanded ? (
            <ChevronLeft className="h-6 w-6" />
          ) : (
            <Menu className="h-6 w-6" />
          )
        ) : (
          <ChevronRight className={cn("h-4 w-4 transition-transform", isNavExpanded ? "rotate-180" : "")} />
        )}
      </Button>

      {/* Navigation */}
      <nav
        className={cn(
          "fixed bg-burgundy-700 text-white z-40 transition-all duration-300",
          isMobile
            ? isNavExpanded
              ? "inset-x-0 top-0 h-auto"
              : "h-0 inset-x-0 top-0"
            : isNavExpanded
              ? "w-40 inset-y-0 left-0"
              : "w-0 inset-y-0 left-0"
        )}
      >
        <div className={cn("p-4", isMobile ? "pt-16" : "pt-4")}>
          <h2 className="text-lg font-bold mb-4">Categories</h2>
          <ul className="space-y-2">
            {categories.map((category) => (
              <li key={category}>
                <button className="w-full text-left py-1 px-2 text-sm rounded-md hover:bg-burgundy-600 transition-colors">
                  {category}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </nav>
    </>
  )
}


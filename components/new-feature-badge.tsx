"use client"

import { useState } from "react"
import { Badge } from "@/components/ui/badge"

interface NewFeatureBadgeProps {
  id: string
  tooltipText: string[]
  position?: "top-right" | "top-left" | "inline"
  tooltipDirection?: "left" | "right"
  showBadge: boolean
}

export function NewFeatureBadge({
  id,
  tooltipText,
  position = "top-right",
  tooltipDirection = "right",
  showBadge,
}: NewFeatureBadgeProps) {
  const [showTooltip, setShowTooltip] = useState(false)

  if (!showBadge) return null

  const positionClasses = {
    "top-right": "absolute -top-2 -right-2 z-20",
    "top-left": "absolute -top-2 -left-2 z-20",
    inline: "inline-flex ml-2 z-20",
  }

  return (
    <div
      className={positionClasses[position]}
      onMouseEnter={() => setShowTooltip(true)}
      onMouseLeave={() => setShowTooltip(false)}
    >
      <Badge className="cursor-help bg-[#ff6b6b] px-1.5 py-0.5 text-[10px] font-bold text-white hover:bg-[#ee5a5a]">
        {id}
      </Badge>

      {/* Tooltip - direction based on tooltipDirection prop */}
      {showTooltip && (
        <div
          className={`absolute top-full z-30 mt-1 w-72 rounded-lg border border-gray-200 bg-white p-3 shadow-lg ${
            tooltipDirection === "left" ? "right-0" : "left-0"
          }`}
        >
          <div
            className={`absolute -top-2 h-3 w-3 rotate-45 border-l border-t border-gray-200 bg-white ${
              tooltipDirection === "left" ? "right-3" : "left-3"
            }`}
          />
          <ul className="space-y-1 text-xs text-gray-700">
            {tooltipText.map((line, idx) => (
              <li key={idx} className="flex items-start gap-1.5">
                <span className="mt-1 h-1 w-1 flex-shrink-0 rounded-full bg-[#8bc34a]" />
                <span>{line}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}

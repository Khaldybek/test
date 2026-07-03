"use client"

import { useEffect, useState } from "react"
import { EVENT_LABELS } from "@/lib/event-labels"

type TimeLeft = { days: number; hours: number; minutes: number; seconds: number }

function getTimeLeft(target: string): TimeLeft {
  const diff = Math.max(0, new Date(target).getTime() - Date.now())
  return {
    days: Math.floor(diff / 86400000),
    hours: Math.floor((diff / 3600000) % 24),
    minutes: Math.floor((diff / 60000) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  }
}

const LABELS: Record<keyof TimeLeft, string> = {
  days: EVENT_LABELS.countdownDays,
  hours: EVENT_LABELS.countdownHours,
  minutes: EVENT_LABELS.countdownMinutes,
  seconds: EVENT_LABELS.countdownSeconds,
}

export function Countdown({ targetDate }: { targetDate: string }) {
  const [time, setTime] = useState<TimeLeft | null>(null)

  useEffect(() => {
    setTime(getTimeLeft(targetDate))
    const id = setInterval(() => setTime(getTimeLeft(targetDate)), 1000)
    return () => clearInterval(id)
  }, [targetDate])

  return (
    <div className="grid grid-cols-4 gap-2" role="timer" aria-label={EVENT_LABELS.countdownAria}>
      {(Object.keys(LABELS) as (keyof TimeLeft)[]).map((key) => (
        <div
          key={key}
          className="flex flex-col items-center rounded-xl border border-white/70 bg-[rgba(255,251,245,0.92)] px-2 py-4 backdrop-blur-md"
        >
          <span className="font-serif text-2xl font-semibold text-primary tabular-nums tracking-wide">
            {time ? String(time[key]).padStart(2, "0") : "--"}
          </span>
          <span className="mt-1 text-[11px] uppercase tracking-wide text-muted-foreground">
            {LABELS[key]}
          </span>
        </div>
      ))}
    </div>
  )
}

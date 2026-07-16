"use client"

import { useEffect, useState } from "react"

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

const LABELS = [
  { key: "days" as const, label: "күн" },
  { key: "hours" as const, label: "сағат" },
  { key: "minutes" as const, label: "минут" },
  { key: "seconds" as const, label: "секунд" },
]

export function Template23Countdown({ targetDate }: { targetDate: string }) {
  const [time, setTime] = useState<TimeLeft | null>(null)

  useEffect(() => {
    setTime(getTimeLeft(targetDate))
    const id = setInterval(() => setTime(getTimeLeft(targetDate)), 1000)
    return () => clearInterval(id)
  }, [targetDate])

  return (
    <div className="count-grid" aria-live="polite" role="timer" aria-label="Тойға дейін">
      {LABELS.map(({ key, label }) => (
        <div key={key}>
          <div className="count-num">{time ? String(time[key]).padStart(2, "0") : "00"}</div>
          <div className="count-lbl">{label}</div>
        </div>
      ))}
    </div>
  )
}

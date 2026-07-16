"use client"

import { useState, type FormEvent } from "react"
import confetti from "canvas-confetti"

type Attendance = "yes" | "pair" | "no"

type Props = {
  eventTitle: string
  rsvpSheetId: string
}

export function Template23Rsvp({ eventTitle, rsvpSheetId }: Props) {
  const [name, setName] = useState("")
  const [attendance, setAttendance] = useState<Attendance>("yes")
  const [wish, setWish] = useState("")
  const [showWish, setShowWish] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    if (!name.trim() || loading) return

    setLoading(true)
    setError(null)

    const attending = attendance === "no" ? "no" : "yes"
    const guests = attendance === "pair" ? 2 : attendance === "yes" ? 1 : 0

    try {
      const response = await fetch("/api/rsvp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          spreadsheetId: rsvpSheetId,
          eventTitle,
          name: name.trim(),
          attending,
          guests,
          wish: wish.trim(),
        }),
      })

      const result = (await response.json()) as { ok?: boolean; error?: string }
      if (!response.ok || !result.ok) {
        throw new Error(result.error ?? "Жіберу сәтсіз аяқталды")
      }

      setSubmitted(true)
      if (attending === "yes") {
        confetti({
          particleCount: 90,
          spread: 70,
          origin: { y: 0.7 },
          colors: ["#a67c52", "#1a120c", "#fbf6ec"],
        })
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Жіберу сәтсіз аяқталды")
    } finally {
      setLoading(false)
    }
  }

  if (submitted) {
    return (
      <div className="rsvp-wrap">
        <p className="success-msg">Рақмет! Жауабыңыз сақталды.</p>
      </div>
    )
  }

  return (
    <div className="rsvp-wrap" id="rsvp-form">
      <form className="rsvp-form" onSubmit={handleSubmit}>
        <div className="rsvp-title">Анкета</div>

        <label className="field-label" htmlFor="t23-name">
          Аты-жөніңіз
        </label>
        <input
          className="rsvp-input"
          id="t23-name"
          type="text"
          autoComplete="name"
          placeholder="Аты-жөніңіз"
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
          disabled={loading}
        />

        <div className="attend-label">Келесіз бе?</div>
        <div className="attend-list">
          {(
            [
              { value: "yes", label: "Иә, әрине" },
              { value: "pair", label: "Жұбайыммен келемін" },
              { value: "no", label: "Келе алмаймын" },
            ] as const
          ).map((opt) => (
            <label
              key={opt.value}
              className={`attend-opt${attendance === opt.value ? " is-checked" : ""}`}
            >
              <input
                type="radio"
                name="attendance"
                value={opt.value}
                checked={attendance === opt.value}
                onChange={() => {
                  setAttendance(opt.value)
                  if (opt.value !== "no") setShowWish(true)
                }}
                disabled={loading}
              />
              <span>{opt.label}</span>
            </label>
          ))}
        </div>

        {(showWish || attendance !== "no") && (
          <div className="note-wrap">
            <label className="field-label" htmlFor="t23-wish">
              Тілек қалдырыңыз
            </label>
            <textarea
              className="rsvp-note"
              id="t23-wish"
              placeholder="Жас жұбайларға тілегіңіз..."
              value={wish}
              onChange={(e) => setWish(e.target.value)}
              disabled={loading}
            />
          </div>
        )}

        {error && (
          <p className="rsvp-error" role="alert">
            {error}
          </p>
        )}

        <button className="submit-btn" type="submit" disabled={!name.trim() || loading}>
          {loading ? "Жіберілуде..." : "Жіберу"}
        </button>
      </form>
    </div>
  )
}

export function scrollToRsvpWish() {
  const form = document.getElementById("rsvp-form")
  form?.scrollIntoView({ behavior: "smooth", block: "center" })
  window.setTimeout(() => {
    document.getElementById("t23-wish")?.focus()
  }, 400)
}

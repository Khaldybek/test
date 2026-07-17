"use client"

import { useState, type FormEvent } from "react"
import confetti from "canvas-confetti"

type Attendance = "yes" | "no"
type GuestChoice = "self" | "pair" | "custom"

type Props = {
  eventTitle: string
  rsvpSheetId: string
}

export function Template23Rsvp({ eventTitle, rsvpSheetId }: Props) {
  const [name, setName] = useState("")
  const [attendance, setAttendance] = useState<Attendance | null>(null)
  const [guestChoice, setGuestChoice] = useState<GuestChoice>("self")
  const [customGuests, setCustomGuests] = useState("")
  const [wish, setWish] = useState("")
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  function resolveGuests(): number {
    if (attendance !== "yes") return 0
    if (guestChoice === "self") return 1
    if (guestChoice === "pair") return 2
    const parsed = Number.parseInt(customGuests, 10)
    return Number.isFinite(parsed) && parsed > 0 ? parsed : 0
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    if (!name.trim() || !attendance || loading) return
    if (attendance === "yes" && guestChoice === "custom" && resolveGuests() < 1) {
      setError("Келетін адам санын жазыңыз")
      return
    }

    setLoading(true)
    setError(null)

    const attending = attendance
    const guests = resolveGuests()

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

  const canSubmit =
    Boolean(name.trim()) &&
    attendance !== null &&
    (attendance === "no" || guestChoice !== "custom" || resolveGuests() >= 1)

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
              { value: "yes" as const, label: "Иә, әрине" },
              { value: "no" as const, label: "Келе алмаймын" },
            ]
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
                onChange={() => setAttendance(opt.value)}
                disabled={loading}
              />
              <span>{opt.label}</span>
            </label>
          ))}
        </div>

        {attendance === "yes" && (
          <div className="guests-wrap">
            <div className="attend-label">Келетін адам саны</div>
            <div className="attend-list">
              {(
                [
                  { value: "self" as const, label: "Өзім" },
                  { value: "pair" as const, label: "Жұбайыммен" },
                  { value: "custom" as const, label: "Өз нұсқам" },
                ]
              ).map((opt) => (
                <label
                  key={opt.value}
                  className={`attend-opt${guestChoice === opt.value ? " is-checked" : ""}`}
                >
                  <input
                    type="radio"
                    name="guestChoice"
                    value={opt.value}
                    checked={guestChoice === opt.value}
                    onChange={() => setGuestChoice(opt.value)}
                    disabled={loading}
                  />
                  <span>{opt.label}</span>
                </label>
              ))}
            </div>

            {guestChoice === "custom" && (
              <div className="note-wrap">
                <label className="field-label" htmlFor="t23-guests">
                  Адам саны
                </label>
                <input
                  className="rsvp-input"
                  id="t23-guests"
                  type="number"
                  min={1}
                  max={20}
                  inputMode="numeric"
                  placeholder="Мысалы: 3"
                  value={customGuests}
                  onChange={(e) => setCustomGuests(e.target.value)}
                  disabled={loading}
                  required
                />
              </div>
            )}
          </div>
        )}

        {attendance !== null && (
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

        <button className="submit-btn" type="submit" disabled={!canSubmit || loading}>
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

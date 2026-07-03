"use client"

import { useState, type FormEvent } from "react"
import confetti from "canvas-confetti"
import { RSVP_LABELS } from "@/lib/event-labels"
import { OrnamentDivider } from "@/components/ornament-divider"

type RsvpFormProps = {
  eventTitle: string
  rsvpSheetId: string
}

export function RsvpForm({ eventTitle, rsvpSheetId }: RsvpFormProps) {
  const [name, setName] = useState("")
  const [attending, setAttending] = useState<"yes" | "no" | null>(null)
  const [guests, setGuests] = useState(1)
  const [wish, setWish] = useState("")
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    if (!name.trim() || !attending || loading) return

    setLoading(true)
    setError(null)

    try {
      const response = await fetch("/api/rsvp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          spreadsheetId: rsvpSheetId,
          eventTitle,
          name: name.trim(),
          attending,
          guests: attending === "yes" ? guests : 0,
          wish: wish.trim(),
        }),
      })

      const result = (await response.json()) as { ok?: boolean; error?: string }
      if (!response.ok || !result.ok) {
        throw new Error(result.error ?? RSVP_LABELS.errorSubmit)
      }

      setSubmitted(true)
      if (attending === "yes") {
        confetti({
          particleCount: 90,
          spread: 70,
          origin: { y: 0.7 },
          colors: ["#b98a2f", "#7a2233", "#e8d9b8"],
        })
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : RSVP_LABELS.errorSubmit)
    } finally {
      setLoading(false)
    }
  }

  if (submitted) {
    return (
      <div className="soft-panel p-8 text-center animate-in fade-in zoom-in-95 duration-700">
        <OrnamentDivider className="mb-5" />
        <h3 className="font-serif text-2xl font-medium tracking-wide text-primary">{RSVP_LABELS.thanks}</h3>
        <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
          {attending === "yes" ? RSVP_LABELS.successYes : RSVP_LABELS.successNo}
        </p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="soft-panel flex flex-col gap-4 p-6">
      <div className="flex flex-col gap-1.5">
        <label htmlFor={`name-${eventTitle}`} className="text-sm font-medium text-foreground">
          {RSVP_LABELS.name}
        </label>
        <input
          id={`name-${eventTitle}`}
          type="text"
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder={RSVP_LABELS.namePlaceholder}
          disabled={loading}
          className="rounded-xl border border-input bg-white/60 px-3 py-2.5 text-sm tracking-wide text-foreground placeholder:text-muted-foreground backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-ring disabled:opacity-60"
        />
      </div>

      <fieldset className="flex flex-col gap-2" disabled={loading}>
        <legend className="mb-1.5 text-sm font-medium text-foreground">{RSVP_LABELS.attending}</legend>
        <div className="grid grid-cols-2 gap-2">
          <button
            type="button"
            onClick={() => setAttending("yes")}
            aria-pressed={attending === "yes"}
            className={`rounded-xl border px-3 py-2.5 text-sm font-medium tracking-wide transition-colors ${
              attending === "yes"
                ? "border-primary bg-primary text-primary-foreground"
                : "border-input bg-white/60 text-foreground backdrop-blur-sm"
            }`}
          >
            {RSVP_LABELS.yes}
          </button>
          <button
            type="button"
            onClick={() => setAttending("no")}
            aria-pressed={attending === "no"}
            className={`rounded-xl border px-3 py-2.5 text-sm font-medium tracking-wide transition-colors ${
              attending === "no"
                ? "border-primary bg-primary text-primary-foreground"
                : "border-input bg-white/60 text-foreground backdrop-blur-sm"
            }`}
          >
            {RSVP_LABELS.no}
          </button>
        </div>
      </fieldset>

      {attending === "yes" && (
        <div className="flex flex-col gap-1.5 animate-in fade-in slide-in-from-top-2 duration-300">
          <label htmlFor={`guests-${eventTitle}`} className="text-sm font-medium text-foreground">
            {RSVP_LABELS.guests}
          </label>
          <input
            id={`guests-${eventTitle}`}
            type="number"
            min={1}
            max={10}
            value={guests}
            onChange={(e) => setGuests(Number(e.target.value))}
            disabled={loading}
            className="rounded-xl border border-input bg-white/60 px-3 py-2.5 text-sm tracking-wide text-foreground backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-ring disabled:opacity-60"
          />
        </div>
      )}

      <div className="flex flex-col gap-1.5">
        <label htmlFor={`wish-${eventTitle}`} className="text-sm font-medium text-foreground">
          {RSVP_LABELS.wish}{" "}
          <span className="font-normal text-muted-foreground">{RSVP_LABELS.wishOptional}</span>
        </label>
        <textarea
          id={`wish-${eventTitle}`}
          rows={3}
          value={wish}
          onChange={(e) => setWish(e.target.value)}
          placeholder={RSVP_LABELS.wishPlaceholder}
          disabled={loading}
          className="resize-none rounded-xl border border-input bg-white/60 px-3 py-2.5 text-sm tracking-wide text-foreground placeholder:text-muted-foreground backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-ring disabled:opacity-60"
        />
      </div>

      {error && (
        <p role="alert" className="text-sm text-destructive">
          {error}
        </p>
      )}

      <button
        type="submit"
        disabled={!name.trim() || !attending || loading}
        className="mt-1 rounded-xl bg-primary px-4 py-3.5 text-sm font-medium tracking-wide text-primary-foreground shadow-[0_4px_16px_rgba(92,24,34,0.2)] transition-opacity disabled:opacity-50"
      >
        {loading ? RSVP_LABELS.submitting : RSVP_LABELS.submit}
      </button>
    </form>
  )
}

"use client"

import { useState } from "react"
import Link from "next/link"
import { CalendarDays, ChevronRight, MapPin } from "lucide-react"
import { BET_ASHAR, COUPLE, TOI_BANKET, type WeddingEvent } from "@/lib/wedding-config"
import { FadeIn } from "@/components/fade-in"
import { MusicButton } from "@/components/music-button"

function EventLinkCard({ event }: { event: WeddingEvent }) {
  return (
    <Link
      href={`/${event.slug}`}
      className="group flex items-center gap-4 rounded-xl border border-accent/40 bg-card p-5 transition-colors hover:border-accent"
    >
      <img
        src="/images/ornament-emblem.png"
        alt=""
        className="h-14 w-14 shrink-0 rounded-full object-cover"
      />
      <div className="min-w-0 flex-1">
        <h2 className="font-serif text-xl font-semibold text-primary">{event.title}</h2>
        <p className="mt-1 flex items-center gap-1.5 text-xs text-muted-foreground">
          <CalendarDays className="h-3.5 w-3.5 shrink-0" />
          {event.dateLabel}, {event.timeLabel}
        </p>
        <p className="mt-0.5 flex items-center gap-1.5 truncate text-xs text-muted-foreground">
          <MapPin className="h-3.5 w-3.5 shrink-0" />
          {event.venue || event.address}
        </p>
      </div>
      <ChevronRight className="h-5 w-5 shrink-0 text-accent transition-transform group-hover:translate-x-1" />
    </Link>
  )
}

export function InvitationHome() {
  const [opened, setOpened] = useState(false)

  if (!opened) {
    return (
      <main className="flex min-h-dvh flex-col items-center justify-center px-6 text-center">
        <img
          src="/images/ornament-emblem.png"
          alt="Казахский национальный орнамент"
          className="h-40 w-40 rounded-full object-cover shadow-lg"
          style={{ animation: "soft-float 4s ease-in-out infinite" }}
        />
        <p className="mt-8 text-xs uppercase tracking-[0.35em] text-accent">Той жайлы шақыру</p>
        <h1 className="mt-4 font-serif text-4xl font-semibold text-primary text-balance">
          {COUPLE.groom} & {COUPLE.bride}
        </h1>
        <p className="mt-3 text-sm text-muted-foreground">Приглашение на свадебные торжества</p>
        <button
          type="button"
          onClick={() => setOpened(true)}
          className="mt-10 rounded-full bg-primary px-8 py-3.5 text-sm font-semibold text-primary-foreground shadow-md transition-transform active:scale-95"
        >
          Открыть приглашение
        </button>
      </main>
    )
  }

  return (
    <main className="flex min-h-dvh flex-col px-5 pb-10 pt-10 animate-in fade-in duration-700">
      <MusicButton autoPlay />

      <FadeIn className="text-center">
        <p className="text-xs uppercase tracking-[0.35em] text-accent">Құрметті қонақтар</p>
        <h1 className="mt-4 font-serif text-5xl font-semibold leading-tight text-primary text-balance">
          {COUPLE.groom}
          <span className="mx-2 text-accent">&</span>
          {COUPLE.bride}
        </h1>
        <img
          src="/images/ornament-divider.png"
          alt=""
          className="mx-auto mt-6 h-10 w-auto max-w-full object-contain opacity-80"
        />
        <p className="mt-6 text-sm leading-relaxed text-foreground/85 text-pretty">{COUPLE.greeting}</p>
      </FadeIn>

      <FadeIn delay={150} className="mt-10">
        <h2 className="mb-4 text-center font-serif text-xl text-primary">Два события — два приглашения</h2>
        <div className="flex flex-col gap-4">
          <EventLinkCard event={BET_ASHAR} />
          <EventLinkCard event={TOI_BANKET} />
        </div>
      </FadeIn>

      <FadeIn className="mt-12">
        <footer className="text-center">
          <img
            src="/images/ornament-divider.png"
            alt=""
            className="mx-auto mb-4 h-8 w-auto object-contain opacity-70"
          />
          <p className="font-serif text-lg text-primary">
            С любовью, {COUPLE.groom} & {COUPLE.bride}
          </p>
          <p className="mt-1 text-xs text-muted-foreground">{COUPLE.footerDate}</p>
        </footer>
      </FadeIn>
    </main>
  )
}

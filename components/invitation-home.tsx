"use client"

import { useState, type ReactNode } from "react"
import Link from "next/link"
import { CalendarDays, ChevronRight, MapPin } from "lucide-react"
import { COUPLE, TOI_BANKET, type WeddingEvent } from "@/lib/wedding-config"
import { FadeIn } from "@/components/fade-in"
import { CoupleNamesHero } from "@/components/couple-names-hero"
import { OrnamentDivider } from "@/components/ornament-divider"

function SoftHomeBackground({ children }: { children: ReactNode }) {
  return (
    <div className="home-soft-bg relative min-h-dvh">
      <div aria-hidden className="home-soft-bg__glow" />
      <div className="relative z-10">{children}</div>
    </div>
  )
}

function EventLinkCard({ event }: { event: WeddingEvent }) {
  return (
    <Link
      href={`/${event.slug}`}
      className="group soft-panel flex items-center gap-4 p-5 transition-all hover:border-accent/30 hover:shadow-[0_8px_32px_rgba(92,24,34,0.1)]"
    >
      <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full border border-accent/30 bg-cream/80">
        <span className="font-serif text-lg text-primary">Т</span>
      </div>
      <div className="min-w-0 flex-1">
        <h2 className="heading-display text-xl font-semibold">{event.title}</h2>
        <p className="mt-1.5 flex items-center gap-1.5 text-xs tracking-wide text-muted-foreground">
          <CalendarDays className="h-3.5 w-3.5 shrink-0 text-accent" />
          {event.dateLabel}, {event.timeLabel}
        </p>
        <p className="mt-0.5 flex items-center gap-1.5 truncate text-xs tracking-wide text-muted-foreground">
          <MapPin className="h-3.5 w-3.5 shrink-0 text-accent" />
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
      <SoftHomeBackground>
        <main className="flex min-h-dvh flex-col items-center justify-center px-8 text-center">
          <div className="soft-panel opening-card flex w-full max-w-sm flex-col items-center px-8 py-12">
            <p className="section-label">Тойға шақырту</p>
            <CoupleNamesHero groom={COUPLE.groom} bride={COUPLE.bride} nameSize="lg" />
            <p className="mt-5 text-sm leading-relaxed tracking-wide text-muted-foreground">
              Үйлену тойына бару
            </p>
            <button type="button" onClick={() => setOpened(true)} className="btn-wedding mt-10">
              Ашу
            </button>
          </div>
        </main>
      </SoftHomeBackground>
    )
  }

  return (
    <SoftHomeBackground>
      <main className="flex min-h-dvh flex-col px-5 pb-12 pt-10 animate-in fade-in duration-700">
        <FadeIn className="text-center">
          <p className="section-label">Құрметті қонақтар</p>
          <CoupleNamesHero groom={COUPLE.groom} bride={COUPLE.bride} nameSize="lg" />
          <div className="soft-panel mx-auto mt-8 max-w-sm px-6 py-5">
            <p className="text-sm leading-[1.8] tracking-wide text-foreground/90 text-pretty">
              {COUPLE.greeting}
            </p>
          </div>
        </FadeIn>

        <FadeIn delay={150} className="mt-10">
          <div className="flex flex-col gap-4">
            <EventLinkCard event={TOI_BANKET} />
          </div>
        </FadeIn>

        <FadeIn className="mt-14">
          <footer className="text-center">
            <OrnamentDivider className="mb-5" />
            <p className="font-serif text-xl font-medium tracking-wide text-primary">
              Махаббатпен, {COUPLE.groom} & {COUPLE.bride}
            </p>
            <p className="mt-2 text-xs tracking-[0.2em] text-muted-foreground">{COUPLE.footerDate}</p>
          </footer>
        </FadeIn>
      </main>
    </SoftHomeBackground>
  )
}

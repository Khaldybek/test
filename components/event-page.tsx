import Link from "next/link"
import { ArrowLeft, CalendarDays, Clock, MapPin, Shirt } from "lucide-react"
import { COUPLE, type WeddingEvent } from "@/lib/wedding-config"
import { EVENT_LABELS } from "@/lib/event-labels"
import { FadeIn } from "@/components/fade-in"
import { Countdown } from "@/components/countdown"
import { RsvpForm } from "@/components/rsvp-form"
import { MusicButton } from "@/components/music-button"

export function EventPage({ event }: { event: WeddingEvent }) {
  return (
    <main className="flex min-h-dvh flex-col px-5 pb-10 pt-6" lang="kk">
      <MusicButton
        autoPlay={Boolean(event.musicSrc)}
        src={event.musicSrc}
        startAt={event.musicStartAt}
        onLabel={EVENT_LABELS.musicOn}
        offLabel={EVENT_LABELS.musicOff}
      />

      <nav aria-label={EVENT_LABELS.nav}>
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-primary"
        >
          <ArrowLeft className="h-4 w-4" />
          {EVENT_LABELS.backHome}
        </Link>
      </nav>

      {/* Hero */}
      <FadeIn className="mt-8 text-center">
        <img
          src="/images/ornament-emblem.png"
          alt=""
          className="mx-auto h-24 w-24 rounded-full object-cover"
        />
        <p className="mt-5 text-xs uppercase tracking-[0.3em] text-accent">
          {COUPLE.groom} & {COUPLE.bride}
        </p>
        <h1 className="mt-3 font-serif text-4xl font-semibold text-primary text-balance">{event.title}</h1>
        <p className="mt-2 text-sm text-muted-foreground text-pretty">{event.subtitle}</p>
        <img
          src="/images/ornament-divider.png"
          alt=""
          className="mx-auto mt-6 h-10 w-auto max-w-full object-contain opacity-80"
        />
      </FadeIn>

      {/* Description */}
      <FadeIn delay={100} className="mt-8">
        <div className="space-y-4 text-center text-sm leading-relaxed text-foreground/85 text-pretty">
          {event.description.split("\n\n").map((paragraph, index) => (
            <p key={index}>{paragraph}</p>
          ))}
        </div>
      </FadeIn>

      {/* Hosts */}
      {event.hosts && (
        <FadeIn delay={120} className="mt-8">
          <section aria-label={event.hosts.label} className="rounded-xl border border-accent/40 bg-card p-5 text-center">
            <p className="text-xs uppercase tracking-[0.25em] text-accent">{event.hosts.label}</p>
            <div className="mt-3 flex flex-col gap-1.5">
              {event.hosts.names.map((name) => (
                <p key={name} className="font-serif text-lg text-primary">
                  {name}
                </p>
              ))}
            </div>
          </section>
        </FadeIn>
      )}

      {/* Details card */}
      <FadeIn delay={150} className="mt-8">
        <section
          aria-label={EVENT_LABELS.eventDetails}
          className="flex flex-col gap-4 rounded-xl border border-accent/40 bg-card p-5"
        >
          <div className="flex items-center gap-3">
            <CalendarDays className="h-5 w-5 shrink-0 text-accent" />
            <div>
              <p className="text-xs uppercase tracking-wide text-muted-foreground">{EVENT_LABELS.date}</p>
              <p className="text-sm font-medium text-foreground">{event.dateLabel}</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Clock className="h-5 w-5 shrink-0 text-accent" />
            <div>
              <p className="text-xs uppercase tracking-wide text-muted-foreground">{EVENT_LABELS.time}</p>
              <p className="text-sm font-medium text-foreground">{event.timeLabel}</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <MapPin className="h-5 w-5 shrink-0 text-accent" />
            <div>
              <p className="text-xs uppercase tracking-wide text-muted-foreground">{EVENT_LABELS.venue}</p>
              {event.venue && <p className="text-sm font-medium text-foreground">{event.venue}</p>}
              <p className={`text-sm ${event.venue ? "text-muted-foreground" : "font-medium text-foreground"}`}>
                {event.address}
              </p>
            </div>
          </div>
          {event.dressCode && (
            <div className="flex items-center gap-3">
              <Shirt className="h-5 w-5 shrink-0 text-accent" />
              <div>
                <p className="text-xs uppercase tracking-wide text-muted-foreground">{EVENT_LABELS.dressCode}</p>
                <p className="text-sm font-medium text-foreground">{event.dressCode}</p>
              </div>
            </div>
          )}
          <a
            href={event.mapUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-1 rounded-lg border border-primary px-4 py-3 text-center text-sm font-semibold text-primary transition-colors hover:bg-primary hover:text-primary-foreground"
          >
            {EVENT_LABELS.buildRoute}
          </a>
        </section>
      </FadeIn>

      {/* Countdown */}
      <FadeIn delay={100} className="mt-10">
        <h2 className="mb-4 text-center font-serif text-xl text-primary">{EVENT_LABELS.countdownTitle}</h2>
        <Countdown targetDate={event.date} />
      </FadeIn>

      {/* RSVP */}
      <FadeIn delay={100} className="mt-10">
        <h2 className="mb-4 text-center font-serif text-xl text-primary">{EVENT_LABELS.rsvpTitle}</h2>
        <RsvpForm eventTitle={event.title} rsvpSheetId={event.rsvpSheetId} />
      </FadeIn>

      {/* Footer */}
      <FadeIn className="mt-12">
        <footer className="text-center">
          <img
            src="/images/ornament-divider.png"
            alt=""
            className="mx-auto mb-4 h-8 w-auto object-contain opacity-70"
          />
          <p className="font-serif text-lg text-primary">
            {EVENT_LABELS.footerLove}, {COUPLE.groom} & {COUPLE.bride}
          </p>
          <p className="mt-1 text-xs text-muted-foreground">{COUPLE.footerDate}</p>
        </footer>
      </FadeIn>
    </main>
  )
}

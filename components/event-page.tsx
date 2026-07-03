import Link from "next/link"
import { ArrowLeft, CalendarDays, Clock, MapPin, Shirt } from "lucide-react"
import { COUPLE, type WeddingEvent } from "@/lib/wedding-config"
import { EVENT_LABELS } from "@/lib/event-labels"
import { FadeIn } from "@/components/fade-in"
import { Countdown } from "@/components/countdown"
import { RsvpForm } from "@/components/rsvp-form"
import { MusicButton } from "@/components/music-button"
import { PageBackground } from "@/components/page-background"
import { OrnamentDivider } from "@/components/ornament-divider"
import { CoupleNamesHero } from "@/components/couple-names-hero"
import { WeddingCalendar } from "@/components/wedding-calendar"

export function EventPage({ event }: { event: WeddingEvent }) {
  return (
    <PageBackground src={event.backgroundImage} position={event.backgroundPosition}>
      <main className="flex min-h-dvh flex-col px-5 pb-12 pt-6" lang="kk">
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
            className="inline-flex items-center gap-1.5 rounded-full border border-white/70 bg-[rgba(255,251,245,0.9)] px-3 py-1.5 text-sm tracking-wide text-muted-foreground backdrop-blur-md transition-colors hover:text-primary"
          >
            <ArrowLeft className="h-4 w-4" />
            {EVENT_LABELS.backHome}
          </Link>
        </nav>

        <FadeIn className="mt-10 text-center">
          {event.slug === "bet-ashar" ? (
            <CoupleNamesHero groom={COUPLE.groom} bride={COUPLE.bride} withOrnament />
          ) : (
            <p className="font-serif text-[25px] font-medium tracking-[0.18em] text-[#1a1012]">
              {COUPLE.groom} & {COUPLE.bride}
            </p>
          )}
          <h1 className="heading-display mt-4 text-4xl font-semibold text-balance">{event.title}</h1>
          <p className="mt-2 text-sm tracking-wide text-muted-foreground text-pretty">{event.subtitle}</p>
          <OrnamentDivider className="mt-6" />
        </FadeIn>

        <FadeIn delay={100} className="mt-8">
          <div className="soft-panel space-y-4 px-6 py-6 text-center text-sm leading-[1.85] tracking-wide text-foreground/90 text-pretty">
            {event.description.split("\n\n").map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
          </div>
        </FadeIn>

        {event.hosts && (
          <FadeIn delay={120} className="mt-6">
            <section aria-label={event.hosts.label} className="soft-panel px-6 py-5 text-center">
              <p className="section-label">{event.hosts.label}</p>
              <div className="mt-4 flex flex-col gap-2">
                {event.hosts.names.map((name) => (
                  <p key={name} className="font-serif text-lg font-medium tracking-wide text-primary">
                    {name}
                  </p>
                ))}
              </div>
            </section>
          </FadeIn>
        )}

        <FadeIn delay={130} className="mt-6">
          <WeddingCalendar dateIso={event.date} />
        </FadeIn>

        <FadeIn delay={150} className="mt-6">
          <section aria-label={EVENT_LABELS.eventDetails} className="soft-panel flex flex-col gap-5 p-6">
            <div className="flex items-start gap-3">
              <CalendarDays className="mt-0.5 h-5 w-5 shrink-0 text-accent" />
              <div>
                <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-muted-foreground">
                  {EVENT_LABELS.date}
                </p>
                <p className="mt-1 text-sm font-medium tracking-wide text-foreground">{event.dateLabel}</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Clock className="mt-0.5 h-5 w-5 shrink-0 text-accent" />
              <div>
                <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-muted-foreground">
                  {EVENT_LABELS.time}
                </p>
                <p className="mt-1 text-sm font-medium tracking-wide text-foreground">{event.timeLabel}</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-accent" />
              <div>
                <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-muted-foreground">
                  {EVENT_LABELS.venue}
                </p>
                {event.venue && (
                  <p className="mt-1 text-sm font-medium tracking-wide text-foreground">{event.venue}</p>
                )}
                <p
                  className={`text-sm tracking-wide ${event.venue ? "text-muted-foreground" : "font-medium text-foreground"}`}
                >
                  {event.address}
                </p>
              </div>
            </div>
            {event.dressCode && (
              <div className="flex items-start gap-3">
                <Shirt className="mt-0.5 h-5 w-5 shrink-0 text-accent" />
                <div>
                  <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-muted-foreground">
                    {EVENT_LABELS.dressCode}
                  </p>
                  <p className="mt-1 text-sm font-medium tracking-wide text-foreground">{event.dressCode}</p>
                </div>
              </div>
            )}
            <a
              href={event.mapUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-wedding-outline mt-1"
            >
              {EVENT_LABELS.buildRoute}
            </a>
          </section>
        </FadeIn>

        <FadeIn delay={100} className="mt-10">
          <h2 className="mb-5 text-center font-serif text-xl font-medium tracking-wide text-primary">
            {EVENT_LABELS.countdownTitle}
          </h2>
          <Countdown targetDate={event.date} />
        </FadeIn>

        <FadeIn delay={100} className="mt-10">
          <h2 className="mb-5 text-center font-serif text-xl font-medium tracking-wide text-primary">
            {EVENT_LABELS.rsvpTitle}
          </h2>
          <RsvpForm eventTitle={event.title} rsvpSheetId={event.rsvpSheetId} />
        </FadeIn>

        <FadeIn className="mt-14">
          <footer className="text-center">
            <OrnamentDivider className="mb-5" />
            <p className="font-serif text-xl font-medium tracking-wide text-primary">
              {EVENT_LABELS.footerLove}, {COUPLE.groom} & {COUPLE.bride}
            </p>
            <p className="mt-2 text-xs tracking-[0.2em] text-muted-foreground">{COUPLE.footerDate}</p>
          </footer>
        </FadeIn>
      </main>
    </PageBackground>
  )
}

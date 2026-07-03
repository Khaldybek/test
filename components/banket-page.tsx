import Link from "next/link"
import { MapPin } from "lucide-react"
import { COUPLE, TOI_BANKET } from "@/lib/wedding-config"
import { BANKET_LABELS, EVENT_LABELS } from "@/lib/event-labels"
import { FadeIn } from "@/components/fade-in"
import { Countdown } from "@/components/countdown"
import { RsvpForm } from "@/components/rsvp-form"
import { MusicButton } from "@/components/music-button"
import { PageBackground } from "@/components/page-background"
import { OrnamentDivider } from "@/components/ornament-divider"
import { CoupleNamesHero } from "@/components/couple-names-hero"
import { WeddingCalendar } from "@/components/wedding-calendar"
import { EventProgram } from "@/components/event-program"

function formatDateDots(dateIso: string) {
  const date = new Date(dateIso)
  const day = String(date.getDate()).padStart(2, "0")
  const month = String(date.getMonth() + 1).padStart(2, "0")
  const year = date.getFullYear()
  return `${day}.${month}.${year}`
}

export function BanketPage() {
  const event = TOI_BANKET

  return (
    <PageBackground
      src={event.backgroundImage}
      position={event.backgroundPosition}
      blur={false}
      overlay="none"
    >
      <main className="flex min-h-dvh flex-col px-5 pb-12 pt-6" lang="kk">
        <MusicButton autoPlay src={event.musicSrc} />

        <nav aria-label={EVENT_LABELS.nav}>
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 rounded-full border border-white/70 bg-[rgba(255,251,245,0.9)] px-3 py-1.5 text-sm tracking-wide text-muted-foreground backdrop-blur-md transition-colors hover:text-primary"
          >
            ← {EVENT_LABELS.backHome}
          </Link>
        </nav>

        <FadeIn className="mt-10 text-center">
          <div className="bet-ashar-hero bet-ashar-hero--banket relative -mx-5 w-[calc(100%+2.5rem)]">
            <img
              src={event.heroImage ?? "/images/bg-banket-hero.png"}
              alt=""
              width={527}
              height={1024}
              className="bet-ashar-hero__photo bet-ashar-hero__photo--couple block w-full"
            />
            <div className="absolute inset-0 z-10 flex flex-col items-center justify-center px-4 py-8 text-center">
              <CoupleNamesHero groom={COUPLE.groom} bride={COUPLE.bride} withOrnament variant="overlay" />
              <p className="bet-ashar-hero__title heading-display mt-4 font-serif text-xl tracking-[0.25em]">
                {formatDateDots(event.date)}
              </p>
              <p className="bet-ashar-hero__subtitle bet-ashar-hero__subtitle--banket mt-3 font-semibold tracking-[0.12em] text-pretty">
                {event.subtitle}
              </p>
              <OrnamentDivider className="mt-6" />
            </div>
          </div>
        </FadeIn>

        <FadeIn delay={160} className="mt-8">
          <div className="soft-panel space-y-4 px-6 py-6 text-center text-sm leading-[1.85] tracking-wide text-foreground/90 text-pretty">
            {event.description.split("\n\n").map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
          </div>
        </FadeIn>

        <FadeIn delay={100} className="mt-10">
          <h2 className="mb-5 text-center font-serif text-xl font-medium tracking-wide text-primary">
            {BANKET_LABELS.countdownTitle}
          </h2>
          <Countdown targetDate={event.date} />
        </FadeIn>

        {event.program && (
          <FadeIn delay={120} className="mt-8">
            <EventProgram label={event.program.label} items={event.program.items} />
          </FadeIn>
        )}

        <FadeIn delay={130} className="mt-8">
          <WeddingCalendar dateIso={event.date} />
        </FadeIn>

        <FadeIn delay={150} className="mt-8">
          <section aria-label={BANKET_LABELS.venueTitle} className="soft-panel px-6 py-6 text-center">
            <p className="section-label">{BANKET_LABELS.venueTitle}</p>
            <div className="mt-4 flex flex-col items-center gap-2">
              {event.venue && (
                <p className="font-serif text-lg font-medium tracking-wide text-primary">{event.venue}</p>
              )}
              <p className="flex items-start justify-center gap-2 text-sm tracking-wide text-muted-foreground">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                <span>{event.address}</span>
              </p>
              <a
                href={event.mapUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-wedding-outline mt-4 w-full"
              >
                {EVENT_LABELS.buildRoute}
              </a>
            </div>
          </section>
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

        <FadeIn delay={100} className="mt-10">
          <h2 className="mb-2 text-center font-serif text-xl font-medium tracking-wide text-primary">
            {BANKET_LABELS.surveyTitle}
          </h2>
          <p className="mb-5 text-center text-xs tracking-wide text-muted-foreground text-pretty">
            {BANKET_LABELS.nameHint}
          </p>
          <RsvpForm eventTitle={event.title} rsvpSheetId={event.rsvpSheetId} />
        </FadeIn>

        <FadeIn className="mt-14">
          <footer className="text-center">
            <OrnamentDivider className="mb-5" />
            <p className="font-serif text-lg font-medium tracking-wide text-primary">
              {BANKET_LABELS.footerGuest}
            </p>
            <p className="mt-3 font-serif text-base tracking-wide text-muted-foreground">
              {EVENT_LABELS.footerLove}, {COUPLE.groom} & {COUPLE.bride}
            </p>
            <p className="mt-2 text-xs tracking-[0.2em] text-muted-foreground">{COUPLE.footerDate}</p>
          </footer>
        </FadeIn>
      </main>
    </PageBackground>
  )
}

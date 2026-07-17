"use client"

import Link from "next/link"
import { COUPLE, TOI_BANKET } from "@/lib/wedding-config"
import { MusicButton } from "@/components/music-button"
import { Template23Calendar } from "@/components/template23/calendar"
import { Template23Countdown } from "@/components/template23/countdown"
import { Template23Rsvp, scrollToRsvpWish } from "@/components/template23/rsvp"
import "@/app/toi-banket/template23.css"

const MONTHS_KK = [
  "Қаңтар",
  "Ақпан",
  "Наурыз",
  "Сәуір",
  "Мамыр",
  "Маусым",
  "Шілде",
  "Тамыз",
  "Қыркүйек",
  "Қазан",
  "Қараша",
  "Желтоқсан",
] as const

export function BanketPage() {
  const event = TOI_BANKET
  const program = event.program?.items ?? []
  const eventDate = new Date(event.date)
  const eventDay = eventDate.getDate()
  const eventMonth = MONTHS_KK[eventDate.getMonth()]
  const eventYear = eventDate.getFullYear()

  return (
    <main className="t23" lang="kk">
      <Link href="/" className="back-home">
        ← Басты бет
      </Link>

      <div className="music-btn-wrap">
        <MusicButton autoPlay src={event.musicSrc} />
      </div>

      {/* HERO */}
      <section className="img-block hero-light">
        <img src="/template23/hero-couple.png" alt="" decoding="async" />
        <div className="hero-text">
          <div className="hero-name">{COUPLE.groom}</div>
          <div className="hero-amp">&amp;</div>
          <div className="hero-name">{COUPLE.bride}</div>
        </div>
        <div className="hero-tag">WEDDING DAY</div>
      </section>

      {/* INVITATION */}
      <section className="section invite">
        <div className="invite-greeting">Құрметті қонақтар!</div>
        <div className="invite-body">{event.invitationLine ?? event.subtitle}</div>
        {event.hosts && (
          <div className="invite-hosts">
            <div className="invite-hosts-label">{event.hosts.label}:</div>
            {event.hosts.names.map((name) => (
              <div key={name} className="invite-hosts-name">
                {name}
              </div>
            ))}
          </div>
        )}
      </section>

      {/* CALENDAR */}
      <section className="img-block">
        <img src="/template23/noir-rings-2.webp" alt="" loading="lazy" decoding="async" />
        <Template23Calendar dateIso={event.date} />
        <div className="cal-footer">
          <div className="cal-footer-date">
            <span className="cal-footer-day">{eventDay}</span> {eventMonth} {eventYear}
          </div>
        </div>
      </section>

      {/* TIMING */}
      {program.length > 0 && (
        <section className="timing">
          <img
            className="timing-curve"
            src="/template23/heart-curve.webp"
            alt=""
            aria-hidden
          />
          {program.slice(0, 3).map((item, index) => (
            <div key={`${item.time}-${item.title}`} className={`timing-stop s${index + 1}`}>
              <div>
                <div className="timing-time">{item.time}</div>
                <div className="timing-label">{item.title}</div>
              </div>
            </div>
          ))}
        </section>
      )}

      {/* COUNTDOWN */}
      <section className="img-block">
        <img src="/template23/countdown-couple.png" alt="" loading="lazy" decoding="async" />
        <div className="count-overlay">
          <div className="count-title">ТОЙҒА ДЕЙІН:</div>
          <Template23Countdown targetDate={event.date} />
        </div>
      </section>

      {/* LOCATION */}
      <section className="section loc">
        <div className="loc-title">Мекен-жай</div>
        <div className="loc-addr">
          {event.venue && <div className="accent-italic">«{event.venue}»</div>}
        </div>
        <div className="loc-photo">
          <img
            src="/template23/noir-rings-palace.webp"
            alt={event.venue ?? "Той орны"}
            loading="lazy"
            decoding="async"
          />
        </div>
        <div>
          <a className="map-btn" href={event.mapUrl} target="_blank" rel="noopener noreferrer">
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden
            >
              <path d="M21 10c0 6-9 12-9 12s-9-6-9-12a9 9 0 0 1 18 0Z" />
              <circle cx="12" cy="10" r="3" />
            </svg>
            <span>Картадан ашу</span>
          </a>
        </div>
      </section>

      {/* RSVP */}
      <section className="section rsvp-section">
        <Template23Rsvp eventTitle={event.title} rsvpSheetId={event.rsvpSheetId} />
      </section>

      {/* WISHES */}
      <section className="section wishes">
        <div className="wishes-title">Тілектер</div>
        <div className="wishes-text">Жас жұбайларға тілек қалдырыңыз.</div>
        <button className="wishes-btn" type="button" onClick={scrollToRsvpWish}>
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.7"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden
          >
            <rect x="3" y="5" width="18" height="14" rx="2" />
            <polyline points="3 7 12 13 21 7" />
          </svg>
          <span>Тілек қалдыру</span>
        </button>
      </section>
    </main>
  )
}

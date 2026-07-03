const WEEKDAYS_KK = ["Дс", "Сс", "Ср", "Бс", "Жм", "Сн", "Жс"] as const

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

function getMondayBasedOffset(date: Date) {
  const day = date.getDay()
  return day === 0 ? 6 : day - 1
}

function HeartIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" className={className} aria-hidden>
      <path
        fill="currentColor"
        d="M16 27s-9.5-6.2-9.5-12.4C6.5 10.8 9.4 8 12.6 8c1.8 0 3.5.9 4.4 2.3C17.9 8.9 19.6 8 21.4 8 24.6 8 27.5 10.8 27.5 14.6 27.5 20.8 16 27 16 27z"
      />
    </svg>
  )
}

function FloralAccent() {
  return (
    <svg
      viewBox="0 0 120 40"
      className="mx-auto h-10 w-28 text-[#c4b89a]/60"
      aria-hidden
      fill="currentColor"
    >
      <ellipse cx="60" cy="22" rx="6" ry="8" opacity="0.9" />
      <ellipse cx="48" cy="18" rx="5" ry="7" opacity="0.7" />
      <ellipse cx="72" cy="18" rx="5" ry="7" opacity="0.7" />
      <ellipse cx="38" cy="22" rx="4" ry="6" opacity="0.5" />
      <ellipse cx="82" cy="22" rx="4" ry="6" opacity="0.5" />
      <path
        d="M30 28c8-6 16-8 30-8s22 2 30 8"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.2"
        opacity="0.4"
      />
    </svg>
  )
}

export function WeddingCalendar({ dateIso }: { dateIso: string }) {
  const eventDate = new Date(dateIso)
  const year = eventDate.getFullYear()
  const month = eventDate.getMonth()
  const highlightDay = eventDate.getDate()

  const daysInMonth = new Date(year, month + 1, 0).getDate()
  const startOffset = getMondayBasedOffset(new Date(year, month, 1))

  const cells: (number | null)[] = []
  for (let i = 0; i < startOffset; i++) cells.push(null)
  for (let day = 1; day <= daysInMonth; day++) cells.push(day)

  return (
    <div
      className="soft-panel wedding-calendar relative overflow-hidden px-5 pb-5 pt-3"
      aria-label={`${MONTHS_KK[month]} ${highlightDay}, ${year}`}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage:
            "radial-gradient(circle at 20% 30%, #8a9a7a 0%, transparent 50%), radial-gradient(circle at 80% 70%, #b5a88a 0%, transparent 45%)",
        }}
      />

      <FloralAccent />

      <p className="relative mt-1 text-center font-serif text-3xl font-medium italic tracking-wide text-foreground/85">
        {MONTHS_KK[month]}
      </p>

      <div className="relative mt-4 grid grid-cols-7 gap-y-1">
        {WEEKDAYS_KK.map((label) => (
          <div
            key={label}
            className="pb-1 text-center text-[10px] font-medium uppercase tracking-wider text-muted-foreground"
          >
            {label}
          </div>
        ))}

        {cells.map((day, index) => {
          if (day === null) {
            return <div key={`empty-${index}`} className="h-9" />
          }

          const isHighlight = day === highlightDay

          return (
            <div key={day} className="flex h-9 items-center justify-center">
              {isHighlight ? (
                <span className="relative flex h-8 w-8 items-center justify-center">
                  <HeartIcon className="absolute inset-0 h-full w-full text-[#9a7b4f]" />
                  <span className="relative font-serif text-sm font-semibold italic text-foreground">
                    {day}
                  </span>
                </span>
              ) : (
                <span className="font-serif text-sm italic text-foreground/75">{day}</span>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}

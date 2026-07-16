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

export function Template23Calendar({ dateIso }: { dateIso: string }) {
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
    <div className="cal-overlay" aria-label={`${MONTHS_KK[month]} ${highlightDay}, ${year}`}>
      <div className="cal-month">{MONTHS_KK[month]}</div>
      <div className="cal">
        {WEEKDAYS_KK.map((label) => (
          <div key={label} className="cal-wd">
            {label}
          </div>
        ))}
        {cells.map((day, index) => {
          if (day === null) {
            return <div key={`empty-${index}`} className="cal-day" />
          }
          if (day === highlightDay) {
            return (
              <div key={day} className="cal-day is-event">
                <span className="cal-event-wrap">
                  <svg viewBox="0 0 36 32" width="36" height="32" aria-hidden>
                    <path d="M18 30 C 4 22, 2 12, 8 7 C 13 3, 18 8, 18 11 C 18 8, 23 3, 28 7 C 34 12, 32 22, 18 30 Z" />
                  </svg>
                  <span>{day}</span>
                </span>
              </div>
            )
          }
          return (
            <div key={day} className="cal-day">
              {day}
            </div>
          )
        })}
      </div>
    </div>
  )
}

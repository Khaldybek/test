import { BET_ASHAR, TOI_BANKET } from "@/lib/wedding-config"
import { appendRsvpRow, formatSheetTimestamp } from "@/lib/google-sheets"

const ALLOWED_SHEET_IDS = new Set([BET_ASHAR.rsvpSheetId, TOI_BANKET.rsvpSheetId])

type RsvpPayload = {
  spreadsheetId: string
  eventTitle: string
  name: string
  attending: "yes" | "no"
  guests: number
  wish: string
}

function isValidPayload(body: unknown): body is RsvpPayload {
  if (!body || typeof body !== "object") return false
  const data = body as Record<string, unknown>
  return (
    typeof data.spreadsheetId === "string" &&
    ALLOWED_SHEET_IDS.has(data.spreadsheetId) &&
    typeof data.eventTitle === "string" &&
    typeof data.name === "string" &&
    data.name.trim().length > 0 &&
    (data.attending === "yes" || data.attending === "no") &&
    typeof data.guests === "number" &&
    typeof data.wish === "string"
  )
}

export async function POST(request: Request) {
  if (!process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL || !process.env.GOOGLE_PRIVATE_KEY) {
    return Response.json(
      { ok: false, error: "RSVP бапталмаған: Google credentials жоқ" },
      { status: 503 },
    )
  }

  let body: unknown
  try {
    body = await request.json()
  } catch {
    return Response.json({ ok: false, error: "Қате сұрау" }, { status: 400 })
  }

  if (!isValidPayload(body)) {
    return Response.json({ ok: false, error: "Форма деректері дұрыс емес" }, { status: 400 })
  }

  const guests = body.attending === "yes" ? Math.min(10, Math.max(1, body.guests)) : 0

  try {
    await appendRsvpRow(body.spreadsheetId, [
      formatSheetTimestamp(),
      body.eventTitle,
      body.name.trim(),
      body.attending === "yes" ? "Келемін" : "Кела алмаймын",
      guests,
      body.wish.trim(),
    ])

    return Response.json({ ok: true })
  } catch (error) {
    console.error("[rsvp]", error)
    return Response.json(
      { ok: false, error: "Google кестесіне жазу сәтсіз аяқталды" },
      { status: 502 },
    )
  }
}

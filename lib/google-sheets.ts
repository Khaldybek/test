import { google } from "googleapis"

const HEADERS = ["Күні", "Шара", "Аты-жөні", "Қатысу", "Қонақтар", "Тілек"]

export function formatSheetTimestamp(date = new Date()): string {
  const formatter = new Intl.DateTimeFormat("ru-RU", {
    timeZone: "Asia/Almaty",
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  })

  const parts = formatter.formatToParts(date)
  const get = (type: Intl.DateTimeFormatPartTypes) =>
    parts.find((part) => part.type === type)?.value ?? ""

  return `${get("day")}.${get("month")}.${get("year")} ${get("hour")}:${get("minute")}`
}

function getSheetsClient() {
  const email = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL
  const key = process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, "\n")

  if (!email || !key) {
    return null
  }

  const auth = new google.auth.JWT({
    email,
    key,
    scopes: ["https://www.googleapis.com/auth/spreadsheets"],
  })

  return google.sheets({ version: "v4", auth })
}

export async function appendRsvpRow(
  spreadsheetId: string,
  row: [string, string, string, string, number, string],
) {
  const sheets = getSheetsClient()
  if (!sheets) {
    throw new Error("Google credentials not configured")
  }

  const headerCheck = await sheets.spreadsheets.values.get({
    spreadsheetId,
    range: "A1:F1",
  })

  if (!headerCheck.data.values?.length) {
    await sheets.spreadsheets.values.update({
      spreadsheetId,
      range: "A1:F1",
      valueInputOption: "USER_ENTERED",
      requestBody: { values: [HEADERS] },
    })
  }

  await sheets.spreadsheets.values.append({
    spreadsheetId,
    range: "A:F",
    valueInputOption: "RAW",
    insertDataOption: "INSERT_ROWS",
    requestBody: { values: [row] },
  })
}

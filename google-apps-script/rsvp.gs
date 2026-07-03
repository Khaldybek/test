/**
 * УСТАРЕВШИЙ ВАРИАНТ — не используется.
 * Проект перешёл на Google Service Account (см. .env.example).
 * Apps Script вызывает экран «Google hasn't verified this app» при авторизации.
 */

var ALLOWED_SHEET_IDS = [
  "1vzU1L_LqxuNDiRtktQG0m9Sc-FDF_YFykPHLwhjpMTY",
  "1JGRzvVwfldOpTy5z9yhus1tUN8KhTlO4Zwh-Cvz6QJQ",
];

var HEADERS = ["Дата", "Событие", "Имя", "Присутствие", "Гостей", "Пожелание"];

function doPost(e) {
  try {
    var data = JSON.parse(e.postData.contents);

    if (ALLOWED_SHEET_IDS.indexOf(data.spreadsheetId) === -1) {
      return jsonResponse({ ok: false, error: "Недопустимая таблица" });
    }

    var sheet = SpreadsheetApp.openById(data.spreadsheetId).getActiveSheet();

    if (sheet.getLastRow() === 0) {
      sheet.appendRow(HEADERS);
    }

    sheet.appendRow([
      new Date(),
      data.eventTitle || "",
      data.name || "",
      data.attending === "yes" ? "Приду" : "Не смогу",
      data.attending === "yes" ? Number(data.guests) || 1 : 0,
      data.wish || "",
    ]);

    return jsonResponse({ ok: true });
  } catch (err) {
    return jsonResponse({ ok: false, error: String(err.message || err) });
  }
}

function jsonResponse(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(
    ContentService.MimeType.JSON,
  );
}

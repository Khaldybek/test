// ============================================================
// РЕДАКТИРУЕМЫЕ ДАННЫЕ ПРИГЛАШЕНИЯ
// Измените значения ниже под ваше событие
// ============================================================

export const COUPLE = {
  groom: "Қожанепес",
  bride: "Ақниет",
  greeting:
    "Құрметті қонақтар! С огромной радостью приглашаем вас разделить с нами самые важные и счастливые события нашей жизни.",
  footerDate: "2026",
}

export type WeddingEvent = {
  slug: string
  title: string
  subtitle: string
  description: string
  backgroundImage: string
  backgroundPosition?: string
  heroImage?: string
  date: string // формат: ГГГГ-ММ-ДДTЧЧ:ММ:СС (для таймера)
  dateLabel: string
  timeLabel: string
  venue?: string
  address: string
  mapUrl: string
  rsvpSheetId: string
  musicSrc?: string
  musicStartAt?: number
  dressCode?: string
  hosts?: { label: string; names: string[] }
  guestAddress?: string
  invitationLine?: string
  program?: { label: string; items: { time: string; title: string }[] }
}

export const BET_ASHAR: WeddingEvent = {
  slug: "bet-ashar",
  title: "Бет ашар",
  subtitle: "Ұлттық дәстүр — беташар салтанаты",
  backgroundImage: "/images/bg-bet-ashar.png",
  backgroundPosition: "22% center",
  description:
    "Құрметті ағайын-туыс, құда-жекжат, қадірлі достар! Сіздерді шаңырағымыздың шаттығын еселейтін, ұлттық дәстүріміздің көркі саналатын беташар салтанатымыздың қадірлі қонағы болуға шын жүректен шақырамыз. Қуанышымызға ортақ болып, ақ баталарыңызды арнап, осы ерекше күніміздің куәсі болыңыздар. Сіздерді зор ықыласпен күтеміз!",
  date: "2026-07-08T11:00:00",
  dateLabel: "8 шілде 2026 ж.",
  timeLabel: "11:00",
  address: "Мұнайлы ауданы, 19-й квартал, 2/6",
  mapUrl: "https://2gis.kz/almaty",
  rsvpSheetId: "1vzU1L_LqxuNDiRtktQG0m9Sc-FDF_YFykPHLwhjpMTY",
  musicSrc: "/music/betashar.m4a",
  musicStartAt: 16,
  hosts: {
    label: "Той иелері",
    names: ["(Сейіт) — Айсұлу", "Берекет — Света"],
  },
}

export const TOI_BANKET: WeddingEvent = {
  slug: "toi-banket",
  title: "Той банкет",
  subtitle: "Үйлену тойы",
  invitationLine:
    "Сіздерді ұлымыз бен келінімізге арналған салтанатты ақ дастарханымыздың қадірлі қонағы болуға шақырамыз!",
  backgroundImage: "/images/bg-banket-page.png",
  backgroundPosition: "center center",
  heroImage: "/images/bg-banket-hero.png",
  description:
    "Құрметті ағайын-туыс, құда-жекжат, қадірлі достар!\n\nЖаратқанның қалауымен жүректеріміз табысып, екі әулеттің ақ тілегі мен ақ батасының арқасында жаңа өмірдің жарқын белесін бірге аттағалы отырмыз.\n\nОсы қуанышымызға ортақ болып, өміріміздің ең қымбат сәттерінің бірі – үйлену тойымыздың қадірлі қонағы болуға Сіздерді шын жүректен шақырамыз.\n\nАқ тілектеріңіз бен ақ баталарыңыз біздің жаңа шаңырағымызға береке мен бақ, татулық пен ырыс әкеледі деп сенеміз.\n\nҚуанышымыздың сәнін келтіріп, мерекеміздің куәсі болыңыздар!\n\nІзгі ниетпен, Сіздерді асыға күтеміз.",
  date: "2026-07-20T18:00:00",
  dateLabel: "20 шілде 2026 ж.",
  timeLabel: "18:00",
  venue: "Saltanat Palace",
  address: "Промышленная зона 6, 7/9",
  mapUrl: "https://2gis.kz/almaty",
  rsvpSheetId: "1JGRzvVwfldOpTy5z9yhus1tUN8KhTlO4Zwh-Cvz6QJQ",
  musicSrc: "/music/bet.m4a",
  hosts: {
    label: "Той иелері",
    names: ["(Орынбасар) - (Жамал)", "(Ырзабай) - Ажар"],
  },
  program: {
    label: "Той бағдарламасы",
    items: [
      { time: "17:00", title: "Қонақтардың жиналуы" },
      { time: "18:00", title: "Тойдың басталуы" },
      { time: "23:00", title: "Салтанатты кештің аяқталуы" },
    ],
  },
}

export const MUSIC_SRC = "/music/betashar.m4a"

export const HOME_BACKGROUND = "/images/bg-home.png"

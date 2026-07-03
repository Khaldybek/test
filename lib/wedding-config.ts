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
  date: "2026-07-08T12:00:00",
  dateLabel: "8 шілде 2026 ж.",
  timeLabel: "12:00",
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
  backgroundImage: "/images/bg-banket-page.png",
  backgroundPosition: "center center",
  heroImage: "/images/bg-banket-hero.png",
  description:
    "Құрметті ағайын-туыс, құда-жекжат, қадірлі достар!\n\nЖаратқанның қалауымен жүректеріміз табысып, екі әулеттің ақ тілегі мен ақ батасының арқасында жаңа өмірдің жарқын белесін бірге аттағалы отырмыз.\n\nОсы қуанышымызға ортақ болып, өміріміздің ең қымбат сәттерінің бірі – үйлену тойымыздың қадірлі қонағы болуға Сіздерді шын жүректен шақырамыз.\n\nАқ тілектеріңіз бен ақ баталарыңыз біздің жаңа шаңырағымызға береке мен бақ, татулық пен ырыс әкеледі деп сенеміз.\n\nҚуанышымыздың сәнін келтіріп, мерекеміздің куәсі болыңыздар!\n\nІзгі ниетпен, Сіздерді асыға күтеміз.",
  date: "2026-07-10T18:00:00",
  dateLabel: "10 шілде 2026 ж.",
  timeLabel: "18:00",
  venue: "Әмре hall",
  address: "Промышленная зона 6, 7/9",
  mapUrl: "https://2gis.kz/almaty",
  rsvpSheetId: "1JGRzvVwfldOpTy5z9yhus1tUN8KhTlO4Zwh-Cvz6QJQ",
  musicSrc: "/music/bet.m4a",
  hosts: {
    label: "Той иелері",
    names: ["(Сейіт) — Айсұлу", "Берекет — Света"],
  },
  guestAddress:
    "ағайын-туыс, бауырлар, құда-жекжат, нағашы-жиен, бөлелер, дос-жаран, көршілер мен әріптестер!",
  invitationLine:
    "ұлымыз Қожанепес пен келініміз Ақниеттің үйлену тойына арналған ақ дастарханымыздың қадірлі қонағы болуға шақырамыз!",
  program: {
    label: "Той бағдарламасы",
    items: [{ time: "18:00", title: "Үлкен той" }],
  },
}

export const MUSIC_SRC = "/music/song.mp3"

export const HOME_BACKGROUND = "/images/bg-home.png"

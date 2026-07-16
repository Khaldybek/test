import type { Metadata } from "next"
import { EventPage } from "@/components/event-page"
import { BET_ASHAR } from "@/lib/wedding-config"

export const metadata: Metadata = {
  title: "Бет ашар — Ахат & Жансая",
  description: "Беташар салтанатына шақыру. 8 шілде 2026 ж., мекенжай және қатысуды растау.",
}

export default function BetAsharPage() {
  return <EventPage event={BET_ASHAR} />
}

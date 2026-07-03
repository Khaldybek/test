import type { Metadata } from "next"
import { EventPage } from "@/components/event-page"
import { TOI_BANKET } from "@/lib/wedding-config"

export const metadata: Metadata = {
  title: "Той банкет — Қожанепес & Ақниет",
  description: "Үйлену тойына шақыру. 10 шілде 2026 ж., мейрамхана мекенжайы және қатысуды растау.",
}

export default function ToiBanketPage() {
  return <EventPage event={TOI_BANKET} />
}

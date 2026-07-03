import type { Metadata } from "next"
import { BanketPage } from "@/components/banket-page"

export const metadata: Metadata = {
  title: "Той банкет — Қожанепес & Ақниет",
  description: "Үйлену тойына шақыру. 10 шілде 2026 ж., мейрамхана мекенжайы және қатысуды растау.",
}

export default function ToiBanketPage() {
  return <BanketPage />
}

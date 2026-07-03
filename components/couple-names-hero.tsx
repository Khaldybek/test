type CoupleNamesHeroProps = {
  groom: string
  bride: string
  paperStrip?: boolean
  withOrnament?: boolean
  nameSize?: "md" | "lg"
}

export function CoupleNamesHero({
  groom,
  bride,
  paperStrip = false,
  withOrnament = false,
  nameSize = "md",
}: CoupleNamesHeroProps) {
  const nameClass = nameSize === "lg" ? "text-4xl sm:text-5xl" : "text-[2.5rem]"
  const showPaperStrip = paperStrip && !withOrnament

  return (
    <div className={`mx-auto max-w-sm text-center ${showPaperStrip ? "couple-names-hero" : ""}`}>
      <div className="relative px-6 py-7">
        {withOrnament && (
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 z-0 flex items-center justify-center"
          >
            <img src="/images/ornament-bet-ashar.png" alt="" className="couple-names-ornament" />
          </div>
        )}

        <div className={`relative z-10 ${withOrnament ? "couple-names-text" : ""}`}>
          <p
            className={`font-names font-medium italic leading-[1.12] tracking-wide text-[#2a1218] ${nameClass}`}
          >
            {groom}
          </p>
          <p className="font-names my-2 text-3xl font-normal not-italic text-accent">&</p>
          <p
            className={`font-names font-medium italic leading-[1.12] tracking-wide text-[#2a1218] ${nameClass}`}
          >
            {bride}
          </p>
        </div>
      </div>
    </div>
  )
}

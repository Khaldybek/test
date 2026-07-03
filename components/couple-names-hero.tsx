type CoupleNamesHeroProps = {
  groom: string
  bride: string
  paperStrip?: boolean
  withOrnament?: boolean
  nameSize?: "md" | "lg"
  variant?: "default" | "overlay"
}

export function CoupleNamesHero({
  groom,
  bride,
  paperStrip = false,
  withOrnament = false,
  nameSize = "md",
  variant = "default",
}: CoupleNamesHeroProps) {
  const nameClass = nameSize === "lg" ? "text-4xl sm:text-5xl" : "text-[2.5rem]"
  const showPaperStrip = paperStrip && !withOrnament
  const isOverlay = variant === "overlay"

  return (
    <div className={`mx-auto max-w-sm text-center ${showPaperStrip ? "couple-names-hero" : ""}`}>
      <div className="relative px-6 py-7">
        {withOrnament && (
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 z-0 flex items-center justify-center"
          >
            <img
              src="/images/ornament-bet-ashar.png"
              alt=""
              className={`couple-names-ornament ${isOverlay ? "couple-names-ornament--bright" : ""}`}
            />
          </div>
        )}

        <div className="relative z-10">
          <p
          >
            {groom}
          </p>
          <p className="font-names my-2 text-3xl font-normal not-italic text-accent">&</p>
          <p
            className={`font-names my-2 text-3xl font-medium not-italic ${
              isOverlay ? "bet-ashar-hero__amp" : "text-black"
            }`}
          >
            &
          </p>
          <p
            className={`font-names font-semibold italic leading-[1.12] tracking-wide ${nameClass} ${
              isOverlay ? "bet-ashar-hero__name" : "text-black"
            }`}
          >
            {bride}
          </p>
        </div>
      </div>
    </div>
  )
}

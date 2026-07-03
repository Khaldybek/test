import Image from "next/image"
import type { CSSProperties, ReactNode } from "react"

type PageBackgroundProps = {
  src: string
  position?: string
  children: ReactNode
  blur?: boolean
  overlay?: "default" | "none"
}

export function PageBackground({
  src,
  position = "center center",
  children,
  blur = true,
  overlay = "default",
}: PageBackgroundProps) {
  return (
    <div className="relative min-h-dvh">
      <div aria-hidden className="page-bg">
        <Image
          src={src}
          alt=""
          fill
          priority
          quality={100}
          sizes="430px"
          className={blur ? "page-bg__image" : "page-bg__image page-bg__image--sharp"}
          style={{ "--bg-position": position } as CSSProperties}
        />
        {overlay === "default" && <div className="page-bg__overlay" />}
      </div>
      <div className="relative z-10">{children}</div>
    </div>
  )
}

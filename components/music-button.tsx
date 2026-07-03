"use client"

import { useCallback, useEffect, useRef, useState } from "react"
import { Volume2, VolumeX } from "lucide-react"
import { MUSIC_SRC } from "@/lib/wedding-config"

export function MusicButton({
  autoPlay = false,
  src = MUSIC_SRC,
  startAt = 0,
  onLabel = "Включить музыку",
  offLabel = "Выключить музыку",
}: {
  autoPlay?: boolean
  src?: string
  startAt?: number
  onLabel?: string
  offLabel?: string
}) {
  const audioRef = useRef<HTMLAudioElement>(null)
  const [playing, setPlaying] = useState(false)
  const userPausedRef = useRef(false)
  const playingRef = useRef(false)
  const startAtRef = useRef(startAt)

  useEffect(() => {
    startAtRef.current = startAt
  }, [startAt])

  useEffect(() => {
    playingRef.current = playing
  }, [playing])

  const seekToStart = useCallback((audio: HTMLAudioElement) => {
    if (startAtRef.current > 0 && audio.currentTime < startAtRef.current) {
      audio.currentTime = startAtRef.current
    }
  }, [])

  const tryPlay = useCallback(
    async (audio: HTMLAudioElement) => {
      if (userPausedRef.current) {
        throw new Error("paused by user")
      }
      seekToStart(audio)
      await audio.play()
    },
    [seekToStart],
  )

  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return

    function handleTimeUpdate() {
      seekToStart(audio)
    }

    audio.addEventListener("timeupdate", handleTimeUpdate)
    return () => audio.removeEventListener("timeupdate", handleTimeUpdate)
  }, [seekToStart])

  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return
    audio.load()
  }, [src])

  useEffect(() => {
    if (!autoPlay) return

    const audio = audioRef.current
    if (!audio) return

    userPausedRef.current = false
    let removeGestures: (() => void) | undefined

    function bindGestureFallback() {
      if (removeGestures) return

      const onGesture = () => {
        if (userPausedRef.current || playingRef.current) return
        tryPlay(audio)
          .then(() => {
            setPlaying(true)
            removeGestures?.()
          })
          .catch(() => {})
      }

      document.addEventListener("pointerdown", onGesture, { passive: true })
      document.addEventListener("touchstart", onGesture, { passive: true })
      removeGestures = () => {
        document.removeEventListener("pointerdown", onGesture)
        document.removeEventListener("touchstart", onGesture)
      }
    }

    async function attemptAutoPlay() {
      try {
        await tryPlay(audio)
        setPlaying(true)
        removeGestures?.()
      } catch {
        setPlaying(false)
        bindGestureFallback()
      }
    }

    const onCanPlay = () => {
      void attemptAutoPlay()
    }

    audio.addEventListener("canplay", onCanPlay)
    bindGestureFallback()
    void attemptAutoPlay()

    return () => {
      audio.removeEventListener("canplay", onCanPlay)
      removeGestures?.()
    }
  }, [autoPlay, src, startAt, tryPlay])

  function toggle() {
    const audio = audioRef.current
    if (!audio) return

    if (playing) {
      userPausedRef.current = true
      audio.pause()
      setPlaying(false)
      return
    }

    userPausedRef.current = false
    tryPlay(audio)
      .then(() => setPlaying(true))
      .catch(() => setPlaying(false))
  }

  return (
    <>
      <audio ref={audioRef} src={src} loop preload="auto">
        <track kind="captions" />
      </audio>
      <button
        type="button"
        onClick={toggle}
        aria-label={playing ? offLabel : onLabel}
        className="fixed bottom-5 right-5 z-50 flex h-11 w-11 items-center justify-center rounded-full border border-white/60 bg-card/90 text-primary shadow-lg backdrop-blur-md transition-transform active:scale-95"
      >
        {playing ? <Volume2 className="h-5 w-5" /> : <VolumeX className="h-5 w-5" />}
      </button>
    </>
  )
}

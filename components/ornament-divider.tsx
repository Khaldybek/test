export function OrnamentDivider({ className = "" }: { className?: string }) {
  return (
    <div className={`flex items-center justify-center gap-3 ${className}`} aria-hidden>
      <span className="h-px w-12 bg-gradient-to-r from-transparent to-gold/70 sm:w-16" />
      <svg viewBox="0 0 24 24" className="h-4 w-4 shrink-0 text-gold" fill="currentColor">
        <path d="M12 2l1.2 3.6L17 7l-3.6 1.2L12 12l-1.2-3.8L7 7l3.8-1.4L12 2zm0 10l.8 2.4L15 15l-2.4.8L12 18l-.8-2.2L9 15l2.2-.6L12 12z" />
      </svg>
      <span className="h-px w-12 bg-gradient-to-l from-transparent to-gold/70 sm:w-16" />
    </div>
  )
}

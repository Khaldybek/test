type ProgramItem = { time: string; title: string }

export function EventProgram({ label, items }: { label: string; items: ProgramItem[] }) {
  return (
    <section aria-label={label} className="soft-panel px-6 py-7">
      <h2 className="text-center font-serif text-xl font-medium tracking-wide text-primary">{label}</h2>

      <div className="mx-auto mt-6 w-full max-w-xs">
        {items.map((item, index) => (
          <div key={`${item.time}-${item.title}`}>
            <div className="grid grid-cols-[4.5rem_1rem_1fr] items-center gap-x-3">
              <p className="text-right font-serif text-lg font-medium tabular-nums leading-none text-accent">
                {item.time}
              </p>
              <span
                className="mx-auto block h-2.5 w-2.5 shrink-0 rounded-full border-2 border-accent bg-[#fffbf5]"
                aria-hidden
              />
              <p className="text-left font-serif text-base leading-snug text-foreground">{item.title}</p>
            </div>
            {index < items.length - 1 && (
              <div className="ml-[4.875rem] h-6 w-px bg-accent/30" aria-hidden />
            )}
          </div>
        ))}
      </div>
    </section>
  )
}

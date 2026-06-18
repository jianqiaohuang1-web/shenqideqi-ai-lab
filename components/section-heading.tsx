export function SectionHeading({
  eyebrow,
  title,
  description,
}: {
  eyebrow?: string
  title: string
  description?: string
}) {
  return (
    <div className="max-w-2xl">
      {eyebrow ? (
        <span className="font-mono text-xs uppercase tracking-widest text-primary">
          {eyebrow}
        </span>
      ) : null}
      <h2 className={eyebrow ? "mt-3 text-balance text-2xl font-semibold tracking-tight sm:text-3xl" : "text-balance text-2xl font-semibold tracking-tight sm:text-3xl"}>
        {title}
      </h2>
      {description ? (
        <p className="mt-3 text-pretty text-sm leading-relaxed text-muted-foreground sm:text-base">
          {description}
        </p>
      ) : null}
    </div>
  )
}

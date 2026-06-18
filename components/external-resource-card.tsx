import { ExternalLink } from "lucide-react"

export function ExternalResourceCard({
  href,
  label,
  meta,
  className = "",
  compact = false,
}: {
  href: string
  label: string
  meta: string
  className?: string
  compact?: boolean
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`group flex text-left transition hover:border-white/65 hover:bg-white/[0.16] ${
        compact
          ? "items-center gap-2 rounded-xl border border-cyan-200/40 bg-cyan-300/[0.12] px-3.5 py-2 text-sm shadow-[0_14px_34px_-24px_rgba(56,189,248,0.9)]"
          : "flex-col gap-3 rounded-2xl border border-cyan-200/45 bg-cyan-300/[0.11] px-5 py-5 shadow-[0_18px_54px_-32px_rgba(56,189,248,0.8)] hover:shadow-[0_20px_62px_-30px_rgba(255,255,255,0.75)] sm:flex-row sm:items-center sm:justify-between"
      } ${className}`}
    >
      <span>
        <span className={compact ? "sr-only" : "block font-mono text-[11px] uppercase tracking-[0.22em] text-cyan-200/90"}>
          {meta}
        </span>
        <span className={compact ? "block font-semibold text-white" : "mt-1 block text-base font-semibold text-white"}>
          {label}
        </span>
      </span>
      <span className={compact ? "flex size-7 shrink-0 items-center justify-center rounded-lg border border-white/25 bg-white/12 text-white transition group-hover:border-white/60 group-hover:bg-white/20" : "flex size-11 shrink-0 items-center justify-center rounded-xl border border-white/30 bg-white/12 text-white transition group-hover:border-white/60 group-hover:bg-white/20"}>
        <ExternalLink className={compact ? "size-3.5" : "size-5"} aria-hidden="true" />
      </span>
    </a>
  )
}

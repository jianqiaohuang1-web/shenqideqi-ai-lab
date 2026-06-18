import { AlertTriangle, CheckCircle2, Circle } from "lucide-react"
import type { ResultBlock } from "@/lib/products"
import { cn } from "@/lib/utils"

const toneConfig = {
  default: { icon: Circle, className: "text-muted-foreground" },
  warn: { icon: AlertTriangle, className: "text-chart-5" },
  success: { icon: CheckCircle2, className: "text-chart-4" },
}

export function ResultPanel({
  loading,
  result,
  emptyHint,
}: {
  loading: boolean
  result: ResultBlock[] | null
  emptyHint: string
}) {
  return (
    <div className="glass-card flex min-h-[20rem] flex-col rounded-2xl p-5">
      <div className="flex items-center justify-between border-b border-border/60 pb-3">
        <span className="text-sm font-medium">AI 生成结果</span>
        <span className="font-mono text-xs text-muted-foreground">
          {loading ? "生成中…" : result ? "已生成" : "待生成"}
        </span>
      </div>

      {loading ? (
        <div className="flex flex-1 flex-col gap-3 py-6">
          {[0, 1, 2, 3].map((i) => (
            <div key={i} className="space-y-2">
              <div className="h-3 w-1/3 animate-pulse rounded bg-muted" />
              <div className="h-3 w-full animate-pulse rounded bg-muted/70" />
              <div className="h-3 w-4/5 animate-pulse rounded bg-muted/50" />
            </div>
          ))}
        </div>
      ) : result ? (
        <div className="mt-4 space-y-5">
          {result.map((block) => {
            const tone = toneConfig[block.tone ?? "default"]
            const Icon = tone.icon
            return (
              <div key={block.title}>
                <h4 className="flex items-center gap-2 text-sm font-semibold">
                  <Icon className={cn("size-4", tone.className)} aria-hidden="true" />
                  {block.title}
                </h4>
                <ul className="mt-2 space-y-1.5 pl-6">
                  {block.items.map((item, i) => (
                    <li
                      key={i}
                      className="list-disc text-sm leading-relaxed text-muted-foreground marker:text-primary/50"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            )
          })}
        </div>
      ) : (
        <div className="flex flex-1 items-center justify-center px-4 text-center">
          <p className="text-sm leading-relaxed text-muted-foreground">
            {emptyHint}
          </p>
        </div>
      )}
    </div>
  )
}

"use client"

import { useState } from "react"
import { ThumbsUp, ThumbsDown, CheckCircle2 } from "lucide-react"
import { submitFeedback } from "@/lib/api"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { cn } from "@/lib/utils"

export function FeedbackBlock({ productSlug }: { productSlug: string }) {
  const [reaction, setReaction] = useState<"up" | "down" | null>(null)
  const [comment, setComment] = useState("")
  const [submitting, setSubmitting] = useState(false)
  const [message, setMessage] = useState<string>("")

  async function handleSubmit() {
    setSubmitting(true)
    const res = await submitFeedback({ productSlug, reaction, comment })
    setMessage(res.message)
    setSubmitting(false)
    setComment("")
  }

  return (
    <div className="glass-card rounded-2xl p-6">
      <h3 className="text-base font-semibold">这个体验对你有帮助吗？</h3>
      <p className="mt-1 text-sm text-muted-foreground">
        你的反馈将用于后续的产品优化（当前为前端演示）。
      </p>

      <div className="mt-4 flex items-center gap-3">
        <button
          type="button"
          onClick={() => setReaction((r) => (r === "up" ? null : "up"))}
          className={cn(
            "flex items-center gap-2 rounded-lg border border-border px-3 py-2 text-sm transition-colors",
            reaction === "up"
              ? "border-chart-4/50 bg-chart-4/15 text-chart-4"
              : "text-muted-foreground hover:text-foreground",
          )}
          aria-pressed={reaction === "up"}
        >
          <ThumbsUp className="size-4" aria-hidden="true" />
          有帮助
        </button>
        <button
          type="button"
          onClick={() => setReaction((r) => (r === "down" ? null : "down"))}
          className={cn(
            "flex items-center gap-2 rounded-lg border border-border px-3 py-2 text-sm transition-colors",
            reaction === "down"
              ? "border-chart-5/50 bg-chart-5/15 text-chart-5"
              : "text-muted-foreground hover:text-foreground",
          )}
          aria-pressed={reaction === "down"}
        >
          <ThumbsDown className="size-4" aria-hidden="true" />
          待改进
        </button>
      </div>

      <Textarea
        rows={3}
        className="mt-4"
        placeholder="补充你的反馈或建议…"
        value={comment}
        onChange={(e) => setComment(e.target.value)}
      />

      <div className="mt-4 flex items-center gap-3">
        <Button onClick={handleSubmit} disabled={submitting}>
          {submitting ? "提交中…" : "提交反馈"}
        </Button>
        {message && (
          <span className="flex items-center gap-1.5 text-sm text-chart-4">
            <CheckCircle2 className="size-4" aria-hidden="true" />
            {message}
          </span>
        )}
      </div>
    </div>
  )
}

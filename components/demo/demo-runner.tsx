"use client"

import { useState } from "react"
import { Send, Sparkles, Upload } from "lucide-react"
import type { Product, ResultBlock } from "@/lib/products"
import {
  generateInterviewReport,
  reviewContract,
  generateCompetitorReport,
  sendAgentMessage,
  type AgentMessage,
} from "@/lib/api"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ResultPanel } from "@/components/demo/result-panel"

export function DemoRunner({ product }: { product: Product }) {
  if (product.demoType === "character") {
    return <CharacterDemo product={product} />
  }
  return <FormDemo product={product} />
}

/* ------------------------------ 表单类 Demo ------------------------------ */

function FormDemo({ product }: { product: Product }) {
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<ResultBlock[] | null>(null)
  const [fields, setFields] = useState<Record<string, string>>({})
  const [fileName, setFileName] = useState<string>("")

  const update = (key: string, value: string) =>
    setFields((prev) => ({ ...prev, [key]: value }))

  async function handleRun() {
    setLoading(true)
    setResult(null)
    let data: ResultBlock[] = []
    if (product.demoType === "interview") {
      data = await generateInterviewReport({
        resume: fields.resume ?? "",
        jd: fields.jd ?? "",
      })
    } else if (product.demoType === "contract") {
      data = await reviewContract({
        fileName,
        context: fields.context ?? "",
      })
    } else if (product.demoType === "competitor") {
      data = await generateCompetitorReport({
        goal: fields.goal ?? "",
        competitors: fields.competitors ?? "",
        material: fields.material ?? "",
      })
    }
    setResult(data)
    setLoading(false)
  }

  return (
    <div className="grid gap-5 lg:grid-cols-2">
      <div className="glass-card flex flex-col gap-4 rounded-2xl p-5">
        {product.demoType === "interview" && (
          <>
            <Field label="简历内容">
              <Textarea
                rows={5}
                placeholder="粘贴你的简历内容…"
                value={fields.resume ?? ""}
                onChange={(e) => update("resume", e.target.value)}
              />
            </Field>
            <Field label="目标岗位 JD">
              <Textarea
                rows={5}
                placeholder="粘贴目标岗位的招聘 JD…"
                value={fields.jd ?? ""}
                onChange={(e) => update("jd", e.target.value)}
              />
            </Field>
          </>
        )}

        {product.demoType === "contract" && (
          <>
            <Field label="合同文件">
              <FileDrop fileName={fileName} onFile={setFileName} />
            </Field>
            <Field label="补充合同背景">
              <Textarea
                rows={4}
                placeholder="补充合同的业务背景、关注重点…"
                value={fields.context ?? ""}
                onChange={(e) => update("context", e.target.value)}
              />
            </Field>
          </>
        )}

        {product.demoType === "competitor" && (
          <>
            <Field label="分析目标">
              <Input
                placeholder="例如：评估进入中端协作市场的机会"
                value={fields.goal ?? ""}
                onChange={(e) => update("goal", e.target.value)}
              />
            </Field>
            <Field label="竞品名称">
              <Input
                placeholder="例如：产品 A、产品 B"
                value={fields.competitors ?? ""}
                onChange={(e) => update("competitors", e.target.value)}
              />
            </Field>
            <Field label="竞品资料">
              <Textarea
                rows={4}
                placeholder="粘贴竞品的功能、定价、定位等资料…"
                value={fields.material ?? ""}
                onChange={(e) => update("material", e.target.value)}
              />
            </Field>
          </>
        )}

        <Button
          onClick={handleRun}
          disabled={loading}
          size="lg"
          className="glow-primary mt-1 w-full"
        >
          <Sparkles className="size-4" aria-hidden="true" />
          {loading ? "正在生成…" : runLabel(product.demoType)}
        </Button>
        <p className="text-center text-xs text-muted-foreground">
          当前为前端演示，结果为 mock 数据，后续将接入真实 AI 接口。
        </p>
      </div>

      <ResultPanel
        loading={loading}
        result={result}
        emptyHint="填写左侧信息后点击生成按钮，这里会展示结构化的 AI 分析结果。"
      />
    </div>
  )
}

function runLabel(type: string) {
  switch (type) {
    case "interview":
      return "生成面试准备报告"
    case "contract":
      return "开始审核"
    case "competitor":
      return "生成竞品分析报告"
    default:
      return "生成结果"
  }
}

function Field({
  label,
  children,
}: {
  label: string
  children: React.ReactNode
}) {
  return (
    <div className="space-y-2">
      <Label className="text-sm">{label}</Label>
      {children}
    </div>
  )
}

function FileDrop({
  fileName,
  onFile,
}: {
  fileName: string
  onFile: (name: string) => void
}) {
  return (
    <label className="flex cursor-pointer flex-col items-center justify-center gap-2 rounded-xl border border-dashed border-border bg-background/40 px-4 py-8 text-center transition-colors hover:border-primary/50">
      <Upload className="size-6 text-muted-foreground" aria-hidden="true" />
      <span className="text-sm text-foreground">
        {fileName || "点击或拖拽上传合同文件"}
      </span>
      <span className="text-xs text-muted-foreground">支持 Word / PDF（演示）</span>
      <input
        type="file"
        accept=".doc,.docx,.pdf"
        className="hidden"
        onChange={(e) => onFile(e.target.files?.[0]?.name ?? "已选择文件")}
      />
    </label>
  )
}

/* ------------------------------ 角色智能体 Demo ------------------------------ */

function CharacterDemo({ product }: { product: Product }) {
  const seed = product.mockResult[0]?.items ?? []
  const initial: AgentMessage[] = seed.map((line) => {
    const isUser = line.startsWith("你：")
    return {
      role: isUser ? "user" : "agent",
      content: line.replace(/^你：/, "").replace(/^机甲顾问 Agent：/, ""),
    }
  })

  const [messages, setMessages] = useState<AgentMessage[]>(initial)
  const [input, setInput] = useState("")
  const [sending, setSending] = useState(false)

  async function handleSend() {
    const text = input.trim()
    if (!text || sending) return
    const next = [...messages, { role: "user" as const, content: text }]
    setMessages(next)
    setInput("")
    setSending(true)
    const reply = await sendAgentMessage(next, text)
    setMessages((prev) => [...prev, reply])
    setSending(false)
  }

  return (
    <div className="glass-card mx-auto flex max-w-2xl flex-col rounded-2xl p-5">
      <div className="flex items-center gap-3 border-b border-border/60 pb-3">
        <span className="flex size-9 items-center justify-center rounded-full bg-chart-4/15 ring-1 ring-chart-4/30">
          <Sparkles className="size-4 text-chart-4" aria-hidden="true" />
        </span>
        <div>
          <p className="text-sm font-semibold">机甲顾问 Agent</p>
          <p className="text-xs text-muted-foreground">角色智能体实验 · 多轮对话演示</p>
        </div>
      </div>

      <div className="flex max-h-96 min-h-64 flex-col gap-3 overflow-y-auto py-4">
        {messages.map((msg, i) => (
          <div
            key={i}
            className={
              msg.role === "user" ? "flex justify-end" : "flex justify-start"
            }
          >
            <div
              className={
                msg.role === "user"
                  ? "max-w-[80%] rounded-2xl rounded-br-sm bg-primary px-4 py-2.5 text-sm text-primary-foreground"
                  : "max-w-[80%] rounded-2xl rounded-bl-sm border border-border/60 bg-background/50 px-4 py-2.5 text-sm text-foreground"
              }
            >
              {msg.content}
            </div>
          </div>
        ))}
        {sending && (
          <div className="flex justify-start">
            <div className="rounded-2xl rounded-bl-sm border border-border/60 bg-background/50 px-4 py-2.5">
              <span className="flex gap-1">
                <span className="size-1.5 animate-bounce rounded-full bg-muted-foreground [animation-delay:-0.2s]" />
                <span className="size-1.5 animate-bounce rounded-full bg-muted-foreground [animation-delay:-0.1s]" />
                <span className="size-1.5 animate-bounce rounded-full bg-muted-foreground" />
              </span>
            </div>
          </div>
        )}
      </div>

      <div className="flex items-center gap-2 border-t border-border/60 pt-3">
        <Input
          placeholder="向角色提问…"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") handleSend()
          }}
        />
        <Button onClick={handleSend} disabled={sending} size="icon-lg">
          <Send className="size-4" aria-hidden="true" />
          <span className="sr-only">发送</span>
        </Button>
      </div>
    </div>
  )
}

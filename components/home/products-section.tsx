import Link from "next/link"
import {
  ArrowRight,
  BarChart3,
  Bot,
  CheckCircle2,
  FileSearch,
  FileText,
  LineChart,
  MessageCircle,
  Network,
  ShieldCheck,
  Sparkles,
  Target,
} from "lucide-react"
import { mockProducts, type Product } from "@/lib/products"
import { SectionHeading } from "@/components/section-heading"

const cardMeta: Record<
  string,
  {
    label: string
    featured?: boolean
    accent: string
    glow: string
    border: string
  }
> = {
  interview: {
    label: "核心项目",
    featured: true,
    accent: "text-sky-300",
    glow: "rgba(56,189,248,0.42)",
    border: "hover:border-sky-300/60",
  },
  contract: {
    label: "场景验证",
    accent: "text-cyan-200",
    glow: "rgba(45,212,191,0.34)",
    border: "hover:border-cyan-200/55",
  },
  competitor: {
    label: "产品想法",
    accent: "text-violet-300",
    glow: "rgba(167,139,250,0.34)",
    border: "hover:border-violet-300/55",
  },
  agent: {
    label: "Agent 实验",
    accent: "text-emerald-300",
    glow: "rgba(52,211,153,0.34)",
    border: "hover:border-emerald-300/55",
  },
}

export function ProductsSection() {
  return (
    <section id="experiments" className="scroll-mt-20">
      <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6 lg:py-28">
        <SectionHeading title="正在验证的 AI 产品想法" />

        <div className="mt-12 grid gap-5 md:grid-cols-2">
          {mockProducts.map((product) => {
            const meta = cardMeta[product.slug] ?? cardMeta.interview

            return (
              <Link
                key={product.id}
                href={product.detailUrl}
                className={`group relative min-h-[328px] overflow-hidden rounded-[20px] border bg-[#0b1720]/58 p-7 shadow-[0_24px_80px_-48px_rgba(0,0,0,0.9)] outline-none transition duration-300 hover:-translate-y-1 focus-visible:ring-2 focus-visible:ring-primary/60 ${
                  meta.featured
                    ? "border-sky-300/28 shadow-[0_28px_95px_-52px_rgba(56,189,248,0.9)]"
                    : "border-white/10"
                } ${meta.border}`}
              >
                <div
                  className="pointer-events-none absolute inset-0 opacity-95 transition duration-300 group-hover:opacity-100"
                  aria-hidden="true"
                >
                  <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(19,43,62,0.72),rgba(7,17,29,0.9))]" />
                  <div
                    className="absolute inset-x-0 top-0 h-36 blur-sm transition duration-300 group-hover:scale-105"
                    style={{
                      background: `radial-gradient(ellipse at center, ${meta.glow}, transparent 62%)`,
                    }}
                  />
                  <div className="absolute inset-0 bg-grid opacity-25" />
                  <div className="absolute inset-x-8 top-24 h-px bg-gradient-to-r from-transparent via-white/13 to-transparent" />
                </div>

                <div className="relative flex h-full flex-col">
                  <div className="flex items-start justify-between gap-4">
                    <span
                      className={`rounded-full border px-3 py-1 text-xs font-medium ${
                        meta.featured
                          ? "border-sky-200/55 bg-white/12 text-white"
                          : "border-white/12 bg-white/[0.045] text-white/68"
                      }`}
                    >
                      {meta.featured ? "Featured · " : ""}
                      {meta.label}
                    </span>
                    <span className="flex size-8 shrink-0 items-center justify-center rounded-full border border-white/10 bg-white/[0.045] text-white/55 transition group-hover:border-white/30 group-hover:text-white">
                      <ArrowRight className="size-4 transition group-hover:translate-x-0.5" aria-hidden="true" />
                    </span>
                  </div>

                  <ProjectVisual product={product} accent={meta.accent} />

                  <div className="mt-auto pt-7">
                    <h3 className="text-2xl font-semibold tracking-tight text-white">
                      {product.name}
                    </h3>
                    <p className="mt-3 max-w-md text-sm leading-6 text-white/64">
                      {product.subtitle}
                    </p>
                  </div>
                </div>
              </Link>
            )
          })}
        </div>
      </div>
    </section>
  )
}

function ProjectVisual({
  product,
  accent,
}: {
  product: Product
  accent: string
}) {
  if (product.slug === "contract") {
    return (
      <div className="relative mt-6 h-32">
        <div className="absolute left-1 top-3 h-24 w-20 rounded-xl border border-cyan-200/25 bg-white/[0.06] p-3 transition duration-300 group-hover:-translate-y-1">
          <FileText className={`size-5 ${accent}`} />
          <div className="mt-4 space-y-2">
            <span className="block h-1.5 rounded-full bg-white/20" />
            <span className="block h-1.5 w-10 rounded-full bg-cyan-200/45" />
            <span className="block h-1.5 w-12 rounded-full bg-white/14" />
          </div>
        </div>
        <div className="absolute left-28 top-8 flex h-16 w-28 items-center justify-center rounded-2xl border border-amber-300/35 bg-amber-300/[0.08] text-xs font-semibold text-amber-100">
          风险高亮
        </div>
        <div className="absolute right-12 top-1 flex size-16 items-center justify-center rounded-2xl border border-cyan-200/25 bg-cyan-200/[0.08] transition duration-300 group-hover:translate-x-1">
          <ShieldCheck className={`size-8 ${accent}`} />
        </div>
        <div className="absolute bottom-1 right-2 rotate-[-8deg] rounded-full border border-cyan-200/45 px-4 py-2 text-xs font-semibold text-cyan-100">
          审批建议
        </div>
      </div>
    )
  }

  if (product.slug === "competitor") {
    return (
      <div className="relative mt-6 h-32">
        <div className="absolute left-0 top-3 grid h-24 w-36 grid-cols-2 gap-2 rounded-2xl border border-violet-300/25 bg-white/[0.045] p-3 transition duration-300 group-hover:-translate-y-1">
          {["A", "B", "C", "D"].map((item) => (
            <span key={item} className="flex items-center justify-center rounded-lg border border-white/8 bg-violet-300/[0.08] text-xs text-violet-100">
              {item}
            </span>
          ))}
        </div>
        <div className="absolute right-8 top-0 h-24 w-32 rounded-2xl border border-violet-300/25 bg-white/[0.055] p-4">
          <LineChart className={`size-6 ${accent}`} />
          <div className="mt-5 flex items-end gap-2">
            <span className="h-5 w-3 rounded-sm bg-violet-300/35" />
            <span className="h-9 w-3 rounded-sm bg-violet-300/65" />
            <span className="h-7 w-3 rounded-sm bg-sky-300/55" />
            <span className="h-12 w-3 rounded-sm bg-violet-200/75" />
          </div>
        </div>
        <div className="absolute bottom-1 left-28 flex items-center gap-2 rounded-full border border-violet-300/25 bg-violet-300/[0.08] px-4 py-2 text-xs text-violet-100">
          <BarChart3 className="size-4" />
          分析面板
        </div>
      </div>
    )
  }

  if (product.slug === "agent") {
    return (
      <div className="relative mt-6 h-32">
        <div className="absolute left-2 top-4 flex size-20 items-center justify-center rounded-full border border-emerald-300/25 bg-emerald-300/[0.07] transition duration-300 group-hover:scale-105">
          <Bot className={`size-9 ${accent}`} />
        </div>
        <div className="absolute left-28 top-2 rounded-2xl border border-emerald-300/25 bg-white/[0.055] px-4 py-3 text-xs text-white/70">
          <MessageCircle className={`mb-2 size-5 ${accent}`} />
          多轮对话
        </div>
        <div className="absolute right-4 top-12 flex size-16 items-center justify-center rounded-2xl border border-emerald-300/25 bg-emerald-300/[0.08]">
          <Network className={`size-8 ${accent}`} />
        </div>
        <div className="absolute bottom-3 left-24 right-16 h-px bg-gradient-to-r from-emerald-300/60 via-emerald-200/25 to-transparent" />
        <span className="absolute bottom-1 left-20 size-2 rounded-full bg-emerald-300 shadow-[0_0_16px_rgba(52,211,153,0.9)]" />
        <span className="absolute bottom-1 right-20 size-2 rounded-full bg-emerald-200 shadow-[0_0_16px_rgba(110,231,183,0.8)]" />
      </div>
    )
  }

  return (
    <div className="relative mt-6 h-32">
      <div className="absolute left-0 top-2 h-26 w-24 rounded-2xl border border-sky-200/30 bg-white/[0.07] p-3 transition duration-300 group-hover:-translate-y-1">
        <FileText className={`size-5 ${accent}`} />
        <div className="mt-4 space-y-2">
          <span className="block h-1.5 rounded-full bg-white/22" />
          <span className="block h-1.5 w-12 rounded-full bg-white/14" />
          <span className="block h-1.5 w-16 rounded-full bg-sky-200/35" />
        </div>
      </div>
      <div className="absolute left-28 top-8 h-18 w-28 rounded-2xl border border-sky-200/25 bg-sky-300/[0.08] p-3">
        <FileSearch className={`size-5 ${accent}`} />
        <p className="mt-3 text-xs font-medium text-sky-100">JD 卡片</p>
      </div>
      <div className="absolute right-5 top-0 flex size-24 items-center justify-center rounded-full border border-sky-200/20 bg-sky-300/[0.06]">
        <div className="flex size-16 items-center justify-center rounded-full border-[6px] border-sky-300/70 border-r-white/12 text-sm font-semibold text-sky-100">
          86%
        </div>
      </div>
      <div className="absolute bottom-5 left-20 right-28 h-px bg-gradient-to-r from-sky-300/80 via-sky-200/30 to-transparent" />
      <span className="absolute bottom-4 left-20 size-2 rounded-full bg-sky-300 shadow-[0_0_16px_rgba(56,189,248,0.95)]" />
      <span className="absolute bottom-4 right-28 size-2 rounded-full bg-sky-100 shadow-[0_0_16px_rgba(186,230,253,0.9)]" />
      <div className="absolute bottom-0 left-36 flex items-center gap-1 rounded-full border border-sky-200/25 bg-sky-300/[0.08] px-3 py-1 text-xs text-sky-100">
        <Target className="size-3.5" />
        匹配分析
      </div>
      <Sparkles className="absolute right-32 top-4 size-4 text-sky-200/70" />
      <CheckCircle2 className="absolute right-16 bottom-4 size-5 text-sky-200/80" />
    </div>
  )
}

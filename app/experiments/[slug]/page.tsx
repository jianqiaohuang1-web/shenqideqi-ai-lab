import { notFound } from "next/navigation"
import type { ComponentType, ReactNode } from "react"
import {
  BarChart3,
  ExternalLink,
  Lightbulb,
  ListChecks,
  Play,
  Target,
  Users,
} from "lucide-react"
import { getAllSlugs, getProductBySlug } from "@/lib/products"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { Button } from "@/components/ui/button"
import { ExternalResourceCard } from "@/components/external-resource-card"

export function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }))
}

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const product = getProductBySlug(slug)
  if (!product) notFound()

  const canOpenDemo = product.demoAvailable && product.demoUrl
  const backgroundItems = splitContent(product.background)
  const painItems = splitPairs(product.painPoint)

  return (
    <div className="min-h-screen">
      <SiteHeader />
      <main className="mx-auto max-w-7xl space-y-5 px-4 py-8 sm:px-6 lg:py-10">
        <ModuleCard className="p-6 sm:p-8">
          <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-start">
            <div>
              <div className="flex flex-wrap items-center gap-3">
                <h1 className="text-4xl font-semibold tracking-tight text-white sm:text-5xl">
                  {product.name}
                </h1>
                <span className="rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
                  {product.status}
                </span>
              </div>

              <p className="mt-7 max-w-none text-base leading-8 text-white/72 lg:whitespace-nowrap">
                {product.subtitle}
              </p>

            </div>

            <div className="grid gap-3 lg:justify-self-end lg:pt-2">
              {canOpenDemo ? (
                <Button
                  render={
                    <a
                      href={product.demoUrl as string}
                      target="_blank"
                      rel="noreferrer"
                    />
                  }
                  className="h-10 rounded-xl border-white/60 bg-white px-5 text-sm font-semibold text-[#07152f] shadow-[0_0_0_1px_rgba(255,255,255,0.32),0_14px_34px_-18px_rgba(255,255,255,0.95),0_0_24px_rgba(56,189,248,0.32)] hover:bg-sky-100 hover:shadow-[0_0_0_1px_rgba(255,255,255,0.5),0_16px_42px_-18px_rgba(255,255,255,1),0_0_32px_rgba(56,189,248,0.45)] [&_svg]:size-4"
                >
                  <Play className="size-4" aria-hidden="true" />
                  立即体验
                  <ExternalLink className="size-4" aria-hidden="true" />
                </Button>
              ) : (
                <Button
                  disabled
                  aria-disabled="true"
                  className="w-full cursor-not-allowed opacity-50"
                >
                  搭建中
                </Button>
              )}
            </div>
          </div>
        </ModuleCard>

        <div className="space-y-5">
          <ModuleCard>
            <ModuleTitle icon={Lightbulb} eyebrow="Project Context" title="项目背景" />
            <div className="mt-7 space-y-5">
              {backgroundItems.map((item, index) => (
                <div
                  key={item}
                  className="flex gap-4 border-l border-white/10 pl-4"
                >
                  <span className="w-8 shrink-0 font-mono text-sm font-semibold text-primary">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <p className="text-sm leading-7 text-white/68">{item}</p>
                </div>
              ))}
            </div>
          </ModuleCard>

          <ModuleCard>
            <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
              <ModuleTitle icon={Users} eyebrow="Audience" title="目标用户" />
              {product.slug === "interview" ? (
                <ExternalResourceCard
                  href="https://axag15g680z.feishu.cn/wiki/Jj59wR8ZJiop9fkB06jcn4npnzc?from=from_copylink"
                  label="查看模拟用户访谈记录"
                  meta="用户访谈依据"
                  compact
                />
              ) : null}
            </div>
            <div className="mt-7 grid gap-4 sm:grid-cols-2">
              {product.targetUsers.map((user) => (
                <div
                  key={user.title}
                  className="rounded-xl border border-white/8 bg-white/[0.035] p-4"
                >
                  <h3 className="text-sm font-semibold text-white">
                    {user.title}
                  </h3>
                  <p className="mt-2 text-sm leading-6 text-white/58">
                    {user.description}
                  </p>
                </div>
              ))}
            </div>
          </ModuleCard>
        </div>

        <div className="space-y-5">
          <ModuleCard>
            <ModuleTitle icon={Target} eyebrow="Pain Points" title="核心痛点" />
            <div className="mt-7 grid gap-3">
              {painItems.map((item, index) => (
                <div
                  key={item.title}
                  className="flex gap-4 rounded-xl border border-white/8 bg-white/[0.035] p-4"
                >
                  <span className="flex size-7 shrink-0 items-center justify-center rounded-lg bg-primary/12 font-mono text-xs text-primary ring-1 ring-primary/20">
                    {index + 1}
                  </span>
                  <div>
                    <h3 className="text-sm font-semibold text-white">
                      {item.title}
                    </h3>
                    <p className="mt-2 text-sm leading-6 text-white/64">
                      {item.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </ModuleCard>

          <ModuleCard>
            <ModuleTitle icon={Lightbulb} eyebrow="AI Fit" title="为什么适用AI" />
            <div className="mt-7 rounded-2xl border border-primary/15 bg-primary/[0.055] p-5">
              <p className="text-sm leading-7 text-white/70">{product.whyAI}</p>
            </div>
          </ModuleCard>
        </div>

        <ModuleCard>
          <ModuleTitle icon={ListChecks} eyebrow="Product Flow" title="产品流程" />
          <ol className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {product.workflow.map((step, index) => (
              <li key={step.title} className="relative">
                <div className="h-full rounded-xl border border-white/8 bg-white/[0.035] p-4">
                  <span className="font-mono text-xs text-primary">
                    STEP {String(index + 1).padStart(2, "0")}
                  </span>
                  <h3 className="mt-4 text-base font-semibold text-white">
                    {step.title}
                  </h3>
                  <p className="mt-2 text-sm leading-6 text-white/58">
                    {step.description}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </ModuleCard>

        {product.slug === "interview" ? <MarketSizingSection /> : null}
      </main>
      <SiteFooter />
    </div>
  )
}

const marketMetrics = [
  {
    title: "潜在付费用户池",
    value: "15.8 万 - 96.1 万 / 月",
    note: "基于招聘 App MAU 和求职用户转化假设测算",
  },
  {
    title: "理论市场年化收入空间",
    value: "约 0.93 亿 - 5.65 亿 / 年",
    note: "按 49 元/月客单价测算",
  },
  {
    title: "职得面可获得年化收入",
    value: "约 465 万 - 5648 万 / 年",
    note: "按 5% - 10% 细分市场占有率测算",
  },
  {
    title: "达成目标所需日新增注册",
    value: "约 5273 - 32017 人 / 天",
    note: "假设用户只订阅 1 个月，倒推所需日新增注册用户",
  },
]

const funnelSteps = [
  {
    label: "招聘 App 月活",
    value: "1.13 亿",
    source: "数据来源：QuestMobile 2025 年 4 月数据",
  },
  { label: "求职用户", value: "7910 万 - 9605 万" },
  { label: "认真求职 / 投递用户", value: "1582 万 - 2401 万" },
  { label: "愿意尝试 AI 求职工具用户", value: "316 万 - 961 万" },
  { label: "愿意付费用户", value: "15.8 万 - 96.1 万" },
]

const assumptions = [
  "求职用户占比：保守 70%，乐观 85%",
  "认真求职比例：保守 20%，乐观 25%",
  "AI 求职工具尝试比例：保守 20%，乐观 40%",
  "付费转化比例：保守 5%，乐观 10%",
  "客单价：49 元/月",
  "职得面市场占有率：保守 5%，乐观 10%",
]

function MarketSizingSection() {
  return (
    <ModuleCard>
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <ModuleTitle
          icon={BarChart3}
          eyebrow="Market Sizing"
          title="市场空间与商业可行性测算"
        />
        <ExternalResourceCard
          href="https://axag15g680z.feishu.cn/wiki/HsRtwAnAXiVRYAkhkMnc28s1nCy?from=from_copylink"
          label="查看完整数据模型"
          meta="资料来源 / 测算依据"
          compact
        />
      </div>

      <div className="mt-8 grid gap-4 sm:grid-cols-2">
        {marketMetrics.map((metric) => (
          <div
            key={metric.title}
            className="rounded-2xl border border-white/8 bg-white/[0.035] p-5"
          >
            <p className="text-sm font-medium text-white/62">{metric.title}</p>
            <p className="mt-4 text-2xl font-semibold tracking-tight text-primary">
              {metric.value}
            </p>
            <p className="mt-4 text-xs leading-5 text-white/48">{metric.note}</p>
          </div>
        ))}
      </div>

      <div className="mt-8 grid gap-5 lg:grid-cols-[1.05fr_0.95fr]">
        <div className="rounded-2xl border border-white/8 bg-white/[0.03] p-5">
          <h3 className="text-base font-semibold text-white">简化市场漏斗</h3>
          <div className="mt-5 space-y-3">
            {funnelSteps.map((step, index) => (
              <div key={step.label}>
                <div className="rounded-xl border border-primary/15 bg-primary/[0.045] p-4">
                  <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
                    <p className="text-sm font-medium text-white/72">
                      {step.label}
                    </p>
                    <p className="text-lg font-semibold text-white">
                      {step.value}
                    </p>
                  </div>
                  {"source" in step ? (
                    <p className="mt-2 text-xs leading-5 text-white/45">
                      {step.source}
                    </p>
                  ) : null}
                </div>
                {index < funnelSteps.length - 1 ? (
                  <div className="flex justify-center py-2 text-primary/70">
                    ↓
                  </div>
                ) : null}
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-2xl border border-white/8 bg-white/[0.03] p-5">
          <h3 className="text-base font-semibold text-white">关键测算假设</h3>
          <div className="mt-5 grid gap-3">
            {assumptions.map((item) => (
              <div
                key={item}
                className="rounded-xl border border-white/8 bg-white/[0.035] px-4 py-3 text-sm leading-6 text-white/64"
              >
                {item}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-8 rounded-2xl border border-primary/20 bg-primary/[0.065] p-5">
        <h3 className="text-base font-semibold text-white">商业判断结论</h3>
        <div className="mt-4 space-y-4 text-sm leading-7 text-white/70">
          <p>
            测算结果显示，AI 求职准备工具具备一定的付费市场空间。「职得面」在保守与乐观测算下，对应的潜在付费用户池约为 15.8 万 - 96.1 万 / 月，按 49 元/月订阅价格测算，理论市场年化收入空间约为 0.93 亿 - 5.65 亿。
          </p>
          <p>
            但同时也可以看到，如果用户只订阅 1 个月，产品收入会高度依赖持续拉新。要达到测算中的月收入目标，职得面需要每天新增约 5273 - 32017 个注册用户，这说明单纯依靠低价短周期订阅，增长压力较大。
          </p>
          <p>
            因此，职得面的商业化重点不应只放在“单月订阅”，而应围绕完整求职周期提升用户价值和复购空间。后续可以从多岗位准备、求职周期包、简历版本管理、面试追问训练和高阶服务等方向扩展，提高单个用户在求职周期内的使用深度和 LTV。
          </p>
        </div>
      </div>
    </ModuleCard>
  )
}

function ModuleCard({
  children,
  className = "p-5 sm:p-6",
}: {
  children: ReactNode
  className?: string
}) {
  return (
    <section
      className={`relative overflow-hidden rounded-[26px] border border-white/10 bg-[#0b1626]/72 shadow-[0_28px_100px_-70px_rgba(0,0,0,0.95)] ${className}`}
    >
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_28%_0%,rgba(45,212,191,0.13),transparent_30%),linear-gradient(180deg,rgba(255,255,255,0.035),rgba(255,255,255,0))]" />
        <div className="absolute inset-0 bg-grid opacity-35" />
      </div>
      <div className="relative">{children}</div>
    </section>
  )
}

function ModuleTitle({
  icon: Icon,
  eyebrow,
  title,
}: {
  icon: ComponentType<{ className?: string }>
  eyebrow: string
  title: string
}) {
  return (
    <div className="flex items-center gap-4">
      <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-primary/12 ring-1 ring-primary/25">
        <Icon className="size-5 text-primary" />
      </span>
      <div>
        <p className="font-mono text-xs uppercase tracking-[0.24em] text-white/35">
          {eyebrow}
        </p>
        <h2 className="mt-1 text-xl font-semibold tracking-tight text-white">
          {title}
        </h2>
      </div>
    </div>
  )
}

function splitContent(value: string) {
  return value
    .split(/\n+/)
    .map((item) => item.trim())
    .filter(Boolean)
}

function splitPairs(value: string) {
  const parts = splitContent(value)
  const pairs: { title: string; description: string }[] = []

  for (let i = 0; i < parts.length; i += 2) {
    pairs.push({
      title: parts[i],
      description: parts[i + 1] ?? "",
    })
  }

  return pairs
}

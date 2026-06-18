import Link from "next/link"
import { ArrowRight, ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { HeroCore } from "@/components/home/hero-core"

const labTags = ["职得面", "合同审批助手", "竞品分析工具", "钢铁侠人格智能体"]

export function Hero() {
  return (
    <section
      id="home"
      className="relative flex min-h-[100svh] flex-col overflow-hidden border-b border-border/60 bg-space"
    >
      <div className="bg-stars pointer-events-none absolute inset-0 opacity-[0.05]" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-b from-transparent to-background" />

      <HeroCore />

      <div className="relative mx-auto flex w-full max-w-4xl flex-1 flex-col items-center justify-center px-4 py-20 text-center sm:px-6">
        <h1 className="text-balance text-5xl font-semibold leading-[1.08] tracking-tight sm:text-6xl lg:text-7xl">
          把 AI 想法做成
          <br />
          可验证的<span className="text-gradient">实验</span>
        </h1>

        <p className="mt-7 max-w-2xl text-pretty text-base leading-relaxed text-muted-foreground sm:text-lg">
          一个持续验证 AI 产品想法的个人实验室。围绕求职、办公、产品分析和角色交互等真实场景，把问题、假设、流程和 Demo 入口整理成可持续迭代的作品入口。
        </p>

        <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
          <Button
            render={<Link href="/#experiments" />}
            size="lg"
            className="glow-primary"
          >
            查看 AI 实验
            <ArrowRight className="size-4" aria-hidden="true" />
          </Button>
        </div>

        <div className="mt-12 flex flex-wrap items-center justify-center gap-x-6 gap-y-3 text-xs font-medium tracking-wider text-muted-foreground/70">
          {labTags.map((tag) => (
            <span key={tag} className="flex items-center gap-2">
              <span className="size-1.5 rounded-full bg-primary/70" />
              {tag}
            </span>
          ))}
        </div>
      </div>

      <Link
        href="/#experiments"
        className="relative z-10 mx-auto mb-12 flex flex-col items-center gap-1.5 text-xs text-muted-foreground/70 transition-colors hover:text-foreground"
        aria-label="向下查看实验"
      >
        向下查看实验
        <ChevronDown className="size-4 animate-bounce" aria-hidden="true" />
      </Link>
    </section>
  )
}

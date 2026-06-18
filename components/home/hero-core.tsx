/**
 * AI 能量核心视觉：发光核心 + 多层旋转轨道 + 密集球形粒子能量场。
 * 参考图风格：密集发光粒子球，亮点带光晕，营造科技/未来感。
 * 纯展示组件，置于标题之后，边缘通过 mask 自然消隐，不抢视觉焦点。
 */

type Particle = {
  x: number
  y: number
  size: number
  opacity: number
  twinkle: boolean
  delay: number
  bright: boolean
  key: string
}

// 在指定半径的圆周上分布粒子，带随机扰动，避免过于规整
function ring(
  count: number,
  radius: number,
  sizeRange: [number, number],
  opacityRange: [number, number],
  prefix: string,
): Particle[] {
  return Array.from({ length: count }).map((_, i) => {
    const angle = (i / count) * Math.PI * 2 + (i % 7) * 0.11
    const jitter = ((i * 37) % 11) / 11 - 0.5 // -0.5 ~ 0.5
    const r = radius + jitter * 6
    const x = 50 + Math.cos(angle) * r
    const y = 50 + Math.sin(angle) * r
    const t = ((i * 53) % 10) / 10
    return {
      x,
      y,
      size: sizeRange[0] + t * (sizeRange[1] - sizeRange[0]),
      opacity: opacityRange[0] + t * (opacityRange[1] - opacityRange[0]),
      twinkle: i % 3 === 0,
      bright: i % 6 === 0,
      delay: t * 4,
      key: `${prefix}-${i}`,
    }
  })
}

// 顺时针旋转层：较密的球壳粒子
const particlesOuter: Particle[] = [
  ...ring(64, 47, [1, 2.6], [0.45, 0.9], "o-a"),
  ...ring(52, 40, [1, 2.4], [0.35, 0.8], "o-b"),
  ...ring(40, 33, [1, 2.2], [0.3, 0.7], "o-c"),
]

// 逆时针旋转层：内圈粒子，制造球体纵深与交错感
const particlesInner: Particle[] = [
  ...ring(34, 27, [1, 2.2], [0.35, 0.7], "i-a"),
  ...ring(24, 20, [1, 2], [0.28, 0.6], "i-b"),
  ...ring(14, 13, [1, 1.8], [0.25, 0.5], "i-c"),
]

function ParticleField({ particles }: { particles: Particle[] }) {
  return (
    <>
      {particles.map((p) => (
        <span
          key={p.key}
          className={`absolute rounded-full ${p.twinkle ? "animate-twinkle" : ""}`}
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: `${p.size}px`,
            height: `${p.size}px`,
            opacity: p.opacity,
            animationDelay: `${p.delay}s`,
            transform: "translate(-50%, -50%)",
            backgroundColor: p.bright
              ? "oklch(0.95 0.04 220)"
              : "oklch(0.86 0.1 250)",
            boxShadow: p.bright
              ? "0 0 7px oklch(0.9 0.11 235 / 0.85)"
              : "none",
          }}
        />
      ))}
    </>
  )
}

export function HeroCore() {
  return (
    <div
      className="pointer-events-none absolute left-1/2 top-1/2 aspect-square w-[clamp(22rem,64vw,50rem)] -translate-x-1/2 -translate-y-1/2"
      aria-hidden="true"
    >
      {/* 外层弥散光晕，制造能量场氛围 */}
      <div
        className="animate-core-pulse absolute inset-[10%] rounded-full blur-3xl"
        style={{
          background:
            "radial-gradient(circle, oklch(0.62 0.2 258 / 0.35), transparent 65%)",
        }}
      />

      {/* 中心发光核心 */}
      <div
        className="animate-core-pulse absolute inset-[28%] rounded-full blur-2xl"
        style={{
          background:
            "radial-gradient(circle, oklch(0.85 0.12 235 / 0.55), oklch(0.6 0.2 270 / 0.22) 45%, transparent 72%)",
        }}
      />
      <div
        className="animate-core-pulse absolute inset-[38%] rounded-full blur-2xl"
        style={{
          background:
            "radial-gradient(circle, oklch(0.78 0.13 240 / 0.4), transparent 68%)",
        }}
      />

      {/* 多层旋转轨道，边缘消隐 */}
      <div className="mask-radial-fade absolute inset-0">
        <div className="animate-spin-slow absolute inset-[6%] rounded-full border border-primary/20" />
        <div className="animate-spin-slow absolute inset-[6%] rounded-full border-t border-primary/50" />
        <div className="animate-spin-slow-reverse absolute inset-[20%] rounded-full border border-accent/20" />
        <div className="animate-spin-slow-reverse absolute inset-[20%] rounded-full border-b border-accent/45" />
        <div
          className="animate-spin-slower absolute inset-[12%] rounded-full border border-dashed border-foreground/12"
          style={{ borderWidth: "1px" }}
        />
        {/* 椭圆轨道，倾斜角度，制造球体层次 */}
        <div
          className="animate-spin-slower-reverse absolute inset-[14%] rounded-[50%] border border-primary/15"
          style={{ transform: "rotate(24deg) scaleY(0.72)" }}
        />
        <div
          className="animate-spin-slow absolute inset-[10%] rounded-[50%] border border-accent/12"
          style={{ transform: "rotate(-32deg) scaleY(0.58)" }}
        />
      </div>

      {/* 球形粒子能量场：外层顺时针、内层逆时针，交错旋转更有生命力 */}
      <div className="mask-radial-fade absolute inset-0">
        <div className="animate-spin-slow absolute inset-0">
          <ParticleField particles={particlesOuter} />
        </div>
        <div className="animate-spin-slow-reverse absolute inset-0">
          <ParticleField particles={particlesInner} />
        </div>
      </div>
    </div>
  )
}

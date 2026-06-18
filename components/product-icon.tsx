import {
  Bot,
  BarChart3,
  FileCheck2,
  MessagesSquare,
  type LucideIcon,
} from "lucide-react"

const iconMap: Record<string, LucideIcon> = {
  messages: MessagesSquare,
  fileCheck: FileCheck2,
  chart: BarChart3,
  bot: Bot,
}

export const accentClasses: Record<
  string,
  { text: string; bg: string; ring: string }
> = {
  blue: {
    text: "text-chart-1",
    bg: "bg-chart-1/12",
    ring: "ring-chart-1/30",
  },
  violet: {
    text: "text-chart-2",
    bg: "bg-chart-2/12",
    ring: "ring-chart-2/30",
  },
  cyan: {
    text: "text-chart-3",
    bg: "bg-chart-3/12",
    ring: "ring-chart-3/30",
  },
  emerald: {
    text: "text-chart-4",
    bg: "bg-chart-4/12",
    ring: "ring-chart-4/30",
  },
}

export function ProductIcon({
  name,
  className,
}: {
  name: string
  className?: string
}) {
  const Icon = iconMap[name] ?? Bot
  return <Icon className={className} aria-hidden="true" />
}

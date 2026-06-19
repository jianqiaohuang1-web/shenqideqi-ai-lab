import { Analytics } from "@vercel/analytics/next"
import type { Metadata, Viewport } from "next"
import { Suspense } from "react"
import { VisitTracker } from "@/components/visit-tracker"
import "./globals.css"

export const metadata: Metadata = {
  title: "神奇的奇 AI Lab",
  description:
    "神奇的奇 AI Lab 是一个持续验证 AI 产品想法的个人实验室，展示职得面、合同审批助手、竞品分析助手和钢铁侠人格智能体。",
  generator: "v0.app",
  icons: {
    icon: [
      {
        url: "/icon-light-32x32.png",
        media: "(prefers-color-scheme: light)",
      },
      {
        url: "/icon-dark-32x32.png",
        media: "(prefers-color-scheme: dark)",
      },
      {
        url: "/icon.svg",
        type: "image/svg+xml",
      },
    ],
    apple: "/apple-icon.png",
  },
}

export const viewport: Viewport = {
  colorScheme: "dark",
  themeColor: "#0a0c12",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="zh-CN" className="bg-background">
      <body className="font-sans antialiased">
        {children}
        <Suspense fallback={null}>
          <VisitTracker />
        </Suspense>
        {process.env.NODE_ENV === "production" && <Analytics />}
      </body>
    </html>
  )
}

export function SiteFooter() {
  return (
    <footer id="contact" className="border-t border-border/60 bg-card/30">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-4 py-6 sm:flex-row sm:px-6">
        <div className="text-sm">
          <span className="font-semibold text-foreground">神奇的奇 AI Lab</span>
          <span className="ml-2 text-muted-foreground">
            持续验证 AI 产品想法的个人实验室
          </span>
        </div>

        <p className="text-xs text-muted-foreground">
          © {new Date().getFullYear()} 神奇的奇 AI Lab
        </p>
      </div>
    </footer>
  )
}
